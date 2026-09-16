import React, {useRef , useState, useEffect } from "react";
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

import GeneralInfo from "../../form/GeneralInfo";
import ReportLog from "../../form/ReportLog";






import NavForm from "../../form/NavForm";

import AssignmentIcon from '@mui/icons-material/Assignment';



import { ComplaintStyle } from "../../../styles/ComplaintStyle.style";


import {
  chkAdmins,
  chkAdmin,
  TimeConverter,
  checkFileExists,
} from "../../Function";

import showAlert from "../../../utils/alertService";
import { useLocation } from "react-router-dom";

const Complaint = ({ Mode }) => {
  let { reportid } = useParams();
  const location = useLocation();
  //const [reportid, setReportid] = useState("");
       const [errors, setErrors] = useState({});
    const inputRefs = useRef({
  deptrelate: null,
});
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
  const [formData2, setFormData2] = useState({});
  const [formData3, setFormData3] = useState({});
    const [formData4, setFormData4] = useState({});
 
  const [showAppeal, setShowAppeal] = useState(0);
  const [disable, setDisable] = useState(false);
  const [showUrgent, setShowUrgent] = useState(1);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
    const [show4, setShow4] = useState(false);
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

  // Get Data For Mode Edit&Show
  const FetchPerson = async (id) => {
    try {
      const response2 = await axios.get(
        `${apiUrl}/complaints2/getComplainant/${id}`,
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
            department: item.department,
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
        `${apiUrl}/complaints2/viewform/${id}`,
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
      const response = await axios.get(
        `${apiUrl}/complaints3/${id}`,
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
     // console.error(`Error fetching user data: ${error.message}`);
      //navigate("/missing");
    }
  };


  const FetchOccurranceById4 = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/complaints4/${id}`,
        config,
      );

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
      //console.error(`Error fetching user data: ${error.message}`);
     // navigate("/missing");
    }
  };
  const FetchOccurranceById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/complaints/${id}`, config);

      const response2 = await axios.get(
        `${apiUrl}/complaints2/viewform/${id}`,
        config,
      );

      if (response.status === 200 || response.status === 201) {
        setFormData2({
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
      //console.error(`Error fetching user data: ${error.message}`);
      //navigate("/missing");
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
   
    FetchPerson(reportid);
    if (reportid && Mode === "Edit") {
      FetchOccurranceById(reportid);
    }
  }, [reportid]);

  useEffect(() => {
     
    
   // setReportid(reportid);
    if (Mode === "Add") {
      
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
          type: "0",
          reportidWhere: reportid,
          reporttype: "0",
          aff: UserData.affiliation,
          faction: UserData.faction,
          dep: UserData.dep,
          createby: UserData.userid,
        }));
    } else {
      
      setEditFormData({ id: parseInt(reportid, 10) });
    }
  }, []);

  useEffect(() => {
     
    if (reportid) {
      FetchOccurranceById2(reportid);
      FetchOccurranceById3(reportid);
      FetchOccurranceById(reportid);
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

  const handleSubmit = async (Mode) => {
   
       if (!formData.deptrelate || formData.deptrelate.length === 0) {
    setErrors((prev) => ({ ...prev, deptrelate: true }));

    const el = inputRefs.current.deptrelate;
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
        Object.keys(formData).forEach((key) => {
          if (formData[key] !== undefined && formData[key] !== null) {
            // Exclude complaintdate and reportdate
            if (key !== "complaintdate" && key !== "reportdate") {
              // Convert arrays/objects to JSON string before appending
              if (typeof formData[key] === "object") {
                submitFormData.append(key, JSON.stringify(formData[key]));
              } else {
                submitFormData.append(key, formData[key]);
              }
            }
          }
        });
        submitFormData.append(
          "complaintdate",
          TimeConverter(formData.complaintdate, 7),
        );
        submitFormData.append(
          "reportdate",
          TimeConverter(formData.reportdate, 7),
        );
        if (attachData.fileImage) {
          submitFormData.append("files", attachData.fileImage);
        }
        if (attachData.filePDF) {
          submitFormData.append("files", attachData.filePDF);
        }
        submitFormData.append("formstatus", "0");

       // submitFormData.append("date", date);
        submitFormData.append("manager", checkbox["manager"]);
        submitFormData.append("quality", checkbox["quality"]);
        submitFormData.append("nurse", checkbox["nurse"]);
        submitFormData.append("administer", checkbox["administer"]);
        submitFormData.append("operation", checkbox["operation"]);
        submitFormData.append("director", checkbox["director"]);
        submitFormData.append("doctor", checkbox["doctor"]);
        submitFormData.append("compensation", checkbox["compensation"]);
     
        try {
          const response = await axios.post(
            `${apiUrl}/complaints`,
            submitFormData,
            { ...config },
          );
          const responseStatus = response.status;

          if (responseStatus === 200 || responseStatus === 201) {
            navigate("/riskmanagement");
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
  const handleShow4 = async () => {
    setShow4(!show4);
  };

  const handleSubmitEdit = async (Mode) => {
      if (!formData.deptrelate || formData.deptrelate.length === 0) {
    setErrors((prev) => ({ ...prev, deptrelate: true }));

    const el = inputRefs.current.deptrelate;
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
        // submitEditFormData = {
        //   ...EditFormData,
        //   deptrelate: JSON.stringify(formData.deptrelate),
        //   equipment: JSON.stringify(formData.equipment),
        //   management: JSON.stringify(formData.management),
        //   patientcare: JSON.stringify(formData.patientcare),
        //   patientsupport: JSON.stringify(formData.patientsupport),
        //   safety: JSON.stringify(formData.safety),
        //   service: JSON.stringify(formData.service),
        //   utility: JSON.stringify(formData.utility),
        //   updateby: UserData.userid,
        // };
        // if (Mode === "Draft") {
        //   submitEditFormData = {
        //     ...submitEditFormData,
        //     formstatus: "0",
        //   };
        // }
        // if (Mode === "Submit") {
        //   if (formData.formstatus === "0") {
        //     submitEditFormData = {
        //       ...submitEditFormData,
        //       formstatus: "1",
        //     };
        //   }
        // }
        // console.log("submitEditFormData", submitEditFormData);
        const submitEditFormData = new FormData();
        Object.keys(formData).forEach((key) => {
          if (formData[key] !== undefined && formData[key] !== null) {
            // Exclude complaintdate and reportdate
            if (
              key !== "updateby" &&
              key !== "complaintdate" &&
              key !== "reportdate" &&
              key != "formstatus"
            ) {
              // Convert arrays/objects to JSON string before appending
              if (typeof formData[key] === "object") {
                submitEditFormData.append(key, JSON.stringify(formData[key]));
              } else {
                submitEditFormData.append(key, formData[key]);
              }
            }
          }
        });
        submitEditFormData.append("updateby", UserData.userid);
        submitEditFormData.append(
          "complaintdate",
          TimeConverter(formData.complaintdate, 7),
        );
        submitEditFormData.append(
          "reportdate",
          TimeConverter(formData.reportdate, 7),
        );
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
   // submitEditFormData.set("date", date);
        submitEditFormData.set("manager", checkbox["manager"]);
        submitEditFormData.set("quality", checkbox["quality"]);
        submitEditFormData.set("nurse", checkbox["nurse"]);
        submitEditFormData.set("administer", checkbox["administer"]);
        submitEditFormData.set("operation", checkbox["operation"]);
        submitEditFormData.set("director", checkbox["director"]);
        submitEditFormData.set("doctor", checkbox["doctor"]);
        submitEditFormData.set("compensation", checkbox["compensation"]);
        try {
          const response = await axios.post(
            `${apiUrl}/complaints/updateOccurrence`,
            submitEditFormData,
            { ...config },
          );
          const responseStatus = response.status;

          if (responseStatus === 200 || responseStatus === 201) {
            navigate("/riskmanagement");
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
  return (
    <>
      
      <ComplaintStyle>
         <div
          className="px-4 py-3 "
          style={{
            background: "#FEF9C3",
            border: "2px solid #262b20ff",
            position: "relative",
            minHeight: "72px",
            display: "flex",
            alignItems: "center",
            
          }}
        >
           <IconButton
                    onClick={() => navigate(-1)}
                    sx={{
                      position: "absolute",
                      left: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "#e6f4ea",
                      "&:hover": {
                        backgroundColor: "#166534",
                        color: "#fff",
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              whiteSpace: "nowrap",
            
            }}
          >
             <h2 style={{ margin: 0, fontWeight: 600 }}>
                <AssignmentIcon sx={{
    fontSize: 40,     // 🔥 ปรับขนาด (px)
    color: "#166534", // 🔥 เปลี่ยนสี
  }}
/>  หมายเลขเอกสาร : {reportid}
                </h2>
          </div>

          {/* ===== Right Actions ===== */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
         
          </div>
        </div>

        <Box className="MainContainer" style={{ background: "#F5F5F5" }}>
          {Stage === 1 && (
            <>
 
                {Object.keys(formData2).length>0 && <>
                  <GeneralInfo2
                Mode={Mode}
                array={array}
                data={formData2}
                disable={disable}
                show={show}
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
              </>}
            

              {Object.keys(formData3).length>0 && <>
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
                  handleDateChange={handleDateChange}
                  handleDataChangeCheckbox={handleDataChangeCheckbox}
                  handleDataChangeCheckbox2={handleDataChangeCheckbox2}
                             setErrors={setErrors}
                               show={show2}
                                     handleShow={handleShow2}
                errors={errors}
                inputRefs={inputRefs}
              />
              </>}


                  {Object.keys(formData4).length>0 && <>
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
                          show={show4}
                                     handleShow={handleShow4}
                  setErrors={setErrors}
                  errors={errors}
                  inputRefs={inputRefs}
                />

              </>}



              <Divider variant="middle" flexItem sx={{ m: 1 }} />
            </>
          )}

          {Mode === "Show" &&
            (isAdmin || isEXEC) &&
            Stage === 1 &&
            ["2", "5"].includes(formData.formstatus) && (
              <>
                <Divider variant="middle" flexItem sx={{ m: 1 }} />
                <ReportComment data={formData} />
              </>
            )}
        </Box>

    
      </ComplaintStyle>
    </>
  );
};


export default Complaint;
