import React from "react";
import { Box } from "@mui/material";

const ExpandableTextCell = ({ value, onClick }) => {
  const text = value || "-";

  return (
    <Box
      onClick={() => text !== "-" && onClick?.(text)}
      sx={{
        width: "100%",
        cursor: text !== "-" ? "pointer" : "default",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",

          px: 1.5,
          py: 1,

          color: "#334155",
          fontSize: "0.85rem",
          lineHeight: 1.6,

          // จำกัดไว้สูงสุด 3 บรรทัด
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",

          wordBreak: "break-word",

          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor: "#f1f5f9",
            borderColor: "#94a3b8",
            boxShadow: "0 4px 10px rgba(15,23,42,0.08)",
          },
        }}
      >
        {text}
      </Box>
    </Box>
  );
};

export default React.memo(ExpandableTextCell);