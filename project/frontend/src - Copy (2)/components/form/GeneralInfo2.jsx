import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { getCurrentDate } from "../Function";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import GreenCircle from "./GreenCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import ReportLog from "./ReportLog";
import ReportLog2 from "./ReportLog2";
import AutoCompleteText from "./AutoCompleteDep";

import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Table, InputGroup } from "react-bootstrap";

import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
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

const severityLevels = [
  { code: "A", label: "อันตรายมาก", color: "#b91c1c", bg: "#fee2e2" },
  { code: "B", label: "สูงมาก", color: "#dc2626", bg: "#fee2e2" },
  { code: "C", label: "สูง", color: "#ea580c", bg: "#ffedd5" },
  { code: "D", label: "ค่อนข้างสูง", color: "#f97316", bg: "#ffedd5" },
  { code: "E", label: "ปานกลาง", color: "#ca8a04", bg: "#fef9c3" },
  { code: "F", label: "ค่อนข้างต่ำ", color: "#65a30d", bg: "#ecfccb" },
  { code: "G", label: "ต่ำ", color: "#16a34a", bg: "#dcfce7" },
  { code: "H", label: "ต่ำมาก", color: "#0284c7", bg: "#e0f2fe" },
  { code: "I", label: "เล็กน้อย", color: "#6b7280", bg: "#f3f4f6" },
];

const GeneralInfo = ({
  Mode,
  data,
  array,
  manager,
  disable,
  time,
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
  fetchPatientByHN,
  handlePatientDiagnosis,
  setErrors,
  errors,
  inputRefs,
}) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tosentvalue, settosentvalue] = useState("select"); // select or textinput

  const [timePicker, setTimePicker] = useState(null); // dayjs
  const selectedSeverity = severityLevels.find(
    (s) => s.code === data?.suggestion,
  );
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
  useEffect(() => {
    if (data?.time) {
      // ดึง "05:55" จาก ISO ตรง ๆ
      const hhmm = data.time.substring(11, 16);
      setTimePicker(dayjs(hhmm, "HH:mm"));
    } else {
      setTimePicker(null);
    }
  }, [data?.time]);

  const options = [
    {
      group: "ข้อเสนอแนะ",
      name: "suggestion",
      items: [
        {
          value: "A",
          label:
            "A (เกิดที่นี่) ยังไม่เกิดเหตุการณ์ แต่มีความเสี่ยง / มีโอกาสเกิดความผิดพลาด",
        },
        {
          value: "B",
          label:
            "B (เกิดที่ไกล) เกิดเหตุการณ์ / ความผิดพลาดขึ้นแล้ว แต่ยังไม่มีผลกระทบใดๆ ถึงผู้ป่วย",
        },
      ],
    },
    {
      group: "ข้อร้องเรียน",
      name: "complaint",
      items: [
        {
          value: "C",
          label:
            "C (เกิดกับใคร) เกิดเหตุการณ์ / ความผิดพลาดขึ้น และมีผลกระทบถึงผู้ป่วย แต่ไม่เกิดอันตรายหรือเสียหาย",
        },
        {
          value: "D",
          label: "D (ให้ระวัง) เกิดความผิดพลาดขึ้น มีผลกระทบถึงผู้ป่วยต้องให้การดูแลเฝ้าระวังเป็นพิเศษว่าจะไม่เป็นอันตราย",
        },
        {
          value: "E",
          label: "E ให้การรักษา(ต้องรักษา) เกิดความผิดพลาดขึ้น มีผลกระทบถึงผู้ป่วยเกิดอันตรายชั่วคราวที่ต้องแก้ไข / ให้การรักษาเพิ่มมากขึ้นเพิ่มเติม",
        },
        {
          value: "F",
          label: "F (เยียวยานาน) เกิดความผิดพลาดขึ้น มีผลกระทบที่ต้องใช้เวลาแก้ไขนานกว่าปกติหรือเกินกำหนด ผู้ป่วยต้องรักษา / นอนโรงพยาบาลนานขึ้น",
        },
        {
          value: "G",
          label: "G (ต้องพิการ) เกิดความผิดพลาด มีผลกระทบทำให้เสียชื่อเสียง / ความเชื่อถือ อาจฟ้องร้อง / มีผลระยะยาว หรือทำให้ผู้ป่วยเกิดความพิการถาวร",
        },
        {
          value: "H",
          label: "H (ต้องการปั๊ม) เกิดความผิดพลาด ถึงผู้ป่วย มีผลทำให้ต้องทำการช่วยชีวิต เสียชื่อเสียง หรือมีการเรียกร้องค่าเสียหาย",
        },
        {
          value: "I",
          label: "I (จำใจลา) เกิดความผิดพลาด ถึงผู้ป่วย เป็นสาเหตุทำให้เสียชีวิต เสียชื่อเสียง มีการฟ้องร้องทางศาล / สื่อ",
        },
      ],
    },
  ];
