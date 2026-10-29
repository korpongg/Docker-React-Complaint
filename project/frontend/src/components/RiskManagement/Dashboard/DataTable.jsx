import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button, Box, Tooltip, Link } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbar,
  GridToolbarQuickFilter,
  GridToolbarExport,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { Chip, Stack, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from "dayjs";
import { CircleX } from "lucide-react";
import {
  Add as AddIcon,
  DescriptionRounded as FileIcon,
  SwapHorizRounded as RotateIcon,
  SendRounded as SendIcon,
  FindInPageRounded as ViewIcon,
  Edit as EditIcon,
  RefreshRounded as CloseIcon,
  DeleteForeverRounded as DeleteIcon,
  CalendarMonthRounded,
  ChatBubbleOutlineRounded,
  InfoOutlined,
  SettingsRounded,
  VisibilityRounded,
  EditRounded,
  DeleteForeverRounded,
  HistoryRounded,
  CheckCircleRounded,
  AccessTimeRounded,
  AutorenewRounded,
  BlockRounded,
  PlaceRounded,
  ApartmentRounded,
  DescriptionOutlined,
  ReplyRounded,
} from "@mui/icons-material";
import {
  severityLevels,
  generalRiskOptions,
  clinicalRiskOptions,
  complaintCategoryOptions,
} from "../../../data/form/DataDict_Risk.jsx";
import UpdateIcon from "@mui/icons-material/Update";
import UndoIcon from "@mui/icons-material/Undo";
import ExpandableTextCell from "../../form/ExpandableTextCell";
import TextDetailDialog from "../../form/TextDetailDialog";
const ExpandableCell = React.memo(({ value }) => {
  const [expanded, setExpanded] = useState(false);
  if (!value) return null;

  return (
    <div style={{ wordBreak: "break-all" }}>
      {expanded ? value : value.slice(0, 200)}&nbsp;
      {value.length > 200 && (
        <Link
          type="button"
          component="button"
          sx={{ fontSize: "inherit" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "ดูน้อยลง" : "ดูเพิ่มเติม"}
        </Link>
      )}
    </div>
  );
});

const DataTable = ({
  data,
  isAdmin,
  isEXEC,
  level,
  userData,
  handleAddItem,
  handleViewClick2,
  handleViewClick3,
  handleViewClick,

  handleEditClick,
  handleUpdateStatusClick,
  handleDeleteClick,
  handleViewClickSummary,
  loading,
}) => {
  const [selectedText, setSelectedText] = useState(null);
  const complaintMap = {
    0: "ทางวาจา",
    1: "ทางโทรศัพท์",
    2: "เยี่ยมผู้ป่วยเชิงรุก",
    3: "เยี่ยมตลาด / บริษัทคู่สัญญา",
    4: "อื่นๆ",
  };
  const typeMap = {
    0: "OPD",
    1: "IPD",
  };
 

  const HEADER_ICONS = {
    reportid: <InfoOutlined />,
    suggestion: <ChatBubbleOutlineRounded />,
    summary: <CalendarMonthRounded />,
    complaints: <PlaceRounded />,
    deptrelate: <ApartmentRounded />,
    managementremark: <DescriptionOutlined />,
    involved: <ReplyRounded />,
    risk: <InfoOutlined />,
    actions: <SettingsRounded />,
  };
  const Header = ({ title, field }) => (
    <HeaderTitle title={title} field={field} />
  );
  const HeaderTitle = ({ field, title }) => (
    <Stack direction="row" spacing={0.8} alignItems="center">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#176B55",
          "& svg": { fontSize: 19 },
        }}
      >
        {HEADER_ICONS[field]}
      </Box>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 800,
          color: "#176B55",
          whiteSpace: "normal",
          lineHeight: 1.35,
        }}
      >
        {title}
      </Typography>
    </Stack>
  );


  const getRowClassName = useCallback((params) => {
    const risk = String(params.row.risk ?? "null");
    const status = String(params.row.status);

    if (status === "0") return "row-neutral";
    if (risk === "4" ) return "completed-row";
     if ( risk === "3") return "row-completed";
    
    if (risk === "2") return "row-step3";
    if (risk === "1") return "row-step2";
 
  }, []);

  const riskStatuses = {
    null: {
      label: "ข้อร้องเรียนใหม่",
      tooltip: "ยังไม่มีการดำเนินการ",
      color: "#DC2626",
      border: "#FECACA",
      bg: "#FFF1F2",
      icon: <BlockRounded />,
    },
    1: {
      label: "รอตอบกลับ",
      tooltip: "อยู่ระหว่างรอหน่วยงานตอบกลับ",
      color: "#475569",
      border: "#CBD5E1",
      bg: "#F1F5F9",
      icon: <AccessTimeRounded />,
    },
    2: {
      label: "ตอบกลับเรียบร้อย",
      tooltip: "หน่วยงานตอบกลับเรียบร้อยแล้ว",
      color: "#0284C7",
      border: "#BAE6FD",
      bg: "#F0F9FF",
      icon: <ChatBubbleOutlineRounded />,
    },
    3: {
      label: "วิเคราะห์แล้ว",
      tooltip: "ดำเนินการวิเคราะห์เสร็จสมบูรณ์",
      color: "#16A34A",
      border: "#BBF7D0",
      bg: "#F0FDF4",
      icon: <CheckCircleRounded />,
    },
    4: {
      label: "เสร็จสมบูรณ์",
      tooltip: "รายการนี้ปิดการดำเนินการแล้ว",
      color: "#15803D",
      border: "#A7F3D0",
      bg: "#ECFDF5",
      icon: <CheckCircleRounded />,
    },
  };
  const makeHeader = (field, title) => ({
    field,
    headerName: title,
    renderHeader: () => <Header field={field} title={title} />,
  });

  const columns = useMemo(
    () => [
      {
        field: "reportid",
        ...makeHeader("reportid", "เลขที่"),
        minWidth: 120,
        align: "center",
        headerAlign: "center",

        renderCell: (params) => {
          const risk = params.row.risk;
          const rowStatus = String(params.row.status);

          // =========================
          // สีตามสถานะ
          // =========================
          const statusMap = {
            null: {
              color: "#DC2626",
              border: "#7F1D1D",
              bg: "#FEE2E2",
            },

            1: {
              color: "#475569",
              border: "#334155",
              bg: "#F1F5F9",
            },

            2: {
              color: "#0284C7",
              border: "#075985",
              bg: "#E0F2FE",
            },

            3: {
              color: "#16A34A",
              border: "#14532D",
              bg: "#DCFCE7",
            },
            4: {
              color: "#15803D",
              border: "#86EFAC",
              bg: "#F0FDF4",
            },
          };

          // =========================
          // STATUS = 0
          // ไม่ใช่ข้อร้องเรียน
          // =========================
          const statusZero = {
            color: "#EA580C",
            border: "#C2410C",
            bg: "#FFF7ED",
          };

          const status =
            rowStatus === "0"
              ? statusZero
              : risk === null || risk === undefined
                ? statusMap.null
                : statusMap[risk] || statusMap.null;

          return (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Chip
                label={`#${params.value}`}
                size="small"
                sx={{
                  height: 34,
                  minWidth: 90,
                  borderRadius: "8px",

                  bgcolor: status.bg,
                  color: status.color,
                  border: `2px solid ${status.color}`,

                  fontWeight: 800,
                  fontSize: "0.90rem",

                  boxShadow: "0 1px 3px rgba(15,23,42,0.08)",

                  "& .MuiChip-label": {
                    px: 1.5,
                  },

                  transition: "all 0.2s ease",

                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 10px rgba(234,88,12,0.15)",
                  },
                }}
              />
            </Stack>
          );
        },
      },
      {
         field: "suggestion",
         ...makeHeader("suggestion", "ข้อร้องเรียน/ข้อเสนอแนะ"),
         minWidth: 150,
         align: "center",
         headerAlign: "center",
         flex: 1,
       
         renderCell: (params) => {
           const row = params.row;
       
           // ความเสี่ยงทางคลินิก A-I
         const letter = String(row.suggestion ?? "").toUpperCase();
     
     const clinical = severityLevels.find(
       (item) => item.code === letter
     );
       
           const isSuggestion = ["A", "B"].includes(letter);
       
           // ความเสี่ยงทั่วไป ระดับ 1-5
           const generalLevel = String(row.generalRiskLevel ?? "");
           const general = generalRiskOptions.find(
             (item) => String(item.value) === generalLevel
           );
       
           // แสดงตาม Checkbox ที่ถูกเลือก
           const showClinical =
             Number(row.clinicalRisk) === 1 && !!clinical;
       
           const showGeneral =
             Number(row.generalRisk) === 1 && !!general;
       
           if (!showClinical && !showGeneral) {
             return <Typography color="text.secondary">-</Typography>;
           }
       
           return (
             <Box
               sx={{
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
                 flexWrap: "wrap",
                 gap: 1.5,
                 py: 1,
               }}
             >
               {/* ความเสี่ยงทั่วไป */}
               {showGeneral && (
                 <Tooltip
                   title={`ระดับ ${general.value}: ${general.label}`}
                   arrow
                 >
                   <Box
                     sx={{
                       position: "relative",
                       display: "inline-flex",
                       alignItems: "center",
                     }}
                   >
                     <Chip
                       label="ความเสี่ยงทั่วไป"
                       size="small"
                       sx={{
                         height: 36,
                         borderRadius: "999px",
                         px: 1,
                         fontWeight: 700,
                         fontSize: 12,
                         color: general.color,
                         bgcolor: general.bg,
                         border: `1px solid ${general.color}`,
                       }}
                     />
       
                     <Box
                       sx={{
                         position: "absolute",
                         top: -7,
                         right: -7,
                         minWidth: 24,
                         height: 24,
                         px: 0.5,
                         borderRadius: "50%",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         bgcolor: general.color,
                         color: "#fff",
                         border: "2px solid #fff",
                         fontWeight: 800,
                         fontSize: 12,
                         zIndex: 1,
                       }}
                     >
                       {general.value}
                     </Box>
                   </Box>
                 </Tooltip>
               )}
       
               {/* ความเสี่ยงทางคลินิก */}
               {showClinical && (
                 <Tooltip
                   title={`${letter}: ${clinical.label}`}
                   arrow
                 >
                   <Box
                     sx={{
                       position: "relative",
                       display: "inline-flex",
                       alignItems: "center",
                     }}
                   >
                     <Chip
                       label={isSuggestion ? "ข้อเสนอแนะ" : "ข้อร้องเรียน"}
                       size="small"
                       sx={{
                         height: 36,
                         borderRadius: "999px",
                         px: 1,
                         fontWeight: 700,
                         fontSize: 12,
                         color: isSuggestion ? "#16835D" : "#E33446",
                         bgcolor: isSuggestion ? "#ECFDF5" : "#FFF1F2",
                         border: `1px solid ${
                           isSuggestion ? "#A7F3D0" : "#FECDD3"
                         }`,
                       }}
                     />
       
                     <Box
                       sx={{
                         position: "absolute",
                         top: -7,
                         right: -7,
                         minWidth: 24,
                         height: 24,
                         px: 0.5,
                         borderRadius: "50%",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         bgcolor: clinical.color,
                         color: "#fff",
                         border: "2px solid #fff",
                         fontWeight: 800,
                         fontSize: 12,
                         zIndex: 1,
                       }}
                     >
                       {letter}
                     </Box>
                   </Box>
                 </Tooltip>
               )}
             </Box>
           );
         },
       },
      {
        field: "summary",
        ...makeHeader("summary", "วันที่ร้องเรียน"),
        minWidth: 190,

        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const row = params.row;

          return (
            <Stack spacing={0.6} sx={{ py: 0.5 }}>
              <Stack
                direction="row"
                spacing={0.8}
                alignItems="center"
                flexWrap="wrap"
              >
                <Chip
                  label={typeMap[row.type] ?? "-"}
                  size="small"
                  sx={{
                    bgcolor: "#E0F2FE",
                    color: "#0284C7",
                    fontWeight: 800,
                    height: 28,
                    borderRadius: "999px",
                  }}
                />
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <CalendarMonthRounded
                    sx={{ fontSize: 16, color: "#7890B2" }}
                  />
                  <Typography sx={{ color: "#647A99", fontSize: 13 }}>
                    {row.date ? dayjs(row.date).format("DD/MM/YYYY") : "-"}
                  </Typography>
                </Stack>
              </Stack>

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#71829B",
                  lineHeight: 1.5,
                }}
              >
                <strong>ผู้บันทึก :</strong> {row.requestby || "-"}
              </Typography>
            </Stack>
          );
        },
      },

      {
        field: "complaints",
        ...makeHeader("complaints", "แหล่งที่มา"),
        minWidth: 120,
        maxWidth: 160,
        flex: 0.8,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const value = params.value?.toString();

          let label = complaintMap[value] || "-";

          // 🔥 กรณี "อื่นๆ"
          if (value === "4" && params.row.complaints_other) {
            label = `อื่นๆ: ${params.row.complaints_other}`;
          }

          return (
            <Tooltip title={label}>
              <Chip label={label} size="small" sx={{ maxWidth: 140 }} />
            </Tooltip>
          );
        },
      },

      {
        field: "deptrelate",
        ...makeHeader("deptrelate", "แผนกที่ถูกร้องเรียน"),
        minWidth: 120,
        align: "left",
        headerAlign: "center",
        sortable: false,
        renderCell: (params) => {
          if (!params.value) return null;

          const items = params.value.split(",");

          return (
            <Stack
              direction="row"
              spacing={0.5}
              flexWrap="wrap"
              sx={{
                maxWidth: 250,
              }}
            >
              {items.map((item, index) => (
                <Tooltip key={index} title={item.trim()} arrow>
                  <Chip label={item.trim()} size="small" variant="outlined" />
                </Tooltip>
              ))}
            </Stack>
          );
        },
      },
      {
        field: "all_persons",
        headerName: "หน่วยงาน/บุคคลที่ถูกร้องเรียน",
        minWidth: 250,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        hide: true,
        renderCell: (params) => {
          if (!params.value) return null;

          return (
            <Stack
              spacing={0.5}
              alignItems="flex-start"
              sx={{ maxWidth: 260, flexWrap: "wrap" }}
            >
              {params.value.split(",").map((item, index) => (
                <Tooltip title={item.trim()} arrow>
                  <Chip
                    label={item.trim()}
                    size="small"
                    variant="outlined"
                    sx={{ maxWidth: 240 }}
                  />
                </Tooltip>
              ))}
            </Stack>
          );
        },
      },
     {
      field: "managementremark",
      ...makeHeader("managementremark", "สรุปสาระที่ร้องเรียน"),
      minWidth: 180,
      flex: 1.5,
      headerAlign: "center",
    
      renderCell: (params) => {
        // ให้ managementremark มาก่อน ถ้าไม่มีใช้ summarize แทน
        const value =
          params.row.managementremark?.trim() ||
          params.row.summarize?.trim() ||
          "";
    
        return (
          <ExpandableTextCell
            value={value}
            onClick={(text) =>
              setSelectedText({
                text,
               summarize: params.row.summarize,
                reportId: params.row.reportid,
              })
            }
          />
        );
      },
    },
      {
        field: "involved",
        ...makeHeader("involved", "ตอบกลับ"),
        minWidth: 60,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const done = params.value;

          return (
            <Tooltip
              title={
                done
                  ? "ผู้ร้องเรียนต้องการให้ตอบกลับ"
                  : "ผู้ร้องเรียนไม่ต้องการให้ตอบกลับ"
              }
              arrow
            >
              <Chip
                label={done ? "ต้องการ" : "ไม่ต้องการ"}
                color={done ? "info" : "default"}
                size="small"
              />
            </Tooltip>
          );
        },
      },
      {
        field: "risk",
        ...makeHeader("risk", "สถานะ"),
        minWidth: 150,
        align: "center",
        headerAlign: "center",

        renderCell: (params) => {
          const risk = params.row.risk;
          const rowStatus = String(params.row.status);

          if (rowStatus === "0") {
            return (
              <Tooltip title="รายการนี้ไม่ใช่ข้อร้องเรียน" arrow>
                <Chip
                  icon={<CircleX size={15} />}
                  label="ไม่ใช่ข้อร้องเรียน"
                  size="small"
                  sx={{
                    height: 36,
                    borderRadius: "999px",
                    bgcolor: "#FFF7ED",
                    color: "#EA580C",
                    border: "1px solid #FED7AA",
                    fontWeight: 800,
                    "& .MuiChip-icon": { color: "#EA580C" },
                  }}
                />
              </Tooltip>
            );
          }

          const status =
            riskStatuses[risk == null ? "null" : String(risk)] ??
            riskStatuses.null;

          return (
            <Tooltip title={status.tooltip} arrow>
              <Chip
                icon={status.icon}
                label={status.label}
                size="small"
                sx={{
                  height: 37,
                  minWidth: 155,
                  borderRadius: "999px",
                  bgcolor: status.bg,
                  color: status.color,
                  border: `1px solid ${status.border}`,
                  fontWeight: 800,
                  fontSize: 12,
                  "& .MuiChip-icon": {
                    color: status.color,
                    ml: 1,
                    fontSize: 17,
                  },
                  "& .MuiChip-label": { px: 1.5 },
                }}
              />
            </Tooltip>
          );
        },
      },

      {
        field: "actions",
        type: "actions",
        ...makeHeader("actions", "จัดการ"),
        minWidth: 60,
        cellClassName: "actions",
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const { id, row } = params;

          const risk = row.risk;
          if (risk == "4") {
            return (
                <Box
                                            sx={{
                                              display: "grid",
                                              gridTemplateColumns: "repeat(2, 46px)",
                                              gridAutoRows: "46px",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              width: "100%",
                                              height: "100%",
                                            }}
                                          >
                {" "}
                <Tooltip title="ดูสถานะทั้งหมด">
                  <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label="บันทึกการจัดการของเจ้าหน้าที่่"
                    onClick={() => handleViewClickSummary(id, row)}
                    color="success"
                    sx={{
                      width: 38,
                      height: 38,
                      border: "1px solid #86CDA5",
                      borderRadius: "50%",
                      bgcolor: "#ECFDF3",
                      color: "#16A34A",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#16A34A",
                        color: "#FFFFFF",
                        borderColor: "#16A34A",
                        boxShadow: "0 4px 12px rgba(22, 163, 74, 0.22)",
                      },
                    }}
                  />
                </Tooltip>
                <Tooltip title="ยกเลิกรายการ">
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="ยกเลิกรายการ"
                    onClick={() => handleDeleteClick(id, row)}
                    color="error"
                    sx={{
                      width: 38,
                      height: 38,
                      border: "1px solid #FCA5A5",
                      borderRadius: "50%",
                      bgcolor: "#FEF2F2",
                      color: "#DC2626",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#DC2626",
                        color: "#FFFFFF",
                        borderColor: "#DC2626",
                        boxShadow: "0 4px 12px rgba(220, 38, 38, 0.22)",
                      },
                    }}
                  />
                </Tooltip>
                {isAdmin && (
                  <Tooltip title="แก้ไขสถานะ">
                    <GridActionsCellItem
                      icon={<UpdateIcon />}
                      label="แก้ไขสถานะ"
                      onClick={() => handleUpdateStatusClick(id, row)}
                      color="info"
                      sx={{
                        width: 38,
                        height: 38,
                        border: "1px solid #FACC15",
                        borderRadius: "50%",
                        bgcolor: "#FEFCE8",
                        color: "#CA8A04",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "#FACC15",
                          color: "#713F12",
                          borderColor: "#EAB308",
                          boxShadow: "0 4px 12px rgba(250, 204, 21, 0.35)",
                        },
                      }}
                    />
                  </Tooltip>
                )}
              </Box>
            );
          }
          if (risk == "1" || risk == "2" || risk == "3") {
            return (
                <Box
                                            sx={{
                                              display: "grid",
                                              gridTemplateColumns: "repeat(2, 46px)",
                                              gridAutoRows: "46px",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              width: "100%",
                                              height: "100%",
                                            }}
                                          >
                <Tooltip title="ดูสถานะทั้งหมด">
                  <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label="บันทึกการจัดการของเจ้าหน้าที่่"
                    onClick={() => handleViewClickSummary(id, row)}
                    color="success"
                    sx={{
                      width: 38,
                      height: 38,
                      border: "1px solid #86CDA5",
                      borderRadius: "50%",
                      bgcolor: "#ECFDF3",
                      color: "#16A34A",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#16A34A",
                        color: "#FFFFFF",
                        borderColor: "#16A34A",
                        boxShadow: "0 4px 12px rgba(22, 163, 74, 0.22)",
                      },
                    }}
                  />
                </Tooltip>
                <Tooltip title="บันทึกการแก้ไข">
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    label="บันทึกการแก้ไข"
                    onClick={() => handleEditClick(id, row)}
                    color="warning"
                    sx={{
                      width: 38,
                      height: 38,
                      border: "1px solid #FDBA74",
                      borderRadius: "50%",
                      bgcolor: "#FFF7ED",
                      color: "#EA580C",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#EA580C",
                        color: "#FFFFFF",
                        borderColor: "#EA580C",
                        boxShadow: "0 4px 12px rgba(234, 88, 12, 0.22)",
                      },
                    }}
                  />
                </Tooltip>
                <Tooltip title="ยกเลิกรายการ">
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="ยกเลิกรายการ"
                    onClick={() => handleDeleteClick(id, row)}
                    color="error"
                    sx={{
                      width: 38,
                      height: 38,
                      border: "1px solid #FCA5A5",
                      borderRadius: "50%",
                      bgcolor: "#FEF2F2",
                      color: "#DC2626",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#DC2626",
                        color: "#FFFFFF",
                        borderColor: "#DC2626",
                        boxShadow: "0 4px 12px rgba(220, 38, 38, 0.22)",
                      },
                    }}
                  />
                </Tooltip>
                {isAdmin && (
                  <Tooltip title="แก้ไขสถานะ">
                    <GridActionsCellItem
                      icon={<UpdateIcon />}
                      label="แก้ไขสถานะ"
                      onClick={() => handleUpdateStatusClick(id, row)}
                      color="info"
                      sx={{
                        width: 38,
                        height: 38,
                        border: "1px solid #FACC15",
                        borderRadius: "50%",
                        bgcolor: "#FEFCE8",
                        color: "#CA8A04",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "#FACC15",
                          color: "#713F12",
                          borderColor: "#EAB308",
                          boxShadow: "0 4px 12px rgba(250, 204, 21, 0.35)",
                        },
                      }}
                    />
                  </Tooltip>
                )}
              </Box>
            );
          } else {
            return (
              <Box
                                          sx={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(2, 46px)",
                                            gridAutoRows: "46px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        >
                <Tooltip title="ดูสถานะทั้งหมด">
                  <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label="บันทึกการจัดการของเจ้าหน้าที่่"
                    onClick={() => handleViewClickSummary(id, row)}
                    color="success"
                    sx={{
                      width: 38,
                      height: 38,
                      border: "1px solid #86CDA5",
                      borderRadius: "50%",
                      bgcolor: "#ECFDF3",
                      color: "#16A34A",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#16A34A",
                        color: "#FFFFFF",
                        borderColor: "#16A34A",
                        boxShadow: "0 4px 12px rgba(22, 163, 74, 0.22)",
                      },
                    }}
                  />
                </Tooltip>
                <Tooltip title="บันทึกการจัดการของเจ้าหน้าที่่">
                  <GridActionsCellItem
                    icon={<UndoIcon />}
                    label="บันทึกการจัดการของเจ้าหน้าที่่"
                    onClick={() => handleViewClick(id, row)}
                    color="primary"
                    sx={{
                      width: 38,
                      height: 38,
                      border: "1px solid #8AB4F8",
                      borderRadius: "50%",
                      bgcolor: "#EFF6FF",
                      color: "#2563EB",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#2563EB",
                        color: "#FFFFFF",
                        borderColor: "#2563EB",
                        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
                      },
                    }}
                  />
                </Tooltip>
                <Tooltip title="ยกเลิกรายการ">
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="ยกเลิกรายการ"
                    onClick={() => handleDeleteClick(id, row)}
                    color="error"
                    sx={{
                      width: 38,
                      height: 38,
                      border: "1px solid #FCA5A5",
                      borderRadius: "50%",
                      bgcolor: "#FEF2F2",
                      color: "#DC2626",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "#DC2626",
                        color: "#FFFFFF",
                        borderColor: "#DC2626",
                        boxShadow: "0 4px 12px rgba(220, 38, 38, 0.22)",
                      },
                    }}
                  />
                </Tooltip>
                {isAdmin && (
                  <Tooltip title="แก้ไขสถานะ">
                    <GridActionsCellItem
                      icon={<UpdateIcon />}
                      label="แก้ไขสถานะ"
                      onClick={() => handleUpdateStatusClick(id, row)}
                      color="info"
                      sx={{
                        width: 38,
                        height: 38,
                        border: "1px solid #FACC15",
                        borderRadius: "50%",
                        bgcolor: "#FEFCE8",
                        color: "#CA8A04",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          bgcolor: "#FACC15",
                          color: "#713F12",
                          borderColor: "#EAB308",
                          boxShadow: "0 4px 12px rgba(250, 204, 21, 0.35)",
                        },
                      }}
                    />
                  </Tooltip>
                )}
              </Box>
            );
          }
        },
      },
      // ... คอลัมน์อื่น ๆ
    ],
    [
      isAdmin,
      userData,
      handleViewClick,
      handleViewClick2,
      handleViewClick3,
      handleEditClick,
      handleDeleteClick,
      handleUpdateStatusClick,
    ],
  );
  const hiddenByRole = {
    ADMIN: [],
    //EXEC: ["requestby"],
    //  USER: ["requestby", "reply", "risk"],
    EXEC: [],
    USER: [],
  };
  const role = isAdmin ? "ADMIN" : isEXEC ? "EXEC" : "USER";

  const filteredColumns = useMemo(() => {
    const hiddenFields = hiddenByRole[role];
    return columns.filter((col) => !hiddenFields.includes(col.field));
  }, [role, columns]);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState([]);

  // Load pagination and sort settings from localStorage on mount

  const handlePaginationChange = (model) => {
    setPaginationModel(model);
    localStorage.setItem("pagination", JSON.stringify(model));
  };

  const handleSortModelChange = (model) => {
    setSortModel(model);
    localStorage.setItem("sortModel", JSON.stringify(model));
  };

  return (
    <>
      <DataGrid
        density="compact" // 🔥 บีบ layout
        columnBuffer={5}
        autoHeight
        rows={data}
        getRowHeight={() => "auto"}
        getEstimatedRowHeight={() => 200}
        columns={filteredColumns}
        columnVisibilityModel={{
          all_persons: false, // 👈 ซ่อนตรงนี้
        }}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount={true}
        // initialState={{
        //   pagination: { paginationModel: { page: 0, pageSize: 10 } },
        // }}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        getRowClassName={getRowClassName}
        localeText={{
          toolbarColumns: "คอลัมน์",
          toolbarFilters: "ตัวกรอง",
          toolbarDensity: "ระยะห่าง",
          toolbarExport: "ส่งออก",
          noRowsLabel: "ไม่พบข้อมูล",
          MuiTablePagination: {
            labelRowsPerPage: "จำนวนแถวต่อหน้า",
            labelDisplayedRows: ({ from, to, count }) =>
              `${from}–${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`,
          },
          toolbarQuickFilterPlaceholder: "ค้นหา...",
          toolbarExport: "ส่งออก",
          toolbarExportCSV: "ส่งออก CSV",
        }}
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
        sx={{
          border: "none",
          color: "#425466",
          fontSize: 13,
          bgcolor: "#FFFFFF",

          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "#EAF4F1",
            borderBottom: "1px solid #DCEAE4",
            minHeight: "56px !important",
            maxHeight: "56px !important",
          },

          "& .MuiDataGrid-columnHeader": {
            bgcolor: "#EAF4F1",
            px: 1.5,
            "&:focus, &:focus-within": { outline: "none" },
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 800,
          },

          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },

          "& .MuiDataGrid-row": {
            position: "relative",
            borderBottom: "1px solid #EAF0ED",
            minHeight: "78px !important",
            bgcolor: "#FFFFFF",
            transition: "background-color .18s ease",

            "&:hover": {
              bgcolor: "#F6FAF8",
            },

            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: "12%",
              bottom: "12%",
              width: "5px",
              borderRadius: "8px",
              bgcolor: "#DC2626",
              zIndex: 2,
            },

            "&.row-completed::before": {
              bgcolor: "#16A36A",
            },

                "&.completed-row::before": {
              bgcolor: "transparent",
            },
            "&.row-step3::before": {
              bgcolor: "#0EA5E9",
            },
            "&.row-step2::before": {
              bgcolor: "#516873ff",
            },

            "&.row-neutral::before": {
              bgcolor: "#EA580C",
            },
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            px: 1.5,
            py: 1.1,
            display: "flex",
            alignItems: "center",
            whiteSpace: "normal",
            lineHeight: 1.6,
            "&:focus, &:focus-within": {
              outline: "none",
            },
          },

          "& .MuiDataGrid-cellContent": {
            whiteSpace: "normal",
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #E8EFEB",
            minHeight: 58,
            bgcolor: "#FFFFFF",
          },

          "& .MuiTablePagination-root": {
            color: "#64748B",
            fontSize: 12,
          },

          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontSize: 12,
            },

          "& .MuiDataGrid-overlay": {
            bgcolor: "rgba(255,255,255,.9)",
          },

          "& .MuiDataGrid-scrollbarFiller": {
            bgcolor: "#EAF4F1",
          },

          "& .MuiDataGrid-virtualScroller": {
            overflowX: "auto",
          },

          "& .MuiDataGrid-cell--textLeft": {
            justifyContent: "flex-start",
          },

          "& .MuiDataGrid-actionsCell": {
            gap: 0.1,
          },

          "& .MuiDataGrid-actionsCell .MuiIconButton-root": {
            borderRadius: "9px",
            p: 0.8,
          },
              "& .completed-row": {
  backgroundColor: "#F8FCF9",
  color: "#374151",
  opacity: 1,
  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: "#EFF8F1",
  },

  "&::before": {
    backgroundColor: "transparent",
  },
},
        }}
      />
      <TextDetailDialog
        open={Boolean(selectedText)}
        onClose={() => setSelectedText(null)}
        title="สรุปสาระที่ร้องเรียน"
        text={selectedText?.text}
          summarize={selectedText?.summarize}
        reportId={selectedText?.reportId}
      />
    </>
  );
};

export default DataTable;
