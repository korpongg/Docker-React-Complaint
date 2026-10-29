import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Box, Alert, Autocomplete, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {
  UserRound,
  BriefcaseBusiness,
  Building2,
  Network,
  Badge,
  User,
  UsersRound,
  Save,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AddUser = () => {
  const navigate = useNavigate();

  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const config = {
    headers: {
      Authorization: `Bearer ${storedAuth.accessToken}`,
    },
  };

  const [factData, setFactData] = useState([]);
  const [depData, setDepData] = useState([]);
  const [filterDepData, setFilterDepData] = useState([]);

  const [userId, setUserId] = useState("");
  const [jobtitle, setJobTitle] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [title, setTitle] = useState("");
  const [faction, setFact] = useState("");
  const [dep, setDep] = useState("");

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFactData = async () => {
    try {
      const url = `${apiUrl}/factions`;
      const response = await axios.get(url, { ...config });

      if (response.status === 200 || response.status === 201) {
        setFactData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch faction data:", error);
    }
  };

  const fetchDepData = async () => {
    try {
      const url = `${apiUrl}/departments`;
      const response = await axios.get(url, { ...config });

      if (response.status === 200 || response.status === 201) {
        setDepData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch department data:", error);
    }
  };

  useEffect(() => {
    fetchDepData();
    fetchFactData();
  }, []);

  const handleAddUser = async (event) => {
    event.preventDefault();

    if (loading) return;

    setResponse("");
    setLoading(true);

    if (!userId || userId.length < 6 || userId.length > 10) {
      setResponse({
        success: false,
        message: "รหัสพนักงานต้องมีความยาวระหว่าง 6-10 ตัวอักษร",
      });
      setLoading(false);
      return;
    }

    if (!faction) {
      setResponse({
        success: false,
        message: "กรุณาเลือกสังกัด",
      });
      setLoading(false);
      return;
    }

    if (!dep) {
      setResponse({
        success: false,
        message: "กรุณาเลือกแผนก",
      });
      setLoading(false);
      return;
    }

    if (!title) {
      setResponse({
        success: false,
        message: "กรุณาเลือกคำนำหน้า",
      });
      setLoading(false);
      return;
    }

    if (!name) {
      setResponse({
        success: false,
        message: "กรุณากรอกชื่อ",
      });
      setLoading(false);
      return;
    }

    if (!lastname) {
      setResponse({
        success: false,
        message: "กรุณากรอกนามสกุล",
      });
      setLoading(false);
      return;
    }

    try {
      const depItem = depData.find((item) => item.DepName === dep);

      const result = await axios.post(
        `${apiUrl}/users`,
        {
          userid: userId,
          jobtitle,
          name,
          lastname,
          title,
          affiliation: depItem?.AffName || "-",
          faction,
          dep,
        },
        { ...config }
      );

      if (result.status === 200 || result.status === 201) {
        setResponse({
          success: true,
          message: "เพิ่มผู้ใช้งานเรียบร้อยแล้ว",
        });

    
      }
    } catch (error) {
      console.error(error);

      setResponse({
        success: false,
        message:
          error?.response?.data?.message ||
          "ไม่สามารถเพิ่มผู้ใช้งานได้ กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFactionChange = (event) => {
    const selectedFactionName = event.target.value;

    setFact(selectedFactionName);
    setDep("");
    setFilterDepData([]);

    if (selectedFactionName === "-") {
      return;
    }

    const selectedFaction = factData.find(
      (item) => item.name === selectedFactionName
    );

    if (selectedFaction) {
      const affId = selectedFaction.relateid;

      const filteredDepartments = depData.filter(
        (item) => item.AffID === affId
      );

      setFilterDepData(filteredDepartments);
    }
  };

  return (
  <AddUserPage>
    <AddUserBox>

      {/* Header */}
      <Header>
        <div>
          <Title>เพิ่มผู้ใช้งาน</Title>
          
          <Subtitle>สร้างบัญชีผู้ใช้งานใหม่สำหรับระบบ</Subtitle>
        </div>

        <HeaderIcon>
          <UserRound size={22} />
        </HeaderIcon>
      </Header>

      <Divider />

      <form onSubmit={handleAddUser}>

        {/* Row 1 */}
        <FormRow>
          <Field>
            <Label>
              รหัสพนักงาน <Required>*</Required>
            </Label>

            <InputBox>
              <Badge size={17} />
              <Input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="รหัสพนักงาน"
                minLength={6}
                maxLength={10}
                disabled={loading}
              />
            </InputBox>
          </Field>

          <Field>
            <Label>ตำแหน่ง</Label>

            <InputBox>
              <BriefcaseBusiness size={17} />
              <Input
                value={jobtitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="เช่น พยาบาลวิชาชีพ"
                maxLength={100}
                disabled={loading}
              />
            </InputBox>
          </Field>
        </FormRow>


        {/* Row 2 */}

{/* Row 2 */}
<FormRow>
  <Field>
    <Label>
      สังกัด (ฝ่าย) <Required>*</Required>
    </Label>

    <Autocomplete
      fullWidth
      disableClearable
      options={[
        { name: "-" },
        ...factData,
      ]}
      getOptionLabel={(option) =>
        option.name === "-" ? "ไม่ระบุ" : option.name
      }
      value={
        faction
          ? [{ name: "-" }, ...factData].find(
              (item) => item.name === faction
            ) || null
          : null
      }
      onChange={(event, value) => {
        handleFactionChange({
          target: {
            value: value?.name || "",
          },
        });
      }}
      disabled={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="ค้นหาสังกัด..."
        />
      )}
      sx={autoCompleteStyle}
      slotProps={{
        paper: {
          sx: dropdownStyle,
        },
      }}
    />
  </Field>

  <Field>
    <Label>
      แผนก <Required>*</Required>
    </Label>

    <Autocomplete
      fullWidth
      disableClearable
      options={[
        { DepName: "-", FacName: "" },
        ...filterDepData,
      ]}
      getOptionLabel={(option) =>
        option.DepName === "-"
          ? "ไม่ระบุ"
          : `${option.DepName}${
              option.FacName ? ` (${option.FacName})` : ""
            }`
      }
      value={
        dep
          ? [
              { DepName: "-", FacName: "" },
              ...filterDepData,
            ].find((item) => item.DepName === dep) || null
          : null
      }
      onChange={(event, value) => {
        setDep(value?.DepName || "");
      }}
      disabled={loading || !faction}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={
            faction ? "ค้นหาแผนก..." : "เลือกสังกัดก่อน"
          }
        />
      )}
      sx={autoCompleteStyle}
      slotProps={{
        paper: {
          sx: dropdownStyle,
        },
      }}
    />
  </Field>
</FormRow>


        {/* Row 3 */}
        <FormRow>
          <Field small>
            <Label>
              คำนำหน้า <Required>*</Required>
            </Label>

            <SelectBox>
              <UsersRound size={17} />

              <Select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              >
                <option value="">เลือกคำนำหน้า</option>
                <option value="นาย">นาย</option>
                <option value="นางสาว">นางสาว</option>
                <option value="นาง">นาง</option>
                <option value="นพ.">นพ.</option>
                <option value="พญ.">พญ.</option>
              </Select>

              <ChevronDown size={16} />
            </SelectBox>
          </Field>


          <Field>
            <Label>
              ชื่อ <Required>*</Required>
            </Label>

            <InputBox>
              <UserRound size={17} />

              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ชื่อ"
                maxLength={30}
                disabled={loading}
              />
            </InputBox>
          </Field>


          <Field>
            <Label>
              นามสกุล <Required>*</Required>
            </Label>

            <InputBox>
              <UserRound size={17} />

              <Input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="นามสกุล"
                maxLength={30}
                disabled={loading}
              />
            </InputBox>
          </Field>
        </FormRow>


        {response && (
          <PremiumAlert severity={response.success ? "success" : "error"}>
            {response.message}
          </PremiumAlert>
        )}


        {/* Footer */}
        <Footer>
          <SecureText>
            <ShieldCheck size={16} />
            ข้อมูลผู้ใช้งานจะถูกจัดเก็บอย่างปลอดภัย
          </SecureText>

          <Actions>
            <CancelButton
              type="button"
              onClick={() => navigate("/usermanager")}
              disabled={loading}
            >
              ยกเลิก
            </CancelButton>

            <SaveButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner />
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <Save size={17} />
                  บันทึกผู้ใช้งาน
                </>
              )}
            </SaveButton>
          </Actions>
        </Footer>

      </form>
    </AddUserBox>
  </AddUserPage>

  );
};


/* =========================================================
   STYLES
========================================================= */

const AddUserPage = styled(Box)`
  width: 100%;
  min-height: 100%;

  padding: 22px;

  box-sizing: border-box;

  background:
    radial-gradient(
      circle at 90% 0%,
      rgba(22, 135, 122, 0.07),
      transparent 30%
    ),
    #f6f8f7;

  font-family: "Mali", sans-serif;

  @media (max-width: 700px) {
    padding: 12px;
  }
`;


const AddUserBox = styled.div`
  width: min(600px, 100%);

  margin: 0 auto;

  padding: 25px 30px;

  box-sizing: border-box;

  background: #ffffff;

  border: 1px solid #e3ebe8;

  border-radius: 18px;

  box-shadow:
    0 12px 35px rgba(23, 69, 63, 0.06);

  @media (max-width: 700px) {
    padding: 20px 16px;
  }
`;


/* HEADER */

const Header = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;
`;

const Eyebrow = styled.div`
  font-size: 9px;

  font-weight: 700;

  letter-spacing: 1.7px;

  color: #16877a;

  margin-bottom: 2px;
`;

const Title = styled.h1`
  margin: 0;

  font-size: 22px;

  font-weight: 700;

  color: #273a37;
`;

const Subtitle = styled.div`
  margin-top: 2px;

  font-size: 10px;

  color: #9aa9a5;
`;

const HeaderIcon = styled.div`
  width: 44px;
  height: 44px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 12px;

  color: #16877a;

  background: #edf8f5;

  border: 1px solid #d9eee9;
`;


const Divider = styled.div`
  height: 1px;

  margin: 18px 0 20px;

  background: #edf1ef;
`;


/* FORM */
const FormRow = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 14px;

  margin-bottom: 14px;

  &:last-of-type {
    grid-template-columns: 0.7fr 1fr 1fr;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr !important;

    gap: 12px;

    margin-bottom: 12px;
  }
`;

const Field = styled.div`
  min-width: 0;
`;

const Label = styled.label`
  display: flex;

  align-items: center;

  gap: 3px;

  margin-bottom: 6px;

  font-size: 17px;

  font-weight: 700;

  color: #52615d;
`;

const Required = styled.span`
  color: #d4875d;
`;


/* INPUT */

const InputBox = styled.div`
  height: 44px;

  display: flex;

  align-items: center;

  gap: 9px;

  padding: 0 13px;

  box-sizing: border-box;

  border: 1px solid #e1e9e6;

  border-radius: 10px;

  background: #fafcfb;

  color: #76a49d;

  transition: 0.2s;

  &:focus-within {
    background: #ffffff;

    border-color: #57a99e;

    box-shadow:
      0 0 0 3px rgba(22, 135, 122, 0.08);
  }

  svg {
    flex-shrink: 0;
  }
`;

const Input = styled.input`
  width: 100%;

  height: 100%;

  padding: 0;

  border: none;

  outline: none;

  background: transparent;

  font-family: "Mali", sans-serif;

  font-size: 15px;

  color: #354540;

  &::placeholder {
    color: #b5bfbc;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;


/* SELECT */

const SelectBox = styled.div`
  height: 44px;

  display: flex;
  align-items: center;
  gap: 9px;

  padding: 0 12px;

  box-sizing: border-box;

  border: 1px solid #e1e9e6;
  border-radius: 10px;

  background: #fafcfb;

  color: #76a49d;

  transition: all 0.2s ease;

  &:focus-within {
    background: #ffffff;

    border-color: #57a99e;

    box-shadow:
      0 0 0 3px rgba(22, 135, 122, 0.08);
  }

  svg {
    flex-shrink: 0;
  }

  svg:last-child {
    color: #9caeaa;
  }
`;
const Select = styled.select`
  width: 100%;
  height: 100%;
  min-width: 0;

  padding: 0;

  border: none;
  outline: none;

  appearance: none;

  background: transparent;

  font-family: "Mali", sans-serif;

  font-size: 15px;

  font-weight: 500;

  color: #354540;

  cursor: pointer;

  option {
    font-family: "Mali", sans-serif;
    font-size: 15px;
    color: #354540;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;


/* FOOTER */

const Footer = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  padding-top: 18px;

  margin-top: 3px;

  border-top: 1px solid #edf1ef;

  @media (max-width: 700px) {
    flex-direction: column;

    align-items: stretch;
  }
`;

const SecureText = styled.div`
  display: flex;

  align-items: center;

  gap: 6px;

  font-size: 9px;

  color: #9aa9a5;

  svg {
    color: #4b9b8f;
  }
`;

const Actions = styled.div`
  display: flex;

  gap: 8px;
`;

const CancelButton = styled.button`
  height: 40px;

  padding: 0 18px;

  border: 1px solid #e0e6e3;

  border-radius: 9px;

  background: white;

  color: #7b8783;

  font-family: "Mali", sans-serif;

  font-size: 11px;

  cursor: pointer;

  &:hover {
    background: #f7f9f8;
  }
`;

const SaveButton = styled.button`
  height: 40px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  padding: 0 20px;

  border: none;

  border-radius: 9px;

  background:
    linear-gradient(
      135deg,
      #189383,
      #13766c
    );

  color: white;

  font-family: "Mali", sans-serif;

  font-size: 11px;

  font-weight: 700;

  box-shadow:
    0 5px 14px rgba(22, 135, 122, 0.20);

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    transform: translateY(-1px);

    box-shadow:
      0 7px 18px rgba(22, 135, 122, 0.26);
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;

    transform: none;
  }
`;

const Spinner = styled.span`
  width: 13px;

  height: 13px;

  border: 2px solid rgba(255,255,255,0.35);

  border-top-color: white;

  border-radius: 50%;

  animation: spin 0.7s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;


/* ALERT */

const PremiumAlert = styled(Alert)`
  margin: 8px 0 15px !important;

  padding: 5px 12px !important;

  border-radius: 9px !important;

  font-family: "Mali", sans-serif !important;

  font-size: 11px !important;
`;
const autoCompleteStyle = {
  width: "100%",

  "& .MuiOutlinedInput-root": {
    height: "44px",
    padding: "0 10px 0 13px !important",
    borderRadius: "10px",
    background: "#fafcfb",
    fontFamily: "Mali, sans-serif",
    fontSize: "15px",

    transition: "all 0.2s ease",

    "& fieldset": {
      borderColor: "#e1e9e6",
    },

    "&:hover fieldset": {
      borderColor: "#b9d8d2",
    },

    "&.Mui-focused": {
      background: "#ffffff",

      "& fieldset": {
        borderColor: "#57a99e",
        borderWidth: "1px",
      },

      boxShadow: "0 0 0 3px rgba(22, 135, 122, 0.08)",
    },
  },

  "& .MuiInputBase-input": {
    fontFamily: "Mali, sans-serif !important",
    fontSize: "15px !important",
    color: "#354540",
    padding: "0 !important",
  },

  "& .MuiInputBase-input::placeholder": {
    color: "#aebbb7",
    opacity: 1,
  },

  "& .MuiAutocomplete-endAdornment": {
    right: "8px",
  },

  "& .MuiAutocomplete-popupIndicator": {
    color: "#8da39e",
  },

  "& .MuiAutocomplete-popupIndicator:hover": {
    background: "#edf7f4",
  },
};

const dropdownStyle = {
  borderRadius: "10px",
  marginTop: "5px",
  border: "1px solid #e1e9e6",
  boxShadow: "0 10px 25px rgba(23, 69, 63, 0.10)",

  "& .MuiAutocomplete-option": {
    minHeight: "40px",
    padding: "8px 13px",
    fontFamily: "Mali, sans-serif",
    fontSize: "14px",
    color: "#354540",
  },

  "& .MuiAutocomplete-option[aria-selected='true']": {
    background: "#edf8f5",
    color: "#16877a",
    fontWeight: 600,
  },

  "& .MuiAutocomplete-option:hover": {
    background: "#f3f9f7",
  },
};
export default AddUser;