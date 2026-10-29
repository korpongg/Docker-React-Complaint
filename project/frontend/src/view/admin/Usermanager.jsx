import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import KeyIcon from "@mui/icons-material/KeyRounded";
import SaveIcon from "@mui/icons-material/Save";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const csvOptions = {
  utf8WithBom: true,
};

/* =========================================================
   Toolbar
========================================================= */

function EditToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        padding: "10px 4px",
        justifyContent: "flex-end",
      }}
    >
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />

      <GridToolbarExportContainer>
        <GridCsvExportMenuItem options={csvOptions} />
      </GridToolbarExportContainer>
    </GridToolbarContainer>
  );
}

/* =========================================================
   Global Style
========================================================= */

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  .UserDataTable button {
    width: auto;
  }

  /* =========================
     Permission Table
  ========================= */

  .PermissionTable {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .PermissionTable td {
    padding: 12px 10px;
    border-top: 1px solid #f1f5f9;
    vertical-align: middle;
  }

  /* =========================
     Permission Badge
  ========================= */

  .PermissionBadge {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: 32px;
    height: 28px;

    padding: 0 10px;

    border-radius: 20px;

    font-weight: 700;
    font-size: 13px;
  }

  .PermissionBadge.role-user {
    background: #eff6ff;
    color: #2563eb;
  }

  .PermissionBadge.role-ha {
    background: #f0fdf4;
    color: #16a34a;
  }

  .PermissionBadge.role-admin {
    background: #fef2f2;
    color: #dc2626;
  }

  .PermissionBadge.level-1 {
    background: #fef2f2;
    color: #dc2626;
  }

  .PermissionBadge.level-2 {
    background: #f0fdf4;
    color: #16a34a;
  }

  .PermissionBadge.level-3 {
    background: #eff6ff;
    color: #2563eb;
  }

  /* =========================
     Permission Dot
  ========================= */

  .PermissionDot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 7px;
    flex-shrink: 0;
  }

  .PermissionDot.red {
    background: #dc2626;
  }

  .PermissionDot.green {
    background: #16a34a;
  }

  .PermissionDot.blue {
    background: #2563eb;
  }

  /* =========================
     Edit Modal
  ========================= */

  .EditUserLabel {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 6px;
    font-weight: 600;
  }

