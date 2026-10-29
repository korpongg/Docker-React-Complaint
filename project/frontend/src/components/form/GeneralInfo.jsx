import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { getCurrentDate } from "../Function";
import { Autocomplete, TextField } from "@mui/material";
import ReportLog from "./ReportLog";
import ReportLog2 from "./ReportLog2";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import GreenCircle from "./GreenCircle";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
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
  disable,
  setDataFunction,
  handleSetBoard,
  handleSetDate,
  setSingleDataFunction,
  missingKeys,
  FormType,
  handleDateChange,
  handleDataChangeCheckbox,
  handleDataChangeCheckbox2,
  depoptiondata,
  setCheckBoxFunction,

  checkbox,
  setErrors,
  errors,
  inputRefs,
}) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tosentvalue, settosentvalue] = useState("select"); // select or textinput
  const manager = checkbox.manager;
  const doctor = checkbox.doctor;
  const compensation = checkbox.compensation;
  const operation = checkbox.operation;
  const administer = checkbox.administer;
  const nurse = checkbox.nurse;
  const director = checkbox.director;
  const quality = checkbox.quality;

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

  const committeeOptions = [
    "คณะกรรมการทีมสหสาขาวิชาชีพอายุรกรรมโรคเบาหวานและต่อมไร้ท่อ",
    "คณะกรรมการทีมนำพัฒนาคุณภาพโรงพยาบาล",
    "คณะกรรมการบริหารและพัฒนาทรัพยากรบุคคล HRC",
    "คณะทำงานพยาบาลควบคุมโรคติดเชื้อในโรงพยาบาล ประจำหอผู้ป่วย(ICWN)",
    "คณะกรรมการธรรมาภิบาลคุ้มครองข้อมูลส่วนบุคคล (Personal Data Protection Act - PDPA)",
    "คณะทำงานควบคุมโรคติดเชื้อในโรงพยาบาล (หน่วยงานสนับสนุน)",
    "คณะทำงานพยาบาลควบคุมโรคติดเชื้อในโรงพยาบาล ประจำหอผู้ป่วย(ICWN)",
    "คณะกรรมการความปลอด ENV",
    "คณะทำงานเครื่องมือแพทย์",
    "คณะกรรมการทีมสหสาขาวิชาชีพกุมารเวชกรรม",
    "คณะกรรมการองค์กรแพทย์ MSO",
    "คณะทำงาน Palliative care team",
    "คณะกรรมการช่วยฟื้นคืนชีพ CPR",
    "คณะกรรมการสารสนเทศ (Information Management Committee IMC)",
    "คณะกรรมการ Audit เวชระเบียน",
    "คณะกรรมการสร้างเสริมสุขภาพ HPH",
    "คณะกรรมการเภสัชกรรมและการบำบัด PTC",
    "คณะอนุกรรมการพิจารณาคัดเลือกยา และกำหนดราคายา",
    "คณะกรรมการควบคุมโรคติดเชื้อ (Infection - Control Committee ICC)",
    "คณะกรรมการปลูกถ่ายไตโรงพยาบาลไทยนครินทร์",
    "คณะกรรมการทีมสหสาขาวิชาชีพสูตินรีเวช-ปริกำเนิด PCT OB",
    "คณะกรรมการ PCT DM",
    "คณะกรรมการทีมสหสาขาวิชาชีพตา PCT-EYE",
    "คณะกรรมการทีมสหสาขาวิชาชีพกุมารเวชกรรม PCT Ped",
    "คณะทำงาน PCT Breast",
    "คณะกรรมการทีมสหสาขาวิชาชีพอายุรกรรม PCT Med",
    "คณะกรรมการทีมสหสาขาวิชาชีพหัวใจ และหลอดเลือด PCT-Cardio",
    "คณะกรรมการทีมสหสาขาวิชาชีพสมองและหลอดเลือด (PCT Neuro)",
    "คณะกรรมการทีมสหสาขาวิชาชีพอายุรกรรมทางเดินอาหาร PCT-GI",
    "คณะกรรมการทีมสหสาขาวิชาชีพศัลยกรรมกระดูกและข้อ PCT-Ortho",
    "คณะกรรมการทีมสหสาขาวิชาชีพ หู คอ จมูก PCT-ENT",
    "คณะกรรมการทีมสหสาขาวิชาชีพศัลยกรรม PCT Surg",
    "คณะกรรมการทีมสหสาขาวิชาชีพ ER",
    "คณะทำงาน Nurse CPR",
    "คณะทำงาน Nurse Audit",
  ];

  const selectedComplainant = String(data?.complainant ?? "0")
  .split(",")
  .filter(Boolean);

