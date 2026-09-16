import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BadgeAlert } from "lucide-react";
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
  show,
  handleShow,
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
                    <span className="dept-aff">{d.DepName}</span>
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
  const TagGroup = ({ title, items }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="tag-group">
        <div className="tag-title">{title}</div>
        <div className="tag-list">
          {items.map((item, i) => (
            <span key={i} className="tag">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const mapManager = () => {
    const arr = [];
    if (checkbox.manager.includes("a")) arr.push("เพื่อรับทราบ");
    if (checkbox.manager.includes("b")) arr.push("ตอบกลับ + ส่งคืนศูนย์คุณภาพ");
    return arr;
  };

  const mapQuality = () => {
    const arr = [];
    if (checkbox.quality.includes("a")) arr.push("แพทย์");
    if (checkbox.quality.includes("b")) arr.push("ผอ.คุณภาพ + ส่งคืนศูนย์");
    return arr;
  };

  const mapNurse = () => {
    const arr = [];
    if (checkbox.nurse.includes("a")) arr.push("รองผอ.แพทย์");
    if (checkbox.nurse.includes("b")) arr.push("งานพยาบาล");
    if (checkbox.nurse.includes("c")) arr.push("ผช.ผอ.แพทย์ (พยาบาล)");
    return arr;
  };

  const mapAdmin = () => {
    const arr = [];
    if (checkbox.administer.includes("a")) arr.push("ผอ.บริหาร");
    if (checkbox.administer.includes("b")) arr.push("ผช.ผอ.บริหาร (สนับสนุน)");
    if (checkbox.administer.includes("c")) arr.push("ผช.ผอ.บัญชี/การเงิน");
    if (checkbox.administer.includes("d")) arr.push("ผช.ผอ.พัฒนาธุรกิจ");
    if (checkbox.administer.includes("e")) arr.push("ผช.ผอ.วิศวกรรม");
    return arr;
  };

  const mapOperation = () => {
    const arr = [];
    if (checkbox.operation.includes("a")) arr.push("ผอ.ปฏิบัติการ");
    if (checkbox.operation.includes("b")) arr.push("สายสนับสนุนบริการ");
    if (checkbox.operation.includes("c")) arr.push("สายราชการ");
    if (checkbox.operation.includes("d")) arr.push("สายเทคนิคการแพทย์");
    return arr;
  };

  const mapDoctor = () => {
    const arr = [];
    if (checkbox.doctor.includes("a")) arr.push("ประธานองค์กรแพทย์");
    if (checkbox.doctor.includes("b")) arr.push("ประธานจริยธรรมแพทย์");
    return arr;
  };

  return (
    <>
      <div className="page-bg">
        <div className="card-section">
          <div className="view-page">
            <div
              className="view-header"
              style={{
                background: "#F1F5F9",
                border: "1px solid #334155",
                borderLeft: "5px solid #334155",
              }}
            >
              <div
                className="view-title-main"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                <BadgeAlert size={22} color="#334155" />
                ดูบันทึกของเจ้าหน้าที่บริหารความเสี่ยง
              </div>

              <Button
                size="sm"
                variant="outline-secondary"
                onClick={handleShow}
              >
                {show ? "ซ่อน" : "แสดง"}
              </Button>
            </div>
          </div>

          {show && (
            <div className="cv-container">
              <div className="cv-stack">
                {/* ข้อมูลทั่วไป */}
                <div className="section">
                  <div className="section-title">ข้อมูลทั่วไป</div>

                  <InfoRow label="หน่วยงาน" value={data?.deptAffInfo || []} />

                  <InfoRow label="คณะกรรมการ" value={data?.board} />

                  <InfoRow
                    label="กำหนดตอบกลับ"
                    value={
                      data?.problem === "0"
                        ? "ด่วนที่สุด"
                        : data?.problem === "1"
                          ? `ภายในวันที่ ${data?.date}`
                          : "-"
                    }
                  />

                  <InfoRow label="แจ้งหน่วยงาน" value={data?.deptAffInfo2} />
                </div>

                {/* ความต้องการผู้ร้องเรียน */}
                <div className="section">
                  <div className="section-title">ความต้องการผู้ร้องเรียน</div>

                  <InfoRow
                    label="สถานะ"
                    value={
                      {
                        0: "ต้องการให้ตอบกลับ",
                        1: "ไม่ต้องการตอบกลับ",
                        2: "ไม่เปิดเผยชื่อ",
                        3: "ขอให้ติดต่อกลับ",
                        4: "ให้ตรวจสอบข้อเท็จจริง",
                      }[data?.complainant]
                    }
                  />
                </div>

                {/* Workflow */}
                <div className="section">
                  <div className="section-title">Workflow การส่งต่อ</div>

                  <TagGroup title="ผู้บริหาร" items={mapManager()} />
                  <TagGroup title="แพทย์/คุณภาพ" items={mapQuality()} />
                  <TagGroup title="พยาบาล" items={mapNurse()} />
                  <TagGroup title="ฝ่ายบริหาร" items={mapAdmin()} />
                  <TagGroup title="ฝ่ายปฏิบัติการ" items={mapOperation()} />
                  <TagGroup title="องค์กรแพทย์" items={mapDoctor()} />
                </div>
                {/* บันทึกการสืบความ */}
<div className="section">
  <div className="section-title">
    บันทึกการสืบความของผู้รับข้อร้องเรียน
  </div>

  <InfoRow
    label="รายละเอียด"
    value={data?.managementremark}
  />
</div>

{/* สิ่งที่ต้องการให้ผู้ถูกร้องเรียนดำเนินการ */}
<div className="section">
  <div className="section-title">
    สิ่งที่ต้องการให้ผู้ถูกร้องเรียนดำเนินการ
  </div>

  <InfoRow
    label="ความต้องการ"
    value={
      {
        0: "ขอให้ตอบกลับผู้ร้องเรียน",
        1: "ผู้ร้องเรียนไม่ต้องการการตอบกลับ",
        2: "ผู้ร้องเรียนไม่ประสงค์ให้ชื่อ สกุล",
        3: "ขอให้ติดต่อกลับเพื่อชี้แจงข้อมูลเพิ่มเติม",
        4: "ขอให้หน่วยงานตรวจสอบรายละเอียดที่เกิดขึ้น",
      }[data?.complainant]
    }
  />

  {data?.complainant === "0" && (
    <InfoRow
      label="กำหนดตอบกลับ"
      value={
        data?.responseDueDate
          ? `ภายในวันที่ ${data.responseDueDate}`
          : "-"
      }
    />
  )}
</div>
              </div>
              
            </div>
            
          )}

          
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
