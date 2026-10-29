
import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import {
  AddRounded,
  SearchRounded,
  CalendarMonthRounded,
  ChatBubbleOutlineRounded,
  LockPersonRounded,
  PlaceRounded,
  ApartmentRounded,
  DescriptionOutlined,
  ReplyRounded,
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
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@mui/icons-material";

import dayjs from "dayjs";
import { CircleX } from "lucide-react";
import ExpandableTextCell from "../../form/ExpandableTextCell";
import TextDetailDialog from "../../form/TextDetailDialog";

const severityLevels = {
  I: { label: "อันตรายมาก", color: "#B91C1C", bg: "#FEE2E2" },
  H: { label: "สูงมาก", color: "#DC2626", bg: "#FEE2E2" },
  G: { label: "สูง", color: "#EA580C", bg: "#FFEDD5" },
  F: { label: "ค่อนข้างสูง", color: "#F97316", bg: "#FFEDD5" },
  E: { label: "ปานกลาง", color: "#CA8A04", bg: "#FEF9C3" },
  D: { label: "ค่อนข้างต่ำ", color: "#65A30D", bg: "#ECFCCB" },
  C: { label: "ต่ำ", color: "#16A34A", bg: "#DCFCE7" },
  B: { label: "ต่ำมาก", color: "#0284C7", bg: "#E0F2FE" },
  A: { label: "เล็กน้อย", color: "#6B7280", bg: "#F3F4F6" },
};

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

const Header = ({ title, field }) => (
  <HeaderTitle title={title} field={field} />
);

const DataTable = ({
  data = [],
  isAdmin,
  isEXEC,
  level,
  userData,
  handleAddItem,
  handleViewClick2,
  handleViewClick3,
  handleViewClick,
  handleTranfClick,
  handleEditClick,
  handleUpdateStatusClick,
  handleEditClick2,
  handleEditClick3,
  handleEditClick4,
  handleDeleteClick,
  handleViewClickSummary,
  loading,
}) => {
  const [selectedText, setSelectedText] = useState(null);

  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const normalize = (value) =>
    String(value ?? "").toLocaleLowerCase("th-TH");

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const keyword = normalize(search);

      const searchable = [
        row.reportid,
        row.suggestion,
        row.requestby,
        row.managementremark,
        row.deptrelate,
        row.all_persons,
        row.complaints_other,
      ]
        .map(normalize)
        .join(" ");

      if (keyword && !searchable.includes(keyword)) {
        return false;
      }

      if (
        statusFilter !== "all" &&
        String(row.risk ?? "null") !== statusFilter
      ) {
        return false;
      }

      if (
        typeFilter !== "all" &&
        String(row.type) !== typeFilter
      ) {
        return false;
      }

      if (dateFrom || dateTo) {
        const date = dayjs(row.date);

        if (!date.isValid()) return false;

        if (
          dateFrom &&
          date.isBefore(dayjs(dateFrom).startOf("day"))
        ) {
          return false;
        }

        if (
          dateTo &&
          date.isAfter(dayjs(dateTo).endOf("day"))
        ) {
          return false;
        }
      }

      return true;
    });
  }, [data, search, dateFrom, dateTo, statusFilter, typeFilter]);

  const resetFilters = () => {
    setSearch("");
    setDateFrom("");
    setDateTo("");
    setStatusFilter("all");
    setTypeFilter("all");
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  const columns = useMemo(() => {
    const makeHeader = (field, title) => ({
      field,
      headerName: title,
      renderHeader: () => <Header field={field} title={title} />,
    });

    return [
      {
        ...makeHeader("reportid", "เลขที่"),
        minWidth: 145,
        flex: 0.8,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const risk = params.row.risk;
          const rowStatus = String(params.row.status);

          let color = "#DC2626";
          let bg = "#FFF1F2";

          if (rowStatus === "0") {
            color = "#EA580C";
            bg = "#FFF7ED";
          } else if (risk === 3 || risk === "3" || risk === 4 || risk === "4") {
            color = "#15803D";
            bg = "#ECFDF5";
          } else if (risk === 1 || risk === "1" || risk === 2 || risk === "2") {
            color = "#0284C7";
            bg = "#F0F9FF";
          }

          return (
            <Chip
              label={`#${params.value ?? "-"}`}
              size="small"
              sx={{
                height: 38,
                minWidth: 105,
                borderRadius: "11px",
                bgcolor: bg,
                color,
                border: `1.5px solid ${color}`,
                fontWeight: 800,
                fontSize: 14,
                "& .MuiChip-label": { px: 1.5 },
              }}
            />
          );
        },
      },

      {
        ...makeHeader("suggestion", "ข้อร้องเรียน/ข้อเสนอแนะ"),
        minWidth: 175,
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const letter = String(params.value ?? "").toUpperCase();
          const severity = severityLevels[letter];

          if (!severity) {
            return <Typography color="text.secondary">-</Typography>;
          }

          const isSuggestion = ["A", "B"].includes(letter);

          return (
            <Tooltip
              title={`${letter} : ${severity.label}`}
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
                  icon={<ChatBubbleOutlineRounded />}
                  label={isSuggestion ? "ข้อเสนอแนะ" : "ข้อร้องเรียน"}
                  size="small"
                  sx={{
                    height: 39,
                    borderRadius: "999px",
                    pl: 0.5,
                    pr: 1,
                    fontWeight: 700,
                    fontSize: 12,
                    color: isSuggestion ? "#16835D" : "#E33446",
                    bgcolor: isSuggestion ? "#ECFDF5" : "#FFF1F2",
                    border: `1px solid ${
                      isSuggestion ? "#A7F3D0" : "#FECDD3"
                    }`,
                    "& .MuiChip-icon": {
                      color: "inherit",
                      ml: 1,
                      fontSize: 16,
                    },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: -7,
                    right: -7,
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: severity.color,
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
          );
        },
      },

      {
        ...makeHeader("summary", "วันที่ร้องเรียน"),
        minWidth: 225,
        flex: 1.2,
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
                  <Typography
                    sx={{ color: "#647A99", fontSize: 13 }}
                  >
                    {row.date
                      ? dayjs(row.date).format("DD/MM/YYYY")
                      : "-"}
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
        ...makeHeader("complaints", "แหล่งที่มา"),
        minWidth: 130,
        flex: 0.75,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const value = String(params.value ?? "");
          let label = complaintMap[value] || "-";

          if (value === "4" && params.row.complaints_other) {
            label = params.row.complaints_other;
          }

          return (
            <Tooltip title={label} arrow>
              <Chip
                label={label}
                size="small"
                sx={{
                  maxWidth: 150,
                  height: 33,
                  borderRadius: "999px",
                  bgcolor: "#F1F5F9",
                  color: "#475569",
                  fontWeight: 700,
                  "& .MuiChip-label": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    px: 1.5,
                  },
                }}
              />
            </Tooltip>
          );
        },
      },

      {
        ...makeHeader("deptrelate", "แผนกที่ถูกร้องเรียน"),
        minWidth: 180,
        flex: 1,
        sortable: false,
        renderCell: (params) => {
          if (!params.value) {
            return <Typography color="text.secondary">-</Typography>;
          }

          return (
            <Stack
              direction="row"
              spacing={0.5}
              useFlexGap
              flexWrap="wrap"
              sx={{ py: 0.5 }}
            >
              {String(params.value)
                .split(",")
                .map((item, index) => (
                  <Tooltip key={`${item}-${index}`} title={item.trim()} arrow>
                    <Chip
                      label={item.trim()}
                      size="small"
                      sx={{
                        height: 29,
                        maxWidth: 190,
                        bgcolor: "#F8FAFC",
                        color: "#475569",
                        border: "1px solid #DCE5ED",
                        fontWeight: 600,
                        fontSize: 11,
                        "& .MuiChip-label": {
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    />
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
        hideable: true,
        filterable: false,
        sortable: false,
        renderCell: (params) => (
          <Stack direction="row" flexWrap="wrap" gap={0.5}>
            {(params.value || "")
              .split(",")
              .filter(Boolean)
              .map((item, index) => (
                <Chip
                  key={`${item}-${index}`}
                  label={item.trim()}
                  size="small"
                  variant="outlined"
                />
              ))}
          </Stack>
        ),
      },

      {
        ...makeHeader("managementremark", "สรุปสาระที่ร้องเรียน"),
        minWidth: 200,
        flex: 1.4,
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
        ...makeHeader("involved", "ตอบกลับ"),
        minWidth: 105,
        flex: 0.6,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const wantsReply =
            params.value === true ||
            params.value === 1 ||
            params.value === "1";

          return (
            <Chip
              label={wantsReply ? "ต้องการ" : "ไม่ต้องการ"}
              size="small"
              sx={{
                height: 32,
                borderRadius: "999px",
                bgcolor: wantsReply ? "#E0F2FE" : "#F1F5F9",
                color: wantsReply ? "#0284C7" : "#64748B",
                fontWeight: 800,
                fontSize: 12,
                px: 0.5,
              }}
            />
          );
        },
      },

      {
        ...makeHeader("risk", "สถานะ"),
        minWidth: 175,
        flex: 1,
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
        ...makeHeader("actions", "จัดการ"),
        type: "actions",
        minWidth: isAdmin ? 150 : 125,
        flex: 0.8,
        getActions: (params) => {
          const { id, row } = params;
          const risk = String(row.risk);

          const view = (
            <GridActionsCellItem
              key="view"
              icon={<VisibilityRounded />}
              label="ดูสถานะทั้งหมด"
              onClick={() => handleViewClickSummary(id, row)}
              sx={{
                color: "#13865F",
                "&:hover": { bgcolor: "#E7F7EF" },
              }}
            />
          );

          const edit = (
            <GridActionsCellItem
              key="edit"
              icon={<EditRounded />}
              label="แก้ไข"
              onClick={() => handleEditClick(id, row)}
              sx={{
                color: "#F59E0B",
                "&:hover": { bgcolor: "#FFF7E6" },
              }}
            />
          );

          const remove = (
            <GridActionsCellItem
              key="delete"
              icon={<DeleteForeverRounded />}
              label="ยกเลิกรายการ"
              onClick={() => handleDeleteClick(id, row)}
              sx={{
                color: "#F43F5E",
                "&:hover": { bgcolor: "#FFF1F2" },
              }}
            />
          );

          const history = (
            <GridActionsCellItem
              key="history"
              icon={<HistoryRounded />}
              label="ประวัติการดำเนินการ"
              onClick={() => handleViewClick(id, row)}
              sx={{
                color: "#0EA5E9",
                "&:hover": { bgcolor: "#F0F9FF" },
              }}
            />
          );

          const updateStatus = (
            <GridActionsCellItem
              key="status"
              icon={<AutorenewRounded />}
              label="แก้ไขสถานะ"
              onClick={() => handleUpdateStatusClick(id, row)}
              sx={{
                color: "#0284C7",
                "&:hover": { bgcolor: "#F0F9FF" },
              }}
            />
          );

          if (risk === "4") {
            return [
              view,
              remove,
              ...(isAdmin ? [updateStatus] : []),
            ];
          }

          if (["1", "2", "3"].includes(risk)) {
            return [
              view,
              edit,
              remove,
              ...(isAdmin ? [updateStatus] : []),
            ];
          }

          return [
            view,
            history,
            remove,
            ...(isAdmin ? [updateStatus] : []),
          ];
        },
      },
    ];
  }, [
    isAdmin,
    handleViewClick,
    handleEditClick,
    handleDeleteClick,
    handleUpdateStatusClick,
    handleViewClickSummary,
  ]);

  const getRowClassName = useCallback((params) => {
    const risk = String(params.row.risk ?? "null");
    const status = String(params.row.status);

    if (status === "0") return "row-neutral";
    if (risk === "4" || risk === "3") return "row-completed";
    if (risk === "1" || risk === "2") return "row-progress";
    return "row-new";
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#F4F8F7",
        p: { xs: 1, md: 1.5 },
        borderRadius: "16px",
        boxSizing: "border-box",
      }}
    >
      {/* SEARCH TOOLBAR */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flexWrap: "wrap",
          p: 1.5,
          mb: 1.5,
          border: "1px solid #E6EFEB",
          borderRadius: "14px",
          bgcolor: "#FFFFFF",
        }}
      >
        <TextField
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPaginationModel((prev) => ({ ...prev, page: 0 }));
          }}
          placeholder="ค้นหา เลขที่เรื่อง, ชื่อผู้ร้องเรียน, รายละเอียด..."
          size="small"
          sx={{
            flex: "2 1 300px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "#FFFFFF",
              height: 44,
              "& fieldset": { borderColor: "#DFE9F1" },
              "&:hover fieldset": { borderColor: "#9CCABB" },
              "&.Mui-focused fieldset": {
                borderColor: "#13865F",
              },
            },
            "& input": { fontSize: 13 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ color: "#607894" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          type="date"
          label="วันที่เริ่มต้น"
          value={dateFrom}
          onChange={(event) => {
            setDateFrom(event.target.value);
            setPaginationModel((prev) => ({ ...prev, page: 0 }));
          }}
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{
            flex: "1 1 140px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              height: 44,
              bgcolor: "#FFFFFF",
              "& fieldset": { borderColor: "#DFE9F1" },
            },
            "& input": { fontSize: 12 },
          }}
        />

        <TextField
          type="date"
          label="วันที่สิ้นสุด"
          value={dateTo}
          onChange={(event) => {
            setDateTo(event.target.value);
            setPaginationModel((prev) => ({ ...prev, page: 0 }));
          }}
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{
            flex: "1 1 140px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              height: 44,
              bgcolor: "#FFFFFF",
              "& fieldset": { borderColor: "#DFE9F1" },
            },
            "& input": { fontSize: 12 },
          }}
        />

        <TextField
          select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value);
            setPaginationModel((prev) => ({ ...prev, page: 0 }));
          }}
          size="small"
          sx={{
            flex: "1 1 145px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              height: 44,
              bgcolor: "#FFFFFF",
              "& fieldset": { borderColor: "#DFE9F1" },
            },
            "& .MuiSelect-select": { fontSize: 12 },
          }}
        >
          <MenuItem value="all">ทุกสถานะ</MenuItem>
          <MenuItem value="null">ข้อร้องเรียนใหม่</MenuItem>
          <MenuItem value="1">รอตอบกลับ</MenuItem>
          <MenuItem value="2">ตอบกลับเรียบร้อย</MenuItem>
          <MenuItem value="3">วิเคราะห์แล้ว</MenuItem>
          <MenuItem value="4">เสร็จสมบูรณ์</MenuItem>
        </TextField>

        <TextField
          select
          value={typeFilter}
          onChange={(event) => {
            setTypeFilter(event.target.value);
            setPaginationModel((prev) => ({ ...prev, page: 0 }));
          }}
          size="small"
          sx={{
            flex: "1 1 125px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              height: 44,
              bgcolor: "#FFFFFF",
              "& fieldset": { borderColor: "#DFE9F1" },
            },
            "& .MuiSelect-select": { fontSize: 12 },
          }}
        >
          <MenuItem value="all">ทุกประเภท</MenuItem>
          <MenuItem value="0">OPD</MenuItem>
          <MenuItem value="1">IPD</MenuItem>
        </TextField>

        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={handleAddItem}
          sx={{
            minWidth: 175,
            height: 44,
            borderRadius: "999px",
            bgcolor: "#087653",
            fontWeight: 800,
            fontSize: 13,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#066346",
              boxShadow: "0 4px 12px rgba(8,118,83,.18)",
            },
          }}
        >
          เพิ่มข้อร้องเรียน
        </Button>

        {(search || dateFrom || dateTo ||
          statusFilter !== "all" || typeFilter !== "all") && (
          <Button
            onClick={resetFilters}
            sx={{
              color: "#64748B",
              textTransform: "none",
              fontSize: 12,
              whiteSpace: "nowrap",
            }}
          >
            ล้างตัวกรอง
          </Button>
        )}
      </Paper>

      {/* DATA TABLE */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          border: "1px solid #E4ECE8",
          borderRadius: "14px",
          overflow: "hidden",
          bgcolor: "#FFFFFF",
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={columns}
          loading={loading}
          getRowClassName={getRowClassName}
          getRowHeight={() => "auto"}
          density="standard"
          autoHeight
          pagination
          paginationMode="client"
          pageSizeOptions={[5, 10, 20, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          disableColumnMenu
          initialState={{
            columns: {
              columnVisibilityModel: {
                all_persons: false,
              },
            },
          }}
          localeText={{
            noRowsLabel: "ไม่พบรายการ",
            noResultsOverlayLabel: "ไม่พบข้อมูลที่ตรงกับเงื่อนไข",
            footerRowSelected: (count) => `${count} รายการที่เลือก`,
            footerTotalRows: "รายการทั้งหมด:",
            MuiTablePagination: {
              labelRowsPerPage: "รายการต่อหน้า",
              labelDisplayedRows: ({ from, to, count }) =>
                `แสดง ${from} - ${to} จาก ${
                  count !== -1 ? count : `มากกว่า ${to}`
                } รายการ`,
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

              "&.row-progress::before": {
                bgcolor: "#0EA5E9",
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

            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
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
          }}
        />
      </Paper>

      <TextDetailDialog
        open={Boolean(selectedText)}
        onClose={() => setSelectedText(null)}
        title="สรุปสาระที่ร้องเรียน"
        text={selectedText?.text}
        reportId={selectedText?.reportId}
      />
    </Box>
  );
};

export default DataTable;
