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
import { formatThaiDate } from "./dateUtils";
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
  const InfoRow = ({ label, value }) => {
    const isDept = Array.isArray(value);

    return (
      <div className="info-row">
        <div className="info-label">{label}</div>

        <div className="info-value">
          {isDept ? (
            <div className="dept-list">
              {value.length
                ? value.map((d, i) => (
                    <span
                      className="dept-aff"
                      key={d?.DepID ?? d?.DepName ?? i}
                    >
                      {d?.DepName || "-"}
                    </span>
                  ))
                : "-"}
            </div>
          ) : (
            value || "-"
          )}
        </div>
      </div>
    );
  };
  const respondText = {
    0: "ตอบกลับผู้ร้องเรียนแล้ว",
    1: data?.respond_text
      ? `ยังไม่ได้ตอบกลับผู้ร้องเรียน : ${data.respond_text}`
      : "ยังไม่ได้ตอบกลับผู้ร้องเรียน",
  };

return (
  <>
    {show && (
      <div className="general-info-page">

        <div className="gi-content">

  

          {/* =====================================================
              01 — ข้อมูลการตอบกลับ
          ===================================================== */}

<section className="gi-section">

  <div className="gi-section-header">

    <div>

      <h2 className="gi-section-heading">
        ข้อมูลการตอบกลับ
      </h2>

      <div className="gi-section-caption">
        ความต้องการของผู้ร้องเรียนและสถานะการตอบกลับ
      </div>

    </div>

  </div>


  <div className="gi-general-panel">

    <div className="gi-general-group">

      <div className="gi-group-title">
        รายละเอียดการตอบกลับ
      </div>


      <div className="gi-response-list">

        {/* ความต้องการ */}
        <div className="gi-response-item">

          <div className="gi-response-label">
            ความต้องการ
          </div>

          <div className="gi-response-value">
            {{
              0: "ขอให้ตอบกลับผู้ร้องเรียน",
              1: "ผู้ร้องเรียนไม่ต้องการการตอบกลับ",
              2: "ผู้ร้องเรียนไม่ประสงค์ให้ชื่อ สกุล",
              3: "ขอให้ติดต่อกลับเพื่อชี้แจงข้อมูลเพิ่มเติม",
              4: "ขอให้หน่วยงานตรวจสอบรายละเอียดที่เกิดขึ้น",
            }[data?.complainant] || "-"}
          </div>

        </div>


        {/* กำหนดตอบกลับ */}
        {data?.complainant === "0" && (
          <div className="gi-response-item">

            <div className="gi-response-label">
              กำหนดตอบกลับ
            </div>

            <div className="gi-response-value gi-response-date">
               {data?.responseDueDate ? (
        <>
          ภายในวันที่{" "}
          <span className="thai-date">
            {formatThaiDate(data.responseDueDate)}
          </span>
        </>
      ) : (
        "-"
      )}
            </div>

          </div>
        )}


        {/* สถานะการตอบกลับ */}
        <div className="gi-response-item">

          <div className="gi-response-label">
            สถานะการตอบกลับ
          </div>

          <div className="gi-response-value">
            {respondText[data?.respond_radio] || "-"}
          </div>

        </div>

      </div>

    </div>

  </div>

</section>



          {/* =====================================================
              02 — ผลการดำเนินการ
          ===================================================== */}
          <section className="gi-section">

            <div className="gi-section-header">

              <div>

                <h2 className="gi-section-heading">
                  ผลการดำเนินการ
                </h2>

                <div className="gi-section-caption">
                  สรุปผล วิเคราะห์สาเหตุ และแนวทางการแก้ไขปัญหา
                </div>

              </div>

            </div>


            {/* =================================================
                3 กล่องสำคัญ
            ================================================= */}
            <div className="gi-analysis-grid">


              {/* ===============================================
                  01 — สรุปประเด็น
              =============================================== */}
              <div className="gi-analysis-card">

                <div className="gi-analysis-card-header">

                  <div className="gi-analysis-number">
                    01
                  </div>

                  <div>

                    <div className="gi-analysis-kicker">
                      SUMMARY
                    </div>

                    <h3 className="gi-analysis-title">
                      สรุปประเด็นร้องเรียน
                    </h3>

                  </div>

                </div>


                <div className="gi-analysis-body">
                  {data?.summary_reply || "-"}
                </div>

              </div>


              {/* ===============================================
                  02 — วิเคราะห์สาเหตุ
              =============================================== */}
              <div className="gi-analysis-card">

                <div className="gi-analysis-card-header">

                  <div className="gi-analysis-number">
                    02
                  </div>

                  <div>

                    <div className="gi-analysis-kicker">
                      ROOT CAUSE
                    </div>

                    <h3 className="gi-analysis-title">
                      ผลการวิเคราะห์สาเหตุ
                    </h3>

                  </div>

                </div>


                <div className="gi-analysis-body">
                  {data?.summary_analysis || "-"}
                </div>

              </div>


              {/* ===============================================
                  03 — แก้ไข / ป้องกัน
              =============================================== */}
              <div className="gi-analysis-card gi-analysis-card-main">

                <div className="gi-analysis-card-header">

                  <div className="gi-analysis-number">
                    03
                  </div>

                  <div>

                    <div className="gi-analysis-kicker">
                      SYSTEM IMPROVEMENT
                    </div>

                    <h3 className="gi-analysis-title">
                      แนวทางการแก้ไข/ป้องกันปัญหาในเชิงระบบ
                    </h3>

                  </div>

                </div>


                <div className="gi-analysis-body">
                  {data?.summary_solving || "-"}
                </div>

              </div>

            </div>

          </section>

        </div>

      </div>
    )}
  </>
);

};

export default GeneralInfo;
