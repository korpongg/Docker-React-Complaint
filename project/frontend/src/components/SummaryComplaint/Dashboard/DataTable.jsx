import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button, Box, Tooltip, Link } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbar,
  GridToolbarQuickFilter,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandableTextCell from "../../form/ExpandableTextCell";
import TextDetailDialog from "../../form/TextDetailDialog";
import {
  Add as AddIcon,
  DescriptionRounded as FileIcon,
  SwapHorizRounded as RotateIcon,
  SendRounded as SendIcon,
  FindInPageRounded as ViewIcon,
  Edit as EditIcon,
  RefreshRounded as CloseIcon,
  DeleteForeverRounded as DeleteIcon,
} from "@mui/icons-material";
import { CircleX } from "lucide-react";
import { formatDateTimeN7 } from "../../Function";
import requestStatusData from "../../label.json";
import DescriptionIcon from "@mui/icons-material/Description"; // บันทึก
import ReplyIcon from "@mui/icons-material/Reply"; // ตอบกลับ
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Circle, Clock3, MessageSquareText, CheckCircle2 } from "lucide-react";
import { Chip, Stack } from "@mui/material";
import dayjs from "dayjs";
import UndoIcon from '@mui/icons-material/Undo';
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
  handleTranfClick,
  handleViewClickSummary,
  handleEditClick,
  handleEditClick2,
  handleEditClick3,
  handleEditClick4,
  handleDeleteClick,
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
  const EditToolbar = React.memo(({ handleAddItem }) => (
    <GridToolbarContainer
      style={{ justifyContent: "space-between", padding: "10px 10px 0" }}
    >
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  ));
  const statusMap = useMemo(() => {
    const map = {};
    requestStatusData.reportStatus.forEach((status) => {
      map[status.id] = { text: status.statusText, color: status.statusColor };
    });
    return map;
  }, []);

  const renderDeptrelateCell = useCallback((params) => {
    const deptNames = (params.row.deptAffInfo || [])
      .map((dept) => dept.DepName)
      .join(", ");
    return (
      <Tooltip title={deptNames}>
        <div className="MuiDataGrid-cellContent" role="presentation">
          {deptNames}
        </div>
      </Tooltip>
    );
  }, []);

  const renderViolence =
    (() => {
      return "sdsd";
    },
    []);

   const severityLevels = {
    I: { label: "อันตรายมาก", color: "#b91c1c", bg: "#fee2e2" },
    H: { label: "สูงมาก", color: "#dc2626", bg: "#fee2e2" },
    G: { label: "สูง", color: "#ea580c", bg: "#ffedd5" },
    F: { label: "ค่อนข้างสูง", color: "#f97316", bg: "#ffedd5" },
    E: { label: "ปานกลาง", color: "#ca8a04", bg: "#fef9c3" },
    D: { label: "ค่อนข้างต่ำ", color: "#65a30d", bg: "#ecfccb" },
    C: { label: "ต่ำ", color: "#16a34a", bg: "#dcfce7" },
    B: { label: "ต่ำมาก", color: "#0284c7", bg: "#e0f2fe" },
    A: { label: "เล็กน้อย", color: "#6b7280", bg: "#f3f4f6" },
  };

  const shouldShowButton = useCallback(
    (row, isLowLevel = false) => {
      const isGeneralRisk = row.reporttypename === "General Risk";
      const levelCheck = isGeneralRisk
        ? parseInt(row.level, 10) > 2
        : ["D", "E", "F", "G", "H", "I"].includes(row.level);
      const formStatusCheck = ["1", "2", "4"].includes(row.formstatus);

      return (
        isAdmin &&
        row.renew &&
        (isLowLevel ? !levelCheck : levelCheck) &&
        formStatusCheck
      );
    },
    [isAdmin],
  );

  const columns = useMemo(
    () => [
     {
  field: "reportid",
  headerName: "เลขที่",
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
        headerName: "ข้อร้องเรียน/ข้อเสนอแนะ",
        minWidth: 150,
        align: "center",
        headerAlign: "center",
        flex: 1,
        renderCell: (params) => {
          const letter = params.value;

          if (!letter) return "-";

          const severity = severityLevels[letter];

          if (!severity) return "-";

          const isSuggestion = ["C", "D" ,"E" ,"F" ,"G" ,"H" ,"I"].includes(letter);

          return (
            <Tooltip title={`${letter} : ${severity?.label || "-"}`} arrow>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "help",
                }}
              >
                <Chip
                  label={!isSuggestion ? "ข้อเสนอแนะ" : "ข้อร้องเรียน"}
                  color={!isSuggestion ? "success" : "error"}
                  variant="outlined"
                  size="small"
                  sx={{
                    fontWeight: 600,
                    pr: 1,
                  }}
                />

                {/* badge */}
                <Box
                  sx={{
                    position: "absolute",

                    top: -8,
                    right: -8,

                    width: 22,
                    height: 22,

                    borderRadius: "50%",

                    bgcolor: severity.bg,
                    color: severity.color,
                    border: `2px solid ${severity.color}`,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    fontWeight: 800,
                    fontSize: 12,

                    zIndex: 2,
                  }}
                >
                  {letter}
                </Box>
              </Box>
            </Tooltip>
          );
        },
      },
      {
        field: "summary",
        headerName: "วันที่ร้องเรียน",
        minWidth: 190,

        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const row = params.row;
          const typeLabel = typeMap[row.type];

          return (
            <Box sx={{ width: "100%", py: 0.5 }}>
              {/* 🔹 บรรทัดที่ 1 */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={typeLabel} size="small" color="primary" />

                <Chip
                  label={`วันที่: ${dayjs(row.date).format("DD/MM/YYYY")}`}
                  size="small"
                  variant="outlined"
                  sx={{ opacity: 0.85 }}
                />
              </Stack>

              <Box sx={{ fontSize: 12, color: "#666", mt: 0.5 }}>
                ผู้บันทึก : 👤 {row.requestby}
              </Box>

              {/* 🔹 บรรทัดที่ 2 */}
            </Box>
          );
        },
      },

      {
        field: "complaints",
        headerName: "แหล่งที่มา",
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
        headerName: "แผนกที่ถูกร้องเรียน",
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
      headerName: "สรุปสาระที่ร้องเรียน",
      minWidth: 180,
      flex: 1.5,
         headerAlign: "center",
      renderCell: (params) => (
        <ExpandableTextCell
          value={params.value}
          onClick={(text) =>
            setSelectedText({
              text,
              reportId: params.row.reportid,
            })
          }
        />
      ),
    },
      {
        field: "involved",
        headerName: "ตอบกลับ",
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
        headerName: "สถานะ",
        minWidth: 150,
        align: "center",
        headerAlign: "center",

        renderCell: (params) => {
          const risk = params.value;
          const rowStatus = String(params.row.status);

          const statusMap = {
            null: {
              label: "ข้อร้องเรียนใหม่",
              tooltip: "ยังไม่มีการดำเนินการ",
              icon: <Circle size={14} />,
              color: "#DC2626",
              border: "#7F1D1D",
              bg: "#FEE2E2",
            },

            1: {
              label: "รอตอบกลับ",
              tooltip: "อยู่ระหว่างรอหน่วยงานตอบกลับ",
              icon: <Clock3 size={14} />,
              color: "#475569",
              border: "#334155",
              bg: "#F1F5F9",
            },

            2: {
              label: "ตอบกลับเรียบร้อย",
              tooltip: "หน่วยงานตอบกลับเรียบร้อยแล้ว",
              icon: <MessageSquareText size={14} />,
              color: "#0284C7",
              border: "#075985",
              bg: "#E0F2FE",
            },

            3: {
              label: "วิเคราะห์แล้ว",
              tooltip: "ดำเนินการวิเคราะห์เสร็จสิ้น",
              icon: <CheckCircle2 size={14} />,
              color: "#16A34A",
              border: "#14532D",
              bg: "#DCFCE7",
            },
          };

          if (rowStatus === "0") {
            return (
              <Tooltip title="รายการนี้ไม่ใช่ข้อร้องเรียน" arrow>
                <Chip
                  icon={<CircleX size={15} />}
                  label="ไม่ใช่ข้อร้องเรียน"
                  variant="outlined"
                  size="small"
                  sx={{
                    height: 34,
                    minWidth: 145,
                    borderRadius: "999px",

                    bgcolor: "#FFF7ED",
                    color: "#EA580C",
                    border: "1px solid #C2410C",

                    fontWeight: 700,
                    fontSize: "0.82rem",

                    "& .MuiChip-icon": {
                      color: "#DC2626",
                      marginLeft: "8px",
                    },

                    "&:hover": {
                      bgcolor: "#FEE2E2",
                      transform: "translateY(-1px)",
                      boxShadow: "0 3px 10px rgba(220,38,38,.15)",
                    },
                  }}
                />
              </Tooltip>
            );
          }

          const status =
            risk === null || risk === undefined
              ? statusMap.null
              : statusMap[risk] || statusMap.null;

          return (
            <Tooltip title={status.tooltip} arrow>
              <Chip
                icon={status.icon}
                label={status.label}
                variant="outlined"
                size="small"
                sx={{
                  height: 34,
                  minWidth: 145,

                  borderRadius: "999px",

                  bgcolor: status.bg,
                  color: status.color,
                  border: `1px solid ${status.border}`,

                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: ".2px",

                  transition: ".2s",

                  "& .MuiChip-icon": {
                    color: status.color,
                    marginLeft: "8px",
                  },

                  "&:hover": {
                    bgcolor: status.bg,
                    transform: "translateY(-1px)",
                    boxShadow: "0 3px 10px rgba(0,0,0,.08)",
                  },
                }}
              />
            </Tooltip>
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "จัดการ",
        minWidth: 60,
        cellClassName: "actions",
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const { id, row } = params;
          const risk = row.risk;
          if (risk == "3") {
            return (
              <>
               <Tooltip title="ดูสรุปประเด็นทั้งหมด">
                  <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label="บันทึกการจัดการของเจ้าหน้าที่่"
                    onClick={() => handleViewClickSummary(id, row)}
                    color="success"
                  />
                </Tooltip>
                 <Tooltip title="แก้ไข">
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="แก้ไข"
                  onClick={() => handleEditClick4(id, row)}
                  color="warning"
                />
              </Tooltip>
              </>
           
            );
          } else {
            return (
<>
               <Tooltip title="ดูสรุปประเด็นทั้งหมด">
                  <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    label="บันทึกการจัดการของเจ้าหน้าที่่"
                    onClick={() => handleViewClickSummary(id, row)}
                    color="success"
                  />
                </Tooltip>
              <Tooltip title="สรุปผลการวิเคราะห์ข้อร้องเรียน">
                <GridActionsCellItem
                  icon={<UndoIcon />}
                  label="สรุปผลการวิเคราะห์ข้อร้องเรียน"
                  onClick={() => handleViewClick3(id, row)}
                  color="primary"
                />
              </Tooltip>
              </>
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
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
      }
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
      }}
      loading={loading}
      sx={{
        "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: 1 },
        "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": { py: "15px" },
        "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
          py: "22px",
        },
        "& .MuiDataGrid-cell": { alignItems: "flex-start" },
        border: "none",
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#FAFAFA",
          fontWeight: 600,
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "#F5F7FA",
        },
        "& .MuiDataGrid-cell": {
          alignItems: "flex-start",
          py: 1.5,
        },
        "& .MuiTablePagination-root": {
          display: "flex",
          alignItems: "center",
        },
        "& .MuiTablePagination-toolbar": {
          alignItems: "center",
        },
        "& .MuiTablePagination-selectLabel": {
          marginBottom: 0,
        },
        "& .MuiTablePagination-displayedRows": {
          marginBottom: 0,
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#166534", // ตอน focus
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "#d1d5db", // ตอนปกติ
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottomColor: "#166534", // ตอน hover
        },
        "& .MuiDataGrid-cell": {
          px: 0, // เอา padding ซ้ายขวาออก
        },
        "& .MuiDataGrid-columnHeader": {
          px: 0,
        },
      }}
    />
     <TextDetailDialog
  open={Boolean(selectedText)}
  onClose={() => setSelectedText(null)}
  title="สรุปสาระที่ร้องเรียน"
  text={selectedText?.text}
  reportId={selectedText?.reportId}
/>
</>
  );
};

export default DataTable;