`;

/* =========================================================
   Component
========================================================= */

export default function UserManager() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const navigate = useNavigate();

  const storedAuth = JSON.parse(localStorage.getItem("auth"));

  const config = {
    headers: {
      Authorization: `Bearer ${storedAuth.accessToken}`,
    },
  };

  /* =========================================================
     State
  ========================================================= */

  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(true);

  /* Permission Dialog */

  const [showRoleInfo, setShowRoleInfo] = useState(false);

  /* Edit User Dialog */

  const [editDialog, setEditDialog] = useState(false);

  const [editUser, setEditUser] = useState({
    id: null,
    userid: "",
    name: "",
    lastname: "",
    role: "1",
    level: "1",
  });

  /* Reset Password */

  const [userId, setUserId] = useState(null);

  const [dialogReset, setDialogReset] = useState(false);

  /* Snackbar */

  const [error, setError] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  /* =========================================================
     Permission Dialog
  ========================================================= */

  const toggleRoleInfo = () => {
    setShowRoleInfo((prev) => !prev);
  };

  /* =========================================================
     Role Information
  ========================================================= */

  const getRoleInfo = (role) => {
    switch (String(role)) {
      case "1":
        return {
          label: "User",
          color: "#2563eb",
          background: "#eff6ff",
        };

      case "2":
        return {
          label: "QDC",
          color: "#16a34a",
          background: "#f0fdf4",
        };

      case "3":
        return {
          label: "Admin",
          color: "#dc2626",
          background: "#fef2f2",
        };

      default:
        return {
          label: "ไม่ระบุ",
          color: "#64748b",
          background: "#f8fafc",
        };
    }
  };

  /* =========================================================
     Level Information
  ========================================================= */

  const getLevelInfo = (level) => {
    switch (String(level)) {
      case "1":
        return {
          label: "แผนก",
          fullLabel: "Level 1 — แผนก",
          description: "เห็นเฉพาะงานในแผนกของตัวเอง",
          color: "#dc2626",
          background: "#fef2f2",
        };

      case "2":
        return {
          label: "Affiliation",
          fullLabel: "Level 2 — Affiliation",
          description: "เห็นเฉพาะงานใน Affiliation ของตัวเอง",
          color: "#16a34a",
          background: "#f0fdf4",
        };

      case "3":
        return {
          label: "ทั้งหมด",
          fullLabel: "Level 3 — ทั้งหมด",
          description: "เห็นข้อมูลทั้งหมด",
          color: "#2563eb",
          background: "#eff6ff",
        };

      default:
        return {
          label: "ไม่ระบุ",
          fullLabel: "ไม่ระบุ",
          description: "",
          color: "#64748b",
          background: "#f8fafc",
        };
    }
  };

  /* =========================================================
     Fetch Users
  ========================================================= */

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${apiUrl}/users`, {
          ...config,
        });

        setRows(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error(
            "Unauthorized: Please check your authentication token.",
          );

          navigate("/logout", {
            replace: true,
          });
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [apiUrl]);

  /* =========================================================
     Edit User
  ========================================================= */

  const handleEditClick = (row) => {
    setEditUser({
      id: row.id,
      userid: row.userid || "",
      name: row.name || "",
      lastname: row.lastname || "",
        dep: row.dep || "",
  jobtitle: row.jobtitle || "",
      role: String(row.role || "1"),
      level: String(row.level || "1"),
    });

    setEditDialog(true);
  };

  const handleCloseEdit = () => {
    setEditDialog(false);
  };

  /* =========================================================
     Save User
  ========================================================= */

  const handleSaveUser = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/users`,
        editUser,
        {
          ...config,
        },
      );

      if (response.status === 200 || response.status === 201) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === editUser.id
              ? {
                  ...row,
                  userid: editUser.userid,
                  name: editUser.name,
                  lastname: editUser.lastname,
                   dep: editUser.dep,
          jobtitle: editUser.jobtitle,
                  role: editUser.role,
                  level: editUser.level,
                }
              : row,
          ),
        );

        setEditDialog(false);

        setError(false);

        setSuccessMessage(
          "บันทึกข้อมูลผู้ใช้งานเรียบร้อยแล้ว",
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);

      setError(true);

      setSuccessMessage(
        "ไม่สามารถบันทึกข้อมูลผู้ใช้งานได้",
      );
    }
  };

  /* =========================================================
     Reset Password
  ========================================================= */

  const handleResetClick = (id) => {
    setUserId(id);

    setDialogReset(true);
  };

  const handleCancelReset = () => {
    setUserId(null);

    setDialogReset(false);
  };

  const handleConfirmReset = async () => {
    const resetData = {
      userid: userId,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/users/resetpassword`,
        resetData,
        {
          ...config,
        },
      );

      const responseStatus = response?.status;

      if (
        responseStatus === 200 ||
        responseStatus === 201
      ) {
        setError(false);

        setSuccessMessage(
          "รีเซ็ทรหัสผ่านเรียบร้อยแล้ว!",
        );
      } else {
        setError(true);

        setSuccessMessage(
          "ไม่สามารถรีเซ็ทรหัสผ่านได้, กรุณาลองอีกครั้ง.",
        );
      }
    } catch (error) {
      setError(true);

      setSuccessMessage(
        "ไม่สามารถรีเซ็ทรหัสผ่านได้",
      );

      console.error(
        "ไม่สามารถรีเซ็ทรหัสผ่านได้",
        error.message,
      );
    }

    setDialogReset(false);
  };
  const handleDeleteClick = (id, data) => async () => {
    const confirmDelete = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้รายนี้?"
    );

    if (confirmDelete) {
          const userData = {
        userid: id,
      };
      
      try {
           setRows(rows.filter((row) => row.userid !== id));
       await axios.delete(`${apiUrl}/users`, { ...config, data: userData });
     
   
      } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
      }
    }
  };
  /* =========================================================
     Snackbar
  ========================================================= */

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessage("");

    setError(false);
  };

  /* =========================================================
     Columns
  ========================================================= */

  const columns = [
    {
      field: "userid",
      headerName: "รหัสผู้ใช้งาน",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "name",
      headerName: "ชื่อ",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "lastname",
      headerName: "นามสกุล",
      minWidth: 150,
      flex: 1,
    },
  {
    field: "dep",
    headerName: "แผนก",
    minWidth: 150,
    flex: 1,
  },

  {
    field: "jobtitle",
    headerName: "ตำแหน่ง",
    minWidth: 150,
    flex: 1,
  },

    {
      field: "role",
      headerName: "สิทธิ์",
      minWidth: 130,
      flex: 0.7,

      renderCell: (params) => {
        const role = getRoleInfo(params.value);

        return (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "75px",
              px: 1.3,
              py: 0.6,
              borderRadius: "20px",
              backgroundColor: role.background,
              color: role.color,
              fontWeight: 700,
              fontSize: "13px",
            }}
          >
            {role.label}
          </Box>
        );
      },
    },

    {
      field: "level",
      headerName: "ระดับการเข้าถึง",
      minWidth: 190,
      flex: 1,

      renderCell: (params) => {
        const level = getLevelInfo(params.value);

        return (
          <Tooltip title={level.description}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                px: 1.3,
                py: 0.6,
                borderRadius: "20px",
                backgroundColor: level.background,
                color: level.color,
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: level.color,
                }}
              />

              {level.label}
            </Box>
          </Tooltip>
        );
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 130,
      flex: 0.6,

      getActions: ({ row }) => {
        return [
          <Tooltip title="แก้ไขข้อมูล">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={() => handleEditClick(row)}
            />
          </Tooltip>,

          <Tooltip title="รีเซ็ทรหัสผ่าน">
            <GridActionsCellItem
              icon={<KeyIcon />}
              label="Reset Password"
              onClick={() =>
                handleResetClick(row.userid)
              }
            />
          </Tooltip>,
           <GridActionsCellItem
             icon={<DeleteIcon />}
             label="Delete"
             // onClick={handleDeleteClick(id)}
             onClick={handleDeleteClick(row.userid,row)}
             color="error"
           />,
        ];
      },
    },
  ];

  /* =========================================================
     Render
  ========================================================= */

  return (
    <>
      <GlobalStyle />

      <UserBox
        className="ResponsiveCon"
        sx={{
          marginTop: "30px",
        }}
      >
        {loading && (
          <Typography
            sx={{
              padding: 3,
              color: "text.secondary",
            }}
          >
            Loading...
          </Typography>
        )}

        {!loading && (
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: "16px",
            }}
          >
            {/* =================================================
                Header
            ================================================= */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 2,
                px: 1,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "21px",
                      sm: "24px",
                    },
                    fontWeight: 700,
                    color: "#1e293b",
                    letterSpacing: "-0.3px",
                  }}
                >
                  User Management
                </Typography>

                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#64748b",
                    mt: 0.5,
                  }}
                >
                  จัดการข้อมูลผู้ใช้งานและสิทธิ์การเข้าถึงระบบ
                </Typography>
              </Box>

              {/* Permission Button */}

              <Button
                variant="contained"
                startIcon={<InfoIcon />}
                onClick={toggleRoleInfo}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  whiteSpace: "nowrap",

                  background:
                    "linear-gradient(135deg, #334155, #475569)",

                  boxShadow:
                    "0 4px 12px rgba(51,65,85,0.20)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1e293b, #334155)",
                  },
                }}
              >
                สิทธิ์การเข้าถึง
              </Button>
            </Box>

            {/* =================================================
                DataGrid
            ================================================= */}

            <Box
              sx={{
                width: "100%",
              }}
            >
              <DataGrid
                autoHeight
                className="UserDataTable"
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterSelectedRowCount
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10, 25, 50]}
                sx={{
                  border: "none",
                  fontFamily: "inherit",

                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f8fafc",
                    borderBottom:
                      "1px solid #e2e8f0",
                    color: "#475569",
                  },

                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: 700,
                    fontSize: "14px",
                  },

                  "& .MuiDataGrid-cell": {
                    borderBottom:
                      "1px solid #f1f5f9",
                    fontSize: "15px",
                  },

                  "& .MuiDataGrid-row": {
                    transition:
                      "background-color 0.15s ease",
                  },

                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f8fafc",
                  },

                  "& .MuiDataGrid-footerContainer": {
                    borderTop:
                      "1px solid #e2e8f0",
                  },

                  "& .MuiDataGrid-toolbarContainer": {
                    padding: "10px 4px",
                  },
                }}
                slots={{
                  toolbar: EditToolbar,
                }}
              />
            </Box>
          </Box>
        )}

        {/* =====================================================
            EDIT USER DIALOG
        ===================================================== */}

        <Dialog
          open={editDialog}
          onClose={handleCloseEdit}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontWeight: 700,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <EditIcon color="primary" />

              แก้ไขข้อมูลผู้ใช้งาน
            </Box>

            <Button
              onClick={handleCloseEdit}
              sx={{
                minWidth: "auto",
                color: "text.secondary",
              }}
            >
              <CloseIcon />
            </Button>
          </DialogTitle>

          <Divider />
