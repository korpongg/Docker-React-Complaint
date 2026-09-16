import React, { useState, useEffect } from "react";
import { useWebSocket } from "../../../context/WebSocketContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ShieldCheck } from "lucide-react";
import { chkAdmins, chkAdmin } from "../../Function";
import DataTable from "./DataTable";
import UpdateStatusDialog from "./UpdateStatusDialog";
import GlobalFilter from "../../GlobalFilter";
import { GloballFilterStyle } from "../../../styles/GloballFilter.style";


import { exportComplaintExcel } from "../../../utils/exportExcel";
import { createGlobalStyle } from "styled-components";
import { Container, Stack, Paper, Typography, Box, Chip ,Button} from "@mui/material";
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
    disconnectWebSocket,
    requestData,
    dataCenter,
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
  const [loading, setLoading] = useState(load);
  const [rowData, setRowData] = useState(null);
const [isUpdateStatusDialogOpen, setUpdateStatusDialogOpen] = useState(false);
const [updateStatus, setUpdateStatus] = useState("");
const [updateStatus2, setUpdateStatus2] = useState("");
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

  return () => {
    disconnectWebSocket?.();
  };
}, []);

useEffect(() => {
  requestData("DATA1", {
    reportNo,
    hn,
    startDate,
    endDate,
    patientType,
    severity,
    status: statusfilter,
  });
}, [
  reportNo,
  hn,
  startDate,
  endDate,
  patientType,
  severity,
  statusfilter,
]);

  // function format date "YYYY-MM-DD"


  
useEffect(() => {
  if (!dataCenter) return;

  setDashboard(dataCenter);
  setEventData(dataEvent);
  setLoading(false);
}, [dataCenter, dataEvent]);

  const handleAddItem = () => {
    navigate(`/complaints/form`);
  };

  const handleViewClick = (data, role) => {
    navigate(`/RiskManagement/form`, {
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
    navigate(`/RiskManagement/form/${id}`, {
      state: {
        reportid: role.reportid,
      },
    });
  };
  const handleEditClick2 = (id, role) => {
    navigate(`/complaints/form2/${id}`, {
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

  const handleViewClickSummary = (id, role) => {
    navigate(`/RiskManagement/formview/${id}`, {
      state: {
        reportid: role.reportid,
      },
    });
  };

  const handleDeleteClick = async (id, row) => {
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
const handleUpdateStatusClick = (id, row) => {
 setRowData({
    id,
    ...row
  });


  setUpdateStatus(
    row.status !== null && row.status !== undefined
      ? String(row.status)
      : "1"
  );


  setUpdateStatus2(
    row.status !== null && row.status !== undefined
      ? String(row.status)
      : "1"
  );
  setUpdateStatusDialogOpen(true);
};

const handleConfirmUpdateStatus = async () => {

  if (!updateStatus) {
    Swal.fire(
      "ผิดพลาด",
      "กรุณาเลือกสถานะ",
      "error"
    );
    return;
  }


  try {

    const payload = {
      id: rowData.id,
      status: updateStatus,
      updateby: userData.userid
    };


    const response = await axios.put(
      `${apiUrl}/complaints/status`,
      payload,
      config
    );


    if(response.status === 200){

      Swal.fire(
        "สำเร็จ",
        "เปลี่ยนสถานะเรียบร้อยแล้ว",
        "success"
      );


      setUpdateStatusDialogOpen(false);
      setRowData(null);

    }


  } catch(error){

    console.error(error);

    Swal.fire(
      "ผิดพลาด",
      "ไม่สามารถเปลี่ยนสถานะได้",
      "error"
    );

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
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden",
    bgcolor: "#fafafa",
    borderBottom: "1px solid #eee",
  }}
>
  <Container
    maxWidth={false}
    disableGutters
    sx={{
      width: "100%",
      maxWidth: "100%",
      mt: 4,
    }}
  >
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
                bgcolor: "#F1F5F9",
                border: "1px solid #808387ff",

                borderRadius: 2,
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
                  border: "1px solid #CBD5E1",

                  boxShadow: "0 6px 18px rgba(51,65,85,.08)",
                }}
              >
                <ShieldCheck size={34} color="#475569" strokeWidth={2.2} />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#334155",
                  }}
                >
                  แบบบันทึกของเจ้าหน้าที่บริหารความเสี่ยง (Admin)
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748B",
                    mt: 0.5,
                  }}
                >
                  Risk Management Administration
                </Typography>
              </Box>

              <Chip
                label={userData?.dep}
                className="mt-5"
                sx={{
                  bgcolor: "#E2E8F0",
                  color: "#334155",
                  border: "1px solid #CBD5E1",
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
                   onChangeStatus={(e) => setStatus(e.target.value)}
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
              sx={{ borderRadius: 2, p: 1.5, borderTop: "4px solid #475569" }}
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
                
                handleEditClick={handleEditClick}
                handleEditClick2={handleEditClick2}
                handleEditClick3={handleEditClick3}
                handleEditClick4={handleEditClick4}
                handleDeleteClick={handleDeleteClick}
                handleViewClickSummary={handleViewClickSummary}
                handleUpdateStatusClick={handleUpdateStatusClick}
                loading={loading}
              />
            </Paper>
          </Stack>
         <UpdateStatusDialog
    open={isUpdateStatusDialogOpen}
    value={updateStatus}
    value2={updateStatus2}
    setValue={setUpdateStatus}
    onConfirm={handleConfirmUpdateStatus}
    onClose={() => setUpdateStatusDialogOpen(false)}
/>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
