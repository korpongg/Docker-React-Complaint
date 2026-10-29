import React, { useState, useEffect } from "react";
import { useWebSocket } from "../../../context/WebSocketContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { TriangleAlert } from "lucide-react";
import { chkAdmins, chkAdmin } from "../../Function";

import GlobalFilter from "../../GlobalFilter";
import { GloballFilterStyle } from "../../../styles/GloballFilter.style";
import DataTable from "./DataTable";

import { exportComplaintExcel } from "../../../utils/exportExcel";
import {
  BadgeAlert,
} from "lucide-react";
import { DashboardBox } from "../../../styles/Dashboard.style";

import { createGlobalStyle } from "styled-components";
import { Container, Stack, Paper, Typography, Box, Chip ,Button} from "@mui/material";
import { red } from "@mui/material/colors";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
export const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Mali", sans-serif !important;
  }
    
`;

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Dashboard = () => {
  const {
    connectWebSocket,
    requestData,
    isConnected,
    disconnectWebSocket,
    dataCenter2,
    dataEvent,
    load,
  } = useWebSocket();
  const navigate = useNavigate();
  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const userData = storedAuth
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  const supData = JSON.parse(localStorage.getItem("supervisorData")) || null;
  const isAdmin = chkAdmins(userData?.role);

  const isEXEC = chkAdmin(userData?.level);

  const config = {
    headers: { Authorization: `Bearer ${storedAuth.accessToken}` },
  };
  const [dashboard, setDashboard] = useState([]);

  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState(null);

  const [tranType, setTranTypeData] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  
  const [closeReason, setCloseReason] = useState("");
  const [closeComment, setCloseComment] = useState("");

  const [reportNo, setReportNo] = useState("");
  const [hn, setHn] = useState("");
  const [startDate, setStartDate] = useState("");


  const [patientType, setPatientType] = useState("");
  const [statusfilter, setStatus] = useState("");

  const [severity, setSeverity] = useState("");

  const [endDate, setEndDate] = useState("");
  const [depSelect, setDepSelect] = useState([]);
  const [incidentType, setIncidentType] = useState("0");
  const [formStatus, setFormStatus] = useState("-");
  useEffect(() => {
    connectWebSocket();
  }, []);
  
useEffect(() => {
  if (!userData?.userid) return;

  const payload = {
    createby: userData.userid,
    userDepID: userData?.DepID,
    userAffID: userData?.AffID,
    userLevel: userData?.level,

    excludeStatus: "3",

    reportNo,
    hn,
    startDate,
    endDate,
    patientType,
    severity,
    status: statusfilter,
  };


  requestData("DATA2", payload);

}, [
  userData?.userid,
  userData?.DepID,
  userData?.AffID,
  userData?.level,
  reportNo,
  hn,
  startDate,
  endDate,
  patientType,
  severity,
  statusfilter
]);
  useEffect(() => {
    setLoading(load);
  }, [load]);
  // function format date "YYYY-MM-DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };

  useEffect(() => {
    setDashboard(dataCenter2 || []);
  }, [dataCenter2]);

  const handleAddItem = () => {
    navigate(`/complaints/form`);
  };

  const handleViewClick = (data, role) => {
    navigate(`/complaints/form2`, {
      state: {
        reportid: role.reportid,
      },
    });
  };

  const handleViewClick2 = (data, role) => {
    navigate(`/complaints/form3`, {
      state: {
        reportid: role.reportid,
      },
    });
  };

  const handleViewClick3 = (data, role) => {
    navigate(`/complaints/form4`, {
      state: {
        reportid: role.reportid,
      },
    });
  };

    const handleViewClickSummary = (id, role) => {
    navigate(`/RiskManagement/formview/${id}`, {
      state: {
        reportid: role.reportid,
      },
    });
  };


  const handleTranfClick = (id, data, type) => {
    setRowData(data);
    setTranTypeData(type);
    setDialogOpen(true);
  };

  

  const handleConfirmClose = async () => {
    if (!closeReason) {
      Swal.fire("ผิดพลาด", "กรุณาเลือกสถานะข้อร้องเรียน", "error");
      return;
    }
    if (!closeComment) {
      Swal.fire("ผิดพลาด", "กรุณาใส่ความคิดเห็น", "error");
      return;
    }

    try {
      const payload = {
        id: rowData.id,
        formstatus: closeReason,
        comment: closeComment,
        updateby: userData.userid,
      };
      const response = await axios.put(`${apiUrl}/riskManagement`, payload, {
        ...config,
      });
      if (response.status === 200 || response.status === 201) {
        Swal.fire("สำเร็จ", "แก้ไขสถานะข้อร้องเรียนเรียบร้อยแล้ว", "success");

        
        setCloseComment("");
        setCloseReason("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "ผิดพลาด",
        "เกิดข้อผิดพลาดในการแก้ไขสถานะข้อร้องเรียน",
        "error",
      );
    }
  };

  

  const handleEditClick = (id, role) => {
    navigate(`/complaints/form/${id}`, {
      state: {
        reportid: role.reportid,
      },
    });
  };
  const handleEditClick2 = (id, role) => {
    navigate(`/complaints/form/${id}`, {
      state: {
        reportid: role.reportid,
      },
    });
  };

  const handleEditClick3 = (id, role) => {
    navigate(`/complaints/form3/${id}`, {
      state: {
        reportid: role.reportid,
      },
    });
  };
  const handleEditClick4 = (id, role) => {
    navigate(`/complaints/form4/${id}`, {
      state: {
        reportid: role.reportid,
      },
    });
  };

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "ยืนยันยกเลิกรายการ?",
      text: "คุณจะไม่สามารถย้อนกลับสิ่งนี้ได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ปิด",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${apiUrl}/complaints/${id}`,
          config,
        );
        if (response.status === 200 || response.status === 201) {
          Swal.fire("สำเร็จ!", "ยกเลิกรายการเรียบร้อย.", "success");
        }
      } catch (error) {
        console.error("ไม่สามารถทำการยกเลิกรายการได้:", error);
        Swal.fire(
          "พบข้อผิดพลาด!",
          "ไม่สามารถทำการยกเลิกรายการได้, กรุณาลองอีกครั้ง.",
          "error",
        );
      }
    }
  };

  const handleCloseDialog = () => {
    setRowData(null);
    setTranTypeData(null);
    setDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{
             px: 0,
          py: 1.5,
display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#fafafa",
          borderBottom: "1px solid #eee",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Stack spacing={3}>
          
              <Box
                sx={{
                   position: "relative",   
                width: "100%",
                display: "flex",
               alignItems: "center",
    justifyContent: "center",
                   gap: 2,

                  px: 3,
                  py: 2.5,
   bgcolor: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius:  2,
                  boxShadow: "0 4px 14px rgba(2,132,199,.08)",
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "18px",
                    bgcolor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                   border: "1px solid #FECACA",

                    boxShadow: "0 4px 14px rgba(220,38,38,.08)",

                  }}
                >
                  <BadgeAlert size={34} color="#DC2626" />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#991B1B",
                    }}
                  >
                    ข้อร้องเรียน
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748B",
                      mt: 0.5,
                    }}
                  >
                    Complaint Management
                  </Typography>
                </Box>

                <Chip
                  label={userData?.dep}
                    className="mt-5"
                  sx={{
                    bgcolor: "#fedbdbff",
                    color: "#850707ff",
                    fontWeight: 700,
                    borderRadius: 2,
                     position: "absolute",
    right: 24,
    maxWidth: "40%",   
                  }}
                />
              </Box>{" "}
        
        <GloballFilterStyle>
         
              <div className="filter-container">
                <div className="filter-header">
                  <div className="left">
                    <span className="title">ตัวกรองข้อมูล</span>
                    <span className="sub">ค้นหาเคส / รายการ</span>
                  </div>
                </div>
                <GlobalFilter
                  docNo={reportNo}
                  hn={hn}
                  complaintDate={startDate}
                  patientType={patientType}
                  status={statusfilter}
                  severity={severity}
                  onChangeDocNo={(e) => setReportNo(e.target.value)}
                  onChangeHN={(e) => setHn(e.target.value)}
                  onChangeDate={(e) => setStartDate(e.target.value)}
                  onChangeStatus={(e) => {
  const value = e.target.value;

  setStatus(
    value === "__NULL__"
      ? null
      : value
  );
}}
                  onChangeSeverity={(e) => setSeverity(e.target.value)}
                  onChangePatientType={(e) => setPatientType(e.target.value)}
                />
              </div>
              
            </GloballFilterStyle>
              <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => exportComplaintExcel(dashboard)}
              sx={{
                background: "linear-gradient(135deg,#166534,#22C55E)",
                color: "#fff",
          
                px: 3,
                py: 1.2,
          
                borderRadius: "14px",
          
                fontWeight: 700,
                fontSize: "0.95rem",
          
                boxShadow:
                  "0 8px 20px rgba(22,101,52,0.25)",
          
                transition: "all .25s ease",
          
                "&:hover": {
                  background:
                    "linear-gradient(135deg,#14532D,#16A34A)",
          
                  transform:
                    "translateY(-2px)",
          
                  boxShadow:
                    "0 12px 25px rgba(22,101,52,0.35)",
                },
          
                "&:active": {
                  transform:"scale(.96)"
                }
          
              }}
            >
             <FileDownloadIcon/> Export Excel
            </Button>
          </Box>
            <Paper
              elevation={2}
              sx={{ borderRadius: 2, p: 1.5, borderTop: "5px solid #DC2626" }}
            >
              <DataTable
                data={dashboard}
                isAdmin={isAdmin}
                isEXEC={isEXEC}
                level={userData?.level}
                userData={userData}
                handleAddItem={handleAddItem}
                handleViewClick={handleViewClick}
                handleViewClick2={handleViewClick2}
                handleViewClick3={handleViewClick3}
                handleTranfClick={handleTranfClick}
                handleViewClickSummary={handleViewClickSummary}
                handleEditClick={handleEditClick}
                handleEditClick2={handleEditClick2}
                handleEditClick3={handleEditClick3}
                handleEditClick4={handleEditClick4}
                handleDeleteClick={handleDeleteClick}
                loading={loading}
              />
            </Paper>
          </Stack>

          {/* Dialog ควรอยู่นอก Paper */}
        
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
