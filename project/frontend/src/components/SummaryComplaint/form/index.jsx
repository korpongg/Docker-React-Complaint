import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ViewIcon from "@mui/icons-material/FindInPageRounded";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GeneralInfo2 from "../../form/GeneralInfoView";
import GeneralInfoview from "../../form/GeneralInfoView2";
import GeneralInfo3 from "../../form/GeneralInfoView3";
import GeneralInfo4 from "../../form/GeneralInfoView2";
import GeneralInfo from "../../form/GeneralInfo4";
import { ChartColumn } from "lucide-react";
import NavForm from "../../form/NavForm";
import Workflow from "../../form/workflow";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { Container, Stack, Paper, Typography, Chip } from "@mui/material";
import {
  CircleAlert,
  ClipboardCheck,
  MessageSquareReply,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
import { ComplaintStyle } from "../../../styles/ComplaintStyle.style";
import { ComplaintViewStyle } from "../../../styles/ComplaintView.style";


import {
  chkAdmins,
  chkAdmin,
  TimeConverter,
  checkFileExists,
} from "../../Function";

import showAlert from "../../../utils/alertService";
import { useLocation } from "react-router-dom";

const Complaint = ({ Mode }) => {
  let { id } = useParams();
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});
  const OccType = "Complaint";
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const hostUrl = import.meta.env.VITE_REACT_APP_HOST_URL;
  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const userData = storedAuth
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  const config = {
    headers: { Authorization: `Bearer ${storedAuth.accessToken}` },
  };
  const navigate = useNavigate();
  const UserData = JSON.parse(localStorage.getItem("userData")) || null;
  const TempFormData = JSON.parse(localStorage.getItem("FormData")) || {};
  const [Stage, setStage] = useState(1);
  const [OccStage, setOccStage] = useState(0);
  const [formData, setFormData] = useState({});
  const [formData2, setFormData2] = useState({});
  const [formData3, setFormData3] = useState({});

    const [formData4, setFormData4] = useState({});
  const [showAppeal, setShowAppeal] = useState(0);
  const [showUrgent, setShowUrgent] = useState(1);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
  const [disable, setDisable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isVisible2, setIsVisible2] = useState(true);
  const [reportid, setReportid] = useState(false);