<DialogContent>
  <Grid container spacing={2}>

    {/* User ID */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="รหัสผู้ใช้งาน"
        value={editUser.userid}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            userid: e.target.value,
          })
        }
        margin="normal"
      />
    </Grid>

    {/* Name */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="ชื่อ"
        value={editUser.name}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            name: e.target.value,
          })
        }
        margin="normal"
      />
    </Grid>

    {/* Last Name */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="นามสกุล"
        value={editUser.lastname}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            lastname: e.target.value,
          })
        }
        margin="normal"
      />
    </Grid>

    {/* Department */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="แผนก"
        value={editUser.dep}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            dep: e.target.value,
          })
        }
        margin="normal"
      />
    </Grid>

    {/* Job Title */}
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="ตำแหน่ง"
        value={editUser.jobtitle}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            jobtitle: e.target.value,
          })
        }
        margin="normal"
      />
    </Grid>

    {/* Role */}
    <Grid item xs={12} sm={6}>
      <TextField
        select
        fullWidth
        label="สิทธิ์ผู้ใช้งาน"
        value={editUser.role}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            role: e.target.value,
          })
        }
        margin="normal"
      >
        <MenuItem value="1">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span className="PermissionDot blue" />
            <b>User</b>
          </Box>
        </MenuItem>

        <MenuItem value="2">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span className="PermissionDot green" />
            <b>QDC</b>
          </Box>
        </MenuItem>

        <MenuItem value="3">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span className="PermissionDot red" />
            <b>Admin</b>
          </Box>
        </MenuItem>
      </TextField>
    </Grid>

    {/* Level */}
    <Grid item xs={12} sm={6}>
      <TextField
        select
        fullWidth
        label="ระดับการเข้าถึง"
        value={editUser.level}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            level: e.target.value,
          })
        }
        margin="normal"
      >
        <MenuItem value="1">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span className="PermissionDot red" />

            <Box>
              <b>Level 1 — แผนก</b>

              <Typography
                sx={{
                  fontSize: "11px",
                  color: "#64748b",
                }}
              >
                เห็นเฉพาะงานในแผนกของตัวเอง
              </Typography>
            </Box>
          </Box>
        </MenuItem>

        <MenuItem value="2">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span className="PermissionDot green" />

            <Box>
              <b>Level 2 — Affiliation</b>

              <Typography
                sx={{
                  fontSize: "11px",
                  color: "#64748b",
                }}
              >
                เห็นเฉพาะงานใน Affiliation
              </Typography>
            </Box>
          </Box>
        </MenuItem>

        <MenuItem value="3">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span className="PermissionDot blue" />

            <Box>
              <b>Level 3 — ทั้งหมด</b>

              <Typography
                sx={{
                  fontSize: "11px",
                  color: "#64748b",
                }}
              >
                เห็นข้อมูลทั้งหมด
              </Typography>
            </Box>
          </Box>
        </MenuItem>
      </TextField>
    </Grid>

  </Grid>
