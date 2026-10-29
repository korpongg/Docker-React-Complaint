
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BadgeAlert } from "lucide-react";
import { formatThaiDate } from "./dateUtils";
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
  const [tosentvalue, settosentvalue] = useState("select");

  /*
   * ป้องกัน checkbox.manager / checkbox.quality / ...
   * เป็น undefined หรือ null
   *
   * ทุกตัวจะได้ค่าเป็น [] แทน
   */
  const safeCheckbox = checkbox || {};

  const manager = Array.isArray(safeCheckbox.manager)
    ? safeCheckbox.manager
    : [];

  const doctor = Array.isArray(safeCheckbox.doctor)
    ? safeCheckbox.doctor
    : [];

  const compensation = Array.isArray(safeCheckbox.compensation)
    ? safeCheckbox.compensation
    : [];

  const operation = Array.isArray(safeCheckbox.operation)
    ? safeCheckbox.operation
    : [];

  const administer = Array.isArray(safeCheckbox.administer)
    ? safeCheckbox.administer
    : [];

  const nurse = Array.isArray(safeCheckbox.nurse)
    ? safeCheckbox.nurse
    : [];

  const director = Array.isArray(safeCheckbox.director)
    ? safeCheckbox.director
    : [];

  const quality = Array.isArray(safeCheckbox.quality)
    ? safeCheckbox.quality
    : [];

  useEffect(() => {
    if (data?.pct) {
      if (options.includes(data.pct)) {
        settosentvalue("select");
        setValue(data.pct);
      } else {
        settosentvalue("textinput");
        setInputValue(data.pct);
      }
    }
  }, [data?.pct]);

 const InfoRow = ({ label, value }) => {
  const isDept = Array.isArray(value);

  return (
    <div className="gi-info-row">
      <div className="gi-info-label">
        {label}
      </div>

      <div className="gi-info-value">
        {isDept ? (
          <div className="dept-list">
            {value.length ? (
              value.map((d, i) => (
                <span
                  className="dept-aff"
                  key={d?.DepID ?? d?.DepName ?? i}
                >
                  {d?.DepName || "-"}
                </span>
              ))
            ) : (
              "-"
            )}
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

  /*
   * =========================
   * Workflow Mapping
   * =========================
   */

  const mapManager = () => {
    const arr = [];

    if (manager.includes("a")) {
      arr.push("เพื่อรับทราบ");
    }

    if (manager.includes("b")) {
      arr.push("ตอบกลับ + ส่งคืนศูนย์คุณภาพ");
    }

    return arr;
  };

  const mapQuality = () => {
    const arr = [];

    if (quality.includes("a")) {
      arr.push("แพทย์");
    }

    if (quality.includes("b")) {
      arr.push("ผอ.คุณภาพ + ส่งคืนศูนย์");
    }

    return arr;
  };

  const mapNurse = () => {
    const arr = [];

    if (nurse.includes("a")) {
      arr.push("รองผอ.แพทย์");
    }

    if (nurse.includes("b")) {
      arr.push("งานพยาบาล");
    }

    if (nurse.includes("c")) {
      arr.push("ผช.ผอ.แพทย์ (พยาบาล)");
    }

    return arr;
  };

  const mapAdmin = () => {
    const arr = [];

    if (administer.includes("a")) {
      arr.push("ผอ.บริหาร");
    }

    if (administer.includes("b")) {
      arr.push("ผช.ผอ.บริหาร (สนับสนุน)");
    }

    if (administer.includes("c")) {
      arr.push("ผช.ผอ.บัญชี/การเงิน");
    }

    if (administer.includes("d")) {
      arr.push("ผช.ผอ.พัฒนาธุรกิจ");
    }

    if (administer.includes("e")) {
      arr.push("ผช.ผอ.วิศวกรรม");
    }

    return arr;
  };

  const mapOperation = () => {
    const arr = [];

    if (operation.includes("a")) {
      arr.push("ผอ.ปฏิบัติการ");
    }

    if (operation.includes("b")) {
      arr.push("สายสนับสนุนบริการ");
    }

    if (operation.includes("c")) {
      arr.push("สายราชการ");
    }

    if (operation.includes("d")) {
      arr.push("สายเทคนิคการแพทย์");
    }

    return arr;
  };

  const mapDoctor = () => {
    const arr = [];

    if (doctor.includes("a")) {
      arr.push("ประธานองค์กรแพทย์");
    }

    if (doctor.includes("b")) {
      arr.push("ประธานจริยธรรมแพทย์");
    }

    return arr;
  };

return (
  <>
    {show && (
      <div className="general-info-page">

        <div className="gi-content">

          {/* =====================================================
              01 — ข้อมูลทั่วไป
          ===================================================== */}
          <section className="gi-section">

            <div className="gi-section-header">
              <div>
                <h2 className="gi-section-heading">
                  ข้อมูลทั่วไป
                </h2>

                <div className="gi-section-caption">
                  ข้อมูลหน่วยงาน คณะกรรมการ และกำหนดการดำเนินการ
                </div>
              </div>
            </div>

            <div className="gi-general-panel">

              <div className="gi-general-group">

                <div className="gi-group-title">
                  ข้อมูลการดำเนินการ
                </div>

                <div className="gi-info-list">

                  <InfoRow
                    label="หน่วยงาน"
                    value={data?.deptAffInfo || []}
                  />

                  <InfoRow
                    label="คณะกรรมการ"
                    value={data?.board}
                  />
<InfoRow
  label="กำหนดตอบกลับ"
  value={
    data?.problem === "0"
      ? "ด่วนที่สุด"
      : data?.problem === "1"
      ? (
          <>
            ภายในวันที่{" "}
            <span className="thai-date">
              {formatThaiDate(data?.date)}
            </span>
          </>
        )
      : "-"
  }
/>

                  <InfoRow
                    label="แจ้งหน่วยงาน"
                    value={data?.deptAffInfo2}
                  />

                </div>

              </div>

            </div>

          </section>


          {/* =====================================================
              02 — WORKFLOW
          ===================================================== */}
          <section className="gi-section">

            <div className="gi-section-header">

              <div>
                <h2 className="gi-section-heading">
                  Workflow การส่งต่อ
                </h2>

                <div className="gi-section-caption">
                  หน่วยงานและบุคลากรที่เกี่ยวข้องกับการดำเนินการ
                </div>
              </div>

            </div>


            <div className="gi-general-panel">

              <div className="gi-general-group">

                <TagGroup
                  title="ผู้บริหาร"
                  items={mapManager()}
                />

                <TagGroup
                  title="แพทย์/คุณภาพ"
                  items={mapQuality()}
                />

                <TagGroup
                  title="พยาบาล"
                  items={mapNurse()}
                />

                <TagGroup
                  title="ฝ่ายบริหาร"
                  items={mapAdmin()}
                />

                <TagGroup
                  title="ฝ่ายปฏิบัติการ"
                  items={mapOperation()}
                />

                <TagGroup
                  title="องค์กรแพทย์"
                  items={mapDoctor()}
                />

              </div>

            </div>

          </section>


          {/* =====================================================
              ⭐ 03 — การดำเนินการข้อร้องเรียน
          ===================================================== */}
          <section className="gi-section">

            <div className="gi-focus">

              {/* =================================================
                  MAIN HEADER
              ================================================= */}
              <div className="gi-focus-header">

                <div className="gi-focus-title-wrap">

                  <div className="gi-focus-kicker">
                    COMPLAINT ACTION
                  </div>

                  <h2 className="gi-focus-title">
                    การดำเนินการข้อร้องเรียน
                  </h2>

                  <div className="gi-focus-description">
                    ผลการสืบความและแนวทางการดำเนินการต่อข้อร้องเรียน
                  </div>

                </div>

              </div>


              {/* =================================================
                  01 — INVESTIGATION
              ================================================= */}
              <div className="gi-focus-section">

                <div className="gi-focus-section-title">

                  <div className="gi-focus-section-title-text">
                    <span className="gi-person-icon">
                      01
                    </span>

                    บันทึกการสืบความของผู้รับข้อร้องเรียน
                    <span className="required-badge">สำคัญ</span>
                  </div>

                </div>


                <div className="gi-summary">
                  {data?.managementremark || "-"}
                </div>

              </div>


          
{/* =================================================
    02 — REQUIRED ACTION
================================================= */}
<div className="gi-focus-section">
  <div className="gi-focus-section-title">
    <div className="gi-focus-section-title-text">
    <span className="gi-person-icon">
                      02
                    </span>
      สิ่งที่ต้องการให้ผู้ถูกร้องเรียนดำเนินการ
        <span className="required-badge">สำคัญ</span>
    </div>
  </div>

  <div className="gi-info-list">
    <div className="gi-info-row">
      <div className="gi-info-label">ความต้องการ</div>

      <div className="gi-info-value">
        {(() => {
          const complainantMap = {
            0: "ขอให้ตอบกลับผู้ร้องเรียน",
            1: "ผู้ร้องเรียนไม่ต้องการการตอบกลับ",
            2: "ผู้ร้องเรียนไม่ประสงค์ให้ชื่อ สกุล",
            3: "ขอให้ติดต่อกลับเพื่อชี้แจงข้อมูลเพิ่มเติม",
            4: "ขอให้หน่วยงานตรวจสอบรายละเอียดที่เกิดขึ้น",
          };

          const complainantValues = String(data?.complainant ?? "")
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "");

          const labels = complainantValues
            .map((value) => complainantMap[value])
            .filter(Boolean);

          return labels.length > 0 ? (
        <div>
  {labels.map((label, index) => (
    <div
      key={`${label}-${index}`}
      style={{
     display: "block",
  width: "fit-content",
  padding: "7px 12px",
  marginBottom: index !== labels.length - 1 ? "8px" : "0",
  borderRadius: "8px",
  border: "1px solid rgba(35, 158, 121, 0.45)",
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: 1.5,
  color: "#086348ff",
  boxSizing: "border-box",
      }}
    >
      {label}
    </div>
  ))}
</div>
          ) : (
            "-"
          );
        })()}
      </div>
    </div>

    {String(data?.complainant ?? "")
      .split(",")
      .map((value) => value.trim())
      .includes("0") && (
      <div className="gi-info-row">
        <div className="gi-info-label">กำหนดตอบกลับ</div>

        <div className="gi-info-value">
          {data?.responseDueDate ? (
            <>
              ภายในวันที่{" "}
              <span className="thai-date">
                {formatThaiDate(
                  String(data.responseDueDate).slice(0, 10)
                )}
              </span>
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
    )}

    <div className="gi-info-row">
      <div className="gi-info-label">บันทึกข้อความ</div>

      <div className="gi-info-value">
        {data?.respond_text?.trim() ? (
          <div className="gi-respond-text">
            {data.respond_text}
          </div>
        ) : (
          "-"
        )}
      </div>
    </div>
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