const steps = [
    {
      id: 0,
      number: "01",
      title: "ร้องเรียน",
      subtitle: "Complaint",
      icon: CircleAlert,
      color: "#DC2626",
      lightColor: "#FFF1F1",
      borderColor: "#991B1B",

    },
    {
      id: 1,
      number: "02",
      title: "ส่งหน่วยงาน",
      subtitle: "Admin Review",
      icon: ClipboardCheck,
      color: "#475569",
      lightColor: "#F4F6F8",
      borderColor: "#475569",
   
    },
    {
      id: 2,
      number: "03",
      title: "ตอบกลับผู้ร้องเรียน",
      subtitle: "Response",
      icon: MessageSquareReply,
      color: "#0284C7",
      lightColor: "#EFF8FD",
      borderColor: "#075985",
   
    },
    {
      id: 3,
      number: "04",
      title: "สรุปผลการวิเคราะห์",
      subtitle: "Summary",
      icon: FileCheck2,
      color: "#16A34A",
      lightColor: "#F0FAF4",
      borderColor: "#166534",
  
    },
  ];
  const [attachData, setAttachData] = useState({
    filePDF: null,
    filePDFName: null,
    previewPDF: null,
    fileImage: null,
    fileImageName: null,
    previewImg: null,
  });
  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_DOC_SIZE = 5 * 1024 * 1024; // 5MB
  const [EditFormData, setEditFormData] = useState({});
  const [board, setBoard] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [patienthn, setPatientHn] = useState("");
  const [patientname, setPatientName] = useState("");
  const [patientage, setPatientAge] = useState("");
  const [patientan, setPatientAn] = useState("");
  const [patientdiagnosis, setPatientDiagnosis] = useState("");
  const [activeStep, setActiveStep] = useState(3);
  const [name, setName] = useState("");
  const [array, setArray] = useState([]);
  const [Alert, setAlert] = useState(false);
  const [AlertType, setAlertType] = useState("error");
  const [AlertText, setAlertText] = useState("");
  const [AlertBorder, setAlertBorder] = useState([]);
  const [Access, setAccess] = useState(false);
  const isAdmin = chkAdmins(UserData?.role);
  const isEXEC = chkAdmin(UserData?.level);
  const jobtitle = UserData?.jobtitle;



  
  const handleDataChange = (event, name) => {
    const Text = event.target.value;

    if (name === "respond_Type") {
      setFormData((prev) => ({
        ...prev,
        respond_Type: String(Text),
      }));

      if (Mode === "Edit") {
        setEditFormData((prev) => ({
          ...prev,
          respond_Type: String(Text),
        }));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: Text,
    }));

    if (Mode === "Edit") {
      setEditFormData((prev) => ({
        ...prev,
        [name]: Text,
      }));
    }
  };
  const handleDataChangeSingle = (datavalue, name) => {
    const Text = datavalue;
    setFormData({ ...formData, [name]: Text });
    if (Mode === "Edit") {
      setEditFormData({ ...EditFormData, [name]: Text });
    }
  };

  const handleReplaceData = (source, destination) => {
    const tempsource = formData[source];
    // console.log("tempsource",tempsource);
    setFormData({ ...formData, [destination]: tempsource });
    setEditFormData({ ...EditFormData, [destination]: tempsource });
  };

  const handleSetBoard = (event) => {
    setBoard(event);
  };
  const handleSetName = (event) => {
    setName(event);
  };
  const handleSetPhone = (event) => {
    setPhone(event);
  };
  const handleSetDate = (event) => {
    setDate(event);
  };

  const handleSetTime = (event) => {
    setTime(event);
  };

  const handlePatientHn = (event) => {
    setPatientHn(event);
  };

  const handlePatientName = (event) => {
    setPatientName(event);
  };

  const handlePatientAge = (event) => {
    setPatientAge(event);
  };

  const handlePatientAn = (event) => {
    setPatientAn(event);
  };

  const handleSetPerson = (event) => {
    const count = array.length;
    setArray([
      ...array,
      { id: count + 1, name: "", department: "", faction: "" },
    ]);
  };

  const setDataPerson = (e, index) => {
    const { name, value } = e.target;

    const newUsers = array.map((user, i) => {
      if (index - 1 === i) {
        return { ...user, [name]: value };
      }
      return user;
    });
    setArray(newUsers);
  };

  const setChangePerson = (event, newValue, index) => {
    // Use map to create a new array with the modified object
    const newUsers = array.map((user, i) => {
      if (index - 1 === i) {
        // Use spread to create a new object with the updated property
        return { ...user, ["department"]: newValue.id };
      }
      return user;
    });
    setArray(newUsers);
  };

  const handlePatientDiagnosis = (event) => {
    setPatientDiagnosis(event);
  };

  const handleDataOccStageChange = (event) => {
    const Text = event.target.value;
    setOccStage(parseInt(Text, 10));
  };

  const handleDateChange = (event, name) => {
    const AddDate = new Date(event.target.value);
    const EditDate = TimeConverter(event.target.value, 7);

    setFormData({ ...formData, [name]: AddDate });
    if (Mode === "Edit") {
      setEditFormData({ ...EditFormData, [name]: EditDate });
    }
  };

  const fetchAttach = async () => {
    try {
      const imgExtensions = ["jpg", "jpeg", "png"]; // List of image formats to check
      let imgPathLocl = "";
      let imgExt = "";
      let imgExists = false;

      // Check for image files dynamically
      for (const ext of imgExtensions) {
        const imgPath = `${apiUrl}/filemanage/OCC${formData.reportid}.${ext}`;
        const localPath = `../../../storage/attachfiles/OCC${formData.reportid}.${ext}`;

        if (await checkFileExists(imgPath)) {
          imgPathLocl = localPath;
          imgExt = ext;
          imgExists = true;
          break;
        }
      }
      if (imgExists) {
        setAttachData((prevAttachData) => ({
          ...prevAttachData,
          fileImageName: `OCC${formData.reportid}.${imgExt}`,
          previewImg: imgPathLocl,
        }));
      }

      const docExtensions = [
        "pdf",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx",
      ];
      let docPathLocal = "";
      let docExt = "";
      let docExists = false;

      // Check for Doc files dynamically
      for (const ext of docExtensions) {
        const docPath = `${apiUrl}/filemanage/OCC${formData.reportid}.${ext}`;
        const localPath = `../../../storage/attachfiles/OCC${formData.reportid}.${ext}`;
        const hostPath = `${hostUrl}/storage/attachfiles/OCC${formData.reportid}.${ext}`;

        if (await checkFileExists(docPath)) {
          docPathLocal = ext === "pdf" ? localPath : hostPath;
          docExt = ext;
          docExists = true;
          break;
        }
      }

      if (docExists) {
        setAttachData((prevAttachData) => ({
          ...prevAttachData,
          filePDFName: `OCC${formData.reportid}.${docExt}`,
          previewPDF: docPathLocal,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const FetchPerson = async (id) => {
    try {
      const response2 = await axios.get(
        `${apiUrl}/complaints/getComplainant/${id}`,
        config,
      );
      if (response2.status === 200 || response2.status === 201) {
        const list = Array.isArray(response2.data)
          ? response2.data
          : Object.values(response2.data);

        setArray(
          list.map((item) => ({
            id: item.id,
            name: item.name,
            department: item.departmentName,
            faction: Number(item.faction),
          })),
        );
        if (list.length > 0) {
          setShowAppeal(1);
        }
      }
    } catch {}
  };
  // Get Data For Mode Edit&Show
  const FetchOccurranceById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/summarycomplaint/${id}`, config);

      if (response.status === 200 || response.status === 201) {
        if (Mode === "Edit") {
          (setFormData({
            ...response.data,
            userreport: response.data.createby,
            reportdate: TimeConverter(response.data.createAt, -7),
            complaintdate: TimeConverter(response.data.complaintdate, -7),
            aff: response.data.requestaff,
            faction: response.data.requestfac,
            dep: response.data.requestdep,
            // renew: response.data.description || null,
          }),
            setAccess(true));
        } else {
          if (isAdmin || UserData.userid === response.data.createby) {
            (setFormData({
              ...response.data,
              userreport: response.data.createby,
              reportdate: TimeConverter(response.data.createAt, -7),
              complaintdate: TimeConverter(response.data.complaintdate, -7),
              aff: response.data.requestaff,
              faction: response.data.requestfac,
              dep: response.data.requestdep,
              // renew: response.data.description || null,
            }),
              setAccess(true));
          } else if (isEXEC) {
            if (UserData.affiliation === "งานคุณภาพ") {
              (setFormData({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                // renew: response.data.description || null,
              }),
                setAccess(true));
            } else if (UserData.affiliation === response.data.requestaff) {
              (setFormData({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                description: "...",
              }),
                setAccess(true));
            }
          } else {
            if (UserData.affiliation === response.data.requestaff) {
              (setFormData({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                description: "...",
              }),
                setAccess(true));
            } else {
              setAccess(false);
            }
          }
        }
     setCheckbox({
  respond_Cause: response.data.respond_Cause
    ? JSON.parse(response.data.respond_Cause)
    : [],
});
      }
    } catch (error) {
      console.error(`Error fetching user data: ${error.message}`);
      navigate("/missing");
    }
  };


    const FetchOccurranceById4 = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/riskManagement/${id}`, config);

      const response2 = await axios.get(
        `${apiUrl}/complaints/viewform/${id}`,
        config,
      );

      if (response.status === 200 || response.status === 201) {
        setFormData4({
          ...response2.data,
          userreport: response2.data.createby,
          reportdate: TimeConverter(response2.data.createAt, -7),
          complaintdate: TimeConverter(response2.data.complaintdate, -7),
          aff: response2.data.requestaff,
          faction: response2.data.requestfac,
          dep: response2.data.requestdep,
          // renew: response.data.description || null,
        });
        if (Mode === "Edit") {
          if (isAdmin || UserData.userid === response.data.createby) {
            (setFormData4({
              ...response.data,
              userreport: response.data.createby,
              reportdate: TimeConverter(response.data.createAt, -7),
              complaintdate: TimeConverter(response.data.complaintdate, -7),
              aff: response.data.requestaff,
              faction: response.data.requestfac,
              dep: response.data.requestdep,
              // renew: response.data.description || null,
            }),
              setAccess(true));
          } else {
            setAccess(false);
          }
        } else {
          if (isAdmin || UserData.userid === response.data.createby) {
            (setFormData4({
              ...response.data,
              userreport: response.data.createby,
              reportdate: TimeConverter(response.data.createAt, -7),
              complaintdate: TimeConverter(response.data.complaintdate, -7),
              aff: response.data.requestaff,
              faction: response.data.requestfac,
              dep: response.data.requestdep,
              // renew: response.data.description || null,
            }),
              setAccess(true));
          } else if (isEXEC) {
            if (UserData.affiliation === "งานคุณภาพ") {
              (setFormData4({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                // renew: response.data.description || null,
              }),
                setAccess(true));
            } else if (UserData.affiliation === response.data.requestaff) {
              (setFormData4({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                description: "...",
              }),
                setAccess(true));
            }
          } else {
            if (UserData.affiliation === response.data.requestaff) {
              (setFormData4({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                description: "...",
              }),
                setAccess(true));
            } else {
              setAccess(false);
            }
          }
        }

        setCheckbox({
          manager: response.data.manager
            ? response.data.manager.split(",")
            : [],
          quality: response.data.quality
            ? response.data.quality.split(",")
            : [],
          nurse: response.data.nurse ? response.data.nurse.split(",") : [],
          administer: response.data.administer
            ? response.data.administer.split(",")
            : [],
          operation: response.data.operation
            ? response.data.operation.split(",")
            : [],
          director: response.data.director
            ? response.data.director.split(",")
            : [],
          doctor: response.data.doctor ? response.data.doctor.split(",") : [],
          compensation: response.data.compensation
            ? response.data.compensation.split(",")
            : [],
        });
      }
    } catch (error) {
      console.error(`Error fetching user data: ${error.message}`);
      navigate("/missing");
    }
  };

  const FetchOccurranceById2 = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/complaints/viewform/${id}`,
        config,
      );

      if (response.status === 200 || response.status === 201) {
        setFormData2({
          ...response.data,
          userreport: response.data.createby,
          reportdate: TimeConverter(response.data.createAt, -7),
          complaintdate: TimeConverter(response.data.complaintdate, -7),
          aff: response.data.requestaff,
          faction: response.data.requestfac,
          dep: response.data.requestdep,
          // renew: response.data.description || null,
        });
        if (Mode === "Edit") {
          if (isAdmin || UserData.userid === response.data.createby) {
            (setFormData2({
              ...response.data,
              userreport: response.data.createby,
              reportdate: TimeConverter(response.data.createAt, -7),
              complaintdate: TimeConverter(response.data.complaintdate, -7),
              aff: response.data.requestaff,
              faction: response.data.requestfac,
              dep: response.data.requestdep,
              // renew: response.data.description || null,
            }),
              setAccess(true));
          } else {
            setAccess(false);
          }
        } else {
          if (isAdmin || UserData.userid === response.data.createby) {
            (setFormData2({
              ...response.data,
              userreport: response.data.createby,
              reportdate: TimeConverter(response.data.createAt, -7),
              complaintdate: TimeConverter(response.data.complaintdate, -7),
              aff: response.data.requestaff,
              faction: response.data.requestfac,
              dep: response.data.requestdep,
              // renew: response.data.description || null,
            }),
              setAccess(true));
          } else if (isEXEC) {
            if (UserData.affiliation === "งานคุณภาพ") {
              (setFormData2({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                // renew: response.data.description || null,
              }),
                setAccess(true));
            } else if (UserData.affiliation === response.data.requestaff) {
              (setFormData2({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                description: "...",
              }),
                setAccess(true));
            }
          } else {
            if (UserData.affiliation === response.data.requestaff) {
              (setFormData2({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                description: "...",
              }),
                setAccess(true));
            } else {
              setAccess(false);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching user data: ${error.message}`);
      navigate("/missing");
    }
  };

  const FetchOccurranceById3 = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/complaintresponse/${id}`, config);

      if (response.status === 200 || response.status === 201) {
        setFormData3({
          ...response.data,
          userreport: response.data.createby,
          reportdate: TimeConverter(response.data.createAt, -7),
          complaintdate: TimeConverter(response.data.complaintdate, -7),
          aff: response.data.requestaff,
          faction: response.data.requestfac,
          dep: response.data.requestdep,
          // renew: response.data.description || null,
        });
        if (Mode === "Edit") {
          if (isAdmin || UserData.userid === response.data.createby) {
            (setFormData3({
              ...response.data,
              userreport: response.data.createby,
              reportdate: TimeConverter(response.data.createAt, -7),
              complaintdate: TimeConverter(response.data.complaintdate, -7),
              aff: response.data.requestaff,
              faction: response.data.requestfac,
              dep: response.data.requestdep,
              // renew: response.data.description || null,
            }),
              setAccess(true));
          } else {
            setAccess(false);
          }
        } else {
          if (isAdmin || UserData.userid === response.data.createby) {
            (setFormData3({
              ...response.data,
              userreport: response.data.createby,
              reportdate: TimeConverter(response.data.createAt, -7),
              complaintdate: TimeConverter(response.data.complaintdate, -7),
              aff: response.data.requestaff,
              faction: response.data.requestfac,
              dep: response.data.requestdep,
              // renew: response.data.description || null,
            }),
              setAccess(true));
          } else if (isEXEC) {
            if (UserData.affiliation === "งานคุณภาพ") {
              (setFormData3({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                // renew: response.data.description || null,
              }),
                setAccess(true));
            } else if (UserData.affiliation === response.data.requestaff) {
              (setFormData3({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                description: "...",
              }),
                setAccess(true));
            }
          } else {
            if (UserData.affiliation === response.data.requestaff) {
              (setFormData3({
                ...response.data,
                userreport: response.data.createby,
                reportdate: TimeConverter(response.data.createAt, -7),
                complaintdate: TimeConverter(response.data.complaintdate, -7),
                aff: response.data.requestaff,
                faction: response.data.requestfac,
                dep: response.data.requestdep,
                description: "...",
              }),
                setAccess(true));
            } else {
              setAccess(false);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error fetching user data: ${error.message}`);
      navigate("/missing");
    }
  };

  const handleDataChangeCheckbox = (
    dataarray,
    dataarray2,
    columnname,
    columnname2,
  ) => {
    setFormData({
      ...formData,
      [columnname]: dataarray,
      [columnname2]: dataarray2,
      ["count"]: dataarray.length,
    });

    if (Mode === "Edit") {
      setEditFormData({ ...EditFormData, [columnname]: dataarray });
      setEditFormData({ ...EditFormData, [columnname2]: dataarray2 });
    }
  };

  const handleDataChangeCheckbox2 = (
    dataarray,
    dataarray2,
    columnname,
    columnname2,
  ) => {
    setFormData({
      ...formData,
      [columnname]: dataarray,
      [columnname2]: dataarray2,
      ["count2"]: dataarray.length,
    });

    if (Mode === "Edit") {
      setEditFormData({ ...EditFormData, [columnname]: dataarray });
    }
  };

  const removeDataFromCheckboxList = (key, value) => {
    setFormData((prevData) => {
      if (!prevData[key]) {
        console.log(`Key ${key} not found`);
        return prevData;
      }

      const index = prevData[key].indexOf(value);
      if (index === -1) {
        console.log(`${value} not found in ${key}`);
        return prevData;
      }

      return {
        ...prevData,
        [key]: prevData[key].filter((item) => item !== value),
      };
    });
  };

  const handleDataSingleChange = (data, name) => {
    setFormData({ ...formData, [name]: data });
    if (Mode === "Edit") {
      setEditFormData({ ...EditFormData, [name]: data });
    }
  };

  const NextStage = () => {
    localStorage.setItem("FormData", JSON.stringify(formData));
    setStage(Stage + 1);
    handleScrollToTop();
  };
  const PrevStage = () => {
    if (Stage > 1) {
      localStorage.setItem("FormData", JSON.stringify(formData));
      setStage(Stage - 1);
      handleScrollToTop();
    }
  };
  const FirstStage = () => {
    localStorage.setItem("FormData", JSON.stringify(formData));
    setStage(1);
    handleScrollToTop();
  };
  const LastStage = (MaxStage) => {
    localStorage.setItem("FormData", JSON.stringify(formData));
    setStage(MaxStage);
    handleScrollToTop();
  };
  const ToStage = (toval, MaxStage) => {
    if (toval <= MaxStage && toval > 0) {
      localStorage.setItem("FormData", JSON.stringify(formData));
      setStage(toval);
      handleScrollToTop();
    }
  };

  useEffect(() => {
    if (!location.state) {
      navigate("../../home");
      return;
    }
    const { reportid } = location.state;

    setReportid(reportid);
    if (Mode === "Add") {
      const { reportid } = location.state;
      setReportid(reportid);
      (setAccess(true),
        setFormData({
          ...TempFormData,
          userreport: UserData.userid,
          requestby:
            UserData?.title + " " + UserData?.name + " " + UserData?.lastname,
          pct: "ไม่ระบุ",
          gender: "M",
          reportdate: new Date(),
          complaintdate: new Date(),
          respond_Type: 0,
          respond_radio: 0,

          reportidWhere: reportid,
          aff: UserData.affiliation,
          faction: UserData.faction,
          dep: UserData.dep,
          createby: UserData.userid,
        }));
    } else {
      setEditFormData({ id: parseInt(id, 10) });
    }
  }, []);

  useEffect(() => {
    if (!location.state) {
      navigate("../../home");
      return;
    }
    FetchPerson(location.state.reportid);
    if (location.state?.reportid && Mode === "Edit") {
      FetchOccurranceById(location.state.reportid);
    }
  }, [location.state]);

  useEffect(() => {
    if (!location.state) {
      navigate("../../home");
      return;
    }
    if (reportid) {
      FetchOccurranceById2(reportid);
      FetchOccurranceById3(reportid);
        FetchOccurranceById4(reportid);
      fetchAttach();
    }
  }, [reportid]);

  const handleImgChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
        alert("กรุณาเลือกไฟล์ .jpg หรือ .png เท่านั้น");
        e.target.value = "";
        return;
      }

      if (selectedFile.size > MAX_IMAGE_SIZE) {
        alert("ไฟล์รูปภาพต้องไม่เกิน 2MB");
        e.target.value = "";
        return;
      }

      setAttachData((prevAttachData) => ({
        ...prevAttachData,
        fileImage: selectedFile,
        fileImageName: selectedFile.name,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setAttachData((prevAttachData) => ({
          ...prevAttachData,
          previewImg: reader.result,
        }));
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const [checkbox, setCheckbox] = useState({
    respond_Cause: [],
  });

  const handleCheckChange = (e, name) => {
    const value = e.target.name;
    const checked = e.target.checked;
    setCheckbox((prev) => {
      const current = prev[name] || [];
      return {
        ...prev,
        [name]: checked
          ? [...current, value]
          : current.filter((v) => v !== value),
      };
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert("กรุณาเลือกไฟล์เอกสารที่รองรับ (PDF, Word, Excel, PowerPoint)");
        e.target.value = "";
        return;
      }

      if (selectedFile.size > MAX_DOC_SIZE) {
        alert("ไฟล์ต้องไม่เกิน 5MB");
        e.target.value = "";
        return;
      }

      setAttachData((prevAttachData) => ({
        ...prevAttachData,
        filePDF: selectedFile,
        filePDFName: selectedFile.name,
        previewPDF:
          selectedFile.type === "application/pdf"
            ? URL.createObjectURL(selectedFile)
            : null,
      }));
    }
  };

  const ClearData = () => {
    localStorage.removeItem("FormData");
    setFormData({
      userreport: UserData.userid,
      requestby:
        UserData?.title + " " + UserData?.name + " " + UserData?.lastname,
      reportdate: new Date(),
      complaintdate: new Date(),
      type: "0",
      reporttype: "0",
      aff: UserData.affiliation,
      faction: UserData.faction,
      dep: UserData.dep,
      createby: UserData.userid,
    });
    setAttachData({
      filePDF: null,
      filePDFName: null,
      previewPDF: null,
      fileImage: null,
      fileImageName: null,
      previewImg: null,
    });
  };

  const keydata = [
    // { key: "hn", name: "hn", location: 1 },
    // { key: "an", name: "an", location: 1 },
    // { key: "age", name: "อายุ", location: 1 },
    { key: "gender", name: "เพศ", location: 1 },
    // { key: "dx", name: "Dx.", location: 1 },
    { key: "pct", name: "PCT ที่เกี่ยวข้าง", location: 1 },
    { key: "reportlocation", name: "สถานที่เกิดเหตุ", location: 1 },
    { key: "complaintdate", name: "วัน-เวลาที่เกิดเหตุการณ์", location: 1 },
    { key: "deptrelate", name: "หน่วยงานที่เกี่ยวข้อง", location: 1 },
    { key: "level", name: "ระดับความเสี่ยง", location: 1 },
    { key: "description", name: "บรรยายสรุปเหตุการณ์ที่เกิดขึ้น", location: 1 },
    { key: "summary_analysis", name: "---", location: 1 },
    // { key: "effectremark", name: "ระบุความเสียหายที่เกิดขึ้น", location: 1 },
    // { key: "impromptusolution", name: "การแก้ปัญหาเฉพาะหน้า", location: 1 },
    // { key: "activefailure", name: "ความคลาดเคลื่อนที่เกิดขึ้น", location: 1 },
    // { key: "suggestion", name: "ข้อเสนอแนะ", location: 1 },
  ];

  const keysToCheck = [
    "equipment",
    "management",
    "patientcare",
    "patientsupport",
    "safety",
    "service",
    "utility",
  ];

  const handleSubmit = async (Mode) => {
  if (!formData.summary_Suggestions?.trim()) {
  setErrors((prev) => ({
    ...prev,
    summary_Suggestions: true,
  }));

  setTimeout(() => {
    const el = inputRefs.current.summary_Suggestions;

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      const textarea = el.querySelector("textarea");

      if (textarea) {
        textarea.focus();
      }
    }
  }, 100);

  return;
}
    const missingKeys = keydata.filter(({ key }) => {
      if (key === "deptrelate") {
        return !(formData[key] && formData[key].length);
      } else if (key === "complaintdate") {
        const date = new Date(formData[key]);
        return !formData[key] || isNaN(date.getTime()); // Check if date is valid
      } else {
        return !formData[key] || formData[key] === ""; // Ensure it's not empty
      }
    });
    const totalLength = keysToCheck.reduce((sum, key) => {
      if (Array.isArray(formData[key])) {
        return sum + formData[key].length;
      }
      return sum;
    }, 0);
    if (Mode !== "Draft") {
      setAlertBorder(missingKeys);
    }
    if (missingKeys.length === 0 || Mode === "Draft") {
      // let submitFormData;
      if (totalLength > 0 || Mode === "Draft") {
        // submitFormData = {
        //   ...formData,
        //   deptrelate: JSON.stringify(formData.deptrelate),
        //   equipment: JSON.stringify(formData.equipment),
        //   management: JSON.stringify(formData.management),
        //   patientcare: JSON.stringify(formData.patientcare),
        //   patientsupport: JSON.stringify(formData.patientsupport),
        //   safety: JSON.stringify(formData.safety),
        //   service: JSON.stringify(formData.service),
        //   utility: JSON.stringify(formData.utility),
        //   complaintdate: TimeConverter(formData.complaintdate, 7),
        //   reportdate: TimeConverter(formData.reportdate, 7),
        //   formstatus: "0",
        // };

        const submitFormData = new FormData();
        Object.keys(formData)
          .filter((key) => key !== "respond_Type")
          .forEach((key) => {
            if (formData[key] !== undefined && formData[key] !== null) {
              let value = formData[key];

              if (key !== "complaintdate" && key !== "reportdate") {
                if (typeof value === "object") {
                  submitFormData.append(key, JSON.stringify(value));
                } else {
                  submitFormData.append(key, value);
                }
              }
            }
          });
        if (formData.respond_Type === "5") {
          submitFormData.append(
            "respond_Cause",
            JSON.stringify(checkbox["respond_Cause"] || []),
          );
        } else {
          submitFormData.append("respond_Cause", JSON.stringify([]));
        }
        submitFormData.append("respond_Type", formData.respond_Type);
        try {
          const response = await axios.post(
            `${apiUrl}/riskManagement/submitExecutive`,
            submitFormData,
            { ...config },
          );
          const responseStatus = response.status;

          if (responseStatus === 200 || responseStatus === 201) {
            navigate("/summarycomplaint");
          }
        } catch (error) {
  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
  console.log("MESSAGE:", error.response?.data?.message);
  console.log("ERROR:", error);
}
      } else {
        setStage(1);
        setOccStage(0);
        // setAlertText("ไม่สามารถบันทึกข้อมูลได้ กรุณาเลือกอย่างน้อย 1 หัวข้อ");
        showAlert(
          "กรุณาเลือกหัวข้อระบบงานที่เกี่ยวข้องกับเหตุการณ์ที่เกิดขึ้น อย่างน้อย 1 หัวข้อ",
          "ไม่สามารถบันทึกข้อมูลได้",
          "error",
        );
        console.log("ไม่สามารถบันทึกข้อมูลได้ กรุณาเลือกอย่างน้อย 1 หัวข้อ");
        // setAlert(true);
        scrollToSection("ListSelect");
      }
    } else {
      setStage(missingKeys[0].location);
      // setAlertText("ไม่สามารถบันทึกข้อมูลได้ โปรดระบุ '" + missingKeys[0].name + "'");
      showAlert(
        "โปรดระบุ '" + missingKeys[0].name + "'",
        "ไม่สามารถบันทึกข้อมูลได้",
        "error",
      );
      console.log(
        "Some keys are missing.Cannot submit form data.",
        missingKeys[0].key,
      );
      setAlert(true);
      scrollToSection(missingKeys[0].key);
    }
  };

  const handleShow = async () => {
    setShow(!show);
  };

  const handleShow2 = async () => {
    setShow2(!show2);
  };

    const handleShow3 = async () => {
    setShow3(!show3);
  };
  const handleSubmitEdit = async (Mode) => {
    if (!formData.summary_Suggestions) {
      setErrors((prev) => ({ ...prev, summary_Suggestions: true }));
      const el = inputRefs.current.summary_Suggestions;
      if (el) {
        el.focus();
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }
    const missingKeys = keydata.filter(({ key }) => {
      if (key === "deptrelate") {
        return !(formData[key] && formData[key].length);
      } else if (key === "complaintdate") {
        const date = new Date(formData[key]);
        return !formData[key] || isNaN(date.getTime()); // Check if date is valid
      } else {
        return !formData[key] || formData[key] === ""; // Ensure it's not empty
      }
    });
    const totalLength = keysToCheck.reduce((sum, key) => {
      if (Array.isArray(formData[key])) {
        return sum + formData[key].length;
      }
      return sum;
    }, 0);
    if (Mode !== "Draft") {
      setAlertBorder(missingKeys);
    }
    if (missingKeys.length === 0 || Mode === "Draft") {
      // let submitEditFormData;
      if (totalLength > 0 || Mode === "Draft") {
        const submitEditFormData = new FormData();
        Object.keys(formData)
          .filter((key) => key !== "respond_Type")
          .forEach((key) => {
            if (formData[key] !== undefined && formData[key] !== null) {
              let value = formData[key];

              if (key !== "complaintdate" && key !== "reportdate") {
                if (typeof value === "object") {
                  submitEditFormData.append(key, JSON.stringify(value));
                } else {
                  submitEditFormData.append(key, value);
                }
              }
            }
          });
        submitEditFormData.append("updateby", UserData.userid);
     

        if (attachData.fileImage) {
          submitEditFormData.append("files", attachData.fileImage);
        }
        if (attachData.filePDF) {
          submitEditFormData.append("files", attachData.filePDF);
        }
        if (Mode === "Draft") {
          submitEditFormData.append("formstatus", "0");
        }
        if (Mode === "Submit") {
          if (formData.formstatus === "0") {
            submitEditFormData.append("formstatus", "1");
          }
        }


        if (formData.respond_Type === "5") {
          submitEditFormData.set(
            "respond_Cause",
            JSON.stringify(checkbox["respond_Cause"] || []),
          );
        } else {
          submitEditFormData.set("respond_Cause", JSON.stringify([]));
        }
        submitEditFormData.append("respond_Type", formData.respond_Type);
        try {
          const response = await axios.put(
            `${apiUrl}/summarycomplaint`,
            submitEditFormData,
            { ...config },
          );
          const responseStatus = response.status;

          if (responseStatus === 200 || responseStatus === 201) {
            navigate("/summarycomplaint");
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        setStage(1);
        setOccStage(0);
        // setAlertText("ไม่สามารถบันทึกข้อมูลได้ กรุณาเลือกอย่างน้อย 1 หัวข้อ");
        showAlert(
          "กรุณาเลือกหัวข้อระบบงานที่เกี่ยวข้องกับเหตุการณ์ที่เกิดขึ้น อย่างน้อย 1 หัวข้อ",
          "ไม่สามารถบันทึกข้อมูลได้",
          "error",
        );
        console.log("ไม่สามารถบันทึกข้อมูลได้ กรุณาเลือกอย่างน้อย 1 หัวข้อ");
        // setAlert(true);
        scrollToSection("ListSelect");
      }
    } else {
      setStage(missingKeys[0].location);
      // setAlertText("ไม่สามารถบันทึกข้อมูลได้ โปรดระบุ '" + missingKeys[0].name + "'");
      showAlert(
        "โปรดระบุ '" + missingKeys[0].name + "'",
        "ไม่สามารถบันทึกข้อมูลได้",
        "error",
      );
      console.log(
        "Some keys are missing.Cannot submit form data.",
        missingKeys[0].key,
      );
      // setAlert(true);
      scrollToSection(missingKeys[0].key);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140; // offset value in pixels
      const yPosition =
        element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

    const handleStepClick = (step) => {
    // หน้า Admin นี้รองรับการเปิดดู Step 01
    // และกลับมาที่ Step 02
  if (step >= 0 && step <= 3) {
      setActiveStep(step);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      
      <ComplaintStyle>
       

   <Box
              sx={{
                position: "relative",
               minWidth: "900px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                px: 3,
                py: 2.5,
                bgcolor: "#DCFCE7",
                border: "1px solid #BBF7D0",
                borderRadius: 2,
                boxShadow: "0 4px 14px rgba(22,163,74,.08)",
                
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "18px",
                  bgcolor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #BBF7D0",
                  boxShadow: "0 6px 18px rgba(22,163,74,.12)",
                }}
              >
                <ChartColumn size={34} color="#16A34A" />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#14532D",
                  }}
                >
                  ผลการวิเคราะห์ข้อร้องเรียน (ผู้บริหาร)
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#A16207",
                    mt: 0.5,
                  }}
                >
                  Complaint Analysis Summary
                </Typography>
              </Box>

              <Chip
                   label={'หมายเลขเอกสาร :'+reportid}
                className="mt-5"
                sx={{
                  bgcolor: "#BBF7D0",
                  color: "#14532D",
                  fontWeight: 700,
                  borderRadius: 2,
                  border: "1px solid #86EFAC",
                  position: "absolute",
                  right: 24,
                  maxWidth: "40%",
                }}
              />
            </Box>

        <Box className="MainContainer" style={{ background: "#F5F5F5" }}>
               <ComplaintViewStyle>
              <Workflow
                reportid={reportid}
                activeStep={activeStep}
                onStepClick={handleStepClick}
                stepflow={4}
              />
            </ComplaintViewStyle>
       

        </Box>
        {/* {console.log(FormData)} */}

        {userData?.jobtitle == "หัวหน้าแผนก" || userData?.role == "2" ? (
          <Box className="MainContainer">

             {activeStep === 0 && (
  <ComplaintViewStyle>


 <div
        className="complaint-detail-card mt-3"
        style={{
          "--step-color": steps[activeStep]?.color || "#64748B",
          "--step-light":
            steps[activeStep]?.lightColor || "#F8FAFC",
        }}
      >

        {/* ================================
            DETAIL HEADER
        ================================= */}
<div className="complaint-detail-top">

  {/* STEP NUMBER */}
  <div
    className="complaint-step-number"
    style={{
      color:
        steps[activeStep]?.color || "#64748B",

      background:
        steps[activeStep]?.lightColor || "#F8FAFC",

      borderColor:
        steps[activeStep]?.color || "#CBD5E1",
    }}
  >
    {steps[activeStep]?.number || "01"}
  </div>


  {/* CENTER TITLE */}
  <div className="complaint-detail-heading">

    <div
      className="complaint-detail-label"
      style={{
        color:
          steps[activeStep]?.color || "#64748B",
      }}
    >
      {activeStep === 0 && "COMPLAINT"}
      {activeStep === 1 && "ADMIN REVIEW"}
      {activeStep === 2 && "RESPONSE"}
      {activeStep === 3 && "SUMMARY"}
    </div>


    <div className="complaint-detail-title">

      {activeStep === 0 &&
        "รายละเอียดข้อร้องเรียน"}

      {activeStep === 1 &&
        "รายละเอียดการตรวจสอบ"}

      {activeStep === 2 &&
        "รายละเอียดการตอบกลับ"}

      {activeStep === 3 &&
        "รายละเอียดสรุปผลการวิเคราะห์"}

    </div>


    <div className="complaint-detail-description">

      {activeStep === 0 &&
        "ข้อมูลและรายละเอียดที่ผู้ร้องเรียนแจ้งเข้าม"}

      {activeStep === 1 &&
        "รายละเอียดการพิจารณาและดำเนินการของหน่วยงาน"}

      {activeStep === 2 &&
        "รายละเอียดการตอบกลับและการสื่อสารกับผู้ร้องเรียน"}

      {activeStep === 3 &&
        "ผลการวิเคราะห์ สรุปประเด็น และผลการดำเนินการ"}

    </div>

  </div>


  {/* RIGHT STATUS */}
  <div
    className="complaint-current-step"
    style={{
      color:
        steps[activeStep]?.color || "#64748B",

      background:
        steps[activeStep]?.lightColor || "#F8FAFC",

      borderColor:
        steps[activeStep]?.color || "#CBD5E1",
    }}
  >

    <span
      className="complaint-current-dot"
      style={{
        background:
          steps[activeStep]?.color || "#64748B",
      }}
    />

    ขั้นตอนที่ {steps[activeStep]?.number || "01"}

  </div>

</div>


        {/* ================================
            ACCENT LINE
        ================================= */}

        <div
          className="complaint-detail-accent"
          style={{
            background:
              steps[activeStep]?.color || "#64748B",
          }}
        />
        <div>
      {formData2 && Object.keys(formData2).length > 0 ? (
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
        <GeneralInfo2
                  Mode="Show"
                array={array}
                data={formData2}
                disable={disable}
              show={true}
                setDataFunction={handleDataChange}
                setSingleDataFunction={handleDataChangeSingle}
                missingKeys={AlertBorder}
                setCheckBoxFunction={handleCheckChange}
                FormType="Occ"
                handleShow={handleShow}
                handleSetBoard={handleSetBoard}
                handleSetDate={handleSetDate}
                showUrgent={showUrgent}
                showAppeal={showAppeal}
                handleDateChange={handleDateChange}
                handleDataChangeCheckbox={handleDataChangeCheckbox}
                handleDataChangeCheckbox2={handleDataChangeCheckbox2}
                
              />
    </div>
       
      ) : (
        <div style={{ padding: "30px", textAlign: "center" }}>
          กำลังโหลดข้อมูล...
        </div>
      )}
    </div>
        </div>




  
  </ComplaintViewStyle>
)}
{activeStep === 1 && (
  <ComplaintViewStyle>


     <div
        className="complaint-detail-card mt-3"
        style={{
          "--step-color": steps[activeStep]?.color || "#64748B",
          "--step-light":
            steps[activeStep]?.lightColor || "#F8FAFC",
        }}
      >

        {/* ================================
            DETAIL HEADER
        ================================= */}
<div className="complaint-detail-top">

  {/* STEP NUMBER */}
  <div
    className="complaint-step-number"
    style={{
      color:
        steps[activeStep]?.color || "#64748B",

      background:
        steps[activeStep]?.lightColor || "#F8FAFC",

      borderColor:
        steps[activeStep]?.color || "#CBD5E1",
    }}
  >
    {steps[activeStep]?.number || "01"}
  </div>


  {/* CENTER TITLE */}
  <div className="complaint-detail-heading">

    <div
      className="complaint-detail-label"
      style={{
        color:
          steps[activeStep]?.color || "#64748B",
      }}
    >
      {activeStep === 0 && "COMPLAINT"}
      {activeStep === 1 && "ADMIN REVIEW"}
      {activeStep === 2 && "RESPONSE"}
      {activeStep === 3 && "SUMMARY"}
    </div>


    <div className="complaint-detail-title">

      {activeStep === 0 &&
        "รายละเอียดข้อร้องเรียน"}

      {activeStep === 1 &&
        "รายละเอียดการตรวจสอบ"}

      {activeStep === 2 &&
        "รายละเอียดการตอบกลับ"}

      {activeStep === 3 &&
        "รายละเอียดสรุปผลการวิเคราะห์"}

    </div>


    <div className="complaint-detail-description">

      {activeStep === 0 &&
        "ข้อมูลและรายละเอียดที่ผู้ร้องเรียนแจ้งเข้าม"}

      {activeStep === 1 &&
        "รายละเอียดการพิจารณาและดำเนินการของหน่วยงาน"}

      {activeStep === 2 &&
        "รายละเอียดการตอบกลับและการสื่อสารกับผู้ร้องเรียน"}

      {activeStep === 3 &&
        "ผลการวิเคราะห์ สรุปประเด็น และผลการดำเนินการ"}

    </div>

  </div>


  {/* RIGHT STATUS */}
  <div
    className="complaint-current-step"
    style={{
      color:
        steps[activeStep]?.color || "#64748B",

      background:
        steps[activeStep]?.lightColor || "#F8FAFC",

      borderColor:
        steps[activeStep]?.color || "#CBD5E1",
    }}
  >

    <span
      className="complaint-current-dot"
      style={{
        background:
          steps[activeStep]?.color || "#64748B",
      }}
    />

    ขั้นตอนที่ {steps[activeStep]?.number || "01"}

  </div>

</div>


        {/* ================================
            ACCENT LINE
        ================================= */}

        <div
          className="complaint-detail-accent"
          style={{
            background:
              steps[activeStep]?.color || "#64748B",
          }}
        />
        <div>

      {formData4 && Object.keys(formData4).length > 0 ? (
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
    >      <GeneralInfo4
                   Mode="Show"
                data={formData4}
                setDataFunction={handleDataChange}
                setSingleDataFunction={handleDataChangeSingle}
                missingKeys={AlertBorder}
                setCheckBoxFunction={handleCheckChange}
                FormType="Occ"
                handleSetBoard={handleSetBoard}
                handleSetDate={handleSetDate}
                handleDateChange={handleDateChange}
                handleDataChangeCheckbox={handleDataChangeCheckbox}
                handleDataChangeCheckbox2={handleDataChangeCheckbox2}
                
                checkbox={checkbox}
                setErrors={setErrors}
                 handleShow={handleShow3}
                 show={true}
                errors={errors}
                inputRefs={inputRefs}
              /></div>
       
      ) : (
        <div style={{ padding: "30px", textAlign: "center" }}>
          กำลังโหลดข้อมูล...
        </div>
      )}
    </div>
        </div>



 
  </ComplaintViewStyle>
)}

            {activeStep === 2 && (
  <ComplaintViewStyle>

    
     <div
        className="complaint-detail-card mt-3"
        style={{
          "--step-color": steps[activeStep]?.color || "#64748B",
          "--step-light":
            steps[activeStep]?.lightColor || "#F8FAFC",
        }}
      >

        {/* ================================
            DETAIL HEADER
        ================================= */}
<div className="complaint-detail-top">

  {/* STEP NUMBER */}
  <div
    className="complaint-step-number"
    style={{
      color:
        steps[activeStep]?.color || "#64748B",

      background:
        steps[activeStep]?.lightColor || "#F8FAFC",

      borderColor:
        steps[activeStep]?.color || "#CBD5E1",
    }}
  >
    {steps[activeStep]?.number || "01"}
  </div>


  {/* CENTER TITLE */}
  <div className="complaint-detail-heading">

    <div
      className="complaint-detail-label"
      style={{
        color:
          steps[activeStep]?.color || "#64748B",
      }}
    >
      {activeStep === 0 && "COMPLAINT"}
      {activeStep === 1 && "ADMIN REVIEW"}
      {activeStep === 2 && "RESPONSE"}
      {activeStep === 3 && "SUMMARY"}
    </div>


    <div className="complaint-detail-title">

      {activeStep === 0 &&
        "รายละเอียดข้อร้องเรียน"}

      {activeStep === 1 &&
        "รายละเอียดการตรวจสอบ"}

      {activeStep === 2 &&
        "รายละเอียดการตอบกลับ"}

      {activeStep === 3 &&
        "รายละเอียดสรุปผลการวิเคราะห์"}

    </div>


    <div className="complaint-detail-description">

      {activeStep === 0 &&
        "ข้อมูลและรายละเอียดที่ผู้ร้องเรียนแจ้งเข้าม"}

      {activeStep === 1 &&
        "รายละเอียดการพิจารณาและดำเนินการของหน่วยงาน"}

      {activeStep === 2 &&
        "รายละเอียดการตอบกลับและการสื่อสารกับผู้ร้องเรียน"}

      {activeStep === 3 &&
        "ผลการวิเคราะห์ สรุปประเด็น และผลการดำเนินการ"}

    </div>

  </div>


  {/* RIGHT STATUS */}
  <div
    className="complaint-current-step"
    style={{
      color:
        steps[activeStep]?.color || "#64748B",

      background:
        steps[activeStep]?.lightColor || "#F8FAFC",

      borderColor:
        steps[activeStep]?.color || "#CBD5E1",
    }}
  >

    <span
      className="complaint-current-dot"
      style={{
        background:
          steps[activeStep]?.color || "#64748B",
      }}
    />

    ขั้นตอนที่ {steps[activeStep]?.number || "01"}

  </div>

</div>


        {/* ================================
            ACCENT LINE
        ================================= */}

        <div
          className="complaint-detail-accent"
          style={{
            background:
              steps[activeStep]?.color || "#64748B",
          }}
        />
        <div>

    
      {formData3 && Object.keys(formData3).length > 0 ? (
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
    >   <GeneralInfo3
                     Mode="Show"
        
                  data={formData3}
                  setDataFunction={handleDataChange}
                  setSingleDataFunction={handleDataChangeSingle}
                  missingKeys={AlertBorder}
                  setCheckBoxFunction={handleCheckChange}
                  FormType="Occ"
                  handleSetBoard={handleSetBoard}
                  handleSetDate={handleSetDate}
                  handleDateChange={handleDateChange}
                  handleDataChangeCheckbox={handleDataChangeCheckbox}
                  handleDataChangeCheckbox2={handleDataChangeCheckbox2}
                  
                  checkbox={checkbox}
                  setErrors={setErrors}
                  handleShow={handleShow3}
                   show={true}
                  errors={errors}
                  inputRefs={inputRefs}
                /></div>
       
      )  : (
        <div style={{ padding: "30px", textAlign: "center" }}>
          กำลังโหลดข้อมูล...
        </div>
      )}
    </div>
        </div>
  
  </ComplaintViewStyle>
)}


            {Stage === 1 && (
              <>
{activeStep === 3 && (
  <> 
  
  <div
  className="page-title"
  style={{
    border: "2px solid #D8EBDD",
    boxShadow: "0 2px 7px rgba(20, 83, 45, 0.04)",
  }}
>
  <div className="page-title-top">

    <div
      className="page-title-index"
      style={{
        background: "linear-gradient(145deg, #16A34A 0%, #166534 100%)",
        boxShadow: "0 3px 8px rgba(22, 101, 52, 0.20)",
        color: "#FFFFFF",
      }}
    >
      04
    </div>

    <div className="page-title-content">

      <div
        className="page-title-eyebrow"
        style={{
          color: "#15803D",
        }}
      >
        COMPLAINT SUMMARY
      </div>

      <h2>
        {Mode === "Add" && "สรุปผลการวิเคราะห์ข้อร้องเรียน"}
        {Mode === "Edit" && "แก้ไขสรุปผลการวิเคราะห์ข้อร้องเรียน"}
        {Mode === "Show" && "รายละเอียดสรุปผลการวิเคราะห์ข้อร้องเรียน"}
      </h2>

      <p>
        {Mode === "Add" &&
          "บันทึกผลการวิเคราะห์และสรุปแนวทางการดำเนินการ"}

        {Mode === "Edit" &&
          "แก้ไขข้อมูลผลการวิเคราะห์และแนวทางการดำเนินการ"}

        {Mode === "Show" &&
          "ตรวจสอบผลการวิเคราะห์และสรุปแนวทางการดำเนินการ"}
      </p>

    </div>

    <div
      className="page-title-mode"
      style={{
        color: "#166534",
        background: "#F0FDF4",
        border: "1px solid #BBF7D0",
      }}
    >
      {Mode === "Add" && "เพิ่มข้อมูล"}
      {Mode === "Edit" && "แก้ไขข้อมูล"}
      {Mode === "Show" && "รายละเอียด"}
    </div>

  </div>
</div>

<div
  className="page-form"
  style={{
    border: "2px solid #D8EBDD",
    boxShadow: "0 2px 7px rgba(20, 83, 45, 0.04)",
  }}
> 
   <GeneralInfo
                  Mode={Mode}
                  items={array}
                  data={formData}
                  setDataFunction={handleDataChange}
                  setSingleDataFunction={handleDataChangeSingle}
                  missingKeys={AlertBorder}
                  setCheckBoxFunction={handleCheckChange}
                  FormType="Occ"
                  disable={disable}
                  isVisible2={isVisible2}
                  isVisible={isVisible}
                  handleSetTime={handleSetTime}
                  handleSetName={handleSetName}
                  setDataPerson={setDataPerson}
                  setChangePerson={setChangePerson}
                  handleSetPhone={handleSetPhone}
                  handleSetBoard={handleSetBoard}
                  handlePatientHn={handlePatientHn}
                  handlePatientName={handlePatientName}
                  handlePatientAge={handlePatientAge}
                  handlePatientAn={handlePatientAn}
                  handlePatientDiagnosis={handlePatientDiagnosis}
                  handleSetPerson={handleSetPerson}
                  handleSetDate={handleSetDate}
                  handleDateChange={handleDateChange}
                  handleDataChangeCheckbox={handleDataChangeCheckbox}
                  handleDataChangeCheckbox2={handleDataChangeCheckbox2}
                  userData={userData}
                  checkbox={checkbox}
                  setErrors={setErrors}
                  errors={errors}
                  inputRefs={inputRefs}
                />
<NavForm
          Mode={Mode}
          Data={formData}
          Access={formData.createby === UserData.userid || isAdmin}
          submitfunction={handleSubmit}
          handleSubmitEdit={handleSubmitEdit}
          Stage={Stage}
          MaxStage={1}
          text="บันทึกการวิเคราะห์"
          PrevStage={PrevStage}
          NextStage={NextStage}
          FirstStage={FirstStage}
          LastStage={LastStage}
          ToStage={ToStage}
          ClearData={ClearData}
        />
        </div>
</>
  

)}


               
            
              </>
            )}

          </Box>
        ) : (
          <Box className="MainContainer">
            <div className="AccessBox">
              {Mode === "Edit"
                ? "คุณไม่มีสิทธิในการแก้ไขนี้ ขออภัยในความไม่สะดวก"
                : "คุณไม่มีสิทธิในการเข้าถึงข้อมูลนี้ ขออภัยในความไม่สะดวก"}
            </div>
          </Box>
        )}

        
      </ComplaintStyle>
    </>
  );
};

export default Complaint;
