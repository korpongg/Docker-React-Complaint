import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { getCurrentDate } from "../Function";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import GreenCircle from "./GreenCircle";
import { Send } from "lucide-react";
import ReportLog from "./ReportLog";
import ReportLog2 from "./ReportLog2";
import AutoCompleteText from "./AutoCompleteDep";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";

import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { color } from "@mui/system";

const options = [
  "ไม่ระบุ",
  "PCT ศัลยกรรม",
  "PCT สูตินรีเวช-ปริกำเนิด",
  "PCT หัวใจและหลอดเลือด",
  "PCT อายุรกรรม 1",
  "PCT อายุรกรรม 2",
  "PCT หู คอ จมูก",
  "PCT อายุรกรรมทางเดินอาหาร",
  "PCT ตา",
  "PCT กุมารเวชกรรม",
  "PCT ฉุกเฉิน",
  "PCT Palliative Care Team",
];

const GeneralInfo = ({
  Mode,
  data,
  array,
  disable,
  setDataFunction,
  handleSetBoard,
  handleSetDate,
  setSingleDataFunction,
  missingKeys,
  handleSetPhone,
  handleSetTime,
  FormType,
  showUrgent,
  showAppeal,
  removePerson,
  handleSetName,
  setDataPerson,
  handleDateChange,
  handleDataChangeCheckbox,
  handleDataChangeCheckbox2,
  depoptiondata,
  setCheckBoxFunction,
  handleSetPerson,
  handlePatientHn,
  handlePatientName,
  handlePatientAge,
  handlePatientAn,
  setChangePerson,
  handlePatientDiagnosis,
  show,
  handleShow,
  setErrors,
  errors,
  inputRefs,
}) => {
  console.log(data);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tosentvalue, settosentvalue] = useState("select"); // select or textinput

  useEffect(() => {
    if (data.pct) {
      if (options.includes(data.pct)) {
        settosentvalue("select");
        setValue(data.pct);
      } else {
        settosentvalue("textinput");
        setInputValue(data.pct);
      }
    }
  }, []);
  const InfoRow = ({ label, value }) => (
    <div className="info-row-new">
      <div className="info-label-new">{label}</div>

      <div className="info-value-new">{value || "-"}</div>
    </div>
  );
  const respondText = {
    0: "ตอบกลับผู้ร้องเรียนแล้ว",
    1: data?.respond_text
      ? `ยังไม่ได้ตอบกลับผู้ร้องเรียน : ${data.respond_text}`
      : "ยังไม่ได้ตอบกลับผู้ร้องเรียน",
  };
  return (
    <>
      <div className="page-bg">
        <div className="card-section">
           <div className="view-page">
              <div
            className="view-header"
            style={{
              background: "#F0F9FF",
              border: "1px solid #0284C7",
              borderLeft: "5px solid #0284C7",
            }}
          >
            <div
              className="view-title-main"
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#075985",
              }}
            >
              <Send size={22} color="#0284C7" />
              ดูข้อมูลการตอบกลับผู้ร้องเรียน
            </div>

            <Button size="sm" variant="outline-secondary" onClick={handleShow}>
              {show ? "ซ่อน" : "แสดง"}
            </Button>
          </div>
           </div>
        

          {show && (
            <>
              <div className="cv-container">

                   <div className="cv-stack">

  {/* 1 */}
  <div className="section">
    <div className="section-title">
      
      ตอบกลับผู้ร้องเรียน
    </div>

    <div className="info-row">
      <div className="info-label">สถานะการตอบกลับ</div>
      <div className="info-value">
        {respondText[data?.respond_radio]}
      </div>
    </div>
  </div>

  {/* 2 */}
  <div className="section">
    <div className="section-title">
      
      สรุปประเด็นร้องเรียน
    </div>

    <div className="section-content">
      {data?.summary_reply || "-"}
    </div>
  </div>

  {/* 3 */}
  <div className="section">
    <div className="section-title">
      
      ผลการวิเคราะห์สาเหตุ
    </div>

    <div className="section-content">
      {data?.summary_analysis || "-"}
    </div>
  </div>

  {/* 4 */}
  <div className="section">
    <div className="section-title">
      
      แนวทางการแก้ไข/ป้องกันปัญหาในเชิงระบบ
    </div>

    <div className="section-content">
      {data?.summary_solving || "-"}
    </div>
  </div>

</div>
              </div>
              {" "}
       
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
