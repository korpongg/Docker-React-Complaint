import React, { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import axios from "axios";

function EmployeeAutocomplete({
  Mode,
  data,
  userData,
  setDataFunction,
}) {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const config = {
    headers: {
      Authorization: `Bearer ${storedAuth.accessToken}`,
    },
  };

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        console.log("storedAuth:", storedAuth);
console.log("accessToken:", storedAuth?.accessToken);
console.log("config:", config);
console.log("apiUrl:", apiUrl);
console.log("GET:", `${apiUrl}/users`);

const response = await axios.get(
  `${apiUrl}/users/faction`,
  {
    ...config,
    params: {
      faction: userData.faction.trim(),
    },
  }
);
        if (response.status === 200 || response.status === 201) {
          console.log('response.data')
          console.log(response.data)
          const users = Array.isArray(response.data)
            ? response.data
            : [];

        

          setEmployees(users);
        }
      } catch (error) {
        console.error(
          "Error fetching employees:",
          error
        );

        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.faction) {
      fetchEmployees();
    }
  }, [apiUrl, userData?.faction]);

  return (
    <Autocomplete
      fullWidth
      disabled={Mode === "Show"}
      loading={loading}
      options={employees}

      value={
        employees.find(
          (item) =>
            item.userid?.toString() ===
            data?.respond_Id?.toString()
        ) || null
      }

      getOptionLabel={(option) =>
        option
          ? `${option.userid} - ${option.title || ""}${option.name || ""} ${option.lastname || ""}`
          : ""
      }

      isOptionEqualToValue={(option, value) =>
        option.userid === value?.userid
      }

      onChange={(event, newValue) => {
        if (newValue) {
          setDataFunction(
            {
              target: {
                value: newValue.userid,
              },
            },
            "respond_Id"
          );

          setDataFunction(
            {
              target: {
                value: `${newValue.title || ""}${newValue.name || ""} ${newValue.lastname || ""}`.trim(),
              },
            },
            "respond_NameSurname"
          );
        } else {
          setDataFunction(
            {
              target: {
                value: "",
              },
            },
            "respond_Id"
          );

          setDataFunction(
            {
              target: {
                value: "",
              },
            },
            "respond_NameSurname"
          );
        }
      }}

      filterOptions={(options, { inputValue }) => {
        const search = inputValue
          .trim()
          .toLowerCase();

        return options.filter((option) => {
          const fullName =
            `${option.title || ""}${option.name || ""} ${option.lastname || ""}`;

          return (
            option.userid
              ?.toString()
              .toLowerCase()
              .includes(search) ||
            fullName
              .toLowerCase()
              .includes(search) ||
            option.faction
              ?.toLowerCase()
              .includes(search)
          );
        });
      }}

      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="ค้นหารหัสพนักงาน หรือ ชื่อ-สกุล"
          size="small"
        />
      )}
    />
  );
}

export default EmployeeAutocomplete;