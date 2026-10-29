import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        maxWidth: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        boxSizing: "border-box",



        mt: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",

          px: { xs: 2, md: 4 },
          py: 2.5,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "Mali, sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "#064E3B",
            }}
          >
            Complaint & Suggestion System
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              fontFamily: "Mali, sans-serif",
              fontSize: "11px",
              color: "#7B8794",
            }}
          >
            ระบบการร้องเรียนและข้อเสนอแนะ

          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Mali, sans-serif",
              fontSize: "11px",
              color: "#8A949E",
            }}
          >
            © 2026
          </Typography>

          <Box
            sx={{
              width: "1px",
              height: "16px",
              background: "#D5DDD9",
            }}
          />

          <Typography
            sx={{
              fontFamily: "Mali, sans-serif",
              fontSize: "11px",
              color: "#8A949E",
            }}
          >
            Version 1.0.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;