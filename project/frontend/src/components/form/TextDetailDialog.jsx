import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

const TextDetailDialog = ({
  open,
  onClose,
  title = "รายละเอียด",
  text,
  reportId,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          color: "#1e293b",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        📝 {title}

        {reportId && (
          <Box
            component="span"
            sx={{
              ml: 1,
              fontSize: "0.85rem",
              color: "#64748b",
              fontWeight: 500,
            }}
          >
            #{reportId}
          </Box>
        )}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          backgroundColor: "#f8fafc",
          py: 3,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            p: 2.5,

            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "#334155",

            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {text}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, py: 1.5 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ borderRadius: "8px", px: 3 }}
        >
          ปิด
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextDetailDialog;