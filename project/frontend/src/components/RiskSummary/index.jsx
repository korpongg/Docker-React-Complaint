// RiskDashboard.jsx

import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// =====================================================
// Default data
// =====================================================
const EMPTY_DATA = {
  overview: {
    total: 0,
    notComplaint: 0,
    pending: 0,
    waitingResponse: 0,
    responded: 0,
    analyzed: 0,
    completed: 0,
    processing: 0,
  },
  statistics: {
    total: 0,
    processing: 0,
    completed: 0,
    avgCloseDays: null,
  },
  factions: [],
  departments: [],
  status: [],
  monthlyTrend: [],
  severityBreakdown: [],
  departmentBreakdown: [],
  followUpItems: [],
};
import {
  severityLevels,
   severityLevels2,
  generalRiskOptions,
  clinicalRiskOptions,
  complaintCategoryOptions,
} from "../../data/form/DataDict_Risk.jsx";
// =====================================================
// Color palette
// =====================================================
const COLORS = {
  navy: "#1E293B",

  // Gold
  gold: "#C59624",
  goldLight: "#FBF4E4",
  goldGradientStart: "#E5BD5C",

  // Action colors
  green: "#16A34A",
  greenLight: "#ECFDF3",
  greenBorder: "#86CDA5",

  orange: "#EA580C",
  orangeLight: "#FFF7ED",
  orangeBorder: "#FDBA74",

  blue: "#2563EB",
  blueLight: "#EFF6FF",
  blueBorder: "#8AB4F8",

  red: "#DC2626",
  redLight: "#FEF2F2",
  redBorder: "#FCA5A5",

  yellow: "#CA8A04",
  yellowLight: "#FEFCE8",
  yellowBorder: "#FACC15",

  purple: "#7E22CE",
  purpleLight: "#FAF5FF",

  muted: "#64748B",
  border: "#E2E8F0",
  background: "#F8FAFC",
};

// =====================================================
// Formatters
// =====================================================
const numberFormat = (value) =>
  new Intl.NumberFormat("th-TH").format(Number(value) || 0);

const dateFormat = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// =====================================================
// Get risk color by risk code
// รองรับทั้งระดับทั่วไป 1–5 และทางคลินิก A–I
// =====================================================
const getRiskColor = (value) => {
  const code = String(value ?? "").trim().toUpperCase();

  const generalRisk = generalRiskOptions.find(
    (item) => item.value === code,
  );

  if (generalRisk) {
    return {
      color: generalRisk.color,
      bg: generalRisk.bg,
      label: generalRisk.label,
    };
  }

  const clinicalRisk = severityLevels2.find(
    (item) => item.code === code,
  );

  if (clinicalRisk) {
    return {
      color: clinicalRisk.color,
      bg: clinicalRisk.bg,
      label: clinicalRisk.label,
    };
  }

  return {
    color: COLORS.muted,
    bg: "#F1F5F9",
    label: "ไม่ระบุ",
  };
};

// แสดงรหัสพร้อมคำอธิบายระดับความเสี่ยง
const getRiskLabel = (value) => {
  const code = String(value ?? "").trim().toUpperCase();

  const generalRisk = generalRiskOptions.find(
    (item) => item.value === code,
  );

  if (generalRisk) {
    return `${generalRisk.label}`;
  }

  const clinicalRisk = severityLevels2.find(
    (item) => item.code === code,
  );

  if (clinicalRisk) {
    return `${code} - ${clinicalRisk.label}`;
  }

  return value || "ไม่ระบุ";
};

// =====================================================
// Status colors
// ใช้สีแยกตามขั้นตอนการจัดการ
// =====================================================
const statusColor = (label) => {
  const text = String(label || "");
  if (text.includes("เสร็จ")) {
    return {
      color: COLORS.green,
      bg: COLORS.greenLight,
    };
  }

  if (text.includes("วิเคราะห์")) {
    return {
       color: '#15803D',
      bg: '#F0FDF4',
    };
  }
 if (text.includes("รอตอบกลับ")) {
    return {
      color: "#475569",
      bg: "#F1F5F9",
    };
  }

  if (text.includes("ตอบกลับ")) {
    return {
      color: '#0284C7',
      bg: '#E0F2FE',
    };
  }

  if (text.includes("ใหม่") ) {
    return {
      color: "#DC2626",
      bg: "#FEE2E2",
    };
  }


  return {
    color:'#EA580C',
    bg: "#FFF7ED",
  };
};

