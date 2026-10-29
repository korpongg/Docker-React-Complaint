import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const TextDetailDialog = ({
  open,
  onClose,
  title = "สรุปสาระที่ร้องเรียน",
  text,
  summarize,
  reportId,
}) => {
  const [showOriginal, setShowOriginal] = React.useState(false);

  React.useEffect(() => {
    if (!open) setShowOriginal(false);
  }, [open]);

  const summaryText = String(text ?? "").trim();
  const originalText = String(summarize ?? "").trim();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          bgcolor: "#ffffff",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.16)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ px: 3, py: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                bgcolor: "#f7ecd0",
                color: "#98701c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArticleOutlinedIcon />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "#1e293b",
                }}
              >
                {title}
              </Typography>

              <Typography
                sx={{ mt: 0.4, fontSize: "0.8rem", color: "#64748b" }}
              >
                {reportId ? `เลขที่รายงาน ${reportId}` : "รายละเอียดข้อร้องเรียน"}
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={onClose}
            aria-label="ปิด"
            sx={{
              color: "#64748b",
              "&:hover": { bgcolor: "#f1f5f9" },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ borderColor: "#edf0f4" }} />

      {/* Main content */}
      <DialogContent
        sx={{
          px: { xs: 2, sm: 3 },
          py: 3,
          bgcolor: "#f8fafc",
        }}
      >
        <Box
          sx={{
            bgcolor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* Content heading and action */}
          <Box
            sx={{
              px: 2.5,
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1.5,
              borderBottom: "1px solid #edf0f4",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#334155",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                }}
              >
                บันทึกการสืบความของผู้รับข้อร้องเรียน

              </Typography>

          
            </Box>

            <Button
              variant="outlined"
              startIcon={<VisibilityOutlinedIcon />}
              onClick={() => setShowOriginal((prev) => !prev)}
              sx={{
                borderRadius: "9px",
                px: 1.8,
                py: 0.9,
                fontSize: "0.82rem",
                fontWeight: 700,
                textTransform: "none",
                whiteSpace: "nowrap",
                color: showOriginal ? "#334155" : "#98701c",
                borderColor: showOriginal ? "#cbd5e1" : "#d9bd77",
                bgcolor: showOriginal ? "#f8fafc" : "#fffdf7",
                "&:hover": {
                  bgcolor: "#f7ecd0",
                  borderColor: "#c5a34d",
                },
              }}
            >
              {showOriginal ? "ซ่อนข้อร้องเรียนต้นฉบับ" : "ดูข้อร้องเรียนต้นฉบับ"}
            </Button>
          </Box>

          {/* Summary */}
          <Box
            sx={{
              px: { xs: 2, sm: 3 },
              py: 3,
              minHeight: 160,
              color: summaryText ? "#334155" : "#94a3b8",
              fontSize: "0.95rem",
              lineHeight: 2,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
            }}
          >
            {summaryText || "ยังไม่มีข้อมูลสรุปสาระที่ร้องเรียน"}
          </Box>

          {/* Original complaint - shown when clicking button */}
          {showOriginal && (
            <>
              <Divider sx={{ borderColor: "#e2e8f0" }} />

              <Box sx={{ px: { xs: 2, sm: 3 }, py: 2.5, bgcolor: "#fffcf5" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <VisibilityOutlinedIcon
                    sx={{ fontSize: 20, color: "#98701c" }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      color: "#725719",
                    }}
                  >
                    ข้อร้องเรียนต้นฉบับ
                  </Typography>

                  <Chip
                    label="Original"
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      bgcolor: "#f7ecd0",
                      color: "#896719",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    color: originalText ? "#475569" : "#94a3b8",
                    fontSize: "0.92rem",
                    lineHeight: 1.9,
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                  }}
                >
                  {originalText || "ไม่มีข้อมูลข้อร้องเรียนต้นฉบับ"}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid #edf0f4",
          bgcolor: "#ffffff",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            px: 3,
            py: 1,
            borderRadius: "9px",
            fontWeight: 700,
            textTransform: "none",
            bgcolor: "#1e293b",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#334155",
              boxShadow: "none",
            },
          }}
        >
          ปิดหน้าต่าง
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextDetailDialog;