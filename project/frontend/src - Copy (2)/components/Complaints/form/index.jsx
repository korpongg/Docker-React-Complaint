import React, { useRef,useState, useEffect } from "react";
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
import GeneralInfo from "../../form/GeneralInfo2";
import ReportLog from "../../form/ReportLog";






import NavForm from "../../form/NavForm";

import Swal from 'sweetalert2'
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import {
  BadgeAlert,
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
  const [reportid, setReportid] = useState(false);
const [errors, setErrors] = useState({});
const inputRefs = useRef({});
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

  const [disable, setDisable] = useState(false);
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
  const [time, setTime] = useState(null);
  const [phone, setPhone] = useState("");
  const [patienthn, setPatientHn] = useState("");
  const [patientname, setPatientName] = useState("");
  const [patientage, setPatientAge] = useState("");
  const [patientan, setPatientAn] = useState("");
  const [patientdiagnosis, setPatientDiagnosis] = useState("");

  const [name, setName] = useState("");
  const [showUrgent, setShowUrgent] = useState(1);
  const [showAppeal, setShowAppeal] = useState(0);

  const [array, setArray] = useState([]);
  const [Alert, setAlert] = useState(false);
  const [AlertType, setAlertType] = useState("error");
  const [AlertText, setAlertText] = useState("");
  const [AlertBorder, setAlertBorder] = useState([]);
  const [Access, setAccess] = useState(false);
  const isAdmin = chkAdmins(UserData?.role);
  const isEXEC = chkAdmin(UserData?.level);
const handleDataChange = (event, name) => {
    const Text = event.target.value;

    if (name == "urgent") {
      if (Text == 0) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }

    if (name == "involved") {
      if (Text == 0) {
        setShowUrgent(1);
      } else {
        setShowUrgent(0);
      }
    }

    if (name == "appeal") {
      if (Text == 0) {
        setShowAppeal(0);
      } else {
        setShowAppeal(1);
      }
    }
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
  const handleSetName = (event) => {
    setName(event);
  };
  const handleSetPhone = (event) => {
    setPhone(event);
  };
  const handleSetDate = (event) => {
    setDate(event);
  };

  const handleSetTime = (value) => {
    if (!value || !value.isValid()) {
      setTime(null);
      return;
    }
    setTime(value.format("HH:mm:ss"));
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
    const maxId = array.length ? Math.max(...array.map((item) => item.id)) : 0;

    setArray([
      ...array,
      { id: maxId + 1, name: "", department: "", faction: 0 },
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

  const removePerson = (id) => {

    Swal.fire({
title: "ยืนยันการลบข้อมูล",
  text: "คุณต้องการลบรายการนี้ใช่หรือไม่? เมื่อลบแล้วจะไม่สามารถกู้คืนได้",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#dc3545",
  cancelButtonColor: "#6c757d",
  confirmButtonText: "ลบข้อมูล",
  cancelButtonText: "ยกเลิก"

}).then((result) => {
  if (result.isConfirmed) {
   const newUsers = array.filter((u) => u.id !== id);
    setArray(newUsers);
  }
});

    
  };

const setChangePerson = (event, newValue, index) => {
  const newUsers = array.map((user, i) => {
    if (index - 1 === i) {
      return {
        ...user,
        department: newValue?.id ?? null, // 🔥 เก็บแค่ id
      };
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

  // Get Data For Mode Edit&Show
  const FetchPerson = async () => {
    try {
      const response2 = await axios.get(
        `${apiUrl}/complaints2/getComplainant/${reportid}`,
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
const setFieldValue = (name, value) => {
  setFormData((prev) => ({ ...prev, [name]: value }));

  if (Mode === "Edit") {
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  }
};
    const fetchPatientByHN = async (hn) => {
  try {
    const res = await axios.get(
      `${apiUrl}/complaints2/patienhn/getname/hn`,
      {
        params: { hn: hn },   // ✅ ส่งเป็น query string
        ...config             // ✅ รวม header auth
      }
    );

    console.log("patient:", res.data);
    if(res.data.length>0){
       const fullName = `${res.data[0].FirstName} ${res.data[0].LastName}`;
  handleDataChange(
        { target: { value: fullName } },
        "patient_name"
      );
    }

    // เอาข้อมูลไป set state ต่อ
    // setData(prev => ({ ...prev, patient_name: res.data[0]?.FNAME }))
  } catch (err) {
    console.error(err);
  }
};


  const FetchOccurranceById = async () => {
    try {
      const response = await axios.get(`${apiUrl}/complaints2/${id}`, config);

      if (response.status === 200 || response.status === 201) {
        if (Mode === "Edit") {
          if (
            isAdmin ||
            UserData?.level == 3 ||
            UserData.userid === response.data.createby
          ) {
            if(response.data.involved==1){
              setShowUrgent(0)
            }
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
              setTime(response.data.time);
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
          type: 0,
          record: 0,
          complaints: 0,
          involved: 0,
          urgent: 0,
          appeal: 0,
          suggestion: 'A',
          achievement: 0,
          complaint: 0,
          reporttype: "0",
          aff: UserData.affiliation,
          faction: UserData.faction,
          dep: UserData.dep,
          createby: UserData.userid,
        }));
    } else {
        if(!location.state && Mode === "Edit"){
      navigate('../../home')
      return; 
    }
      const { reportid } = location.state;
      setReportid(reportid);
      FetchOccurranceById();
      setEditFormData({ id: parseInt(id, 10) });
    }
  }, []);

  useEffect(() => {
      if(!location.state && Mode === "Edit"){
      navigate('../../home')
      return; 
    }
    FetchPerson();
    if (formData.reportid && Mode === "Edit") {
      fetchAttach();
    }
  }, [formData.reportid]);

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
  const handleCheckChange = (e, name) => {
    const value = e.target.name;
    const checked = e.target.checked;
    setCheckbox((prev) => ({
      ...prev,
      [name]: checked
        ? [...(prev[name] || []), value] // เพิ่ม
        : prev[name].filter((v) => v !== value), // ลบ
    }));
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
      type: 0,
      record: 0,
      complaints: 0,
      involved: 0,
      urgent: 0,
      reply: 0,
      risk: 0,
      appeal: 0,
      suggestion:'A',
      achievement: 0,
      complaint: 0,
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
               if (!formData.date) {
    setErrors((prev) => ({ ...prev, date: true }));

    const el = inputRefs.current.date;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }
  if (!time) {
    setErrors((prev) => ({ ...prev, time: true }));

    const el = inputRefs.current.time;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return; // ⛔ หยุด submit
  }

                if (!formData.name) {
    setErrors((prev) => ({ ...prev, name: true }));

    const el = inputRefs.current.name;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }

                if (!formData.related) {
    setErrors((prev) => ({ ...prev, related: true }));

    const el = inputRefs.current.related;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }

                if (!formData.phone) {
    setErrors((prev) => ({ ...prev, phone: true }));

    const el = inputRefs.current.phone;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }

            if (array.length==0) {
    setErrors((prev) => ({ ...prev, appeal: true }));

    const el = inputRefs.current.appeal;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }

       
          /*         if (!formData.patient_hn) {
    setErrors((prev) => ({ ...prev, patient_hn: true }));

    const el = inputRefs.current.patient_hn;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }
      if (!formData.patient_name) {
    setErrors((prev) => ({ ...prev, patient_name: true }));

    const el = inputRefs.current.patient_name;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }*/
                if (!formData.summarize) {
    setErrors((prev) => ({ ...prev, summarize: true }));

    const el = inputRefs.current.summarize;
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

        //submitFormData.append("date", date);
        submitFormData.append("time", time);
        
        //submitFormData.append("name", name);
        //submitFormData.append("phone", phone);
       // submitFormData.append("patient_hn", patienthn);
       // submitFormData.append("patient_name", patientname);
        //submitFormData.append("patient_age", patientage);
       // submitFormData.append("patient_an", patientan);
        //submitFormData.append("patient_diagnosis", patientdiagnosis);

        submitFormData.append("array", JSON.stringify(array));
    
        //submitFormData.append("related", board);
        submitFormData.append("manager", checkbox["manager"]);
        submitFormData.append("quality", checkbox["quality"]);
        submitFormData.append("nurse", checkbox["nurse"]);
        submitFormData.append("administer", checkbox["administer"]);
        submitFormData.append("operation", checkbox["operation"]);
        submitFormData.append("director", checkbox["director"]);
        submitFormData.append("doctor", checkbox["doctor"]);
        submitFormData.append("compensation", checkbox["compensation"]);
            if(array.length==0){
          submitFormData.set("appeal", 0);
        }
        console.log('submitFormData')
        console.log(submitFormData);
        for (const [key, value] of submitFormData.entries()) {
  if (key.toLowerCase().includes("date")) {
    console.log(key, value);
  }
}
        try {
          const response = await axios.post(
            `${apiUrl}/complaints2`,
            submitFormData,
            { ...config },
          );
          const responseStatus = response.status;

          if (responseStatus === 200 || responseStatus === 201) {
            navigate("/complaints");
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

  const handleSubmitEdit = async (Mode) => {
  if (!formData.date) {
    setErrors((prev) => ({ ...prev, date: true }));

    const el = inputRefs.current.date;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }
  
  if (!time) {
    setErrors((prev) => ({ ...prev, time: true }));

    const el = inputRefs.current.time;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return; // ⛔ หยุด submit
  }

                if (!formData.name) {
    setErrors((prev) => ({ ...prev, name: true }));

    const el = inputRefs.current.name;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }

                if (!formData.related) {
    setErrors((prev) => ({ ...prev, related: true }));

    const el = inputRefs.current.related;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }

                if (!formData.phone) {
    setErrors((prev) => ({ ...prev, phone: true }));

    const el = inputRefs.current.phone;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }

                if (!formData.patient_hn) {
    setErrors((prev) => ({ ...prev, patient_hn: true }));

    const el = inputRefs.current.patient_hn;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }

                if (!formData.patient_name) {
    setErrors((prev) => ({ ...prev, patient_name: true }));

    const el = inputRefs.current.patient_name;
    if (el) {
      el.focus();
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    return;
  }
                if (!formData.summarize) {
    setErrors((prev) => ({ ...prev, summarize: true }));

    const el = inputRefs.current.summarize;
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
        submitEditFormData.append("array", JSON.stringify(array));
       // submitFormData.append("date", date);
              submitEditFormData.set("time", time);
               
        try {
          const response = await axios.put(
            `${apiUrl}/complaints2`,
            submitEditFormData,
            { ...config },
          );
          const responseStatus = response.status;

          if (responseStatus === 200 || responseStatus === 201) {
            navigate("/complaints");
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
            background: "#ffffff",
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
          {/* ===== Center Title ===== */}
        <div
  style={{
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    <Box
      sx={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        bgcolor: "#FEE2E2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BadgeAlert size={28} color="#DC2626" />
    </Box>

    <h4
      style={{
        margin: 0,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {Mode === "Add" && "แบบบันทึกข้อร้องเรียน / ข้อเสนอแนะ"}
      {Mode === "Edit" && "แบบบันทึกข้อร้องเรียน / ข้อเสนอแนะ (แก้ไข)"}
      {Mode === "Show" &&
        "แบบบันทึกข้อร้องเรียน / ข้อเสนอแนะ (ดูได้เท่านั้น)"}
    </h4>
  </div>
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
            {formData && Mode !== "Add" && (
                <div
      style={{
        position: "absolute",
        right: "16px",
        bottom: "10px",
        fontSize: "14px",
        color: "#374151",
        whiteSpace: "nowrap",
          alignItems: "center",
        gap: "8px",
        background: "#F1F5F9",
        padding: "6px 14px",
        borderRadius: "999px",
        border: "1px solid #E2E8F0",
        fontSize: "13px",
        whiteSpace: "nowrap",
      }}
    >
        <span
        style={{
          fontWeight: 600,
          letterSpacing: "1px",
          color: "#0F172A",
        }}
      >
        เอกสาร : {reportid}
      </span>
    
    </div>
            )}

            {Mode === "Add" && (
              <Tooltip title="ล้างข้อมูลทั้งหมด">
                <IconButton
                  size="small"
                  onClick={ClearData}
                  sx={{
                    color: "#6B7280",
                    "&:hover": {
                      color: "#EF4444",
                      backgroundColor: "#FEE2E2",
                    },
                  }}
                >
                  <CleaningServicesIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>

        <Box className="MainContainer">
          {Stage === 1 && (
            <ComplaintViewStyle>
              <GeneralInfo
                Mode={Mode}
                array={array}
                data={formData}
                disable={disable}
                setSingleDataFunction={handleDataChangeSingle}
                missingKeys={AlertBorder}
                time={time}
                setCheckBoxFunction={handleCheckChange}
                FormType="Occ"
                    setDataFunction={handleDataChange}
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
                showUrgent={showUrgent}
                showAppeal={showAppeal}
                fetchPatientByHN={fetchPatientByHN}
                removePerson={removePerson}
                handleDateChange={handleDateChange}
                handleDataChangeCheckbox={handleDataChangeCheckbox}
                handleDataChangeCheckbox2={handleDataChangeCheckbox2}
                
                setErrors={setErrors}
                errors={errors}
                inputRefs={inputRefs}
              />

              <Divider variant="middle" flexItem sx={{ m: 1 }} />

              <NavForm
                Mode={Mode}
                Data={formData}
                Access={formData.createby === UserData.userid || isAdmin}
                submitfunction={handleSubmit}
                handleSubmitEdit={handleSubmitEdit}
                Stage={Stage}
                     text="บันทึก"
                MaxStage={1}
                PrevStage={PrevStage}
                NextStage={NextStage}
                FirstStage={FirstStage}
                LastStage={LastStage}
                ToStage={ToStage}
                ClearData={ClearData}
              />
            </ComplaintViewStyle>
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