const handleComplainantChange = (value, checked) => {
  const current = String(data?.complainant ?? "0")
    .split(",")
    .filter(Boolean);

  const updated = checked
    ? [...new Set([...current, value])]
    : current.filter((item) => item !== value);

  // ส่งค่าในรูปแบบ event เพื่อให้ setDataFunction เดิมใช้งานได้
  setDataFunction(
    {
      target: {
        name: "complainant",
        value: updated.join(","),
      },
    },
    "complainant"
  );

  setErrors((prev) => ({
    ...prev,
    complainant: false,
  }));
};
  return (
    <>
      <div className="section-card">
        <div className="section-header">
          <span className="section-number">01</span>

          <div className="section-header-content">
            <div className="section-title">ส่งต่อหน่วยงาน</div>

            <div className="section-description">
              กำหนดหน่วยงานหรือคณะกรรมการที่เกี่ยวข้อง เพื่อรับเรื่อง
    ดำเนินการ และตอบกลับแนวทางการแก้ไข

            </div>
          </div>
        </div>

        <div className="section-body">
          <Container>
            {/* ส่งหน่วยงาน */}
            <Row className="align-items-center mb-3">
              <Col md={4}>
                <span>ข้อเรียกร้องส่งหน่วยงาน</span>
                <span className="required-badge">จำเป็น</span>
              </Col>
              <Col md={8}>
                <ReportLog
                  FormType="Occ"
                  Mode={Mode}
                  data={data}
                  setDataFunction={setDataFunction}
                  handleDateChange={handleDateChange}
                  handleDataChangeCheckbox={handleDataChangeCheckbox}
                  depoptiondata={depoptiondata}
                  missingKeys={missingKeys}
                  setErrors={setErrors}
                  errors={errors}
                  inputRefs={inputRefs}
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={4}>คณะกรรมการ</Col>

              <Col md={8}>
                <Form.Select
                  value={data?.board || ""}
                  onChange={(e) => setDataFunction(e, "board")}
                  className="form-input"
                >
                  <option value="">เลือกคณะกรรมการ</option>

                  {committeeOptions.map((committee, index) => (
                    <option key={index} value={committee}>
                      {committee}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={6}>
                เพื่อตอบกลับแนวทางการแก้ปัญหาและส่งคืนศูนย์พัฒนาคุณภาพ
              </Col>

              <Col md={6}>
                <RadioGroup
                  row
                  sx={{
                    flexWrap: "nowrap",
                  }}
                  name="problem"
                  value={data?.problem || "0"}
                  onChange={(e) => setDataFunction(e, "problem")}
                >
                  <FormControlLabel
                    disabled={Mode === "Show"}
                    value="0"
                    control={<Radio />}
                    label="ด่วนที่สุด"
                  />
                  <FormControlLabel
                    disabled={Mode === "Show"}
                    value="1"
                    control={<Radio />}
                    label="ภายในวันที่"
                  />
                  {data?.problem === "1" && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        type="date"
                        size="small"
                        disabled={disable}
                        variant="standard"
                        value={data?.date || ""}
                        onChange={(e) => setDataFunction(e, "date")}
                        sx={{ width: 180 }}
                      />
                    </div>
                  )}
                </RadioGroup>
              </Col>
            </Row>
            <Row className="align-items-center mb-3">
              <Col md={4}>แจ้งหน่วยงาน</Col>
              <Col md={8}>
                <ReportLog2
                  FormType="Occ"
                  Mode={Mode}
                  data={data}
                  setDataFunction={setDataFunction}
                  handleDateChange={handleDateChange}
                  handleDataChangeCheckbox={handleDataChangeCheckbox2}
                  depoptiondata={depoptiondata}
                  missingKeys={missingKeys}
                />
                <div className="">
                  เพื่อทราบ (ข้อเสนอแนะ) เพื่อเป็นโอกาสพัฒนา
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <span className="section-number">02</span>

          <div className="section-header-content">
            <div className="section-title">ผู้รับสำเนารายงาน</div>

            <div className="section-description">
              เลือกผู้บริหาร หน่วยงาน หรือบุคลากรที่ต้องการส่งสำเนารายงานทางอีเมล
            </div>
          </div>
        </div>

        <div className="section-body">
          <div className="form-subtitle mt-3">สําเนาเรียนผู้บริหาร</div>
          <Container>
            <Row>
              <FormGroup row id="manager" name="manager">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="a"
                      checked={manager.includes("a")}
                      onChange={(e) => setCheckBoxFunction(e, "manager")}
                    />
                  }
                  label="เพื่อรับทราบ"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="b"
                      checked={manager.includes("b")}
                      onChange={(e) => setCheckBoxFunction(e, "manager")}
                    />
                  }
                  label="เพื่อตอบกลับแนวทางการแก้ปัญหา และส่งคืนศูนย์พัฒนาคุณภาพ"
                />
              </FormGroup>
            </Row>
          </Container>

          <div className="form-subtitle mt-3">ฝ่ายแพทย์/งานคุณภาพ</div>
          <Container>
            <Row>
              <FormGroup row id="quality" name="quality">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="a"
                      checked={quality.includes("a")}
                      onChange={(e) => setCheckBoxFunction(e, "quality")}
                    />
                  }
                  label="แพทย์"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="b"
                      checked={quality.includes("b")}
                      onChange={(e) => setCheckBoxFunction(e, "quality")}
                    />
                  }
                  label="ผอ.งานคุณภาพ และส่งคืนศูนย์พัฒนาคุณภาพ"
                />
              </FormGroup>
            </Row>
          </Container>
          <div className="form-subtitle mt-3">งานพยาบาล</div>
          <Container>
            <Row>
              <FormGroup
                row
                id="nurse"
                aria-labelledby="nurse"
                defaultValue="0"
                name="nurse"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="a"
                      checked={nurse.includes("a")}
                      onChange={(e) => setCheckBoxFunction(e, "nurse")}
                    />
                  }
                  label="รองผอ.แพทย์งานพยาบาล"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="c"
                      checked={nurse.includes("c")}
                      onChange={(e) => setCheckBoxFunction(e, "nurse")}
                    />
                  }
                  label="ผช.ผอ.แพทย์ งานพยาบาล"
                />
              </FormGroup>
            </Row>
          </Container>
          <div className="form-subtitle mt-3">ฝ่ายบริหาร</div>

          <Container>
            <Row>
              <FormGroup
                row
                id="administer"
                aria-labelledby="administer"
                defaultValue="0"
                name="administer"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="a"
                      checked={administer.includes("a")}
                      onChange={(e) => setCheckBoxFunction(e, "administer")}
                    />
                  }
                  label="ผอ.บริหาร"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="b"
                      checked={administer.includes("b")}
                      onChange={(e) => setCheckBoxFunction(e, "administer")}
                    />
                  }
                  label="ผช.ผอ.บริหาร สายงานสนับสนุน"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="c"
                      checked={administer.includes("c")}
                      onChange={(e) => setCheckBoxFunction(e, "administer")}
                    />
                  }
                  label="ผช.ผอ. บริหาร สายงานบัญชีและการเงิน"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="d"
                      checked={administer.includes("d")}
                      onChange={(e) => setCheckBoxFunction(e, "administer")}
                    />
                  }
                  label="ผช.ผอ. บริหาร สายงานพัฒนาธุรกิจ"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="e"
                      checked={administer.includes("e")}
                      onChange={(e) => setCheckBoxFunction(e, "administer")}
                    />
                  }
                  label="ผช.ผอ.บริหารสายงานวิศวกรรมและบริหารโครงการ"
                />
              </FormGroup>
            </Row>
          </Container>

          <div className="form-subtitle mt-3">ฝ่ายปฏิบัติการ</div>
          <Container>
            <Row>
              <FormGroup
                row
                id="operation"
                aria-labelledby="operation"
                defaultValue="0"
                name="operation"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="a"
                      checked={operation.includes("a")}
                      onChange={(e) => setCheckBoxFunction(e, "operation")}
                    />
                  }
                  label="ผอ.ปฏิบัติการ"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="b"
                      checked={operation.includes("b")}
                      onChange={(e) => setCheckBoxFunction(e, "operation")}
                    />
                  }
                  label="ผช.ผอ.ปฏิบัติการ สายงานสนับสนุนการบริการลูกค้า"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="c"
                      checked={operation.includes("c")}
                      onChange={(e) => setCheckBoxFunction(e, "operation")}
                    />
                  }
                  label="ผช.ผอ.ปฏิบัติการ สายงานราชการ"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="d"
                      checked={operation.includes("d")}
                      onChange={(e) => setCheckBoxFunction(e, "operation")}
                    />
                  }
                  label="ผช.ผอ.ปฏิบัติการ สายงานธุรกิจเทคนิคการแพทย"
                />
              </FormGroup>
            </Row>
          </Container>

          <div className="form-subtitle mt-3">สํานักอํานวยการ</div>
          <Container>
            <Row>
              <FormGroup
                row
                id="director"
                aria-labelledby="director"
                defaultValue="0"
                name="director"
              >
                <FormControlLabel
                  name="a"
                  control={
                    <Checkbox
                      name="a"
                      checked={director.includes("a")}
                      onChange={(e) => setCheckBoxFunction(e, "director")}
                    />
                  }
                  label="ผอ.สํานักอํานวยการ"
                />
              </FormGroup>
            </Row>
          </Container>

          <div className="form-subtitle mt-3">องค์กรแพทย์</div>
          <Container>
            <Row>
              <FormGroup
                row
                id="doctor"
                aria-labelledby="doctor"
                defaultValue="0"
                name="doctor"
              >
                <FormControlLabel
                  name="a"
                  control={
                    <Checkbox
                      name="a"
                      checked={doctor.includes("a")}
                      onChange={(e) => setCheckBoxFunction(e, "doctor")}
                    />
                  }
                  label="ประธานองค์กรแพทย์"
                />
                <FormControlLabel
                  name="b"
                  control={
                    <Checkbox
                      name="b"
                      checked={doctor.includes("b")}
                      onChange={(e) => setCheckBoxFunction(e, "doctor")}
                    />
                  }
                  label="ประธานอนุกรรมการจริยธรรมวิชาชีพแพทย์"
                />
              </FormGroup>
            </Row>
          </Container>

          <div className="form-subtitle mt-3">อื่นๆ</div>

          <Container>
            <Row>
              <FormGroup
                row
                id="compensation"
                aria-labelledby="compensation"
                defaultValue="0"
                name="compensation"
              >
                <FormControlLabel
                  name="a"
                  control={
                    <Checkbox
                      name="a"
                      checked={compensation.includes("a")}
                      onChange={(e) => setCheckBoxFunction(e, "compensation")}
                    />
                  }
                  label="จัดทําแฟ้มประวัติข้อร้องเรียนที่เสี่ยงต่อการถูกฟ้องร้อง / เรียกค่าชดเชย"
                />
              </FormGroup>
            </Row>
          </Container>
        </div>
      </div>

      <div className="section-card section-card-important">
        <div className="section-header section-header-important">
          <div className="section-number section-number-important">
            <span>★</span>
          </div>

          <div className="section-header-content">
            <div className="section-title section-title-important">
              สรุปและเรียบเรียงประเด็น
            </div>

            <div className="section-description">
              สรุปและเรียบเรียงประเด็นจากคำร้องเรียนให้ชัดเจน
              เพื่อส่งต่อให้หน่วยงานที่เกี่ยวข้องเข้าใจตรงกัน
            </div>
          </div>

          <div className="section-important-badge">สำคัญ</div>
        </div>

        <div className="section-body">
          <div className="form-subtitle">
            <span className="form-subtitle-text">
              บันทึกการสืบความของผู้รับข้อร้องเรียน{" "}
              <span className="required-badge">จำเป็น</span>
            </span>
          </div>
          <Container>
            <Row>
              <TextField
                fullWidth
              inputRef={(el) => (inputRefs.current.managementremark = el)}
                id="managementremark"
                disabled={Mode === "Show"}
                placeholder="เขียนรายละเอียด"
                value={data?.managementremark || ""}
                onChange={(e) => {
                  setErrors((prev) => ({ ...prev, managementremark: false }));

                  setDataFunction(e, "managementremark");
                }}
                variant="standard"
                multiline
                rows={5}
                sx={{ marginBottom: 1 }}
                style={{
                  borderColor: errors.managementremark ? "#dc3545" : "",
                  boxShadow: errors.managementremark
                    ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                    : "",
                  boxShadow: errors.managementremark
                    ? "0 0 0 0.2rem rgba(220,53,69,.25)"
                    : "",
                }}
              />


              
              {errors.managementremark && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <ErrorOutlineIcon fontSize="small" />
                  กรุณาเขียนรายละเอียด
                </Form.Control.Feedback>
              )}
            </Row>
          </Container>
        </div>
      </div>
      <div className="section-card">
        <div className="section-header">
          <span className="section-number">03</span>

          <div className="section-header-content">
            <div className="section-title">
              สิ่งที่ต้องการให้ผู้ถูกร้องเรียนดำเนินการ
            </div>

            <div className="section-description">
              ระบุความประสงค์ของผู้ร้องเรียนเกี่ยวกับการตอบกลับ การติดต่อ และการตรวจสอบข้อร้องเรียน
            </div>
          </div>
        </div>

        <div className="section-body">
          <Container>
            <Row>
            
