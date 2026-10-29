import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { getCurrentDate } from "../Function";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import GreenCircle from "./GreenCircle";

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


return (
  <>
    {/* =========================================================
        01 : ตอบกลับผู้ร้องเรียน
        ========================================================= */}
    <div className="section-card">

      <div className="section-header">
        <span className="section-number">01</span>

        <div className="section-header-content">
          <div className="section-title">
            ตอบกลับผู้ร้องเรียน
          </div>

          <div className="section-description">
            ระบุความประสงค์ของผู้ร้องเรียนเกี่ยวกับการตอบกลับ การติดต่อ
            และการตรวจสอบข้อร้องเรียน
          </div>
        </div>
      </div>

<div className="section-body">
  <Container>

    <RadioGroup
      id="respond_radio"
      name="respond_radio"
      value={data?.respond_radio || "0"}
      onChange={(e) => setDataFunction(e, "respond_radio")}
    >

      {/* ตอบกลับแล้ว */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: "48px",
        }}
      >
        <FormControlLabel
          disabled={Mode === "Show"}
          value="0"
          control={<Radio />}
          label="ตอบกลับผู้ร้องเรียนแล้ว"
          sx={{
            margin: 0,
          }}
        />
      </div>


      {/* ยังไม่ได้ตอบกลับ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: "48px",
        }}
      >

        <FormControlLabel
          disabled={Mode === "Show"}
          value="1"
          control={<Radio />}
          label="ยังไม่ได้ตอบกลับผู้ร้องเรียน"
          sx={{
            margin: 0,
            flexShrink: 0,
          }}
        />

        <Form.Control
          disabled={
            disable ||
            data?.respond_radio !== "1"
          }
          value={data?.respond_text || ""}
          onChange={(e) =>
            setDataFunction(e, "respond_text")
          }
          placeholder="ระบุสาเหตุ"
          className="custom-input"
          style={{
            height: "40px",
            width: "320px",
            marginLeft: "12px",
          }}
        />

      </div>


      {/* ไม่ต้องการตอบกลับ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: "48px",
        }}
      >
        <FormControlLabel
          disabled={Mode === "Show"}
          value="2"
          control={<Radio />}
          label="ผู้ร้องเรียนไม่ต้องการตอบกลับ"
          sx={{
            margin: 0,
          }}
        />
      </div>

    </RadioGroup>

  </Container>
</div>


    </div>


    {/* =========================================================
        02 : สรุปผลการวิเคราะห์และแนวทางการแก้ไข
        ========================================================= */}
    <div className="section-card">

      <div className="section-header">

        <span className="section-number">
          02
        </span>

        <div className="section-header-content">

          <div className="section-title">
            สรุปผลการวิเคราะห์และแนวทางการแก้ไข
          </div>

          <div className="section-description">
            สรุปประเด็นสำคัญ วิเคราะห์สาเหตุ
            และกำหนดแนวทางการแก้ไขและป้องกันปัญหาอย่างเป็นระบบ
          </div>

        </div>

      </div>


      {/* =====================================================
          01. สรุปประเด็นร้องเรียน
          ===================================================== */}
      <div className="form-subsection">

        <div className="form-subtitle">
          <span className="form-subtitle-number">
            01
          </span>

          <span className="form-subtitle-text">
            สรุปประเด็นร้องเรียน{" "}
            <span className="required-badge">
              จำเป็น
            </span>
          </span>
        </div>

        <div className="form-subdescription">
          สรุปสาระสำคัญของข้อร้องเรียนที่ได้รับ
          เพื่อใช้เป็นข้อมูลตั้งต้นในการวิเคราะห์
        </div>

        <div className="section-body">

          <Container>

            <div
              className={
                missingKeys.some((item) => item.key === "summarize")
                  ? "AreaBOX SETERRORBOX"
                  : "AreaBOX"
              }
            >

              <TextField
                id="summary_reply"
                disabled={Mode === "Show"}
                placeholder="เขียนรายละเอียด"
                value={data?.summary_reply || ""}
                ref={(el) =>
                  (inputRefs.current.summary_reply = el)
                }
                onChange={(e) => {

                  setErrors((prev) => ({
                    ...prev,
                    summary_reply: false,
                  }));

                  setDataFunction(e, "summary_reply");

                }}
                multiline
                rows={4}
                variant="standard"
                fullWidth
              />

            </div>

            {errors.summary_reply && (
              <Form.Control.Feedback
                type="invalid"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <ErrorOutlineIcon fontSize="small" />
                กรุณาเขียนรายละเอียด
              </Form.Control.Feedback>
            )}

          </Container>

        </div>
      </div>


      {/* =====================================================
          02. ผลการวิเคราะห์สาเหตุ
          ===================================================== */}
      <div className="form-subsection">

        <div className="form-subtitle">

          <span className="form-subtitle-number">
            02
          </span>

          <span className="form-subtitle-text">
            ผลการวิเคราะห์สาเหตุ{" "}
            <span className="required-badge">
              จำเป็น
            </span>
          </span>

        </div>

        <div className="form-subdescription">
          วิเคราะห์สาเหตุหรือปัจจัยที่เกี่ยวข้องกับข้อร้องเรียน
          เพื่อค้นหาสาเหตุของปัญหาอย่างเป็นระบบ
        </div>

        <div className="section-body">

          <Container>

            <div
              className={
                missingKeys.some((item) => item.key === "expectation")
                  ? "AreaBOX SETERRORBOX"
                  : "AreaBOX"
              }
            >

              <TextField
                id="summary_analysis"
                disabled={Mode === "Show"}
                placeholder="เขียนรายละเอียด"
                ref={(el) =>
                  (inputRefs.current.summary_analysis = el)
                }
                value={data?.summary_analysis || ""}
                onChange={(e) => {

                  setErrors((prev) => ({
                    ...prev,
                    summary_analysis: false,
                  }));

                  setDataFunction(e, "summary_analysis");

                }}
                variant="standard"
                multiline
                rows={4}
                fullWidth
              />

            </div>

            {errors.summary_analysis && (
              <Form.Control.Feedback
                type="invalid"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <ErrorOutlineIcon fontSize="small" />
                กรุณาเขียนรายละเอียด
              </Form.Control.Feedback>
            )}

          </Container>

        </div>
      </div>


      {/* =====================================================
          03. แนวทางการแก้ไข / ป้องกัน
          ===================================================== */}
      <div className="form-subsection">

        <div className="form-subtitle">

          <span className="form-subtitle-number">
            03
          </span>

          <span className="form-subtitle-text">
            แนวทางการแก้ไข/ป้องกันปัญหาในเชิงระบบ{" "}
            <span className="required-badge">
              จำเป็น
            </span>
          </span>

        </div>

        <div className="form-subdescription">
          ระบุแนวทางการแก้ไข ปรับปรุง หรือป้องกันไม่ให้เกิดปัญหาซ้ำ
          โดยมุ่งเน้นการแก้ไขในระดับระบบงาน
        </div>

        <div className="section-body">

          <Container>

            <div
              className={
                missingKeys.some((item) => item.key === "decision")
                  ? "AreaBOX SETERRORBOX"
                  : "AreaBOX"
              }
            >

              <TextField
                id="summary_solving"
                disabled={Mode === "Show"}
                placeholder="เขียนรายละเอียด"
                ref={(el) =>
                  (inputRefs.current.summary_solving = el)
                }
                value={data?.summary_solving || ""}
                onChange={(e) => {

                  setErrors((prev) => ({
                    ...prev,
                    summary_solving: false,
                  }));

                  setDataFunction(e, "summary_solving");

                }}
                variant="standard"
                multiline
                rows={4}
                fullWidth
              />

            </div>

            {errors.summary_solving && (
              <Form.Control.Feedback
                type="invalid"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <ErrorOutlineIcon fontSize="small" />
                กรุณาเขียนรายละเอียด
              </Form.Control.Feedback>
            )}

          </Container>

        </div>
      </div>

    </div>
  </>
);


};

export default GeneralInfo;
