import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

import ConfirmDialog from "./ConfirmDialog";
import NavFormStyle from "../../styles/NavFormStyle.style";


const NavForm = ({
  Mode,
  Data,
  Access,
  submitfunction,
  handleSubmitEdit,
  Stage,
  MaxStage,
  text,
  FirstStage,
  LastStage,
  PrevStage,
  NextStage,
  ToStage,
}) => {

  /* =====================================================
     ACTION CONFIG
     
     ใช้ text เป็นตัวระบุว่าเป็นปุ่มของ Workflow ไหน
  ===================================================== */

  const getActionConfig = () => {

    const actionText = text || "";

    /* 01 ร้องเรียน */
    if (
      actionText.includes("บันทึกข้อร้องเรียน") ||
      actionText.includes("ร้องเรียน")
    ) {
      return {
        label: "บันทึกข้อร้องเรียน",
        icon: <ReportProblemOutlinedIcon />,
        color: "#DC2626",
        hoverColor: "#B91C1C",
        lightColor: "#FEF2F2",
        borderColor: "#FECACA",
      };
    }

    /* 02 ส่งหน่วยงาน */
    if (
      actionText.includes("ส่งหน่วยงาน") ||
      actionText.includes("Admin Review")
    ) {
      return {
        label: "ส่งหน่วยงาน",
        icon: <SendOutlinedIcon />,
        color: "#475569",
        hoverColor: "#334155",
        lightColor: "#F8FAFC",
        borderColor: "#CBD5E1",
      };
    }

    /* 03 ตอบกลับผู้ร้องเรียน */
    if (
      actionText.includes("ตอบกลับ") ||
      actionText.includes("Response")
    ) {
      return {
        label: "บันทึกการตอบกลับ",
        icon: <ReplyOutlinedIcon />,
        color: "#0284C7",
        hoverColor: "#0369A1",
        lightColor: "#F0F9FF",
        borderColor: "#BAE6FD",
      };
    }

    /* 04 สรุปและปิดเรื่อง */
    if (
    actionText.includes("สรุป") ||
  actionText.includes("ปิดเรื่อง") ||
  actionText.includes("บันทึกการวิเคราะห์") ||
  actionText.includes("Summary")
    ) {
      return {
        label: "สรุปและปิดเรื่อง",
        icon: <TaskAltOutlinedIcon />,
        color: "#16A34A",
        hoverColor: "#15803D",
        lightColor: "#F0FDF4",
        borderColor: "#BBF7D0",
      };
    }
if (
  actionText.includes("ยืนยันเสร็จสมบูรณ์") ||
  actionText.includes("ยืนยันเสร็จสมบูรณ์")
) {
  return {
    label: "ยืนยันเสร็จสมบูรณ์",
    icon: <TaskAltOutlinedIcon />,
    color: "#2f6516ff",
    hoverColor: "#255314ff",
    lightColor: "#f3fdf0ff",
    borderColor: "#86ef86ff",
  };
}
    /* fallback */
    return {
      label: actionText || "บันทึกข้อมูล",
      icon: <TaskAltOutlinedIcon />,
      color: "#475569",
      hoverColor: "#334155",
      lightColor: "#F8FAFC",
      borderColor: "#CBD5E1",
    };
  };


  const action = getActionConfig();


  return (
    <>
      <Box
        className="action-bar"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >

        {/* =================================================
            LEFT NAVIGATION
            ของเดิมคุณปิดไว้ จึงคงไว้เหมือนเดิม
        ================================================= */}

        {/*
        <span>
          {Stage > 1 ? (
            <>
              <Tooltip title="หน้าแรก">
                <IconButton
                  aria-label="first"
                  onClick={FirstStage}
                >
                  <FirstPageIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="ย้อนกลับ">
                <IconButton
                  aria-label="prev"
                  onClick={PrevStage}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="ไม่สามารถย้อนไปได้อีก">
              <IconButton aria-label="stop">
                <DoDisturbOnIcon
                  sx={{ opacity: 0.25 }}
                />
              </IconButton>
            </Tooltip>
          )}
        </span>
        */}


        {/* =================================================
            ACTION BUTTON
        ================================================= */}

        {Stage === MaxStage ? (

          Mode !== "Show" && (

            Mode === "Add" ? (

              <ConfirmDialog
                submitfunction={submitfunction}
                SubmitMode="Draft"
                Access={Access}
                Mode={Mode}

                Lable={action.label}
                Icon={action.icon}

                ButtonColor={action.color}
                ButtonHoverColor={action.hoverColor}
                ButtonBackground={action.lightColor}
                ButtonBorder={action.borderColor}
              />

            ) : (

              <ConfirmDialog
                submitfunction={handleSubmitEdit}
                Access={Access}
                Mode={Mode}
                SubmitMode="Draft"

                Lable={action.label}
                Icon={action.icon}

                ButtonColor={action.color}
                ButtonHoverColor={action.hoverColor}
                ButtonBackground={action.lightColor}
                ButtonBorder={action.borderColor}
              />

            )

          )

        ) : (

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",

              fontFamily: "Mali, sans-serif",
              fontSize: "13px",
              color: "#64748B",
            }}
          >
            Page {Stage} of {MaxStage}
          </Box>

        )}


        {/* =================================================
            RIGHT NAVIGATION
            ของเดิมคุณปิดไว้ จึงคงไว้เหมือนเดิม
        ================================================= */}

        {/*
        <span>
          {Stage === MaxStage ? (
            <Tooltip title="ไม่สามารถไปต่อได้">
              <IconButton aria-label="stop">
                <DoDisturbOnIcon
                  sx={{ opacity: 0.25 }}
                />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <Tooltip title="ต่อไป">
                <IconButton
                  aria-label="next"
                  onClick={NextStage}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="หน้าสุดท้าย">
                <IconButton
                  aria-label="last"
                  onClick={() =>
                    LastStage(MaxStage)
                  }
                >
                  <LastPageIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </span>
        */}

      </Box>
    </>
  );
};


export default NavForm;