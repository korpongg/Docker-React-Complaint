import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { getCurrentDate } from "../Function";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import GreenCircle from "./GreenCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReportLog from "./ReportLog";
import ReportLog2 from "./ReportLog2";
import AutoCompleteText from "./AutoCompleteDep";
import EmployeeAutocomplete from "./EmployeeAutocomplete";
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
  isVisible,
  isVisible2,
  checkbox,
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
  userData,
}) => {

useEffect(() => {
  if (!data.respond_Type) return;

  const resetFields = {};

  if (data.respond_Type !== "5") {
    Object.assign(resetFields, {
      respond_NameSurname: "",
      respond_Id: "",
      respond_Operation: "",
      respond_Warn: "",
      cautioned: "",
    });

    setCheckBoxFunction({
      target: { checked: false, name: null }
    }, "respond_Cause");
  }

  if (data.respond_Type !== "4") {
    resetFields.respond_Committee = "";
  }

  if (data.respond_Type !== "9") {
    resetFields.respond_ComplaintOther = "";
  }

  // 🔥 ยิงครั้งเดียว
  Object.entries(resetFields).forEach(([key, value]) => {
    setDataFunction({ target: { value } }, key);
  });

}, [data.respond_Type]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tosentvalue, settosentvalue] = useState("select"); // select or textinput
const respond_Cause = checkbox?.respond_Cause ?? [];
  const causeList = [
    { value: "1", label: "การสื่อสาร/ให้ข้อมูลไม่ชัดเจน ไม่เพียงพอ" },
    { value: "2", label: "ไม่สื่อสาร/ไม่ให้ข้อมูล" },
    { value: "3", label: "ขาดการตรวจสอบ/ทวนซ้ำ" },
    { value: "4", label: "ขาดการประสานงาน/ติดตาม" },
    { value: "5", label: "ขาดความรู้ ความชำนาญด้านวิชาชีพ" },
    { value: "6", label: "ขาดความชำนาญด้านภาษา" },
    { value: "7", label: "ขาดความเอาใจใส่ ดูแล" },
    { value: "8", label: "ละเมิดสิทธิ์ผู้ป่วย/ผิดจริยธรรม" },
    { value: "9", label: "ขาดการตรวจสอบข้อมูลก่อนให้บริการ" },
    { value: "10", label: "ไม่ปฏิบัติตามนโยบาย /SP/WI ที่กำหนดใว้" },
    { value: "11", label: "ไม่ปฏิบัตืตามมาตรฐานวิชาชีพ" },
    { value: "12", label: "ข้อมูลเพื่อการสื่อสาร ไม่ละเอียด ชัดเจน" },
    { value: "13", label: "ระบบงานไม่ชัดเจน" },
    { value: "14", label: "อัตรากำลังไม่สอดคล้องกับภาระงาน" },
    { value: "15", label: "เป็นระบบงานของ รพ./หน่วยงาน" },
    { value: "16", label: "เครื่องมือไม่พร้อมใช้งาน ขาดการตรวจสอบซ่อมบำรุง" },
    {
      value: "17",
      label: "ปัญหาจากโครงสร้างอาคาร/สถานที่ให้บริการ/สิ่งแวดล้อม",
    },
    { value: "18", label: "เป็นเหตุสุดวิสัย" },
    { value: "19", label: "การให้บริการล่าช้า" },
  ];

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
[
  {
    id: 1,
    employeeId: "470139",
    name: "นาย กอปรกร ปรัญญากุล"
  },
  {
    id: 2,
    employeeId: "470140",
    name: "นางสาว สมใจ ใจดี"
  },
  {
    id: 3,
    employeeId: "470141",
    name: "นาย ทดสอบ ระบบ"
  }
]
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
<div className="section-card complaint-result-section">

  {/* =========================
      SECTION HEADER
  ========================= */}
  <div className="section-header">
    <span className="section-number">01</span>

    <div className="section-header-content">
      <div className="section-title">
        ผลการพิจารณาข้อร้องเรียน
      </div>

      <div className="section-description">
        ระบุผลการพิจารณาและแนวทางการดำเนินการต่อข้อร้องเรียน
      </div>
    </div>
  </div>

  <div className="section-body complaint-result-body">

    <div className="complaint-result-label">
      เลือกผลการพิจารณา
    </div>

    {/* ==================================================
        01 ไม่เป็นจริง
    ================================================== */}
    <div
      className={`complaint-result-card ${
        ["0", "1", "2"].includes(data?.respond_Type)
          ? "selected"
          : ""
      }`}
    >
      <div className="complaint-result-card-header">

        <FormControlLabel
          value="group-1"
          control={
            <Radio
              checked={["0", "1", "2"].includes(data?.respond_Type)}
              onChange={() => {
                if (Mode !== "Show") {
                  setDataFunction(
                    { target: { value: "0" } },
                    "respond_Type"
                  );
                }
              }}
              disabled={Mode === "Show"}
            />
          }
          label=""
        />

        <div className="complaint-result-number">
          01
        </div>

        <div className="complaint-result-heading">
          <div className="complaint-result-title">
            ประเด็นร้องเรียนไม่เป็นจริง
          </div>

          <div className="complaint-result-description">
            ตามที่ผู้ใช้บริการร้องเรียน / เป็นเรื่องที่ผ่านมาแล้วในอดีต
          </div>
        </div>
      </div>

      <div className="complaint-result-content">

        <div className="complaint-sub-label">
          เหตุผล
        </div>

        <RadioGroup
          name="respond_Type"
          value={data?.respond_Type || ""}
          onChange={(e) =>
            setDataFunction(e, "respond_Type")
          }
        >

          <FormControlLabel
            value="0"
            disabled={Mode === "Show"}
            control={<Radio />}
            label="ประเด็นร้องเรียนไม่มีมูลความจริงตามที่ร้องเรียน"
          />

          <FormControlLabel
            value="1"
            disabled={Mode === "Show"}
            control={<Radio />}
            label="ความเข้าใจของผู้ใช้บริการผิดพลาด / คลาดเคลื่อน"
          />

          <FormControlLabel
            value="2"
            disabled={Mode === "Show"}
            control={<Radio />}
            label="ประเด็นร้องเรียนเป็นข้อร้องเรียนที่ผ่านมาแล้วในอดีต"
          />

        </RadioGroup>

      </div>
    </div>


    {/* ==================================================
        02 เป็นจริง + แก้ไขได้
    ================================================== */}
    <div
      className={`complaint-result-card ${
        ["3", "4", "5"].includes(data?.respond_Type)
          ? "selected"
          : ""
      }`}
    >

      <div className="complaint-result-card-header">

        <FormControlLabel
          value="group-2"
          control={
            <Radio
              checked={["3", "4", "5"].includes(data?.respond_Type)}
              onChange={() => {
                if (Mode !== "Show") {
                  setDataFunction(
                    { target: { value: "3" } },
                    "respond_Type"
                  );
                }
              }}
              disabled={Mode === "Show"}
            />
          }
          label=""
        />

        <div className="complaint-result-number">
          02
        </div>

        <div className="complaint-result-heading">
          <div className="complaint-result-title">
            ประเด็นร้องเรียนเป็นจริง
          </div>

          <div className="complaint-result-description">
            ตามที่ผู้ใช้บริการร้องเรียน แต่สามารถป้องกันได้ / แก้ไขได้
          </div>
        </div>

      </div>


      <div className="complaint-result-content">

        <div className="complaint-sub-label">
          แนวทางการดำเนินการ
        </div>


        {/* นโยบายโรงพยาบาล */}
        <div className="complaint-option-row">

          <FormControlLabel
            value="3"
            disabled={Mode === "Show"}
            control={<Radio />}
            label="ประเด็นร้องเรียนเป็นนโยบายของโรงพยาบาล"
            checked={data?.respond_Type === "3"}
            onChange={(e) =>
              setDataFunction(e, "respond_Type")
            }
          />

          <div className="complaint-option-note">
            ให้ศูนย์พัฒนาคุณภาพประสานงานทีมนำพัฒนาคุณภาพ
            เพื่อพิจารณาดำเนินการ
          </div>

        </div>


        {/* คณะกรรมการ */}
        <div className="complaint-option-row">

          <FormControlLabel
            value="4"
            disabled={Mode === "Show"}
            control={<Radio />}
            label="ประเด็นร้องเรียนที่ต้องดำเนินการโดยคณะกรรมการ"
            checked={data?.respond_Type === "4"}
            onChange={(e) =>
              setDataFunction(e, "respond_Type")
            }
          />

          <div className="complaint-inline-control">

            <Form.Select
              size="sm"
              disabled={
                Mode === "Show" ||
                data?.respond_Type !== "4"
              }
              value={data?.respond_Committee || ""}
              onChange={(e) =>
                setDataFunction(e, "respond_Committee")
              }
              className="custom-input"
            >
              <option value="">
                -- เลือกคณะกรรมการ --
              </option>

              {committeeOptions.map((committee, index) => (
                <option
                  key={index}
                  value={committee}
                >
                  {committee}
                </option>
              ))}
            </Form.Select>

          </div>

          <div className="complaint-option-note">
            ให้ศูนย์พัฒนาคุณภาพประสานงานคณะกรรมการที่เกี่ยวข้อง
            เพื่อดำเนินการแก้ไข
          </div>

        </div>


        {/* สาเหตุ */}
        <div className="complaint-option-row">

          <FormControlLabel
            value="5"
            disabled={Mode === "Show"}
            control={<Radio />}
            label="ประเด็นร้องเรียนเป็นจริงตามที่ผู้ใช้บริการร้องเรียน เนื่องจากสาเหตุ"
            checked={data?.respond_Type === "5"}
            onChange={(e) =>
              setDataFunction(e, "respond_Type")
            }
          />

        </div>


        {/* CAUSE */}
        <div
          className={`cause-panel ${
            data?.respond_Type === "5"
              ? "cause-panel-active"
              : ""
          }`}
        >

          <div className="cause-panel-header">
            <div>
              <div className="cause-panel-title">
                ระบุสาเหตุที่เกี่ยวข้อง
              </div>

              <div className="cause-panel-description">
                สามารถเลือกได้มากกว่า 1 รายการ
              </div>
            </div>
          </div>


          {/* พฤติกรรมการให้บริการ */}
          <div className="cause-special">

            <FormControlLabel
              control={
                <Checkbox
                  name="0"
                  checked={respond_Cause.includes("0")}
                  disabled={
                    Mode === "Show" ||
                    data?.respond_Type !== "5"
                  }
                  onChange={(e) =>
                    setCheckBoxFunction(
                      e,
                      "respond_Cause"
                    )
                  }
                />
              }
              label="พฤติกรรมการให้บริการไม่เหมาะสม"
            />


            {respond_Cause.includes("0") && (

              <div className="cause-detail-box">

                <Row className="g-3 align-items-center">

                  <Col md={3}>
                    <div className="cause-field-label">
                      ชื่อ - สกุลเจ้าหน้าที่
                    </div>
                  </Col>

                  <Col md={9}>

                    <EmployeeAutocomplete
                      Mode={Mode}
                      data={data}
                      userData={userData}
                      setDataFunction={setDataFunction}
                    />

                  </Col>

                </Row>


                <div className="cause-info">
                  เพื่อความสะดวกในการตรวจสอบข้อมูลย้อนหลัง
                  ขอให้ระบุชื่อ-นามสกุล และรหัสประจำตัวของเจ้าหน้าที่
                  ที่ถูกร้องเรียนให้ชัดเจน
                </div>


                {/* การดำเนินการ */}
                <Row className="mt-4">

                  <Col md={3}>
                    <div className="cause-field-label">
                      การดำเนินการ
                    </div>
                  </Col>

                  <Col md={9}>

                    <RadioGroup
                      row
                      value={
                        data?.respond_Operation || ""
                      }
                      onChange={(e) =>
                        setDataFunction(
                          e,
                          "respond_Operation"
                        )
                      }
                    >

                      <FormControlLabel
                        value="0"
                        disabled={Mode === "Show"}
                        control={<Radio />}
                        label="ตักเตือนด้วยวาจา ครั้งที่ 1"
                      />

                      <FormControlLabel
                        value="1"
                        disabled={Mode === "Show"}
                        control={<Radio />}
                        label="ตักเตือนด้วยวาจา ครั้งที่ 2"
                      />

                      <FormControlLabel
                        value="2"
                        disabled={Mode === "Show"}
                        control={<Radio />}
                        label="ตักเตือนด้วยวาจา ครั้งที่ 3"
                      />

                      <FormControlLabel
                        value="3"
                        disabled={Mode === "Show"}
                        control={<Radio />}
                        label="ตักเตือนเป็นลายลักษณ์อักษร ครั้งที่ 1"
                      />

                      <FormControlLabel
                        value="4"
                        disabled={Mode === "Show"}
                        control={<Radio />}
                        label="ตักเตือนเป็นลายลักษณ์อักษร ครั้งที่ 2"
                      />

                    </RadioGroup>

                  </Col>

                </Row>


                {/* รับทราบ */}
                <Row className="mt-4">

                  <Col md={3}>
                    <div className="cause-field-label">
                      บันทึกการรับทราบการตักเตือน
                    </div>
                  </Col>

                  <Col md={9}>

                    <RadioGroup
                      row
                      value={data?.respond_Warn || ""}
                      onChange={(e) =>
                        setDataFunction(
                          e,
                          "respond_Warn"
                        )
                      }
                    >

                      <FormControlLabel
                        value="0"
                        disabled={Mode === "Show"}
                        control={<Radio />}
                        label="ไม่ยอมรับการตักเตือน"
                      />

                      <div>

                        <FormControlLabel
                          value="1"
                          disabled={Mode === "Show"}
                          control={<Radio />}
                          label="ยอมรับการตักเตือน"
                        />

                        <InputGroup>
                          <InputGroup.Text>
                            <i className="bi bi-person-circle"></i>
                          </InputGroup.Text>

                          <Form.Control
                            className="custom-input"
                            disabled={
                              Mode === "Show" ||
                              data?.respond_Warn !== "1"
                            }
                            placeholder="ลงนามผู้ถูกตักเตือน"
                            value={
                              data?.cautioned || ""
                            }
                            onChange={(e) =>
                              setDataFunction(
                                e,
                                "cautioned"
                              )
                            }
                            style={{
                              height: 40,
                              maxWidth: "300px",
                            }}
                          />

                        </InputGroup>

                      </div>

                    </RadioGroup>

                  </Col>

                </Row>

              </div>

            )}

          </div>


          {/* Cause list */}
          <div className="cause-grid">

            {causeList.map((item) => (

              <FormControlLabel
                key={item.value}
                control={
                  <Checkbox
                    name={item.value}
                    checked={respond_Cause.includes(
                      item.value
                    )}
                    disabled={
                      Mode === "Show" ||
                      data?.respond_Type !== "5"
                    }
                    onChange={(e) =>
                      setCheckBoxFunction(
                        e,
                        "respond_Cause"
                      )
                    }
                  />
                }
                label={item.label}
              />

            ))}


            {/* อื่น ๆ */}
            <div className="cause-other">

              <FormControlLabel
                control={
                  <Checkbox
                    name="20"
                    checked={respond_Cause.includes("20")}
                    disabled={
                      Mode === "Show" ||
                      data?.respond_Type !== "5"
                    }
                    onChange={(e) =>
                      setCheckBoxFunction(
                        e,
                        "respond_Cause"
                      )
                    }
                  />
                }
                label="อื่น ๆ"
              />

              <Form.Control
                disabled={
                  Mode === "Show" ||
                  !respond_Cause.includes("20")
                }
                className="custom-input"
                value={
                  data?.respond_CauseOther || ""
                }
                onChange={(e) =>
                  setDataFunction(
                    e,
                    "respond_CauseOther"
                  )
                }
                placeholder="ระบุสาเหตุ"
                style={{
                  height: 40,
                  maxWidth: 280,
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </div>


    {/* ==================================================
        03 เป็นจริง + แก้ไขไม่ได้ระยะสั้น
    ================================================== */}
    <div
      className={`complaint-result-card ${
        ["6", "7", "8", "9"].includes(data?.respond_Type)
          ? "selected"
          : ""
      }`}
    >

      <div className="complaint-result-card-header">

        <FormControlLabel
          value="group-3"
          control={
            <Radio
              checked={["6", "7", "8", "9"].includes(
                data?.respond_Type
              )}
              onChange={() => {
                if (Mode !== "Show") {
                  setDataFunction(
                    { target: { value: "6" } },
                    "respond_Type"
                  );
                }
              }}
              disabled={Mode === "Show"}
            />
          }
          label=""
        />

        <div className="complaint-result-number">
          03
        </div>

        <div className="complaint-result-heading">

          <div className="complaint-result-title">
            ประเด็นร้องเรียนเป็นจริง
          </div>

          <div className="complaint-result-description">
            ตามที่ผู้ใช้บริการร้องเรียน แต่ไม่สามารถป้องกัน /
            แก้ไขได้ในระยะสั้น
          </div>

        </div>

      </div>


      <div className="complaint-result-content">

        <div className="complaint-sub-label">
          เหตุผล
        </div>

        <RadioGroup
          name="respond_Type"
          value={data?.respond_Type || ""}
          onChange={(e) =>
            setDataFunction(e, "respond_Type")
          }
        >

          <FormControlLabel
            value="6"
            disabled={Mode === "Show"}
            control={<Radio />}
            label="ประเด็นข้อร้องเรียนเกินความสามารถของโรงพยาบาลที่จะดำเนินการให้ได้"
          />

          <FormControlLabel
            value="7"
            disabled={Mode === "Show"}
            control={<Radio />}
            label="เหตุสุดวิสัย เช่น เกิดการระบาดของโรค มีจำนวนผู้ใช้บริการมากกว่าปกติ หรือแพทย์ลาฉุกเฉิน"
          />

          <FormControlLabel
            value="8"
            disabled={Mode === "Show"}
            control={<Radio />}
            label="เป็นไปตามขั้นตอนการให้บริการ (On process)"
          />

          <FormControlLabel
            value="9"
            disabled={Mode === "Show"}
            control={<Radio />}
            label={
              <div className="complaint-other-inline">

                <span>
                  อื่น ๆ
                </span>

                <Form.Control
                  disabled={
                    Mode === "Show" ||
                    data?.respond_Type !== "9"
                  }
                  value={
                    data?.respond_ComplaintOther || ""
                  }
                  onChange={(e) =>
                    setDataFunction(
                      e,
                      "respond_ComplaintOther"
                    )
                  }
                  placeholder="ระบุรายละเอียด"
                  className="custom-input"
                  style={{
                    height: 40,
                    width: 320,
                  }}
                />

              </div>
            }
          />

        </RadioGroup>

      </div>

    </div>

  </div>
</div>

   <div className="section-card section-card-important">

  <div className="section-header section-header-important">

    <div className="section-number section-number-important">
      <span>★</span>
    </div>

    <div className="section-header-content">
      <div className="section-title section-title-important">
        บันทึกข้อความ / ข้อเสนอแนะของหัวหน้าแผนก/ผู้จัดการฝ่าย เพิ่มเติม
      </div>

      <div className="section-description">
        สรุปความคิดเห็น ข้อเสนอแนะ หรือแนวทางดำเนินการเพิ่มเติมจากหัวหน้า
      </div>
    </div>

    <div className="section-important-badge">
      สำคัญ
    </div>

  </div>

  <div className="section-body">

    <Container>

      <div
        className={
          missingKeys.some((item) => item.key === "decision")
            ? "AreaBOX SETERRORBOX"
            : "AreaBOX"
        }
        style={{
          padding: "18px 20px",
          borderRadius: "10px",
          background: "#fffbf5",
          border: errors.summary_Suggestions
            ? "1px solid #dc3545"
            : "1px solid #f3e5c8",
        }}
      >

        <div
          style={{
            fontFamily: "Mali, sans-serif",
            fontSize: "12px",
            fontWeight: 700,
            color: "#92400e",
            marginBottom: "8px",
          }}
        >
          ข้อเสนอแนะ / ความเห็นเพิ่มเติม
        </div>

        <TextField
          fullWidth
          id="summary_Suggestions"
          ref={(el) => (inputRefs.current.summary_Suggestions = el)}
          disabled={Mode === "Show"}
          placeholder="เขียนรายละเอียดข้อเสนอแนะหรือความคิดเห็นเพิ่มเติม..."
          value={data?.summary_Suggestions || ""}
          onChange={(e) => {
            setErrors((prev) => ({
              ...prev,
              summary_Suggestions: false,
            }));

            setDataFunction(e, "summary_Suggestions");
          }}
          variant="standard"
          multiline
          rows={5}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            "& .MuiInputBase-root": {
              fontFamily: "Mali, sans-serif",
              fontSize: "14px",
              lineHeight: 1.7,
              padding: 0,
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#a8a29e",
              opacity: 1,
            },
          }}
        />

      </div>

      {errors.summary_Suggestions && (
        <Form.Control.Feedback
          type="invalid"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: "6px",
          }}
        >
          <ErrorOutlineIcon fontSize="small" />
          กรุณาเขียนรายละเอียด
        </Form.Control.Feedback>
      )}

    </Container>

  </div>

</div>
    </>
  );
};

export default GeneralInfo;