<FormGroup
  id="complainant"
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 0,
    width: "100%",

    "& .MuiFormControlLabel-root": {
      margin: 0,
      minHeight: 36,
      alignItems: "center",
    },

    "& .MuiCheckbox-root": {
      padding: "5px",
    },

    "& .MuiFormControlLabel-label": {
      fontSize: "0.95rem",
      lineHeight: 1.4,
    },
  }}
>
  {/* ข้อ 0: ขอให้ตอบกลับผู้ร้องเรียน */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    flexWrap: "wrap",
    minHeight: 36,
  }}
>
    <FormControlLabel
      sx={{ mr: 0 }}
      control={
        <Checkbox
          checked={selectedComplainant.includes("0")}
          disabled={Mode === "Show"}
          onChange={(e) =>
            handleComplainantChange("0", e.target.checked)
          }
          icon={
            <Radio
              checked={false}
              sx={{ pointerEvents: "none" }}
            />
          }
          checkedIcon={
            <Radio
              checked
              sx={{ pointerEvents: "none" }}
            />
          }
        />
      }
      label="ขอให้ตอบกลับผู้ร้องเรียน"
    />

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        ภายในวันที่

     <Form.Control
  type="date"
  ref={(el) => (inputRefs.current.responseDueDate = el)}
  disabled={
    Mode === "Show" ||
    !selectedComplainant.includes("0")
  }
  value={data?.responseDueDate || ""}
  onChange={(e) => {
    const value = e.target.value;

    setErrors((prev) => ({
      ...prev,
      complainant: false,
    }));

    setDataFunction(
      {
        target: {
          name: "responseDueDate",
          value,
        },
      },
      "responseDueDate"
    );
  }}
  style={{
    width: "180px",
    borderColor: errors.complainant ? "#dc3545" : "",
    boxShadow: errors.complainant
      ? "0 0 0 0.2rem rgba(220,53,69,.25)"
      : "",
  }}
