import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useWebSocket } from "./context/WebSocketContext";
import "./App.css";
import Layout from "./components/Layout";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import RequireAuth from "./components/RequireAuth";

import Login from "./view/user/Login";
import Logout from "./view/user/Logout";

import Home from "./view/pages/Home";

import Dashboard from "./components/RiskManagement/Dashboard";
import Dashboard222 from "./components/RiskManagement copy/Dashboard";
import Complaint from "./components/RiskManagement/form";
import Complaintview from "./components/RiskManagement/formview";
import RiskDashboard from "./components/RiskSummary";
import Dashboard2 from "./components/Complaints/Dashboard";
import Complaint2 from "./components/Complaints/form";

import Dashboard3 from "./components/ComplaintResponse/Dashboard";
import Complaint3 from "./components/ComplaintResponse/form";

import Dashboard4 from "./components/SummaryComplaint/Dashboard";
import Complaint4 from "./components/SummaryComplaint/form";

import AddUser from "./view/admin/AddUser";
import Usermanager from "./view/admin/Usermanager";

import DeptManage from "./view/admin/DeptManage";
import SupManage from "./view/admin/SupManage";

import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";

import { Box } from "@mui/material";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ROLES = {
  User: "1",
  Editor: "2",
  Admin: "3",
};

function App() {
  const { disconnectWebSocket } = useWebSocket();
  const location = useLocation();

  const hideHeaderFooter = ["", "/login", "/logout"].includes(
    location.pathname
  );

  return (
    <Box
      sx={{
    
        minHeight: "calc(100vh - 60px)",
      display: "flex",
      flexDirection: "column",
      }}
    >
      {/* ================= HEADER ================= */}
      {!hideHeaderFooter && <Header />}

      {/* ================= CONTENT ================= */}
     <Box sx={{ flex: 1 }}>
        <Routes>
          {/* ================= PUBLIC ================= */}

          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />

            <Route path="logout" element={<Logout />} />

            <Route
              path="unauthorized"
              element={<Unauthorized />}
            />

            {/* ================= USER / EDITOR / ADMIN ================= */}

            <Route
              element={
                <RequireAuth
                  allowedRoles={[
                    ROLES.User,
                    ROLES.Editor,
                    ROLES.Admin,
                  ]}
                />
              }
            >
              {/* HOME */}

              <Route
                path="/home"
                element={<Home />}
              />

              {/* ================= RISK MANAGEMENT ================= */}

              <Route
                path="/riskmanagement"
                element={<Dashboard />}
              />
  <Route
                path="/riskmanagement2"
                element={<Dashboard222 />}
              />

              <Route
                path="/riskmanagement/:id"
                element={<Complaint Mode="Show" />}
              />

              <Route
                path="/riskmanagement/form"
                element={<Complaint Mode="Add" />}
              />

              <Route
                path="/riskmanagement/form/:id"
                element={<Complaint Mode="Edit" />}
              />

              <Route
                path="/riskmanagement/formview/:id"
                element={<Complaintview Mode="Edit" />}
              />

              <Route
                path="/riskmanagement/formview"
                element={<Complaintview Mode="Add" />}
              />

              {/* ================= COMPLAINTS ================= */}

              <Route
                path="/complaints"
                element={<Dashboard2 />}
              />

              <Route
                path="/complaints/:id"
                element={<Complaint2 Mode="Show" />}
              />

              <Route
                path="/complaints/form"
                element={<Complaint2 Mode="Add" />}
              />

              <Route
                path="/complaints/form/:id"
                element={<Complaint2 Mode="Edit" />}
              />

              {/* ================= COMPLAINT RESPONSE ================= */}

              <Route
                path="/complaintresponse"
                element={<Dashboard3 />}
              />

              <Route
                path="/complaintresponse/:id"
                element={<Complaint3 Mode="Show" />}
              />

              <Route
                path="/complaintresponse/form"
                element={<Complaint3 Mode="Add" />}
              />

              <Route
                path="/complaintresponse/form/:id"
                element={<Complaint3 Mode="Edit" />}
              />

              {/* ================= SUMMARY COMPLAINT ================= */}

              <Route
                path="/summarycomplaint"
                element={<Dashboard4 />}
              />

              <Route
                path="/summarycomplaint/:id"
                element={<Complaint4 Mode="Show" />}
              />

              <Route
                path="/summarycomplaint/form"
                element={<Complaint4 Mode="Add" />}
              />

              <Route
                path="/summarycomplaint/form/:id"
                element={<Complaint4 Mode="Edit" />}
              />
            </Route>
<Route
              path="/risksummary"
              element={<RiskDashboard  />}
            />
            
            {/* ================= ADMIN ONLY ================= */}

            <Route
              element={
                <RequireAuth
                allowedRoles={[ROLES.Editor, ROLES.Admin]} 
                />
              }
            >
              <Route
                path="/adduser"
                element={<AddUser />}
              />

              <Route
                path="/usermanager"
                element={<Usermanager />}
              />

              <Route
                path="/deptmanager"
                element={<DeptManage />}
              />

              <Route
                path="/supmanager"
                element={<SupManage />}
              />
            </Route>

            {/* ================= CATCH ALL ================= */}

            <Route
              path="*"
              element={<Missing />}
            />
          </Route>
        </Routes>
      </Box>

      {/* ================= FOOTER ================= */}

      {!hideHeaderFooter && <Footer />}
    </Box>
  );
}

export default App;