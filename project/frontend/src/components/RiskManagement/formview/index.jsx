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
import GeneralInfo3 from "../../form/GeneralInfoView3";
import GeneralInfo4 from "../../form/GeneralInfoView4";

import GeneralInfo from "../../form/GeneralInfoView2";
import ReportLog from "../../form/ReportLog";

import NavForm from "../../form/NavForm";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

import { ComplaintStyle } from "../../../styles/ComplaintStyle.style";
import { ComplaintViewStyle } from "../../../styles/ComplaintView.style";

import {
  CircleAlert,
  ClipboardCheck,
  MessageSquareReply,
  FileCheck2,
  CircleX,

  CheckCircle2,
} from "lucide-react";
import {
  BadgeAlert,
  ShieldCheck,
  Send,
  ChartColumn,
} from "lucide-react";
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
  const [reportid, setReportid] = useState("");
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({
    deptrelate: null,
  });

  const inputRefs2 = useRef({
    deptrelate: null,
    managementremark: null,
    responseDueDate: null,
  });
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
const [completeSubmitting, setCompleteSubmitting] = useState(false);

const [completeRemark, setCompleteRemark] = useState("");
  const OccType = "Complaint";
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const hostUrl = import.meta.env.VITE_REACT_APP_HOST_URL;
  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const config = {
    headers: { Authorization: `Bearer ${storedAuth.accessToken}` },
  };
  const navigate = useNavigate();
  const UserData = JSON.parse(localStorage.getItem("userData")) || null;
  const TempFormData = JSON.parse(localStorage.getItem("FormData")) || {};
  const [Stage, setStage] = useState(1);
  const [OccStage, setOccStage] = useState(0);
  const [formData, setFormData] = useState({});

  const [risk, setRisk] = useState(null);
  const [formData2, setFormData2] = useState({});
  const [formData3, setFormData3] = useState({});
  const [formData4, setFormData4] = useState({});

  const [showAppeal, setShowAppeal] = useState(0);
  const [disable, setDisable] = useState(false);
  const [showUrgent, setShowUrgent] = useState(1);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [array, setArray] = useState([]);

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

  const [Alert, setAlert] = useState(false);
  const [AlertType, setAlertType] = useState("error");
  const [AlertText, setAlertText] = useState("");
  const [AlertBorder, setAlertBorder] = useState([]);
  const [Access, setAccess] = useState(false);
  const isAdmin = chkAdmins(UserData?.role);
  const isEXEC = chkAdmin(UserData?.level);

  const handleDataChange = (event, name) => {
    const Text = event.target.value;
    setFormData({ ...formData, [name]: Text });
    if (Mode === "Edit") {
      setEditFormData({ ...EditFormData, [name]: Text });
    }
  };
  const handleDataChangeSingle = (datavalue, name) => {
    const Text = datavalue;
    setFormData({ ...formData, [name]: Text });
    if (Mode === "Edit") {
      setEditFormData({ ...EditFormData, [name]: Text });
    }
  };
  const handleStepClick = (step) => {
    setStage(1);

    if (step === 1) {
      setShow(true);
      setShow2(false);
      setShow3(false);
      setShow4(false);
    }

    if (step === 2) {
      setShow(false);
      setShow2(false);
      setShow3(false);
      setShow4(false);

      // ถ้า GeneralInfo หลักคือขั้นตอน 2
      setShow3(true);
    }

    if (step === 3) {
      setShow(false);
      setShow2(true);
      setShow3(false);
      setShow4(false);
    }

    if (step === 4) {
      setShow(false);
      setShow2(false);
      setShow3(false);
      setShow4(true);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  const handleSetDate = (event) => {
    setDate(event);
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

  // Get Data For Mode Edit&Show
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
  const FetchOccurranceById2 = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/complaints/viewform/${id}`,
        config,
      );

      if (response.status === 200 || response.status === 201) {
           setRisk(response.data?.risk ?? null);
           setCompleteRemark(response.data?.remark || "");
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
      if (error.response?.status === 404) {
        // ยังไม่มีข้อมูล ไม่ถือว่า Error
        setFormData2(null);
        return;
      }
      console.error(`Error fetching user data: ${error.message}`);
      navigate("/missing");
    }
  };

  const FetchOccurranceById3 = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/complaintresponse/${id}`,
        config,
      );

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
      if (error.response?.status === 404) {
        // ยังไม่มีข้อมูล ไม่ถือว่า Error
        setFormData3(null);
        return;
      }
      console.error(`Error fetching user data: ${error.message}`);
      navigate("/missing");
    }
  };

  const FetchOccurranceById4 = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/summarycomplaint/${id}`,
        config,
      );

      if (!response.data) {
        setFormData4(null);
        return;
      }
      if (response.status === 200 || response.status === 201) {
        setFormData4({
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
        setCheckbox4({
          respond_Cause: response.data.respond_Cause
            ? response.data.respond_Cause.split(",")
            : [],
        });
      }
    } catch (error) {
      if (error.response?.status === 404) {
        // ยังไม่มีข้อมูล ไม่ถือว่า Error
        setFormData4(null);
        return;
      }

      console.error(`Error fetching user data: ${error.message}`);
      navigate("/missing");
    }
  };
  const FetchOccurranceById = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/riskManagement/${id}`,
        config,
      );

      if (response.status === 200 || response.status === 201) {
        setFormData({
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
            setAccess(false);
          }
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
      if (error.response?.status === 404) {
        // ยังไม่มีข้อมูล ไม่ถือว่า Error
        setFormData(null);
        return;
      }

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
    const reportId = location.state?.reportid || id;

    if (!reportId) {
      navigate("../../home");
      return;
    }

    FetchPerson(reportId);

    if (reportId && Mode === "Edit") {
      FetchOccurranceById(reportId);
    }
  }, [location.state, id]);

  useEffect(() => {
    const reportId = location.state?.reportid || id;

    if (!reportId) {
      navigate("../../home");
      return;
    }

    setReportid(reportId);

    if (Mode === "Add") {
      setAccess(true);
      setFormData({
        ...TempFormData,
        userreport: UserData.userid,
        requestby:
          UserData?.title + " " + UserData?.name + " " + UserData?.lastname,
        pct: "ไม่ระบุ",
        gender: "M",
        reportdate: new Date(),
        complaintdate: new Date(),
        type: "0",
        reportidWhere: reportId,
        reporttype: "0",
        aff: UserData.affiliation,
        faction: UserData.faction,
        dep: UserData.dep,
        createby: UserData.userid,
      });
    } else {
      setEditFormData({ id: parseInt(id, 10) });
    }
  }, []);

  useEffect(() => {
    if (reportid) {
      Promise.allSettled([
        FetchOccurranceById2(reportid),
        FetchOccurranceById3(reportid),
        FetchOccurranceById(reportid),
        FetchOccurranceById4(reportid),
      ]);
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
    manager: [],
    quality: [],
    nurse: [],
    administer: [],
    operation: [],
    director: [],
    doctor: [],
    compensation: [],
  });

  const [checkbox4, setCheckbox4] = useState({
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

const handleSubmit = async () => {
  try {
    setCompleteSubmitting(true);

    const newRisk = Number(risk) === 4 ? 3 : 4;

    const response = await axios.put(
      `${apiUrl}/riskManagement/updateRisk/${reportid}`,
      {
        risk: newRisk,
        remark: completeRemark,
      },
      config
    );

    if (response.status === 200) {
      setRisk(newRisk);

      setFormData2((prev) => ({
        ...prev,
        risk: newRisk,
        remark: completeRemark,
      }));

      setCompleteDialogOpen(false);

      // ❌ อย่าล้าง completeRemark ตรงนี้
      // setCompleteRemark("");

      showAlert(
        newRisk === 4
          ? "ยืนยันคำร้องเสร็จสมบูรณ์แล้ว"
          : "เปิดคำร้องกลับมาแก้ไขแล้ว",
        "success"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  } catch (error) {
    console.error("Update Risk Error:", error);

    showAlert(
      error.response?.data?.message ||
        "ไม่สามารถดำเนินการได้",
      "error"
    );
  } finally {
    setCompleteSubmitting(false);
  }
};
const handleSubmitEdit = async (Mode) => {
  try {
    const response = await axios.put(
      `${apiUrl}/riskManagement/updateRisk/${reportid}`,
      {
        risk: 3,
      },
      config,
    );

    if (response.status === 200) {
      showAlert("เปลี่ยนสถานะกลับมาเป็นกำลังดำเนินการแล้ว", "success");

      setRisk(3);

      setFormData2((prev) => ({
        ...prev,
        risk: 3,
      }));
    }
  } catch (error) {
    console.error("Update Risk Error:", error);

    showAlert(
      error.response?.data?.message || "ไม่สามารถเปลี่ยนสถานะได้",
      "error",
    );
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
      data: formData2,
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
      data: formData,
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
      data: formData3,
    },
    {
      id: 3,
      number: "04",
      title: "สรุปผลการวิเคราะห์",
      subtitle: "Summary",
      icon: ChartColumn,
      color: "#16A34A",
      lightColor: "#F0FAF4",
      borderColor: "#166534",
      data: formData4,
    },
  ];

  const completedSteps = steps.filter(
    (step) => step.data && Object.keys(step.data).length > 0,
  ).length;

  const allStepsCompleted = completedSteps === 4;
const isReportClosed = Number(risk) === 4;
const isNotComplaint = Number(formData2?.status) === 0;
  return (
    <>
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
      <ComplaintStyle>
        {/* ================= STEP TRACKER ================= */}
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
          {/* =========================
      BACK BUTTON
  ========================= */}
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

          {/* =========================
      DOCUMENT NUMBER
  ========================= */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginBottom: "28px",
              paddingTop: "2px",
            }}
          >
            <AssignmentIcon
              sx={{
                fontSize: 22,
                color: "#A16207",
              }}
            />

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

{isReportClosed && (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      marginLeft: "6px",
      padding: "4px 10px",
      borderRadius: "999px",
      background: "#F3F4F6",
      border: "1px solid #D1D5DB",
      color: "#4B5563",
      fontSize: "10px",
      fontWeight: 800,
    }}
  >
    <CheckCircle2 size={13} />
    ปิดรายงานแล้ว
  </span>
)}
          </div>
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

          {/* =========================
      WORKFLOW STEPPER
  ========================= */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              const isCompleted =
                step.data && Object.keys(step.data).length > 0;

              const isActive = activeStep === step.id;

              const nextStep = steps[index + 1];

              const nextCompleted =
                nextStep &&
                nextStep.data &&
                Object.keys(nextStep.data).length > 0;

              return (
                <React.Fragment key={step.id}>
                  {/* STEP */}
                  <div
                    onClick={() => {
                      if (isCompleted) {
                        setActiveStep(step.id);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }
                    }}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: isCompleted ? "pointer" : "default",
                      opacity: isCompleted ? 1 : 0.55,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {/* ICON CIRCLE */}
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        background: isCompleted ? step.color : "#F8FAFC",

                        border: `2px solid ${
                          isCompleted ? step.borderColor : "#CBD5E1"
                        }`,

                        boxShadow: isActive
                          ? `0 0 0 6px ${step.lightColor}`
                          : "none",

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
                        color={isCompleted ? "#FFFFFF" : "#94A3B8"}
                      />
                    </div>

                    {/* STEP NUMBER */}
                    <div
                      style={{
                        marginTop: "9px",
                        fontSize: "10px",
                        fontWeight: 800,
                        color: isCompleted ? step.color : "#94A3B8",
                        letterSpacing: "1px",
                      }}
                    >
                      {step.number}
                    </div>

                    {/* TITLE */}
                    <div
                      style={{
                        marginTop: "3px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: isCompleted ? "#1F2937" : "#94A3B8",
                        textAlign: "center",
                      }}
                    >
                      {step.title}
                    </div>

                    {/* SUBTITLE */}
                    <div
                      style={{
                        marginTop: "2px",
                        fontSize: "10px",
                        color: "#94A3B8",
                        textAlign: "center",
                      }}
                    >
                      {step.subtitle}
                    </div>

                    {/* STATUS */}
                    <div
                      style={{
                        marginTop: "8px",
                        padding: "3px 9px",
                        borderRadius: "999px",
                        fontSize: "10px",
                        fontWeight: 700,

                        color: isCompleted ? step.color : "#94A3B8",

                        background: isCompleted ? step.lightColor : "#F8FAFC",

                        border: `1px solid ${
                          isCompleted ? step.borderColor : "#E2E8F0"
                        }`,
                      }}
                    >
                      {isCompleted ? "เสร็จแล้ว" : "ยังไม่มีข้อมูล"}
                    </div>
                  </div>

                  {/* CONNECTOR */}
                  {index < steps.length - 1 && (
                    <div
                      style={{
                        flex: "0 0 10%",
                        height: "2px",
                        marginTop: "25px",
                        background:
                          isCompleted && nextCompleted
                            ? nextStep.borderColor
                            : "#E2E8F0",
                        transition: "all 0.3s ease",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

     
{/* =========================
    REPORT STATUS
========================= */}
<div
  style={{
    marginTop: "22px",
    paddingTop: "15px",
    borderTop: "1px solid #F1F5F9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  }}
>
 {/* STATUS */}
<div
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    padding: isNotComplaint
      ? "9px 18px"
      : isReportClosed
        ? "9px 18px"
        : "7px 16px",
    borderRadius: "999px",

    background: isNotComplaint
      ? "#FFF7ED"
      : isReportClosed
        ? "#F3F4F6"
        : allStepsCompleted
          ? "#F0FAF4"
          : "#F8FAFC",

    border: `1px solid ${
      isNotComplaint
        ? "#FDBA74"
        : isReportClosed
          ? "#9CA3AF"
          : allStepsCompleted
            ? "#16A34A"
            : "#CBD5E1"
    }`,

    color: isNotComplaint
      ? "#C2410C"
      : isReportClosed
        ? "#4B5563"
        : allStepsCompleted
          ? "#166534"
          : "#64748B",

    fontSize: "12px",
    fontWeight: 700,
  }}
>
  {isNotComplaint ? (
    <CircleX size={16} />
  ) : (
    <CheckCircle2 size={isReportClosed ? 17 : 16} />
  )}

  {isNotComplaint
    ? "รายการนี้ไม่ใช่ข้อร้องเรียน"
    : isReportClosed
      ? "รายงานนี้ปิดแล้ว"
      : allStepsCompleted
        ? "ดำเนินการครบทั้ง 4 ขั้นตอนแล้ว"
        : `ดำเนินการแล้ว ${completedSteps} จาก 4 ขั้นตอน`}
</div>

  {/* CLOSE REMARK */}
{/* CLOSE REMARK */}
{isReportClosed && completeRemark?.trim() && (
  <div
    style={{
      width: "min(100%, 680px)",
      boxSizing: "border-box",
      marginTop: "2px",
      padding: "14px 16px",
      background: "#FFFFFF",
      border: "1px solid #E5E7EB",
      borderLeft: "3px solid #9CA3AF",
      borderRadius: "8px",
      textAlign: "left",
      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
    }}
  >
    {/* HEADER */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
        marginBottom: "9px",
      }}
    >
      <div
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F3F4F6",
          border: "1px solid #E5E7EB",
          color: "#6B7280",
          fontSize: "12px",
          fontWeight: 800,
        }}
      >
        ✓
      </div>

      <div>
        <div
          style={{
            fontFamily: "Mali, sans-serif",
            fontSize: "12px",
            fontWeight: 800,
            color: "#4B5563",
            lineHeight: 1.3,
          }}
        >
          บันทึกการปิดรายงาน
        </div>

        <div
          style={{
            marginTop: "2px",
            fontFamily: "Mali, sans-serif",
            fontSize: "10px",
            color: "#9CA3AF",
            lineHeight: 1.4,
          }}
        >
          ข้อความประกอบการยืนยันการดำเนินการ
        </div>
      </div>
    </div>

    {/* REMARK */}
    <div
      style={{
        padding: "11px 13px",
        background: "#F8FAFC",
        borderRadius: "7px",
        border: "1px solid #EEF0F2",
      }}
    >
      <div
        style={{
          fontFamily: "Mali, sans-serif",
          fontSize: "13px",
          lineHeight: 1.8,
          color: "#374151",
          whiteSpace: "pre-wrap",
        }}
      >
        {completeRemark}
      </div>
    </div>
  </div>
)}
</div>

        <div className="mt-3 complaint-detail-wrapper">
  {Stage === 1 && (
    <ComplaintViewStyle>
      <div
        className="complaint-detail-card"
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


        {/* ================================
            CONTENT
        ================================= */}

        <div className="complaint-detail-content">

          {/* =====================================================
              STEP 01 — COMPLAINT
          ===================================================== */}

          {activeStep === 0 &&
            formData2 &&
            Object.keys(formData2).length > 0 && (
              <GeneralInfo2
                Mode={Mode}
                array={array}
                data={formData2}
                disable={disable}
                show={true}
                setDataFunction={handleDataChange}
                setSingleDataFunction={handleDataChangeSingle}
                missingKeys={AlertBorder}
                setCheckBoxFunction={handleCheckChange}
                FormType="Occ"
                handleShow={() => setActiveStep(0)}
                handleSetBoard={handleSetBoard}
                handleSetDate={handleSetDate}
                showUrgent={showUrgent}
                showAppeal={showAppeal}
                handleDateChange={handleDateChange}
                handleDataChangeCheckbox={handleDataChangeCheckbox}
                handleDataChangeCheckbox2={handleDataChangeCheckbox2}
              />
            )}


          {/* =====================================================
              STEP 02 — ADMIN REVIEW
          ===================================================== */}

          {activeStep === 1 &&
            formData &&
            Object.keys(formData).length > 0 && (
              <GeneralInfo
                Mode={Mode}
                data={formData}
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
                handleShow={() => setActiveStep(1)}
                show={true}
                errors={errors}
                inputRefs={inputRefs}
              />
            )}


          {/* =====================================================
              STEP 03 — RESPONSE
          ===================================================== */}

          {activeStep === 2 &&
            formData3 &&
            Object.keys(formData3).length > 0 && (
              <GeneralInfo3
                Mode={Mode}
                items={array}
                data={formData3}
                setDataFunction={handleDataChange}
                setSingleDataFunction={handleDataChangeSingle}
                missingKeys={AlertBorder}
                setCheckBoxFunction={handleCheckChange}
                FormType="Occ"
                disable={disable}
                handleSetBoard={handleSetBoard}
                handleSetDate={handleSetDate}
                handleDataChangeCheckbox={handleDataChangeCheckbox}
                handleDataChangeCheckbox2={handleDataChangeCheckbox2}
                setErrors={setErrors}
                show={true}
                handleShow={() => setActiveStep(2)}
                errors={errors}
                inputRefs={inputRefs}
              />
            )}


          {/* =====================================================
              STEP 04 — SUMMARY
          ===================================================== */}

          {activeStep === 3 &&
            formData4 &&
            Object.keys(formData4).length > 0 && (
              <GeneralInfo4
                Mode={Mode}
                items={array}
                data={formData4}
                setDataFunction={handleDataChange}
                setSingleDataFunction={handleDataChangeSingle}
                missingKeys={AlertBorder}
                setCheckBoxFunction={handleCheckChange}
                FormType="Occ"
                disable={disable}
                handleSetBoard={handleSetBoard}
                handleSetDate={handleSetDate}
                handleDateChange={handleDateChange}
                handleDataChangeCheckbox={handleDataChangeCheckbox}
                handleDataChangeCheckbox2={handleDataChangeCheckbox2}
                checkbox={checkbox4}
                show={true}
                handleShow={() => setActiveStep(3)}
                setErrors={setErrors}
                errors={errors}
                inputRefs={inputRefs}
              />
            )}

        </div>

      </div>
    </ComplaintViewStyle>
  )}

{(isAdmin || isEXEC) && Number(risk) >= 3 && (
    
  <div
  style={{
    marginTop: "28px",
    padding: "20px 24px",
    background: "#FFFBEB",
    border: "1px solid #F3D58A",
    borderRadius: "12px",
    boxShadow: "0 3px 12px rgba(146, 103, 20, 0.06)",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
    }}
  >
    <div>
      <div
        style={{
          fontSize: "15px",
          fontWeight: 800,
          color: "#7A5700",
          marginBottom: "5px",
        }}
      >
        การดำเนินการขั้นสุดท้าย
      </div>

      <div
        style={{
          fontSize: "13px",
          color: "#6B7280",
          lineHeight: 1.6,
        }}
      >
        ตรวจสอบข้อมูลและรายละเอียดทั้งหมดเรียบร้อยแล้ว
        <br />
        กดยืนยันเพื่อระบุว่าการดำเนินการเสร็จสมบูรณ์
      </div>
    </div>

    <div
      style={{
        flexShrink: 0,
      }}
    >
 <Button
  variant="contained"
  onClick={() => setCompleteDialogOpen(true)}
  disabled={completeSubmitting}
  sx={{
    fontFamily: "Mali, sans-serif",
    textTransform: "none",
    backgroundColor:
      Number(risk) === 4
        ? "#B45309"
        : "#2F6516",
    "&:hover": {
      backgroundColor:
        Number(risk) === 4
          ? "#92400E"
          : "#255314",
    },
  }}
>
  {completeSubmitting
    ? "กำลังบันทึก..."
    : Number(risk) === 4
      ? "เปิดรายการกลับมาแก้ไข"
      : "ยืนยันเสร็จสมบูรณ์"}
</Button>
    </div>
  </div>
</div>
    )}


 
</div>
        </div>
        <Dialog
  open={completeDialogOpen}
  onClose={() => {
    if (!completeSubmitting) {
      setCompleteDialogOpen(false);
    }
  }}
  PaperProps={{
    sx: {
      borderRadius: "12px",
      minWidth: {
        xs: "90%",
        sm: "420px",
      },
    },
  }}
>
<DialogTitle
  sx={{
    fontFamily: "Mali, sans-serif",
    fontSize: "18px",
    fontWeight: 700,
    color:
      Number(risk) === 4
        ? "#B45309"
        : "#2F6516",
  }}
>
  {Number(risk) === 4
    ? "เปิดรายการกลับมาแก้ไข"
    : "ยืนยันการดำเนินการ"}
</DialogTitle>
<DialogContent>
  <DialogContentText
    sx={{
      fontFamily: "Mali, sans-serif",
      fontSize: "14px",
      lineHeight: 1.8,
      color: "#4B5563",
      mb: 2,
    }}
  >
    {Number(risk) === 4
      ? "ต้องการเปิดรายการนี้กลับมาเพื่อแก้ไขและดำเนินการต่อหรือไม่?"
      : "ต้องการยืนยันว่าคำร้องนี้ดำเนินการเสร็จสมบูรณ์แล้วหรือไม่?"}
  </DialogContentText>

  {/* =========================
      REMARK
  ========================= */}
  <Box>
    <div
      style={{
        fontFamily: "Mali, sans-serif",
        fontSize: "13px",
        fontWeight: 700,
        color: "#374151",
        marginBottom: "7px",
      }}
    >
      หมายเหตุ
      <span
        style={{
          marginLeft: "6px",
          fontSize: "11px",
          fontWeight: 400,
          color: "#9CA3AF",
        }}
      >
        (ไม่บังคับ)
      </span>
    </div>

    <textarea
      value={completeRemark}
      onChange={(e) => setCompleteRemark(e.target.value)}
      placeholder={
        Number(risk) === 4
          ? "ระบุหมายเหตุการเปิดรายการกลับมาแก้ไข..."
          : "ระบุหมายเหตุการดำเนินการ..."
      }
      disabled={completeSubmitting}
      rows={4}
      style={{
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        padding: "11px 13px",
        borderRadius: "9px",
        border: "1px solid #D1D5DB",
        background: "#FFFFFF",
        fontFamily: "Mali, sans-serif",
        fontSize: "13px",
        lineHeight: 1.7,
        color: "#374151",
        outline: "none",
      }}
    />
  </Box>
</DialogContent>

  <DialogActions sx={{ px: 2.5, pb: 2 }}>
    <Button
      onClick={() => setCompleteDialogOpen(false)}
      disabled={completeSubmitting}
      sx={{
        fontFamily: "Mali, sans-serif",
        textTransform: "none",
      }}
    >
      ยกเลิก
    </Button>
<Button 
  variant="contained" 
  onClick={handleSubmit}
  disabled={completeSubmitting}
  startIcon={<TaskAltOutlinedIcon />} 
  sx={{ 
    minWidth: "175px", 
    height: "42px", 
    px: 2.2, 
    borderRadius: "9px", 
    fontFamily: "Mali, sans-serif", 
    fontSize: "14px", 
    fontWeight: 700, 
    textTransform: "none", 
    color: "#FFFFFF", 
    backgroundColor: 
      Number(risk) === 4 ? "#B45309" : "#2F6516", 
    border: 
      Number(risk) === 4 
        ? "1px solid #B45309" 
        : "1px solid #2F6516", 
    boxShadow: 
      Number(risk) === 4 
        ? "0 3px 8px rgba(180, 83, 9, 0.25)" 
        : "0 3px 8px rgba(47, 101, 22, 0.25)", 
    "&:hover": { 
      backgroundColor: 
        Number(risk) === 4 ? "#92400E" : "#255314", 
    }, 
  }} 
>
  {Number(risk) === 4 
    ? "เปิดรายการกลับมาแก้ไข" 
    : "ยืนยันเสร็จสมบูรณ์"} 
</Button>
  </DialogActions>
</Dialog>
      </ComplaintStyle>
    </>
  );
};

export default Complaint;
