
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

import {
  CircleAlert,
  ClipboardCheck,
  MessageSquareReply,
  FileCheck2,
} from "lucide-react";
import {
  BadgeAlert,
  ShieldCheck,
  Send,
  ChartColumn,
} from "lucide-react";
const Workflow = ({
  reportid,
  activeStep = 0,
  onStepClick,
  stepflow,
}) => {
 

  const flownum = Number(stepflow) || 1;
  const navigate = useNavigate();
  const steps = [
    {
      id: 0,
      number: "01",
      title: "ร้องเรียน",
      subtitle: "Complaint",
      icon: BadgeAlert,
      color: "#DC2626",
      lightColor: "#FFF1F1",
      borderColor: "#991B1B",
    },
    {
      id: 1,
      number: "02",
      title: "ส่งหน่วยงาน",
      subtitle: "Admin Review",
      icon: ShieldCheck,
      color: "#475569",
      lightColor: "#F4F6F8",
      borderColor: "#475569",
    },
    {
      id: 2,
      number: "03",
      title: "ตอบกลับผู้ร้องเรียน",
      subtitle: "Response",
      icon: Send,
      color: "#0284C7",
      lightColor: "#EFF8FD",
      borderColor: "#075985",
    },
    {
      id: 3,
      number: "04",
      title: "สรุปและปิดเรื่อง",
      subtitle: "Summary",
      icon: ChartColumn,
      color: "#16A34A",
      lightColor: "#F0FAF4",
      borderColor: "#166534",
    },
  ];

  return (
    <>
      {/* =========================================================
          WORKFLOW ANIMATION
      ========================================================= */}
      <style>
        {`
          @keyframes workflowPulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 var(--workflow-light);
            }

            50% {
              transform: scale(1.06);
              box-shadow: 0 0 0 8px var(--workflow-glow);
            }

            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 var(--workflow-light);
            }
          }
        `}
      </style>

      <div
        style={{
     margin: "16px 20px",
               padding: "20px 28px",
               background: "#FFFFFF",
               border: "1px solid #E5E7EB",
               borderRadius: "16px",
               boxShadow: "0 8px 28px rgba(30,35,30,.06)",
               position: "relative",
        }}
      >
        {/* =========================================================
            DOCUMENT NUMBER
        ========================================================= */}
  <IconButton
            onClick={() => navigate(-1)}
            size="small"
            sx={{
              position: "absolute",
              left: 18,
              top: 18,
              color: "#64748B",
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
              "&:hover": {
                color: "#A16207",
                borderColor: "#A16207",
                background: "#FFFBEB",
              },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              color: "#64748B",
              fontWeight: 600,
            }}
          >
            หมายเลขเอกสาร :
          </span>

          <span
            style={{
              fontSize: "15px",
              color: "#1F2937",
              fontWeight: 800,
              letterSpacing: "0.6px",
            }}
          >
            {reportid}
          </span>
        </div>

        {/* =========================================================
            WORKFLOW HINT
        ========================================================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            marginBottom: "18px",
            color: "#64748B",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              fontSize: "13px",
            }}
          >
            👆
          </span>

          <span>คลิกที่รูปขั้นตอนเพื่อดูรายละเอียด</span>
        </div>

        {/* =========================================================
            WORKFLOW
        ========================================================= */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            /*
             * ขั้นตอนที่ผู้ใช้กำลังเปิดอยู่
             */
            const isActive = activeStep === step.id;

            /*
             * ขั้นตอนที่ดำเนินการผ่านมาแล้ว
             *
             * เช่น flownum = 4
             *
             * Step 01 -> 0 < 4  = ผ่าน
             * Step 02 -> 1 < 4  = ผ่าน
             * Step 03 -> 2 < 4  = ผ่าน
             * Step 04 -> 3 < 4  = ผ่าน
             */
            const isPassed = step.id < flownum;

            /*
             * แสดงเป็นสีเต็มเมื่อ:
             * - เป็น Step ปัจจุบัน
             * - หรือเป็น Step ที่ทำผ่านมาแล้ว
             */
            const isVisible = isActive || isPassed;

            return (
              <React.Fragment key={step.id}>
                {/* =================================================
                    STEP
                ================================================= */}
                <div
                  onClick={() => {
                    if (typeof onStepClick === "function") {
                      onStepClick(step.id);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.filter = "brightness(0.98)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.filter = "none";
                  }}
                  title={`คลิกเพื่อดูรายละเอียดขั้นตอน ${step.number} ${step.title}`}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    opacity: isVisible ? 1 : 0.65,
                    transition: "all 0.2s ease",
                    padding: "8px 4px",
                    borderRadius: "12px",
                  }}
                >
                  {/* =================================================
                      ICON
                  ================================================= */}
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      background: isVisible
                        ? step.color
                        : "#F8FAFC",

                      border: `2px solid ${
                        isVisible
                          ? step.borderColor
                          : "#CBD5E1"
                      }`,

                      boxShadow: isActive
                        ? `0 0 0 6px ${step.lightColor}`
                        : "0 2px 5px rgba(15, 23, 42, 0.08)",

                      animation: isActive
                        ? "workflowPulse 1.8s ease-in-out infinite"
                        : "none",

                      "--workflow-light": step.lightColor,
                      "--workflow-glow": `${step.color}33`,

                      transition: "all 0.2s ease",
                    }}
                  >
                    <Icon
                      size={23}
                      strokeWidth={2.2}
                      color={
                        isVisible
                          ? "#FFFFFF"
                          : "#94A3B8"
                      }
                    />
                  </div>

                  {/* =================================================
                      NUMBER
                  ================================================= */}
                  <div
                    style={{
                      marginTop: "9px",
                      fontSize: "10px",
                      fontWeight: 800,

                      color: isVisible
                        ? step.color
                        : "#94A3B8",

                      letterSpacing: "1px",
                    }}
                  >
                    {step.number}
                  </div>

                  {/* =================================================
                      TITLE
                  ================================================= */}
                  <div
                    style={{
                      marginTop: "3px",
                      fontSize: "13px",
                      fontWeight: 700,

                      color: isVisible
                        ? "#1F2937"
                        : "#94A3B8",

                      textAlign: "center",
                    }}
                  >
                    {step.title}
                  </div>

                  {/* =================================================
                      SUBTITLE
                  ================================================= */}
                  <div
                    style={{
                      marginTop: "2px",
                      fontSize: "10px",

                      color: isVisible
                        ? "#64748B"
                        : "#94A3B8",

                      textAlign: "center",
                    }}
                  >
                    {step.subtitle}
                  </div>
                </div>

                {/* =================================================
                    CONNECTOR
                ================================================= */}
                {index < steps.length - 1 && (
                  <div
                    style={{
                      flex: "0 0 10%",
                      height: "2px",
                      marginTop: "25px",

                      background:
                        flownum > index + 1
                          ? steps[index].borderColor
                          : "#E2E8F0",

                      transition: "all 0.2s ease",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* =========================================================
            CURRENT STEP
        ========================================================= */}
        <div
          style={{
            marginTop: "22px",
            paddingTop: "15px",
            borderTop: "1px solid #F1F5F9",

            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: "#64748B",
            }}
          >
            ขั้นตอนปัจจุบัน :
          </span>

          <span
            style={{
              marginLeft: "5px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#9A6D08",
            }}
          >
            {steps[activeStep]?.title}
          </span>
        </div>
      </div>
    </>
  );
};

export default Workflow;