/>
      </Box>

      {errors.complainant && (
        <div
          style={{
            color: "#dc3545",
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <ErrorOutlineIcon fontSize="small" />
          กรุณาเขียนวันที่
        </div>
      )}
    </Box>
  </Box>

  {/* ข้อ 1–4: เลือกได้หลายข้อ */}
  {[
    {
      value: "1",
      label: "ผู้ร้องเรียนไม่ต้องการการตอบกลับ",
    },
    {
      value: "2",
      label: "ผู้ร้องเรียนไม่ประสงค์ให้ชื่อ สกุล",
    },
    {
      value: "3",
      label: "ขอให้ติดต่อกลับเพื่อชี้แจงข้อมูลเพิ่มเติม",
    },
    {
      value: "4",
      label: "ขอให้หน่วยงานตรวจสอบรายละเอียดที่เกิดขึ้น",
    },
  ].map((item) => (
    <FormControlLabel
      key={item.value}
      sx={{ mr: 0 }}
      control={
        <Checkbox
          checked={selectedComplainant.includes(item.value)}
          disabled={Mode === "Show"}
          onChange={(e) =>
            handleComplainantChange(
              item.value,
              e.target.checked
            )
          }
          icon={
            <Radio
              checked={false}
              sx={{ pointerEvents: "none" }}
            />
          }
          checkedIcon={
            <Radio
              checked
              sx={{ pointerEvents: "none" }}
            />
          }
        />
      }
      label={item.label}
    />
  ))}
</FormGroup>

           
<Box
  sx={{
    display: "flex",
    alignItems: "flex-start",
    gap: 1,
    mt: 2,
    width: "100%",
  }}
>
  {/* หัวข้อด้านซ้าย */}
  <Box
    sx={{
      width: 120,
      pt: 1,
      fontSize: "0.95rem",
      fontWeight: 600,
      color: "#344054",
    }}
  >
    บันทึกข้อความ : 
  </Box>

 <Box sx={{ flex: 1, minWidth: 0 }}>
    <TextField
      fullWidth
      inputRef={(el) => (inputRefs.current.respond_text = el)}
      id="respond_text"
      disabled={Mode === "Show"}
      placeholder="เขียนรายละเอียดเพิ่มเติม..."
      value={data?.respond_text || ""}
      onChange={(e) => {
        setErrors((prev) => ({
          ...prev,
          respond_text: false,
        }));

        setDataFunction(e, "respond_text");
      }}
      variant="outlined"
      multiline
      rows={3}
      error={!!errors.respond_text}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          backgroundColor: Mode === "Show" ? "#f8fafc" : "#ffffff",
          fontSize: "0.95rem",
          transition: "all 0.2s ease",

          "& fieldset": {
            borderColor: errors.respond_text ? "#dc3545" : "#d0d5dd",
          },

          "&:hover fieldset": {
            borderColor: errors.respond_text ? "#dc3545" : "#94a3b8",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#2563eb",
            borderWidth: "1.5px",
          },
        },

        "& .MuiInputBase-input::placeholder": {
          color: "#98a2b3",
          opacity: 1,
        },
      }}
      helperText={
        errors.respond_text ? "กรุณากรอกบันทึกข้อความ" : ""
      }
    />
  </Box>
</Box>
 

            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
