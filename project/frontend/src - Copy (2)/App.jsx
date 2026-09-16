import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useWebSocket } from "./context/WebSocketContext";
import "./App.css";

import Layout from "./components/Layout";
import Header from "./layout/Header";
import RequireAuth from "./components/RequireAuth";

import Login from "./view/user/Login";
import Logout from "./view/user/Logout";


import Home from "./view/pages/Home";

import Dashboard from "./components/RiskManagement/Dashboard"
import Complaint from "./components/RiskManagement/form";
import Occurrenceview from "./components/RiskManagement/formview";
import OccurrenceViewReport from "./components/RiskManagement/viewReport";

import MedicationF from "./components/RiskManagement/form/medex";

import EventOcc2 from "./components/Complaints/Event";
import Dashboard2 from "./components/Complaints/Dashboard"
import Occurrence2 from "./components/Complaints/form";
import Occurrence33 from "./components/Complaints/form3";
import Occurrence44 from "./components/Complaints/form4";

import Occurrence22 from "./components/Complaints/form2";

import MedicationF2 from "./components/Complaints/form/medex";

import EventOcc3 from "./components/ComplaintResponse/Event";
import Dashboard3 from "./components/ComplaintResponse/Dashboard"
import Occurrence3 from "./components/ComplaintResponse/form";
import MedicationF3 from "./components/ComplaintResponse/form/medex";

import Dashboard4 from "./components/SummaryComplaint/Dashboard"
import Occurrence4 from "./components/SummaryComplaint/form";
import AddUser from "./view/admin/AddUser";
import Usermanager from "./view/admin/Usermanager";


import DeptManage from "./view/admin/DeptManage";
import SupManage from "./view/admin/SupManage";

import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
const ROLES = {
  User: "1",
  Editor: "2",
  Admin: "3",
};

function App() {
  const { disconnectWebSocket } = useWebSocket();
  const location = useLocation();
  

  return (
    <>
      {!["", "/login", "/logout"].includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]}
              />
            }
          >
            <Route path="/home" element={<Home />} />

            <Route path="/riskmanagement" element={<Dashboard />} />
   
            <Route path="/riskmanagement/:id" element={<Complaint Mode="Show" />} />
            <Route path="/riskmanagement/form" element={<Complaint Mode="Add" />} />
            <Route path="/riskmanagement/form/:id" element={<Complaint Mode="Edit" />} />
 <Route path="/riskmanagement/formview/:id" element={<Occurrenceview Mode="Edit" />} />
  <Route path="/riskmanagement/viewReport/:reportid" element={<OccurrenceViewReport Mode="Edit" />} />
 <Route path="/riskmanagement/formview" element={<Occurrenceview Mode="Add" />} />

            <Route path="/complaints" element={<Dashboard2 />} />
            <Route path="/complaints/event" element={<EventOcc2 />} />
            <Route path="/complaints/:id" element={<Occurrence2 Mode="Show" />} />
            <Route path="/complaints/form" element={<Occurrence2 Mode="Add" />} />
            <Route path="/complaints/form/:id" element={<Occurrence2 Mode="Edit" />} />
   <Route path="/complaints/form2" element={<Occurrence22 Mode="Add" />} />
            <Route path="/complaints/form2/:id" element={<Occurrence22 Mode="Edit" />} />
   <Route path="/complaints/form3" element={<Occurrence33 Mode="Add" />} />
            <Route path="/complaints/form3/:id" element={<Occurrence33 Mode="Edit" />} />
   <Route path="/complaints/form4" element={<Occurrence44 Mode="Add" />} />
            <Route path="/complaints/form4/:id" element={<Occurrence44 Mode="Edit" />} />

               <Route path="/complaintresponse" element={<Dashboard3 />} />
            <Route path="/complaintresponse/event" element={<EventOcc2 />} />
            <Route path="/complaintresponse/:id" element={<Occurrence3 Mode="Show" />} />
            <Route path="/complaintresponse/form" element={<Occurrence3 Mode="Add" />} />
            <Route path="/complaintresponse/form/:id" element={<Occurrence3 Mode="Edit" />} />

         <Route path="/summarycomplaint" element={<Dashboard4 />} />
            <Route path="/summarycomplaint/event" element={<EventOcc2 />} />
            <Route path="/summarycomplaint/:id" element={<Occurrence4 Mode="Show" />} />
            <Route path="/summarycomplaint/form" element={<Occurrence4 Mode="Add" />} />
            <Route path="/summarycomplaint/form/:id" element={<Occurrence4 Mode="Edit" />} />

      
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/usermanager" element={<Usermanager />} />
            <Route path="/deptmanager" element={<DeptManage />} />
            <Route path="/supmanager" element={<SupManage />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      {/* <MobileNav /> */}
    </>
  );
}

export default App;