console.log(data)
  return (
    <>
      <div className="section-card">
        <div className="section-header">
          <GreenCircle />
          ข้อมูลการร้องเรียน
        </div>

        <div className="section-body">
          <Container>
            <Row className="g-4 align-items-end">
              {/* ประเภทผู้ป่วย */}
              <Col md={4}>
                <label className="form-label">ประเภทผู้ป่วย</label>
                <RadioGroup
                  row
                  className="gap-3"
                  id="type"
                  aria-labelledby="type"
                  defaultValue="0"
                  name="type"
                  onChange={(e) => setDataFunction(e, "type")}
                  value={data?.type || "0"}
                >
                  <FormControlLabel value="0" control={<Radio />} label="OPD" />
                  <FormControlLabel value="1" control={<Radio />} label="IPD" />
                </RadioGroup>
              </Col>

              {/* วันที่ร้องเรียน */}
              <Col md={4}>
                <label className="form-label">วันที่รับข้อร้องเรียน</label>
                <Form.Control
                  ref={(el) => (inputRefs.current.date = el)}
                  type="date"
                  value={data?.date || ""} // ❗ ห้าม null
                  onChange={(e) => {
                    setErrors((prev) => ({ ...prev, date: false }));

                    setDataFunction(e, "date");
                  }}
                  className="form-input"
                  style={{
                    borderColor: errors.date ? "#dc3545" : "",
                    boxShadow: errors.date
                      ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                      : "",
                    boxShadow: errors.date
                      ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                      : "",
                  }}
                />

                {(errors.date || errors.time) && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    {errors.time ? (
                      <span style={{ visibility: "hidden" }}>
                        <ErrorOutlineIcon fontSize="small" />
                        กรุณาเลือกวันที่
                      </span>
                    ) : (
                      <>
                        <ErrorOutlineIcon fontSize="small" />
                        กรุณาเลือกวันที่
                      </>
                    )}
                  </Form.Control.Feedback>
                )}
              </Col>

              {/* เวลา */}
              <Col md={4}>
                <label className="form-label">เวลา</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    ampm={false}
                    value={timePicker}
                    onChange={(value) => {
                      setErrors((prev) => ({ ...prev, time: false }));

                      handleSetTime(value);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        className: "form-input",
                        inputRef: (el) => (inputRefs.current.time = el), // ✅ ถูก
                        sx: {
                          "& .MuiInputBase-root": {
                            height: 48,
                            border: errors.time ? "1px solid #dc3545" : "",
                            boxShadow: errors.time
                              ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                              : "",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
                {(errors.date || errors.time) && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    {errors.date ? (
                      <span style={{ visibility: "hidden" }}>
                        <ErrorOutlineIcon fontSize="small" />
                        กรุณาเลือกเวลา
                      </span>
                    ) : (
                      <>
                        <ErrorOutlineIcon fontSize="small" />
                        กรุณาเลือกเวลา
                      </>
                    )}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="section-card">
        <div className="section-header">
          <GreenCircle />
          ข้อมูลการบันทึก
        </div>

        <div className="section-body">
          <Container>
            <Row className="">
              <Col md={3}>บันทึกโดย</Col>

              <Col md={9}>
                <RadioGroup
                  row
                  className="gap-3"
                  id="record"
                  aria-labelledby="record"
                  defaultValue="0"
                  name="record"
                  onChange={(e) => setDataFunction(e, "record")}
                  value={data?.record || "0"}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Nurse Supervisor"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="ผู้จัดการฝ่าย"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="หัวหน้าแผนก"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="ลูกค้าสัมพันธ์"
                  />

                  <FormControlLabel
                    disabled={Mode === "Show"}
                    value="4"
                    control={<Radio />}
                    sx={{
                      alignItems: "flex-start",
                      my: 1,
                      "& .MuiFormControlLabel-label": {
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      },
                    }}
                    label={
                      <>
                        <span>อื่นๆ (ระบุ)</span>
                        <Form.Control
                          disabled={data?.record !== "4"}
                          value={data?.record_other || null}
                          style={{ height: 40, width: 300 }}
                          onChange={(e) => setDataFunction(e, "record_other")}
                          className="custom-input"
                        />
                      </>
                    }
                  />
                </RadioGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <GreenCircle />
          ช่องทางการรับเรื่อง
        </div>

        <div className="section-body">
          <Container>
            <Row>
              <Col md={3}>รับข้อร้องเรียนทาง</Col>
              <Col md={9}>
                <RadioGroup
                  row
                  className="option-grid"
                  id="complaints"
                  aria-labelledby="complaints"
                  defaultValue="0"
                  name="complaints"
                  onChange={(e) => setDataFunction(e, "complaints")}
                  value={data?.complaints || "0"}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="ทางวาจา"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="ทางโทรศัพท์"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="เยี่ยมผู้ป่วยเชิงรุก"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="เยี่ยมตลาด / บริษัทคู่สัญญา"
                  />

                  <FormControlLabel
                    disabled={Mode === "Show"}
                    value="4"
                    control={<Radio />}
                    sx={{
                      alignItems: "flex-start",
                      my: 1,
                      "& .MuiFormControlLabel-label": {
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      },
                    }}
                    label={
                      <>
                        <span>อื่นๆ (ระบุ)</span>
                        <Form.Control
                          disabled={data?.complaints !== "4"}
                          value={data?.complaints_other || null}
                          style={{ height: 40, width: 300 }}
                          onChange={(e) =>
                            setDataFunction(e, "complaints_other")
                          }
                          className="custom-input"
                        />
                      </>
                    }
                  />
                </RadioGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="section-card">
        <div className="section-header">
          <GreenCircle />
          ผู้ร้องเรียน
        </div>

        <div className="section-body">
          <Container>
            <Row className="g-4">
              <Col md={6}>
                <label className="form-label">ชื่อ - สกุล</label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-person-circle"></i>
                  </InputGroup.Text>
                  <Form.Control
                    ref={(el) => (inputRefs.current.name = el)}
                    className="form-input"
                    value={data?.name || null}
                    onChange={(e) => {
                      setErrors((prev) => ({ ...prev, name: false }));

                      setDataFunction(e, "name");
                    }}
                    style={{
                      borderColor: errors.name ? "#dc3545" : "",
                      boxShadow: errors.name
                        ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                        : "",
                      boxShadow: errors.name
                        ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                        : "",
                    }}
                  />
                </InputGroup>
                {errors.name && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <ErrorOutlineIcon fontSize="small" />
                    กรุณาใส่ ชื่อ - สกุล
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col md={3}>
                <label className="form-label">เกี่ยวข้องเป็น</label>

                <InputGroup>
                  <Form.Control
                    ref={(el) => (inputRefs.current.related = el)}
                    className="form-input"
                    value={data?.related || null}
                    onChange={(e) => {
                      setErrors((prev) => ({ ...prev, related: false }));

                      setDataFunction(e, "related");
                    }}
                    style={{
                      borderColor: errors.related ? "#dc3545" : "",
                      boxShadow: errors.related
                        ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                        : "",
                      boxShadow: errors.related
                        ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                        : "",
                    }}
                  />
                  <InputGroup.Text>ของผู้ป่วย</InputGroup.Text>
                </InputGroup>
                {errors.related && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <ErrorOutlineIcon fontSize="small" />
                    กรุณาใส่ความสัมพันธ์ของผู้ป่วย
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col md={3}>
                <label className="form-label">เบอร์โทรศัพท์</label>

                <InputGroup>
                  <Form.Control
                    ref={(el) => (inputRefs.current.phone = el)}
                    className="form-input"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    value={data.phone || ""}
                    onChange={(e) => {
                      setErrors((prev) => ({ ...prev, phone: false }));
                      e.target.value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setDataFunction(e, "phone");
                    }}
                    style={{
                      borderColor: errors.phone ? "#dc3545" : "",
                      boxShadow: errors.phone
                        ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                        : "",
                      boxShadow: errors.phone
                        ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                        : "",
                    }}
                  />
                  <InputGroup.Text>
                    <i className="bi bi-telephone"></i>
                  </InputGroup.Text>
                </InputGroup>

                {errors.phone && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <ErrorOutlineIcon fontSize="small" />
                    กรุณาใส่เบอร์โทรศัพท์
                  </Form.Control.Feedback>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <GreenCircle />
          ข้อมูลผู้ป่วย
        </div>

        <div className="section-body">
          <Container>
            <Row className="g-4">
              <Col md={3}>
                <label className="form-label">HN/VN</label>
                <Form.Control
                  ref={(el) => (inputRefs.current.patient_hn = el)}
                  value={data?.patient_hn || null}
                  className="form-input"
                  onChange={(e) => {
                    setErrors((prev) => ({ ...prev, patient_hn: false }));

                    setDataFunction(e, "patient_hn");
                  }}
                  onBlur={() => {
                    if (data?.patient_hn) {
                      fetchPatientByHN(data.patient_hn);
                    }
                  }}
                  style={{
                    borderColor: errors.patient_hn ? "#dc3545" : "",
                    boxShadow: errors.patient_hn
                      ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                      : "",
                    boxShadow: errors.patient_hn
                      ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                      : "",
                  }}
                />
                {errors.patient_hn && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <ErrorOutlineIcon fontSize="small" />
                    กรุณาใส่ HN
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col md={6}>
                <label className="form-label">ชื่อ - สกุล ผู้ป่วย</label>

                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-person-circle"></i>
                  </InputGroup.Text>
                  <Form.Control
                    ref={(el) => (inputRefs.current.patient_name = el)}
                    value={data?.patient_name || null}
                    className="form-input"
                    onChange={(e) => {
                      setErrors((prev) => ({ ...prev, patient_name: false }));

                      setDataFunction(e, "patient_name");
                    }}
                    style={{
                      borderColor: errors.patient_name ? "#dc3545" : "",
                      boxShadow: errors.patient_name
                        ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                        : "",
                      boxShadow: errors.patient_name
                        ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                        : "",
                    }}
                  />
                </InputGroup>
                {errors.patient_name && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <ErrorOutlineIcon fontSize="small" />
                    กรุณาใส่ ชื่อ - สกุล ผู้ป่วย
                  </Form.Control.Feedback>
                )}
              </Col>

              <Col md={3}>
                <label className="form-label">อายุ</label>
                <InputGroup>
                  <Form.Control
                    className="form-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    value={data.patient_age || null}
                    onKeyDown={(e) => {
                      // อนุญาตเฉพาะตัวเลข + control keys
                      if (
                        !/[0-9]/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      e.target.value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setDataFunction(e, "patient_age");
                    }}
                  />
                  <InputGroup.Text>ปี</InputGroup.Text>
                </InputGroup>
              </Col>

              <Col md={6}>
                <label className="form-label">AN</label>
                <Form.Control
                  value={data?.patient_an || null}
                  className="form-input"
                  onChange={(e) => setDataFunction(e, "patient_an")}
                />
              </Col>

        
            </Row>
          </Container>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <GreenCircle />
          ติดต่อกลับ
        </div>

        <div className="section-body">
          <div className="field-row">
            <Col>ต้องการติดต่อกลับ</Col>
            <RadioGroup
              id="involved"
              aria-labelledby="involved"
              defaultValue="0"
              name="involved"
              onChange={(e) => setDataFunction(e, "involved")}
              value={data?.involved || "0"}
              row
            >
              <FormControlLabel
                value="0"
                control={<Radio />}
                label={
                  <>
                    ผู้ร้องเรียน
                    <b>
                      <u>ต้องการ</u>
                    </b>
                    ให้ตอบกลับ
                  </>
                }
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label={
                  <>
                    ผู้ร้องเรียน
                    <b>
                      <u>ไม่ต้องการ</u>
                    </b>
                    ให้ตอบกลับ
                  </>
                }
              />
            </RadioGroup>
          </div>
          {showUrgent == 1 && (
            <div className="field-row">
              <Col>ความเร่งด่วน</Col>
              <RadioGroup
                row
                id="urgent"
                aria-labelledby="urgent"
                defaultValue="0"
                name="urgent"
                onChange={(e) => setDataFunction(e, "urgent")}
                value={data?.urgent || "0"}
                className="gap-3"
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="ด่วน ภายในวันที่"
                />
                <Form.Control
                  type="date"
                  className="urgent-date"
                  disabled={data?.urgent == "1"}
                  value={data?.urgentDate || null}
                  onChange={(e) => setDataFunction(e, "urgentDate")}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="ไม่ด่วน"
                />
              </RadioGroup>
            </div>
          )}
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <GreenCircle />
          หน่วยงาน / บุคคลที่ถูกร้องเรียน 
            <span className="required-badge">จำเป็นต้องระบุอย่างน้อย 1 คน</span>
        </div>

        <div className="section-body">
          <RadioGroup
            row
            id="appeal"
            ref={(el) => (inputRefs.current.appeal = el)}
            aria-labelledby="appeal"
            defaultValue="0"
            name="appeal"
            onChange={(e) => setDataFunction(e, "appeal")}
            value={data?.appeal || "0"}
            
          >
         
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="ระบุ ได้แก่"
            />
          </RadioGroup>

          {showAppeal == 1 && (
            <Row className="d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-end mb-3">
                <Button
                  className="btn-add-person"
                  size="sm"
                  onClick={(e) => handleSetPerson()}
                >
                  + เพิ่มรายชื่อ
                </Button>
              </div>
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "25%" }}>ชื่อ</th>
                    <th style={{ width: "30%" }}>แผนก</th>
                    <th style={{ width: "40%" }}>สังกัด</th>
                  </tr>
                </thead>
                <tbody>
                  {array.map((item, index) => (
                    <>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {" "}
                          <Form.Control
                            type="text"
                            placeholder=""
                            name="name"
                            value={item.name ? item.name : ""}
                            onChange={(e) => setDataPerson(e, index + 1)}
                            style={{
                              height: "56px",
                              width: "90%",
                              background: "white",
                            }}
                            className="custom-input"
                          />
                        </td>
                        <td>
                          <AutoCompleteText
                            required
                            Mode={Mode}
                            data={data}
                            item={item}
                            name="department"
                            datacolumn="deptrelate"
                            datacolumn2="deptemail"
                            setChangePerson={setChangePerson}
                            index={index + 1}
                          />
                        </td>
                        <td style={{ position: "relative" }}>
                          <Button
                            className="btndelete"
                            onClick={() => removePerson(item.id)}
                            style={{
                              position: "absolute",
                              top: "4px",
                              right: "4px",
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              fontSize: "22px",
                              lineHeight: "1",
                              color: "red",
                            }}
                            aria-label="ลบ"
                          >
                            ×
                          </Button>
                          <RadioGroup
                            sx={{ p: 1 }}
                            row
                            id="faction"
                            aria-labelledby="faction"
                            defaultValue="0"
                            name="faction"
                            onChange={(e) => setDataPerson(e, index + 1)}
                            value={item?.faction || "0"}
                          >
                             <FormControlLabel
                              sx={{ p: 1 }}
                              disabled={Mode === "Show"}
                              value="0"
                              control={<Radio />}
                              label="แพทย์"
                            />
                            <FormControlLabel
                              sx={{ p: 1 }}
                              disabled={Mode === "Show"}
                              value="1"
                              control={<Radio />}
                              label="ฝ่ายแพทย์"
                            />
                            <FormControlLabel
                              sx={{ p: 1 }}
                              disabled={Mode === "Show"}
                              value="2"
                              control={<Radio />}
                              label="งานพยาบาล"
                            />
                            <FormControlLabel
                              sx={{ p: 1 }}
                              disabled={Mode === "Show"}
                              value="3"
                              control={<Radio />}
                              label="ฝ่ายบริหาร"
                            />
                            <FormControlLabel
                              sx={{ p: 1 }}
                              disabled={Mode === "Show"}
                              value="4"
                              control={<Radio />}
                              label="ฝ่ายปฏิบัติการ"
                            />
                          </RadioGroup>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </Row>
          )}
          {errors.appeal && (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <ErrorOutlineIcon fontSize="small" />
                    กรุณาระบุอย่างน้อย 1 คน
                  </Form.Control.Feedback>
                )}
        </div>
      </div>

      <div className="section-card">
        <div className="section-header required">
          <GreenCircle />
          <span>ส่วนที่ 1 : สรุปสาระ / ประเด็นร้องเรียน</span>
          <span className="required-badge">จำเป็น</span>
        </div>

        <div className="section-body">
          <Container>
            <Row>
              <div
                className={
                  missingKeys.some((item) => item.key === "summarize")
                    ? "AreaBOX SETERRORBOX"
                    : "AreaBOX"
                }
              >
                <TextField
                  fullWidth
                  ref={(el) => (inputRefs.current.summarize = el)}
                  id="summarize"
                  disabled={Mode === "Show"}
                  label="เขียนรายละเอียด"
                  value={data?.summarize || ""}
                  onChange={(e) => {
                    setErrors((prev) => ({ ...prev, summarize: false }));

                    setDataFunction(e, "summarize");
                  }}
                  variant="standard"
                  multiline
                  rows={4}
                  sx={{ marginBottom: 1 }}
                  style={{
                    borderColor: errors.summarize ? "#dc3545" : "",
                    boxShadow: errors.summarize
                      ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                      : "",
                    boxShadow: errors.summarize
                      ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                      : "",
                  }}
                />
              </div>
            </Row>
            {errors.summarize && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <ErrorOutlineIcon fontSize="small" />
                กรุณาเขียนรายละเอียดประเด็นร้องเรียน
              </Form.Control.Feedback>
            )}
            
          </Container>
        </div>
        <input
    type="file"
    multiple
    accept="image/*"
    onChange={handleImage}
/>หฟกฟหหกฟ
      </div>

      <div className="section-card ">
        <div className="section-header">
          <GreenCircle />
          ความคาดหวังของผู้ร้องเรียนที่ต้องการให้โรงพยาบาลตอบสนอง
        </div>

        <div className="section-body">
          <Container>
            <Row>
              <div
                className={
                  missingKeys.some((item) => item.key === "expectation")
                    ? "AreaBOX SETERRORBOX"
                    : "AreaBOX"
                }
              >
                <TextField
                  id="expectation"
                  label="เขียนรายละเอียด"
                  variant="standard"
                  multiline
                  rows={5}
                  fullWidth
                  disabled={Mode === "Show"}
                  value={data?.expectation || ""}
                  onChange={(e) => setDataFunction(e, "expectation")}
                />
              </div>
            </Row>
          </Container>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <GreenCircle />
          ระดับความรุนแรง
          {selectedSeverity && (
            <span
              className="required-badge"
              style={{
                marginLeft: 8,
                color: selectedSeverity.color,
                backgroundColor: selectedSeverity.bg,
                padding: "2px 8px",
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              {selectedSeverity.label}
            </span>
          )}
        </div>

        <div className="section-body">
          {options.map((section) => (
            <div key={section.name} style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 12,
                  textAlign: "left",
                }}
              >
                {section.group}
              </div>

              <RadioGroup
                name="suggestion" // ✅ ตัวเดียวเหมือนเดิม
                value={data?.suggestion || ""}
                onChange={(e) => setDataFunction(e, "suggestion")}
              >
                {section.items.map((item) => {
                  const selected = data?.suggestion === item.value;

                  const severity = severityLevels.find(
                    (s) => s.code === item.value,
                  );

                  return (
                    <label
                      key={item.value}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "14px 16px",
                        marginBottom: 10,
                        borderRadius: 12,
                        alignItems: "center",
                        border: selected
                          ? `2px solid ${severity?.color}`
                          : "1px solid #e5e7eb",

                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Radio
                        value={item.value}
                        sx={{
                          color: "#9ca3af", // ตอนยังไม่เลือก
                          "&.Mui-checked": {
                            color: severity?.color, // วงนอก
                          },
                          "&.Mui-checked .MuiSvgIcon-root": {
                            fill: severity?.color, // 👈 บังคับวงใน (จุดกลาง)
                          },
                        }}
                      />
                      <div style={{ lineHeight: 1.5 }}>{item.label}</div>
                        <span
              className="required-badge"
              style={{
                marginLeft: 8,
                color: severity.color,
                backgroundColor: severity?.bg,
                padding: "2px 8px",
                borderRadius: 6,
                fontWeight: 600,
              }}
            >
              {severity.label}
            </span>
                    </label>
                  );
                })}
              </RadioGroup>
            </div>
          ))}
        </div>
      </div>
      <div className="section-card">
        <div className="section-header">
          <GreenCircle />
          บันทึกการตัดสินใจของผู้รับข้อร้องเรียนในการแก้ไขปัญหาเฉพาะหน้า
        </div>

        <div className="section-body">
          <Container>
            <Row>
              <div
                className={
                  missingKeys.some((item) => item.key === "decision")
                    ? "AreaBOX SETERRORBOX"
                    : "AreaBOX"
                }
              >
                <TextField
                  id="decision"
                  label="เขียนรายละเอียด"
                  variant="standard"
                  multiline
                  rows={5}
                  fullWidth
                  disabled={Mode === "Show"}
                  value={data?.decision || ""}
                  onChange={(e) => setDataFunction(e, "decision")}
                />
              </div>
            </Row>
          </Container>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <GreenCircle />
          ระดับของผลสัมฤทธิ์ในการแก้ปัญหาเฉพาะหน้า
        </div>

        <div className="section-body">
          <Container>
            <Row>
              <RadioGroup
                row
                id="achievement"
                aria-labelledby="achievement"
                defaultValue="0"
                name="achievement"
                onChange={(e) => setDataFunction(e, "achievement")}
                value={data?.achievement || "0"}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="แก้ไขได้ทั้งหมด"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="แก้ไขได้บางส่วน"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="แก้ไขไม่ได้เลย"
                />
              </RadioGroup>
            </Row>
          </Container>
        </div>
      </div>
      <div className="section-card ">
        <div className="section-header">
          <GreenCircle />
          ข้อเสนอแนะเพื่อป้องกันและแก้ไขปัญหาของผู้รับเรื่องร้องเรียน
        </div>

        <div className="section-body">
          <Container>
            <Row>
              <div
                className={
                  missingKeys.some((item) => item.key === "prevent")
                    ? "AreaBOX SETERRORBOX"
                    : "AreaBOX"
                }
              >
                <TextField
                  id="prevent"
                  label="เขียนรายละเอียด"
                  variant="standard"
                  multiline
                  rows={5}
                  fullWidth
                  disabled={Mode === "Show"}
                  value={data?.prevent || ""}
                  onChange={(e) => setDataFunction(e, "prevent")}
                />
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