</DialogContent>

          <DialogActions
            sx={{
              padding: "16px 24px",
            }}
          >
            <Button
              onClick={handleCloseEdit}
              color="inherit"
            >
              ยกเลิก
            </Button>

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveUser}
            >
              บันทึก
            </Button>
          </DialogActions>
        </Dialog>

        {/* =====================================================
            PERMISSION DIALOG
        ===================================================== */}

        <Dialog
          open={showRoleInfo}
          onClose={toggleRoleInfo}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <InfoIcon />

              การกำหนดสิทธิ์ผู้ใช้งาน
            </Box>

            <Button
              onClick={toggleRoleInfo}
              sx={{
                minWidth: "auto",
                color: "text.secondary",
              }}
            >
              <CloseIcon />
            </Button>
          </DialogTitle>

          <DialogContent dividers>
            {/* ROLE */}

            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                  mb: 1,
                }}
              >
                ROLE — ประเภทผู้ใช้งาน
              </Typography>

              <table className="PermissionTable">
                <tbody>
                  <tr>
                    <td width="80">
                      <span className="PermissionBadge role-user">
                        1
                      </span>
                    </td>

                    <td>
                      <b>User</b>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className="PermissionBadge role-ha">
                        2
                      </span>
                    </td>

                    <td>
                      <b>QDC</b>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className="PermissionBadge role-admin">
                        3
                      </span>
                    </td>

                    <td>
                      <b>Admin</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>

            {/* LEVEL */}

            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                  mb: 1,
                }}
              >
                ACCESS LEVEL — ขอบเขตการเข้าถึงข้อมูล
              </Typography>

              <table className="PermissionTable">
                <tbody>
                  <tr>
                    <td width="80">
                      <span className="PermissionBadge level-1">
                        1
                      </span>
                    </td>

                    <td>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span className="PermissionDot red" />

                        <b>ระดับแผนก</b>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "text.secondary",
                          mt: 0.3,
                        }}
                      >
                        เห็นเฉพาะงานในแผนกของตัวเอง
                      </Typography>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className="PermissionBadge level-2">
                        2
                      </span>
                    </td>

                    <td>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span className="PermissionDot green" />

                        <b>ระดับ Affiliation</b>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "text.secondary",
                          mt: 0.3,
                        }}
                      >
                        เห็นเฉพาะงานใน Affiliation ของตัวเอง
                      </Typography>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className="PermissionBadge level-3">
                        3
                      </span>
                    </td>

                    <td>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span className="PermissionDot blue" />

                        <b>ทั้งหมด</b>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "text.secondary",
                          mt: 0.3,
                        }}
                      >
                        เห็นข้อมูลทั้งหมด
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>

          
          </DialogContent>

          <DialogActions>
            <Button
              onClick={toggleRoleInfo}
              variant="contained"
            >
              ปิด
            </Button>
          </DialogActions>
        </Dialog>

        {/* =====================================================
            RESET PASSWORD
        ===================================================== */}

        <PassWordModal
          open={dialogReset}
          onClose={handleCancelReset}
        >
          <DialogTitle>
            ยืนยันการรีเซ็ทรหัสผ่าน
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ทรหัสผ่านยูสนี้?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleCancelReset}
              color="warning"
              variant="contained"
            >
              ยกเลิก
            </Button>

            <Button
              onClick={handleConfirmReset}
              color="primary"
              variant="contained"
            >
              ยืนยัน
            </Button>
          </DialogActions>
        </PassWordModal>

        {/* =====================================================
            SNACKBAR
        ===================================================== */}

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={successMessage !== ""}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={error ? "error" : "success"}
            onClose={handleCloseSnackbar}
          >
            {successMessage}
          </MuiAlert>
        </Snackbar>
      </UserBox>
    </>
  );
}

/* =========================================================
   User Box
========================================================= */

const UserBox = styled(Box)`
  display: block;

  width: 100%;
  max-width: none;

  box-sizing: border-box;

  background-color: #fff;
  border-radius: 14px;

  padding: 20px;

  margin: 0 auto;

  @media screen and (max-width: 680px) {
    padding: 10px;

    border-radius: 10px;
  }
`;

/* =========================================================
   Password Modal
========================================================= */

const PassWordModal = styled(Dialog)`
  .MuiTypography-root,
  .MuiButtonBase-root {
    font-family: "Mali", sans-serif !important;
  }
`;