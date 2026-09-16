import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeBox } from "../../styles/Home.style";
import { chkAdmins, chkAdmin } from "../../components/Function";
import { Box, Chip } from "@mui/material";
import {
  BadgeAlert,
  ShieldCheck,
  Send,
  ChartColumn,
} from "lucide-react";
import { useWebSocket } from "../../context/WebSocketContext";

const Home = () => {
  const navigate = useNavigate();
  const { requestData, menuCount } = useWebSocket();

  // =========================
  // USER DATA
  // =========================
  const userData = useMemo(() => {
    try {
      const auth = localStorage.getItem("auth");
      const data = localStorage.getItem("userData");

      if (!auth || !data) return null;

      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing userData:", error);
      return null;
    }
  }, []);

  // =========================
  // REQUEST COUNT
  // =========================
  useEffect(() => {
    if (!userData?.userid) return;

    console.log("🔥 HOME COUNT REQUEST");

    requestData("COUNT", {
      createby: userData.userid,
dep: userData.dep,
      // Permission
      userDepID: userData.DepID,
      userAffID: userData.AffID,
      userLevel: userData.level,
    });
  }, [userData, requestData]);

  // =========================
  // MENU
  // =========================
  const menus = useMemo(
    () => [
      {
        id: 1,
        title: "แบบบันทึกข้อร้องเรียน/ข้อเสนอแนะ",
        desc: "คลิกเพื่อเข้าสู่เมนู",
        icon: BadgeAlert,
        color: "#FEE2E2",
        border: "#7F1D1D",
        iconColor: "#DC2626",
        path: "/complaints",
        show: true,
        count: menuCount?.complaint ?? 0,
      },
      {
        id: 2,
        title: "แบบบันทึกของเจ้าหน้าที่บริหารความเสี่ยง (Admin)",
        desc: "คลิกเพื่อเข้าสู่เมนู",
        icon: ShieldCheck,
        color: "#F1F5F9",
        border: "#334155",
        iconColor: "#475569",
        path: "/riskmanagement",
        show: userData?.role === "2" || userData?.level === "3",
        badge: "Admin",
        badgeColor: "#334155",
        count: menuCount?.admin ?? 0,
      },
      {
        id: 3,
        title: "ตอบกลับผู้ร้องเรียน (หน่วยงาน)",
        desc: "คลิกเพื่อเข้าสู่เมนู",
        icon: Send,
        color: "#E0F2FE",
        border: "#075985",
        iconColor: "#0284C7",
        path: "/complaintresponse",
        show: true,
        badge: "หน่วยงาน",
        badgeColor: "#0284C7",
        count: menuCount?.response ?? 0,
      },
      {
        id: 4,
        title: "สรุปผลการวิเคราะห์ข้อร้องเรียน",
        desc: "คลิกเพื่อเข้าสู่เมนู",
        icon: ChartColumn,
        color: "#DCFCE7",
        border: "#14532D",
        iconColor: "#16A34A",
        path: "/summarycomplaint",
        show:
           userData?.role === "2" ||userData?.role === "3" ||  userData?.level === "2",
        badge: "ผู้บริหาร",
        badgeColor: "#16A34A",
        count: menuCount?.summary ?? 0,
      },
    ],
    [userData, menuCount]
  );

  // =========================
  // NAVIGATE
  // =========================
  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  // =========================
  // RENDER
  // =========================
  return (
    <HomeBox>
      <div className="ItemBox">
        <div className="menu-grid">
          {menus
            .filter((menu) => menu.show)
            .map((menu) => {
              const Icon = menu.icon;

              return (
                <Box
                  key={menu.id}
                  className="LinkToMNG"
                  onClick={() => handleNavigate(menu.path)}
                >
                  <div
                    className="menu-card"
                    style={{
                      position: "relative",
                      borderTop: `4px solid ${menu.border}`,
                    }}
                  >
                    {/* =========================
                        BADGE
                    ========================= */}
                    {menu.badge && (
                      <Chip
                        icon={<ShieldCheck size={14} />}
                        label={menu.badge}
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: -10,
                          right: 16,
                          bgcolor: "#fff",
                          color: menu.badgeColor,
                          border: `1px solid ${menu.badgeColor}`,
                          fontWeight: 700,
                          borderRadius: "999px",
                          px: 0.5,
                          boxShadow: "0 8px 20px rgba(0,0,0,.12)",

                          "& .MuiChip-icon": {
                            color: menu.badgeColor,
                          },
                        }}
                      />
                    )}

                    {/* =========================
                        ICON
                    ========================= */}
                    <div
                      className="menu-icon"
                      style={{
                        background: menu.color,
                        border: `1px solid ${menu.border}`,
                      }}
                    >
                      <Icon
                        size={42}
                        color={menu.iconColor}
                        strokeWidth={2.2}
                      />
                    </div>

                    {/* =========================
                        TEXT
                    ========================= */}
                    <div className="menu-text">
                      <h5
                        style={{
                          color: menu.border,
                        }}
                      >
                        {menu.title}
                      </h5>

                      <p>{menu.desc}</p>

                      {/* =========================
                          COUNT
                      ========================= */}
                      {Number(menu.count) > 0 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: -15,
                            right: 15,

                            width: 38,
                            height: 38,

                            borderRadius: "50%",

                            background:
                              menu.id === 1
                                ? "#DC2626"
                                : menu.id === 2
                                ? "#475569"
                                : menu.id === 3
                                ? "#0284C7"
                                : "#16A34A",

                            color: "#fff",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            fontWeight: 800,

                            boxShadow:
                              "0 5px 15px rgba(0,0,0,.25)",
                          }}
                        >
                          {menu.count}
                        </Box>
                      )}
                    </div>
                  </div>
                </Box>
              );
            })}
        </div>
      </div>
    </HomeBox>
  );
};

export default Home;