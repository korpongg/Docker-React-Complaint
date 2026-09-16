import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { getCurrentDate } from "../Function";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import GreenCircle from "./GreenCircle";
import { BadgeAlert } from "lucide-react";
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
import Chip from "@mui/material/Chip";

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
  show,
  handleShow,
  setChangePerson,
  handlePatientDiagnosis,
}) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tosentvalue, settosentvalue] = useState("select"); // select or textinput
  const [timePicker, setTimePicker] = useState(null); // dayjs
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
  const InfoRow = ({ label, value }) => (
  <div className="info-row">
    <div className="info-label">{label}</div>
    <div className="info-value">{value || "-"}</div>
  </div>
);
  return (
    <>
      <div className="page-bg">
        <div className="card-section">
          <div
            className="section-header-main"
            style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderLeft: "5px solid #DC2626",
              borderRadius: "10px",
              padding: "12px 16px",
            }}
          >
            <div
              className="section-title"
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#991B1B",
              }}
            >
              <BadgeAlert size={22} color="#DC2626" />
              ดูข้อมูลการร้องเรียน
            </div>

            <Button size="sm" variant="outline-secondary" onClick={handleShow}>
              {show ? "ซ่อน" : "แสดง"}
            </Button>
          </div>

          {show && (
            <>
              {" "}
              <div
                style={{ background: "#f8fafc", border: "1px solid #e8e9eaff" }}
              >
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
                            disabled={true}
                            id="type"
                            aria-labelledby="type"
                            defaultValue="0"
                            name="type"
                            value={data?.type || "0"}
                          >
                            <FormControlLabel
                              value="0"
                              control={<Radio />}
                              disabled={data?.type !== "0"}
                              label="OPD"
                            />
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              disabled={data?.type !== "1"}
                              label="IPD"
                            />
                          </RadioGroup>
                        </Col>

                        {/* วันที่ร้องเรียน */}
                        <Col md={4}>
                          <label className="form-label">
                            วันที่รับข้อร้องเรียน
                          </label>
                          <Form.Control
                            type="date"
                            value={data?.date || null}
                            InputProps={{
                              readOnly: true,
                            }}
                            className="form-input"
                          />
                        </Col>

                        {/* เวลา */}
                        <Col md={4}>
                          <label className="form-label">เวลา</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              ampm={false}
                              value={timePicker}
                              disabled
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  sx: {
                                    "& .MuiInputBase-root": {
                                      height: 48,
                                      backgroundColor: "#f9f9f9",
                                    },
                                    "& .Mui-disabled": {
                                      WebkitTextFillColor: "#000",
                                      opacity: 1,
                                    },
                                  },
                                },
                              }}
                            />
                          </LocalizationProvider>
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
                            disabled={true}
                            className="gap-3"
                            id="record"
                            aria-labelledby="record"
                            defaultValue="0"
                            name="record"
                            value={data?.record || "0"}
                          >
                            <FormControlLabel
                              value="0"
                              control={<Radio />}
                              disabled={data?.record !== "0"}
                              label="Nurse Supervisor"
                            />
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              disabled={data?.record !== "1"}
                              label="ผู้จัดการฝ่าย"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio />}
                              disabled={data?.record !== "2"}
                              label="หัวหน้าแผนก"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio />}
                              disabled={data?.record !== "3"}
                              label="ลูกค้าสัมพันธ์"
                            />

                            <FormControlLabel
                              disabled={data?.record !== "4"}
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
                            disabled={true}
                            className="option-grid"
                            id="complaints"
                            aria-labelledby="complaints"
                            defaultValue="0"
                            name="complaints"
                            value={data?.complaints || "0"}
                          >
                            <FormControlLabel
                              value="0"
                              control={<Radio />}
                              disabled={data?.complaints !== "0"}
                              label="ทางวาจา"
                            />
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              disabled={data?.complaints !== "1"}
                              label="ทางโทรศัพท์"
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio />}
                              disabled={data?.complaints !== "2"}
                              label="เยี่ยมผู้ป่วยเชิงรุก"
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio />}
                              disabled={data?.complaints !== "3"}
                              label="เยี่ยมตลาด / บริษัทคู่สัญญา"
                            />

                            <FormControlLabel
                              disabled={data?.complaints !== "4"}
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
                          <Form.Control
                            className="form-input"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={data?.name || null}
                          />
                        </Col>
                        <Col md={3}>
                          <label className="form-label">เกี่ยวข้องเป็น</label>

                          <InputGroup>
                            <Form.Control
                              className="form-input"
                              InputProps={{
                                readOnly: true,
                              }}
                              value={data?.related || null}
                            />
                            <InputGroup.Text>ของผู้ป่วย</InputGroup.Text>
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <label className="form-label">เบอร์โทรศัพท์</label>
                          <Form.Control
                            className="form-input"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={data.phone || null}
                          />
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
                          <label className="form-label">HN</label>
                          <Form.Control
                            value={data?.patient_hn || null}
                            InputProps={{
                              readOnly: true,
                            }}
                            className="form-input"
                          />
                        </Col>

                        <Col md={6}>
                          <label className="form-label">
                            ชื่อ - สกุล ผู้ป่วย
                          </label>
                          <Form.Control
                            value={data?.patient_name || null}
                            InputProps={{
                              readOnly: true,
                            }}
                            className="form-input"
                          />
                        </Col>

                        <Col md={3}>
                          <label className="form-label">อายุ</label>
                          <InputGroup>
                            <Form.Control
                              value={data?.patient_age || null}
                              InputProps={{
                                readOnly: true,
                              }}
                              className="form-input"
                            />
                            <InputGroup.Text>ปี</InputGroup.Text>
                          </InputGroup>
                        </Col>

                        <Col md={6}>
                          <label className="form-label">AN</label>
                          <Form.Control
                            value={data?.patient_an || null}
                            InputProps={{
                              readOnly: true,
                            }}
                            className="form-input"
                          />
                        </Col>

                        <Col md={6}>
                          <label className="form-label">Diagnosis</label>
                          <Form.Control
                            className="form-input"
                            value={data?.patient_diagnosis || null}
                            InputProps={{
                              readOnly: true,
                            }}
                            placeholder="เช่น I10 Essential hypertension"
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
                        InputProps={{
                          readOnly: true,
                        }}
                        name="involved"
                        value={data?.involved || "0"}
                        row
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          disabled={data?.involved !== "0"}
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
                          disabled={data?.involved !== "1"}
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
                          disabled={true}
                          value={data?.urgent || "0"}
                          className="gap-3"
                        >
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            disabled={data?.urgent !== "0"}
                            label="ด่วน ภายในวันที่"
                          />
                          <Form.Control
                            type="date"
                            readOnly
                            className="urgent-date"
                            value={data?.urgentDate || null}
                            onChange={(e) => setDataFunction(e, "urgentDate")}
                          />
                          <FormControlLabel
                            value="1"
                            disabled={data?.urgent !== "1"}
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
                  </div>

                  <div className="section-body">
                    <RadioGroup
                      row
                      id="appeal"
                      aria-labelledby="appeal"
                      defaultValue="0"
                      name="appeal"
                      value={data?.appeal || "0"}
                      disabled={true}
                    >
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        disabled={data?.appeal !== "0"}
                        label="ไม่ระบุบุคคลหรือแผนกที่ร้องเรียน"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        disabled={data?.appeal !== "1"}
                        label="ระบุ ได้แก่"
                      />
                    </RadioGroup>

                    {showAppeal == 1 && (
                      <Row className="d-flex justify-content-center align-items-center">
                        <div className="d-flex justify-content-end mb-3"></div>
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
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                      value={item.name ? item.name : ""}
                                      style={{
                                        height: "56px",
                                        background: "white",
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <AutoCompleteText
                                      required
                                      Mode={Mode}
                                      data={data}
                                      item={item}
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                      name="department"
                                      datacolumn="deptrelate"
                                      datacolumn2="deptemail"
                                      setChangePerson={setChangePerson}
                                      index={index + 1}
                                    />
                                  </td>
                                  <td style={{ position: "relative" }}>
                                    <RadioGroup
                                      sx={{ p: 1 }}
                                      row
                                      id="faction"
                                      aria-labelledby="faction"
                                      defaultValue="0"
                                      name="faction"
                                      value={item?.faction || "0"}
                                    >
                                      <FormControlLabel
                                        sx={{ p: 1 }}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value="0"
                                        control={<Radio />}
                                        label="ฝ่ายแพทย์"
                                      />
                                      <FormControlLabel
                                        sx={{ p: 1 }}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value="1"
                                        control={<Radio />}
                                        label="งานพยาบาล"
                                      />
                                      <FormControlLabel
                                        sx={{ p: 1 }}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value="2"
                                        control={<Radio />}
                                        label="ฝ่ายบริหาร"
                                      />
                                      <FormControlLabel
                                        sx={{ p: 1 }}
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                        value="3"
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
                  </div>
                </div>

                <div className="section-card">
                  <div className="section-header">
                    <GreenCircle />
                    ส่วนที่ 1 : สรุปสาระ / ประเด็นร้องเรียน
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
                            id="summarize"
                            InputProps={{
                              readOnly: true,
                            }}
                            label="เขียนรายละเอียด"
                            value={data?.summarize || ""}
                            variant="standard"
                            multiline
                            rows={4}
                            sx={{ marginBottom: 1 }}
                          />
                        </div>
                      </Row>
                    </Container>
                  </div>
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
                            missingKeys.some(
                              (item) => item.key === "expectation",
                            )
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
                            InputProps={{
                              readOnly: true,
                            }}
                            value={data?.expectation || ""}
                          />
                        </div>
                      </Row>
                    </Container>
                  </div>
                </div>

                <div className="section-card">
                  <div className="section-header">
                    <GreenCircle />
                    ระดับดับความรุนแรง
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
                    <Container>
                      <Row className="align-items-center mb-3">
                        <Col md={3}>ข้อเสนอแนะ :</Col>
                        <Col md={9}>
                          <RadioGroup
                            row
                            id="suggestion"
                            aria-labelledby="suggestion"
                            defaultValue="0"
                            InputProps={{
                              readOnly: true,
                            }}
                            name="suggestion"
                            value={data?.suggestion || "0"}
                          >
                            <FormControlLabel
                              value="A"
                              control={<Radio />}
                              disabled={data?.suggestion !== "A"}
                              label="A"
                            />
                            <FormControlLabel
                              value="B"
                              control={<Radio />}
                              disabled={data?.suggestion !== "B"}
                              label="B"
                            />
                          </RadioGroup>
                        </Col>
                      </Row>

                      <Row className="align-items-center">
                        <Col md={3}>ข้อร้องเรียน :</Col>
                        <Col md={9}>
                          <RadioGroup
                            row
                            id="suggestion"
                            aria-labelledby="suggestion"
                            defaultValue="0"
                            name="suggestion"
                            InputProps={{
                              readOnly: true,
                            }}
                            value={data?.suggestion || "0"}
                          >
                            {["C", "D", "E", "F", "G", "H", "I"].map(
                              (label, index) => (
                                <FormControlLabel
                                  key={label}
                                  disabled={data?.suggestion !== label}
                                  value={label}
                                  control={<Radio />}
                                  label={label}
                                />
                              ),
                            )}
                          </RadioGroup>
                        </Col>
                      </Row>
                    </Container>
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
                            InputProps={{
                              readOnly: true,
                            }}
                            value={data?.decision || ""}
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
                          value={data?.achievement || "0"}
                          disabled={true}
                        >
                          <FormControlLabel
                            value="0"
                            control={<Radio />}
                            disabled={data?.achievement !== "0"}
                            label="แก้ไขได้ทั้งหมด"
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio />}
                            disabled={data?.achievement !== "1"}
                            label="แก้ไขได้บางส่วน"
                          />
                          <FormControlLabel
                            value="2"
                            control={<Radio />}
                            disabled={data?.achievement !== "2"}
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
                            InputProps={{
                              readOnly: true,
                            }}
                            value={data?.prevent || ""}
                          />
                        </div>
                      </Row>
                    </Container>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