// =====================================================
// Section title
// =====================================================
function SectionTitle({ icon: Icon, title, subtitle, action }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent="space-between"
      spacing={1.5}
      sx={{ mb: 2.5 }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "13px",
            bgcolor: COLORS.greenLight,
            color: COLORS.green,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={21} />
        </Box>

        <Box>
          <Typography
            sx={{
              color: COLORS.navy,
              fontWeight: 800,
              fontSize: "1.05rem",
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              sx={{
                color: COLORS.muted,
                fontSize: "0.82rem",
                mt: 0.3,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>

      {action}
    </Stack>
  );
}

// =====================================================
// KPI Card
// =====================================================
function KpiCard({ title, value, subtitle, icon: Icon, color, bg }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "18px",
        bgcolor: "#FFFFFF",
        transition: "transform .2s ease, box-shadow .2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 28px rgba(15,23,42,.07)",
        },
      }}
    >
      <CardContent sx={{ p: "20px !important" }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: COLORS.muted,
                fontWeight: 600,
                fontSize: "0.86rem",
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 1.1,
                fontSize: { xs: "1.65rem", md: "2rem" },
                fontWeight: 800,
                lineHeight: 1.2,
                color: COLORS.navy,
                overflowWrap: "anywhere",
              }}
            >
              {numberFormat(value)}
            </Typography>

            {subtitle && (
              <Typography
                sx={{
                  mt: 1,
                  color: COLORS.muted,
                  fontSize: "0.77rem",
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "15px",
              bgcolor: bg,
              color,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={23} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// =====================================================
// Empty state
// =====================================================
function EmptyState({ text = "ไม่มีข้อมูลในเงื่อนไขที่เลือก" }) {
  return (
    <Box
      sx={{
        py: 5,
        px: 2,
        textAlign: "center",
        color: COLORS.muted,
      }}
    >
      <FileText size={28} style={{ opacity: 0.5 }} />
      <Typography sx={{ mt: 1, fontSize: "0.88rem" }}>
        {text}
      </Typography>
    </Box>
  );
}

// =====================================================
// Monthly chart
// คงกราฟเดิม ใช้โทนสีทอง
// =====================================================
function MonthlyChart({ data }) {
  const maxValue = Math.max(
    1,
    ...(data || []).map((item) => Number(item.total) || 0),
  );

  if (!data?.length) {
    return <EmptyState text="ยังไม่มีข้อมูลแนวโน้มรายเดือน" />;
  }

  return (
    <Box sx={{ pt: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: { xs: 0.75, sm: 1.5 },
          height: 230,
          px: { xs: 0, sm: 1 },
          pb: 1,
          overflowX: "auto",
        }}
      >
        {data.map((item) => {
          const value = Number(item.total) || 0;
          const height = Math.max(5, (value / maxValue) * 170);

          return (
            <Box
              key={item.month}
              sx={{
                flex: "1 0 34px",
                minWidth: 30,
                maxWidth: 80,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
              }}
              title={`${item.label}: ${numberFormat(value)} รายการ`}
            >
              <Typography
                sx={{
                  color: COLORS.navy,
                  fontWeight: 700,
                  fontSize: "0.72rem",
                }}
              >
                {numberFormat(value)}
              </Typography>

              <Box
                sx={{
                  width: "min(100%, 38px)",
                  height,
                  minHeight: 5,
                  borderRadius: "8px 8px 3px 3px",
                  background: `linear-gradient(180deg, ${COLORS.goldGradientStart} 0%, ${COLORS.green} 100%)`,
                  transition: "height .3s ease",
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.69rem",
                  color: COLORS.muted,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// =====================================================
// Horizontal breakdown
// เปลี่ยนสีตามรหัสความเสี่ยง หาก label เป็น 1–5 หรือ A–I
// หากเป็นชื่อประเภทอื่น จะใช้สีทอง/เทาเหมือนเดิม
// =====================================================
function HorizontalBreakdown({
  rows,
  nameKey,
  countKey = "count",
  riskType = false,
}) {
  const maxValue = Math.max(
    1,
    ...(rows || []).map((item) => Number(item[countKey]) || 0),
  );

  if (!rows?.length) return <EmptyState />;

  return (
    <Stack spacing={2.1}>
      {rows.map((item, index) => {
        const count = Number(item[countKey]) || 0;
        const percent = Math.min(100, (count / maxValue) * 100);
        const label = String(item[nameKey] || "").trim();

        const riskStyle = riskType
          ? getRiskColor(label)
          : /^[1-5]$/.test(label) || /^[A-I]$/i.test(label)
            ? getRiskColor(label)
            : {
                color: index === 0 ? COLORS.green : "#94A3B8",
                bg: "#F1F5F9",
              };

        return (
          <Box key={`${item[nameKey]}-${index}`}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={1}
              sx={{ mb: 0.8 }}
            >
            <Typography
  component="div"
  sx={{
    color: COLORS.navy,
    fontSize: "0.83rem",
    fontWeight: 700,
    minWidth: 0,
    overflowWrap: "anywhere",
  }}
>
  {(() => {
    const code = String(item[nameKey] ?? "").trim().toUpperCase();
    const fullLabel = getRiskLabel(item[nameKey]);
    const description = fullLabel.startsWith(`${code} -`)
      ? fullLabel.substring(code.length + 3).trim()
      : "";

    return description ? (
      <>
        {code}
        <Box
          component="span"
          sx={{
            ml: 0.5,
            color: "#626c7aff",
            fontSize: "0.72rem",
            fontWeight: 500,
          }}
        >
          - {description}
        </Box>
      </>
    ) : (
      

       <>
        {code}
        <Box
          component="span"
          sx={{
            ml: 0.5,
            color: "#626c7aff",
            fontSize: "0.72rem",
            fontWeight: 500,
          }}
        >
          - {fullLabel}
        </Box>
      </>
    );
  })()}
</Typography>

              <Typography
                sx={{
                  color: COLORS.navy,
                  fontSize: "0.83rem",
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {numberFormat(count)}
              </Typography>
            </Stack>

            <Box
              sx={{
                height: 8,
                borderRadius: 10,
                bgcolor: "#F1F5F9",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${percent}%`,
                  height: "100%",
                  borderRadius: 10,
                  bgcolor: riskStyle.color,
                  transition: "width .3s ease",
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
// =====================================================
// Main Dashboard
// =====================================================
export default function RiskDashboard() {
  const [data, setData] = useState(EMPTY_DATA);
  const [factionId, setFactionId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [months, setMonths] = useState(12);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = useCallback(() => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      return auth?.accessToken || "";
    } catch {
      return "";
    }
  }, []);

  const fetchDashboard = useCallback(
    async ({
      selectedFaction = factionId,
      selectedDepartment = departmentId,
      selectedMonths = months,
    } = {}) => {
      setLoading(true);
      setError("");

      try {
        const token = getToken();
        const params = { months: selectedMonths };

        if (selectedFaction !== "") {
          params.factionId = selectedFaction;
        }

        if (selectedDepartment !== "") {
          params.departmentId = selectedDepartment;
        }

        const response = await axios.get(`${apiUrl}/dashboard/risk`, {
          params,
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });
console.log(response.data)
        if (!response.data?.success) {
          throw new Error(
            response.data?.message ||
              "ไม่สามารถโหลดข้อมูล Dashboard ได้",
          );
        }

        setData({
          ...EMPTY_DATA,
          ...response.data,
          overview: {
            ...EMPTY_DATA.overview,
            ...(response.data.overview || {}),
          },
          statistics: {
            ...EMPTY_DATA.statistics,
            ...(response.data.statistics || {}),
          },
          factions: response.data.factions || [],
          departments: response.data.departments || [],
          status: response.data.status || [],
          monthlyTrend: response.data.monthlyTrend || [],
          severityBreakdown: response.data.severityBreakdown || [],
          departmentBreakdown: response.data.departmentBreakdown || [],
          followUpItems: response.data.followUpItems || [],
        });
      } catch (err) {
        console.error("Risk Dashboard:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "เกิดข้อผิดพลาดในการโหลดข้อมูล",
        );
      } finally {
        setLoading(false);
      }
    },
    [departmentId, factionId, getToken, months],
  );

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const overview = data.overview || EMPTY_DATA.overview;
  const statistics = data.statistics || EMPTY_DATA.statistics;

  const selectedFactionName = useMemo(() => {
    return (
      data.factions.find(
        (item) => String(item.id) === String(factionId),
      )?.name || "ทุกสังกัด"
    );
  }, [data.factions, factionId]);

  const selectedDepartmentName = useMemo(() => {
    return (
      data.departments.find(
        (item) => String(item.id) === String(departmentId),
      )?.name || "ทุกแผนก"
    );
  }, [data.departments, departmentId]);

  const resetFilters = () => {
    setFactionId("");
    setDepartmentId("");
    setMonths(12);
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        bgcolor: COLORS.background,
        p: { xs: 1.5, md: 3 },
        color: COLORS.navy,
      }}
    >
      {/* Header */}

<Box
  sx={{
    position: "relative",
    overflow: "hidden",
    borderRadius: { xs: "20px", md: "26px" },
    p: { xs: 2.5, md: 3.5 },
    mb: 3,
    color: "#FFFFFF",
    background:
      "linear-gradient(120deg, #102B24 0%, #174C3B 62%, #286B4D 100%)",
  }}
>
  <Box
    sx={{
      position: "absolute",
      width: 220,
      height: 220,
      right: -55,
      top: -100,
      borderRadius: "50%",
      border: "1px solid rgba(220,255,232,.16)",
    }}
  />

  <Stack
    direction={{ xs: "column", sm: "row" }}
    justifyContent="space-between"
    alignItems={{ xs: "flex-start", sm: "center" }}
    spacing={2}
    sx={{ position: "relative", zIndex: 1 }}
  >
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <ShieldCheck size={22} color="#86EFAC" />

        <Typography
          sx={{
            color: "#A7F3C0",
            fontWeight: 800,
            fontSize: "0.78rem",
            letterSpacing: 1.2,
          }}
        >
          QUALITY & RISK MANAGEMENT
        </Typography>
      </Stack>

      <Typography
        sx={{
          mt: 1,
          fontSize: { xs: "1.6rem", md: "2.1rem" },
          fontWeight: 900,
          letterSpacing: "-0.5px",
        }}
      >
        Risk Dashboard
      </Typography>

      <Typography
        sx={{
          mt: 0.8,
          color: "rgba(255,255,255,.76)",
          fontSize: "0.88rem",
        }}
      >
        ภาพรวมและแนวโน้มข้อร้องเรียนตามสังกัดและแผนก
      </Typography>
    </Box>

    <Button
      onClick={() => fetchDashboard()}
      startIcon={<RefreshCw size={17} />}
      variant="outlined"
      sx={{
        color: "#FFFFFF",
        borderColor: "rgba(220,255,232,.35)",
        borderRadius: "12px",
        px: 2,
        py: 1,
        textTransform: "none",
        fontWeight: 700,
        "&:hover": {
          borderColor: "#86EFAC",
          bgcolor: "rgba(134,239,172,.10)",
        },
      }}
    >
      รีเฟรชข้อมูล
    </Button>
  </Stack>
</Box>


      {/* Filters */}
      <Card
        elevation={0}
        sx={{
          border: `1px solid ${COLORS.border}`,
          borderRadius: "20px",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 2 }}
          >
            <Activity size={19} color={COLORS.green} />

            <Typography sx={{ fontWeight: 800 }}>
              ตัวกรองข้อมูล
            </Typography>

            {loading && (
              <CircularProgress size={16} sx={{ ml: 1 }} />
            )}
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "1.2fr 1.2fr 0.8fr auto",
              },
              gap: 1.5,
              alignItems: "center",
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel id="risk-faction-label">สังกัด</InputLabel>

              <Select
                labelId="risk-faction-label"
                value={factionId}
                label="สังกัด"
                onChange={(event) => {
                  setFactionId(event.target.value);
                  setDepartmentId("");
                }}
              >
                <MenuItem value="">ทุกสังกัด</MenuItem>

                {data.factions.map((item) => (
                  <MenuItem key={item.id} value={String(item.id)}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="risk-department-label">แผนก</InputLabel>

              <Select
                labelId="risk-department-label"
                value={departmentId}
                label="แผนก"
                onChange={(event) => {
                  setDepartmentId(event.target.value);
                }}
              >
                <MenuItem value="">ทุกแผนก</MenuItem>

                {data.departments.map((item) => (
                  <MenuItem key={item.id} value={String(item.id)}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="risk-months-label">ช่วงเวลา</InputLabel>

              <Select
                labelId="risk-months-label"
                value={months}
                label="ช่วงเวลา"
                onChange={(event) => {
                  setMonths(Number(event.target.value));
                }}
              >
                <MenuItem value={3}>ย้อนหลัง 3 เดือน</MenuItem>
                <MenuItem value={6}>ย้อนหลัง 6 เดือน</MenuItem>
                <MenuItem value={9}>ย้อนหลัง 9 เดือน</MenuItem>
                <MenuItem value={12}>ย้อนหลัง 12 เดือน</MenuItem>
              </Select>
            </FormControl>

            <Button
              onClick={resetFilters}
              variant="outlined"
              sx={{
                minHeight: 40,
                borderColor: COLORS.border,
                color: COLORS.navy,
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: COLORS.green,
                  bgcolor: COLORS.greenLight,
                },
              }}
            >
              ล้างตัวกรอง
            </Button>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ mt: 2 }}
          >
            <Chip
              size="small"
              icon={<Building2 size={14} />}
              label={selectedFactionName}
              sx={{
                bgcolor: COLORS.greenLight,
                color: "#805D13",
              }}
            />

            <Chip
              size="small"
              label={selectedDepartmentName}
              sx={{
                bgcolor: "#F1F5F9",
                color: COLORS.navy,
              }}
            />

            <Chip
              size="small"
              icon={<CalendarDays size={14} />}
              label={`ย้อนหลัง ${months} เดือน`}
              sx={{
                bgcolor: COLORS.blueLight,
                color: COLORS.blue,
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: "14px" }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => fetchDashboard()}
            >
              ลองอีกครั้ง
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* KPI */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <KpiCard
          title="รายงานทั้งหมด"
          value={statistics.total}
          subtitle="ภายใต้ตัวกรองที่เลือก"
          icon={FileText}
          color={COLORS.blue}
          bg={COLORS.blueLight}
        />

        <KpiCard
          title="กำลังดำเนินการ"
          value={statistics.processing}
          subtitle="ข้อร้องเรียนที่ยังอยู่ระหว่างดำเนินการ"
          icon={Clock3}
          color={COLORS.orange}
          bg={COLORS.orangeLight}
        />

        <KpiCard
          title="เสร็จสิ้น"
          value={statistics.completed}
          subtitle="รายการที่มีสถานะเสร็จสิ้น"
          icon={CheckCircle2}
          color={'#15803D'}
          bg={'#F0FDF4'}
        />

        <KpiCard
          title="ไม่ใช่ข้อร้องเรียน"
          value={overview.notComplaint}
          subtitle="แยกจากข้อร้องเรียนปกติ"
          icon={AlertTriangle}
          color={'#EA580C'}
          bg={'#FFF7ED'}
        />
      </Box>

      {/* Monthly trend */}
      <Card
        elevation={0}
        sx={{
          border: `1px solid ${COLORS.border}`,
          borderRadius: "20px",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
          <SectionTitle
            icon={BarChart3}
            title="แนวโน้มข้อร้องเรียนรายเดือน"
            subtitle="จำนวนรายงานที่เกิดขึ้นในแต่ละเดือนตามตัวกรองปัจจุบัน"
          />

          {loading ? (
            <Box sx={{ py: 7, textAlign: "center" }}>
              <CircularProgress size={28} />
            </Box>
          ) : (
            <MonthlyChart data={data.monthlyTrend} />
          )}
        </CardContent>
      </Card>

      {/* Status + categories */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
          mb: 3,
          alignItems: "stretch",
        }}
      >
        {/* Status */}
        <Card
          elevation={0}
          sx={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: "20px",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
            <SectionTitle
              icon={Activity}
              title="สถานะข้อร้องเรียน"
              subtitle="จำนวนรายการแยกตามสถานะ"
            />

            {loading ? (
              <Box sx={{ py: 5, textAlign: "center" }}>
                <CircularProgress size={28} />
              </Box>
            ) : (
              <Stack spacing={2}>
                {data.status.map((item) => {
                  const count = Number(item.count) || 0;

                  const max = Math.max(
                    1,
                    ...data.status.map(
                      (row) => Number(row.count) || 0,
                    ),
                  );

                  const color = statusColor(item.label);

                  return (
                    <Box key={item.key}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 0.8 }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ minWidth: 0 }}
                        >
                          <Box
                            sx={{
                              width: 9,
                              height: 9,
                              borderRadius: "50%",
                              bgcolor: color.color,
                              flexShrink: 0,
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: "0.84rem",
                              color: COLORS.navy,
                              fontWeight: 600,
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Stack>

                        <Typography
                          sx={{
                            fontSize: "0.84rem",
                            color: COLORS.navy,
                            fontWeight: 800,
                          }}
                        >
                          {numberFormat(count)}
                        </Typography>
                      </Stack>

                      <Box
                        sx={{
                          height: 8,
                          borderRadius: 8,
                          bgcolor: "#F1F5F9",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${Math.min(
                              100,
                              (count / max) * 100,
                            )}%`,
                            height: "100%",
                            bgcolor: color.color,
                            borderRadius: 8,
                            transition: "width .3s ease",
                          }}
                        />
                      </Box>
                    </Box>
                  );
                })}

                {!data.status.length && <EmptyState />}
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Categories */}
        <Card
          elevation={0}
          sx={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: "20px",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
            <SectionTitle
           icon={FileText}
  title="ความเสี่ยงทางคลินิก"
  subtitle="จำนวนรายงานแยกตามระดับความเสี่ยง ตั้งแต่ระดับ A–H"
            />

            {loading ? (
              <Box sx={{ py: 5, textAlign: "center" }}>
                <CircularProgress size={28} />
              </Box>
            ) : (
              <HorizontalBreakdown
                rows={data.severityBreakdown}
                nameKey="label"
              />
            )}
          </CardContent>
        </Card>
      </Box>

         <Card
          elevation={0}
          sx={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: "20px",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
            <SectionTitle
              icon={ShieldCheck}
  title="ความเสี่ยงทั่วไป"
  subtitle="จำนวนรายงานแยกตามระดับความเสี่ยง ตั้งแต่ระดับ 1–5"
            />

            {loading ? (
              <Box sx={{ py: 5, textAlign: "center" }}>
                <CircularProgress size={28} />
              </Box>
            ) : (
            <HorizontalBreakdown
  rows={data.generalRiskBreakdown}
    nameKey="label"
  countKey="count"
  riskType={true}
/>
            )}
          </CardContent>
        </Card>

      {/* Follow-up: คงไว้ตามโค้ดเดิม แต่ซ่อนเหมือนเดิม */}
      <Card
        elevation={0}
        sx={{
          border: `1px solid ${COLORS.border}`,
          borderRadius: "20px",
          mb: 3,
          display: "none",
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
          <SectionTitle
            icon={Clock3}
            title="รายการที่ต้องติดตาม"
            subtitle="รายการที่ยังไม่เสร็จสิ้นและมีวันครบกำหนดตอบกลับ"
          />

          {loading ? (
            <Box sx={{ py: 5, textAlign: "center" }}>
              <CircularProgress size={28} />
            </Box>
          ) : data.followUpItems.length ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F8FAFC" }}>
                    <TableCell sx={{ fontWeight: 800 }}>
                      เลขที่รายงาน
                    </TableCell>

                    <TableCell sx={{ fontWeight: 800 }}>
                      แผนก
                    </TableCell>

                    <TableCell sx={{ fontWeight: 800 }}>
                      วันครบกำหนด
                    </TableCell>

                    <TableCell sx={{ fontWeight: 800 }}>
                      สถานะ
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.followUpItems.map((item, index) => {
                    const color = statusColor(item.statusLabel);

                    return (
                      <TableRow
                        key={`${item.reportid}-${index}`}
                        hover
                      >
                        <TableCell sx={{ fontWeight: 700 }}>
                          {item.reportid}
                        </TableCell>

                        <TableCell>
                          {item.department || "ไม่ระบุแผนก"}
                        </TableCell>

                        <TableCell>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            useFlexGap
                            flexWrap="wrap"
                          >
                            <span>{dateFormat(item.dueDate)}</span>

                            {item.overdue && (
                              <Chip
                                size="small"
                                label="เกินกำหนด"
                                sx={{
                                  color: COLORS.red,
                                  bgcolor: COLORS.redLight,
                                  fontWeight: 700,
                                }}
                              />
                            )}
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Chip
                            size="small"
                            label={item.statusLabel}
                            sx={{
                              color: color.color,
                              bgcolor: color.bg,
                              fontWeight: 700,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <EmptyState text="ไม่มีรายการที่ต้องติดตามในเงื่อนไขที่เลือก" />
          )}
        </CardContent>
      </Card>

      {/* Footer note */}
      <Divider sx={{ borderColor: COLORS.border, mb: 2 }} />

      <Typography
        sx={{
          textAlign: "center",
          fontSize: "0.76rem",
          color: COLORS.muted,
          pb: 1,
        }}
      >
        ข้อมูลที่แสดง: {selectedFactionName} / {selectedDepartmentName} ·
        ย้อนหลัง {months} เดือน
      </Typography>
    </Box>
  );
}