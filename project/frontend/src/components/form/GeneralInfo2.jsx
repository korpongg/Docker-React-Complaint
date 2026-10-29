import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { getCurrentDate } from "../Function";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import GreenCircle from "./GreenCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ReportLog from "./ReportLog";
import ReportLog2 from "./ReportLog2";
import AutoCompleteText from "./AutoCompleteDep";
import severityA from "../../assets/A.png";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Table, InputGroup } from "react-bootstrap";
import { Chip, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { color } from "@mui/system";
import { severityLevels,generalRiskOptions,clinicalRiskOptions,complaintCategoryOptions } from "../../data/form/DataDict_Risk";
const GeneralInfo = ({
  Mode,
  data,
  array,
  manager,
  disable,
  time,
  images,
  documentFiles,
  setImages,
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
  handleDocumentUpload,
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

  const [openSeverityDetail, setOpenSeverityDetail] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tosentvalue, settosentvalue] = useState("select"); // select or textinput
  const [selectedImage, setSelectedImage] = useState(null);
  const [timePicker, setTimePicker] = useState(null); // dayjs
  const [selectedRiskTypes, setSelectedRiskTypes] = useState({
    general:
      data?.generalRisk === true || String(data?.generalRisk ?? "") === "1",

    clinical:
      data?.clinicalRisk === true || String(data?.clinicalRisk ?? "") === "1",
  });
  const selectedCategories = Array.isArray(data?.complaintCategories)
    ? data.complaintCategories
    : [];

  const selectedCategoryCount = selectedCategories.length;
  const [activeRiskTab, setActiveRiskTab] = useState("general");

  const selectedSeverity = severityLevels.find(
    (s) => s.code === data?.suggestion,
  );



  const isRiskChecked = (value) =>
    value === true || String(value ?? "").trim() === "1";

  useEffect(() => {
    setSelectedRiskTypes({
      general: isRiskChecked(data?.generalRisk),
      clinical: isRiskChecked(data?.clinicalRisk),
    });
  }, [data?.generalRisk, data?.clinicalRisk]);

  useEffect(() => {
    if (selectedRiskTypes[activeRiskTab]) return;

    if (selectedRiskTypes.general) {
      setActiveRiskTab("general");
    } else if (selectedRiskTypes.clinical) {
      setActiveRiskTab("clinical");
    }
  }, [selectedRiskTypes, activeRiskTab]);

  const handleRiskTypeChange = (type, checked) => {
    // อัปเดตเฉพาะ Checkbox ที่ผู้ใช้กด
    setSelectedRiskTypes((prev) => ({
      ...prev,
      [type]: checked,
    }));

    // บันทึกเฉพาะฟิลด์ที่เปลี่ยน ห้าม setDataFunction 2 ครั้ง
    const field = type === "general" ? "generalRisk" : "clinicalRisk";

    setDataFunction({ target: { value: checked ? "1" : "0" } }, field);

    // เมื่อเลือก ให้เปิดแท็บประเภทนั้น
    if (checked) {
      setActiveRiskTab(type);
    } else {
      // ถ้าปิดแท็บที่กำลังดู ให้สลับไปอีกประเภทที่ยังเลือกอยู่
      setSelectedRiskTypes((prev) => {
        const next = { ...prev, [type]: false };

        if (activeRiskTab === type) {
          if (next.general) {
            setActiveRiskTab("general");
          } else if (next.clinical) {
            setActiveRiskTab("clinical");
          }
        }

        return next;
      });
    }
  };

  const showGeneralRisk =
    selectedRiskTypes.general && activeRiskTab === "general";

  const showClinicalRisk =
    selectedRiskTypes.clinical && activeRiskTab === "clinical";
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
  const isImageFile = (filename) => {
    if (!filename) return false;

    const ext = filename.split(".").pop().toLowerCase();

    return ["jpg", "jpeg", "png", "webp", "gif"].includes(ext);
  };

  const getFileIcon = (filename) => {
    if (!filename) return "bi-file-earmark";

    const ext = filename.split(".").pop().toLowerCase();

    if (["doc", "docx"].includes(ext)) {
      return "bi-file-earmark-word";
    }

    if (["xls", "xlsx"].includes(ext)) {
      return "bi-file-earmark-excel";
    }

    if (["pdf"].includes(ext)) {
      return "bi-file-earmark-pdf";
    }

    return "bi-file-earmark";
  };

  // ==========================================
  // 1. ความเสี่ยงทั่วไป: ระดับ 1–5
  // ==========================================

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);

    setImages((prev) => [...prev, ...fileArray]);
  };

  return (
    <>
      <div className="section-card">
        <div className="section-header">
          <span className="section-number">01</span>

          <div className="section-header-content">
            <div className="section-title">ข้อมูลการร้องเรียน</div>

            <div className="section-description">
              ระบุข้อมูลเบื้องต้นของเรื่องร้องเรียน วันที่ เวลา
              และประเภทผู้รับบริการ
            </div>
          </div>
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
          <div className="section-number">02</div>

          <div className="section-header-content">
            <div className="section-title">ข้อมูลการรับเรื่อง</div>
            <div className="section-description">
              ผู้รับเรื่องและช่องทางการติดต่อ
            </div>
          </div>
        </div>
        <div className="section-body">
          <Container>
            <Row className="mb-5">
              <Col className="form-group-title">บันทึกโดย</Col>

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

            <Row className="mt-5">
              <Col className="form-group-title">รับข้อร้องเรียนทาง</Col>
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
          <div className="section-number">03</div>

          <div className="section-header-content">
            <div className="section-title">ข้อมูลผู้เกี่ยวข้อง</div>

            <div className="section-description">
              ข้อมูลผู้ร้องเรียนและผู้ป่วยที่เกี่ยวข้องกับเรื่องร้องเรียน
            </div>
          </div>
        </div>

        <div className="section-body">
          <Container>
            <Row className="g-4">
              <Col className="form-group-title">ข้อมูลผู้ร้องเรียน</Col>

              <Col md={4}>
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

            <Row className="g-4 mt-4">
              <Col className="form-group-title">ข้อมูลผู้ป่วย</Col>
              <Col md={2}>
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

              <Col md={4}>
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

              <Col md={2}>
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

              <Col md={2}>
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
          <div className="section-number">04</div>

          <div className="section-header-content">
            <div className="section-title">การติดต่อกลับ</div>

            <div className="section-description">
              ระบุความต้องการของผู้ร้องเรียนในการรับการติดต่อและการตอบกลับจากโรงพยาบาล
            </div>
          </div>
        </div>

        <div className="section-body">
          <div className="field-row">
            <Col className="form-group-title">ต้องการติดต่อกลับ</Col>
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
              <Col className="form-group-title">ความเร่งด่วน</Col>
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
          <div className="section-number">05</div>

          <div className="section-header-content">
            <div className="section-title">หน่วยงานและบุคคลที่ถูกร้องเรียน</div>

            <div className="section-description">
              ระบุหน่วยงานหรือบุคคลที่เกี่ยวข้องกับข้อร้องเรียน{" "}
              <span className="required-badge">
                จำเป็นต้องระบุอย่างน้อย 1 คน
              </span>
            </div>
          </div>
        </div>

        <div
          className="section-body"
          ref={(el) => (inputRefs.current.appeal = el)}
        >
          <RadioGroup
            row
            id="appeal"
            aria-labelledby="appeal"
            defaultValue="0"
            name="appeal"
            onChange={(e) => {
              setErrors((prev) => ({
                ...prev,
                appeal: false,
              }));

              setDataFunction(e, "appeal");
            }}
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
              <Table
                striped
                bordered
                responsive
                className="appeal-person-table"
              >
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "30%" }}>ชื่อ</th>
                    <th style={{ width: "30%" }}>แผนก</th>
                    <th style={{ width: "35%" }}>สังกัด</th>
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

      <div className="section-card section-card-important">
        <div className="section-header section-header-important">
          <div className="section-number section-number-important">
            <span>★</span>
          </div>

          <div className="section-header-content">
            <div className="section-title section-title-important">
              รายละเอียดข้อร้องเรียนและความคาดหวัง
            </div>

            <div className="section-description">
              สรุปประเด็นสำคัญของเรื่องร้องเรียนและสิ่งที่ผู้ร้องเรียนต้องการให้โรงพยาบาลดำเนินการ
            </div>
          </div>

          <div className="section-important-badge">สำคัญ</div>
        </div>

        <div className="form-subsection">
          <div className="form-subtitle">
            <span className="form-subtitle-number">01</span>

            <span className="form-subtitle-text">
              สรุปสาระ / ประเด็นร้องเรียน{" "}
              <span className="required-badge">จำเป็น</span>
            </span>
          </div>
          <div className="section-body">
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
                placeholder="เขียนรายละเอียด"
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
          </div>
          {errors.summarize && (
            <Form.Control.Feedback
              type="invalid"
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <ErrorOutlineIcon fontSize="small" />
              กรุณาเขียนรายละเอียดประเด็นร้องเรียน
            </Form.Control.Feedback>
          )}
        </div>

        <div className="form-subsection">
          <div className="form-subtitle">
            <span className="form-subtitle-number">02</span>

            <span className="form-subtitle-text">
              ความคาดหวังของผู้ร้องเรียนที่ต้องการให้โรงพยาบาลตอบสนอง
            </span>
          </div>
          <div className="section-body">
            <div
              className={
                missingKeys.some((item) => item.key === "expectation")
                  ? "AreaBOX SETERRORBOX"
                  : "AreaBOX"
              }
            >
              <TextField
                id="expectation"
                placeholder="เขียนรายละเอียด"
                variant="standard"
                multiline
                rows={5}
                fullWidth
                disabled={Mode === "Show"}
                value={data?.expectation || ""}
                onChange={(e) => setDataFunction(e, "expectation")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section-card risk-type-section">
        <div className="section-header">
          <div className="section-number">06</div>

          <div className="section-header-content">
            <div className="section-title">ระดับความรุนแรง</div>
            <div className="section-description">
              เลือกประเภทความเสี่ยงที่เกี่ยวข้อง สามารถเลือกได้ทั้ง 2 ประเภท
            </div>
          </div>

          <button
            type="button"
            className="risk-detail-button"
            onClick={() => setOpenSeverityDetail(true)}
          >
            ดูรายละเอียด
          </button>
        </div>

        <div className="section-body">
          {/* เลือกประเภทความเสี่ยง */}
          <div className="risk-type-cards">
        
     
            <p className="form-group-title RiskFieldLabel">ประเภทอุบัติการณ์</p>
            {[
              {
                key: "general",
                title: "ความเสี่ยงทั่วไป",
                subtitle: "General Risk",
                theme: "general",
              },
              {
                key: "clinical",
                title: "ความเสี่ยงทางคลินิก",
                subtitle: "Clinical Risk",
                theme: "clinical",
              },
            ].map((type) => {
              const checked = selectedRiskTypes[type.key];

              return (
                <label
                  key={type.key}
                  className={[
                    "risk-type-card",
                    type.theme,
                    checked ? "active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <Checkbox
                    disabled={Mode === "Show"}
                    checked={checked}
                    onChange={(e) =>
                      handleRiskTypeChange(type.key, e.target.checked)
                    }
                  />

                  <span className="risk-type-card-content">
                    <span className="risk-type-card-title">{type.title}</span>
                    <span className="risk-type-card-subtitle">
                      {type.subtitle}
                    </span>
                  </span>

                  <span className="risk-type-check">{checked ? "✓" : ""}</span>
                </label>
              );
            })}
          </div>

        
          {(selectedRiskTypes.general || selectedRiskTypes.clinical) && (
            <>
               <div className="form-group-title mb-2">
    ระดับความรุนแรงของเหตุการณ์
  </div>

              <div className="risk-level-tabs">
                {selectedRiskTypes.general && (
                  <button
                    type="button"
                    className={`risk-level-tab general ${
                      activeRiskTab === "general" ? "active" : ""
                    }`}
                    onClick={() => setActiveRiskTab("general")}
                  >
                    <span className="risk-tab-dot" />
                    <span>
                      <span className="risk-tab-title">ความเสี่ยงทั่วไป</span>
                      <span className="risk-tab-subtitle">General Risk</span>
                    </span>
                  </button>
                )}

                {selectedRiskTypes.clinical && (
                  <button
                    type="button"
                    className={`risk-level-tab clinical ${
                      activeRiskTab === "clinical" ? "active" : ""
                    }`}
                    onClick={() => setActiveRiskTab("clinical")}
                  >
                    <span className="risk-tab-dot" />
                    <span>
                      <span className="risk-tab-title">
                        ความเสี่ยงทางคลินิก
                      </span>
                      <span className="risk-tab-subtitle">Clinical Risk</span>
                    </span>
                  </button>
                )}
              </div>

              {/* ความเสี่ยงทั่วไป */}
              {showGeneralRisk && (
                <div className="risk-level-content general">
                  <RadioGroup
                    name="generalRiskLevel"
                    value={String(data?.generalRiskLevel ?? "")}
                    onChange={(e) => setDataFunction(e, "generalRiskLevel")}
                  >
                    {generalRiskOptions.map((item) => {
                      const selected =
                        String(data?.generalRiskLevel ?? "") === item.value;

                      return (
                        <FormControlLabel
                          key={item.value}
                          value={item.value}
                          disabled={Mode === "Show"}
                          control={
                            <Radio
                              sx={{
                                color: item.color,
                                "&.Mui-checked": { color: item.color },
                              }}
                            />
                          }
                          label={
                            <div className="risk-option-label">
                              <span
                                className="risk-option-code"
                                style={{
                                  color: item.color,
                                  background: item.bg,
                                }}
                              >
                                {item.value}
                              </span>

                              <span className="risk-option-description">
                                {item.label}
                              </span>

                              <span
                                className="risk-option-badge"
                                style={{
                                  color: item.color,
                                  background: item.bg,
                                }}
                              >
                                {item.aka}
                              </span>
                            </div>
                          }
                          sx={{
                            m: 0,
                            px: 1.5,
                            py: 0.5,
                            width: "100%",
                            borderBottom: "1px solid #edf0f3",
                            borderRadius: 2,
                            background: selected ? item.bg : "transparent",
                            alignItems: "center",
                          }}
                        />
                      );
                    })}
                  </RadioGroup>
                </div>
              )}

              {/* ความเสี่ยงทางคลินิก */}
              {showClinicalRisk && (
                <div className="risk-level-content clinical">
                  {clinicalRiskOptions.map((section) => (
                    <div className="clinical-risk-group" key={section.name}>
                      <div className="clinical-risk-group-title">
                        {section.group}
                      </div>

                      <RadioGroup
                        name="suggestion"
                        value={data?.suggestion || ""}
                        onChange={(e) => setDataFunction(e, "suggestion")}
                      >
                        {section.items.map((item) => {
                          const severity = severityLevels.find(
                            (s) => s.code === item.value,
                          );

                          const selected = data?.suggestion === item.value;

                          return (
                            <FormControlLabel
                              key={item.value}
                              value={item.value}
                              disabled={Mode === "Show"}
                              control={
                                <Radio
                                  sx={{
                                    color: severity?.color || "#9ca3af",
                                    "&.Mui-checked": {
                                      color: severity?.color || "#b91c1c",
                                    },
                                  }}
                                />
                              }
                              label={
                                <div className="risk-option-label">
                                  <span
                                    className="risk-option-code"
                                    style={{
                                      color: severity?.color || "#374151",
                                      background: severity?.bg || "#f3f4f6",
                                    }}
                                  >
                                    {item.value}
                                  </span>

                                  <span className="risk-option-description">
                                    {item.label}
                                  </span>

                                  {severity && (
                                    <span
                                      className="risk-option-badge"
                                      style={{
                                        color: severity.color,
                                        background: severity.bg,
                                      }}
                                    >
                                      {severity.label}
                                    </span>
                                  )}
                                </div>
                              }
                              sx={{
                                m: 0,
                                px: 1.5,
                                py: 0.5,
                                width: "100%",
                                borderBottom: "1px solid #edf0f3",
                                borderRadius: 2,
                                background: selected
                                  ? severity?.bg || "#f9fafb"
                                  : "transparent",
                              }}
                            />
                          );
                        })}
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Section: หมวดหมู่ข้อร้องเรียน / ข้อเสนอแนะ */}
      <div className="section-card">
        <div className="section-header">
          <div className="section-number">06</div>

          <div className="section-header-content">
            <div className="section-title">ประเภทข้อร้องเรียน/ข้อเสนอแนะ</div>

            <div className="section-description">
              เลือกหมวดหมู่ที่เกี่ยวข้องกับเรื่องร้องเรียน สามารถเลือกได้มากกว่า
              1 รายการ
            </div>
          </div>
        </div>

        <div className="section-body">
          <Container>
            <Row className="g-4">
              <Col md={4}>
                <label className="form-label" style={{ fontWeight: 600 }}>
                  ประเภทข้อร้องเรียน/ข้อเสนอแนะ
                </label>

                <Form.Select value="complaint" disabled className="form-input">
                  <option value="complaint">ข้อร้องเรียน/ข้อเสนอแนะ</option>
                </Form.Select>
              </Col>

              <Col
                md={12}
                style={{
                  padding: "16px",
                  boxSizing: "border-box",
                  background: "#fff",
                  border: "1px solid #e7e6dc",
                  borderRadius: "13px",
                  boxShadow: "0 2px 8px rgba(38, 44, 34, 0.025)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 16,
                    width: "100%",
                  }}
                >
                  {/* ฝั่งซ้าย */}
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    รายละเอียดหมวดหมู่
                  </span>

                  <Box
                    sx={{
                      flexShrink: 0,
                      px: 1.25,
                      py: 0.65,
                      borderRadius: "8px",
                      backgroundColor: "#EEF5EF",
                      color: "#347653",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    เลือกแล้ว {selectedCategoryCount}
                  </Box>
                </div>
                <FormGroup
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 1,
                  }}
                >
                  {complaintCategoryOptions.map((item) => {
                    const selectedCategories = Array.isArray(
                      data?.complaintCategories,
                    )
                      ? data.complaintCategories
                      : [];

                    const checked = selectedCategories.includes(item.value);

                    return (
                      <FormControlLabel
                        key={item.value}
                        control={
                          <Checkbox
                            checked={checked}
                            disabled={Mode === "Show"}
                            onChange={(e) => {
                              const nextCategories = e.target.checked
                                ? [
                                    ...new Set([
                                      ...selectedCategories,
                                      item.value,
                                    ]),
                                  ]
                                : selectedCategories.filter(
                                    (value) => value !== item.value,
                                  );

                              setDataFunction(
                                {
                                  target: {
                                    value: nextCategories,
                                  },
                                },
                                "complaintCategories",
                              );
                            }}
                          />
                        }
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: 0.3,
                              padding: "9px 10px",
                            }}
                          >
                            <Typography
                              sx={{
                                marginBottom: "3px",
                                color: "#98752f",
                                fontSize: "10px",
                                fontWeight: "750",
                                lineHeight: "1.4",
                              }}
                            >
                              {item.value}
                            </Typography>

                            <Typography
                              sx={{
                                color: "#333a32",
                                fontSize: "12px",
                                fontWeight: "500",
                                lineHeight: "1.6",
                                overflowWrap: "anywhere",
                              }}
                            >
                              {item.label}
                            </Typography>
                          </Box>
                        }
                        sx={{
                          m: 0,
                          px: 1.5,
                          py: 0.5,
                          border: "1px solid #e5e7eb",
                          borderRadius: 2,
                          backgroundColor: checked ? "#fff8e7" : "#ffffff",
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.95rem",
                          },
                        }}
                      />
                    );
                  })}
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <div className="section-number">07</div>

          <div className="section-header-content">
            <div className="section-title">การจัดการและแก้ไขปัญหา</div>

            <div className="section-description">
              บันทึกการดำเนินการแก้ไขปัญหา ผลสัมฤทธิ์
              และแนวทางป้องกันการเกิดปัญหาซ้ำ
            </div>
          </div>
        </div>

        <div className="form-subsection">
          <div className="form-subtitle">
            <span className="form-subtitle-number">01</span>{" "}
            บันทึกการตัดสินใจของผู้รับข้อร้องเรียนในการแก้ไขปัญหาเฉพาะหน้า
          </div>

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
                  placeholder="เขียนรายละเอียด"
                  variant="standard"
                  multiline
                  rows={4}
                  fullWidth
                  disabled={Mode === "Show"}
                  value={data?.decision || ""}
                  onChange={(e) => setDataFunction(e, "decision")}
                />
              </div>
            </Row>
          </Container>
        </div>
        <div className="form-subsection">
          {" "}
          <div className="form-subtitle">
            <span className="form-subtitle-number">02</span>{" "}
            ระดับของผลสัมฤทธิ์ในการแก้ปัญหาเฉพาะหน้า
          </div>
          <Container className="my-3">
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

        <div className="form-subsection">
          {" "}
          <div className="form-subtitle">
            <span className="form-subtitle-number">03</span>{" "}
            ข้อเสนอแนะเพื่อป้องกันและแก้ไขปัญหาของผู้รับเรื่องร้องเรียน
          </div>
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
                  placeholder="เขียนรายละเอียด"
                  variant="standard"
                  multiline
                  rows={4}
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

      <div className="section-card">
        <div className="section-header">
          <div className="section-number">08</div>

          <div className="section-header-content">
            <div className="section-title">อัปโหลดไฟล์ (*ถ้ามี)</div>

            <div className="section-description">
              แนบหลักฐานประกอบเรื่องร้องเรียนและส่งออกข้อมูลรายงานในรูปแบบ Excel
            </div>
          </div>
        </div>

        <div className="section-body">
          <div className="form-subsection">
            <div className="FileSection">
              <div className="FileSectionHeader">
                <div className="FileSectionTitle">รูปภาพประกอบ</div>
              </div>

              {Mode !== "Show" && (
                <>
                  <input
                    type="file"
                    id="complaint-images"
                    accept="image/png, image/jpeg, image/webp"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleImageUpload(e.target.files);
                    }}
                    disabled={Mode === "Show"}
                  />

                  <label
                    htmlFor="complaint-images"
                    className="file-input-label"
                  >
                    <span className="file-selected">
                      <i className="fa-solid fa-image"></i>
                      <span>อัปโหลดรูป</span>
                    </span>

                    <span className="text">เลือกรูปภาพที่ต้องการแนบ</span>
                  </label>

                  <span className="remark">
                    รองรับไฟล์ JPG, PNG, WEBP และสามารถเลือกได้หลายรูป
                  </span>
                </>
              )}

              {/* IMAGE PREVIEW */}
              {/* IMAGE PREVIEW */}
              {/* IMAGE PREVIEW */}
              <div className="image-preview-list">
                {Array.isArray(images) &&
                  images.length > 0 &&
                  images.map((img, index) => {
                    const filename = typeof img === "string" ? img : img?.name;

                    // ถ้าไม่ใช่รูป ไม่ต้องแสดงตรงนี้
                    if (!isImageFile(filename)) {
                      return null;
                    }

                    return (
                      <div className="image-preview-item" key={index}>
                        <img
                          className="image-preview"
                          src={
                            typeof img === "string"
                              ? `/storage/attachfiles/${img}`
                              : URL.createObjectURL(img)
                          }
                          alt=""
                          onClick={() => {
                            setSelectedImage(
                              typeof img === "string"
                                ? `/storage/attachfiles/${img}`
                                : URL.createObjectURL(img),
                            );
                          }}
                        />

                        {Mode !== "Show" && (
                          <button
                            className="image-delete-btn"
                            type="button"
                            onClick={() => {
                              setImages((prev) =>
                                prev.filter((_, i) => i !== index),
                              );
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="FileSection document-upload-section">
              <div className="FileSectionHeader">
                <div className="FileSectionTitle">เอกสารประกอบ</div>

                <div className="FileSectionHint">WORD / EXCEL / POWERPOINT</div>
              </div>

              {Mode !== "Show" && (
                <>
                  <input
                    type="file"
                    id="complaint-documents"
                    accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => {
                      // ใส่ handler สำหรับเอกสารของคุณตรงนี้
                      handleDocumentUpload(e.target.files);
                    }}
                    disabled={Mode === "Show"}
                  />

                  <label
                    htmlFor="complaint-documents"
                    className="file-input-label document-upload-label"
                  >
                    <span className="file-selected document-file-selected">
                      <i className="fa-solid fa-file-lines"></i>

                      <span>อัปโหลดเอกสาร</span>
                    </span>

                    <span className="text">
                      เลือกไฟล์ Word, Excel หรือ PowerPoint
                    </span>
                  </label>

                  <span className="remark">
                    รองรับไฟล์ .doc, .docx, .xls, .xlsx, .ppt และ .pptx
                  </span>
                </>
              )}
              {documentFiles.length > 0 && (
                <div className="document-file-list">
                  {documentFiles.map((file, index) => (
                    <div
                      className="document-file-item"
                      key={`${file.name}-${index}`}
                    >
                      <div className="document-file-icon">
                        <i className={`bi ${getFileIcon(file.name)}`}></i>
                      </div>

                      <div className="document-file-info">
                        <div className="document-file-name">{file.name}</div>

                        <div className="document-file-size">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>

                      {Mode !== "Show" && (
                        <button
                          type="button"
                          className="document-file-delete"
                          onClick={() => {
                            setDocumentFiles((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* เอกสารเดิมจาก Database */}
              <div className="document-file-list">
                {Array.isArray(images) &&
                  images.map((file, index) => {
                    const filename =
                      typeof file === "string" ? file : file?.name;

                    // ข้ามรูปภาพ
                    if (!filename || isImageFile(filename)) {
                      return null;
                    }

                    const fileUrl = `/storage/attachfiles/${filename}`;

                    return (
                      <div className="document-file-item" key={`old-${index}`}>
                        {/* Icon */}
                        <div className="document-file-icon">
                          <i className={`bi ${getFileIcon(filename)}`}></i>
                        </div>

                        {/* ชื่อไฟล์ */}
                        <div className="document-file-info">
                          <div className="document-file-name">{filename}</div>

                          <div className="document-file-size">เอกสารแนบ</div>
                        </div>

                        {/* ปุ่มจัดการไฟล์ */}
                        <div className="document-file-actions">
                          {/* เปิดไฟล์ */}
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="document-file-open"
                            title="เปิดไฟล์"
                          >
                            <i className="bi bi-box-arrow-up-right"></i>
                          </a>

                          {/* ดาวน์โหลด */}
                          <a
                            href={fileUrl}
                            download={filename}
                            className="document-file-download"
                            title="ดาวน์โหลด"
                          >
                            <i className="bi bi-download"></i>
                          </a>

                          {/* ลบ */}
                          {Mode !== "Show" && (
                            <button
                              type="button"
                              className="document-file-delete"
                              title="ลบไฟล์"
                              onClick={() => {
                                setImages((prev) =>
                                  prev.filter((_, i) => i !== index),
                                );
                              }}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedImage && (
        <div
          className="image-dialog-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div className="image-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="image-dialog-header">
              <div className="image-dialog-title">
                <i className="bi bi-image"></i>
                ตัวอย่างรูปภาพ
              </div>

              <button
                type="button"
                className="image-dialog-close"
                onClick={() => setSelectedImage(null)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="image-dialog-body">
              <img
                src={selectedImage}
                alt="Preview"
                className="image-dialog-image"
              />
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={openSeverityDetail}
        onClose={() => setOpenSeverityDetail(false)}
        maxWidth={false}
        PaperProps={{
          style: {
            margin: 16,
            borderRadius: 16,
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            lineHeight: 0,
            background: "#fff",
          }}
        >
          {/* รูป */}
          <img
            src={severityA}
            alt="รายละเอียดระดับความรุนแรง"
            style={{
              display: "block",
              maxWidth: "90vw",
              maxHeight: "85vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />

          {/* ปุ่มปิด */}
          <button
            type="button"
            onClick={() => setOpenSeverityDetail(false)}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 38,
              height: 38,
              border: "none",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.95)",
              color: "#475569",
              fontSize: 22,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 12px rgba(0, 0, 0, 0.18)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.color = "#dc2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
              e.currentTarget.style.color = "#475569";
            }}
          >
            ปิด
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default GeneralInfo;
