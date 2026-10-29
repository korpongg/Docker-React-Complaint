
import React from "react";
import {
  ClipboardCheck,
  FileText,
  Lightbulb,
  CheckCircle2,
  Users,
  UserRound,
  Hash,
 
  
  ChevronRight,
} from "lucide-react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const GeneralInfoView = ({ data, show, handleShow }) => {
  const respondType = String(data?.respond_Type ?? "");

  const getRespondTypeText = () => {
    const type = Number(respondType);

    if ([0, 1, 2].includes(type)) {
      return "ประเด็นร้องเรียนไม่เป็นจริงตามที่ผู้ใช้บริการร้องเรียน หรือเป็นเรื่องที่ผ่านมาแล้วในอดีต";
    }

    if ([3, 4, 5].includes(type)) {
      return "ประเด็นร้องเรียนเป็นจริง แต่สามารถป้องกันหรือแก้ไขได้";
    }

    if ([6, 7, 8, 9].includes(type)) {
      return "ประเด็นร้องเรียนเป็นจริง แต่ไม่สามารถป้องกันหรือแก้ไขได้ในระยะสั้น";
    }

    return "-";
  };

  const getText = () => {
    const texts = {
      "0": "ประเด็นร้องเรียนไม่มีมูลความจริงตามที่ร้องเรียน",
      "1": "ความเข้าใจของผู้ใช้บริการผิดพลาด / คลาดเคลื่อน",
      "2": "ประเด็นร้องเรียนเป็นเรื่องที่ผ่านมาแล้วในอดีต (เกิน 1 เดือนขึ้นไป)",
      "3": "เป็นนโยบายของโรงพยาบาล ให้ศูนย์พัฒนาคุณภาพประสานงานทีมนำพัฒนาคุณภาพเพื่อพิจารณาดำเนินการ",
      "4": "ประเด็นร้องเรียนที่คณะกรรมการพิจารณา",
      "5": "ประเด็นร้องเรียนเป็นจริงตามที่ผู้ใช้บริการร้องเรียน เนื่องจากสาเหตุที่เกี่ยวข้อง",
      "6": "ประเด็นข้อร้องเรียนเกินความสามารถของโรงพยาบาลที่จะดำเนินการให้ได้",
      "7": "เหตุสุดวิสัย เช่น การระบาดของโรค จำนวนผู้ใช้บริการมากกว่าปกติ หรือแพทย์ลาฉุกเฉินโดยไม่สามารถหาแพทย์ทดแทนได้ทัน",
      "8": "เป็นไปตามขั้นตอนการให้บริการ (On process)",
      "9": "อื่น ๆ",
    };

    return texts[respondType] || "-";
  };

  const causeList = {
    1: "การสื่อสาร / ให้ข้อมูลไม่ชัดเจน ไม่เพียงพอ",
    2: "ไม่สื่อสาร / ไม่ให้ข้อมูล",
    3: "ขาดการตรวจสอบ / ทวนซ้ำ",
    4: "ขาดการประสานงาน / ติดตาม",
    5: "ขาดความรู้ ความชำนาญด้านวิชาชีพ",
    6: "ขาดความชำนาญด้านภาษา",
    7: "ขาดความเอาใจใส่ ดูแล",
    8: "ละเมิดสิทธิ์ผู้ป่วย",
    9: "ขาดการตรวจสอบข้อมูลก่อนให้บริการ",
    10: "ไม่ปฏิบัติตามนโยบาย / SP / WI",
    11: "ไม่ปฏิบัติตามมาตรฐานวิชาชีพ",
    12: "ข้อมูลเพื่อการสื่อสารไม่ละเอียด ชัดเจน",
    13: "ระบบงานไม่ชัดเจน",
    14: "อัตรากำลังไม่สอดคล้องกับภาระงาน",
    15: "เป็นระบบงานของโรงพยาบาล / หน่วยงาน",
    16: "เครื่องมือไม่พร้อมใช้งาน ขาดการตรวจสอบซ่อมบำรุง",
    17: "ปัญหาจากโครงสร้างอาคาร / สถานที่ / สิ่งแวดล้อม",
    18: "เป็นเหตุสุดวิสัย",
    19: "การให้บริการล่าช้า",
    20: "อื่น ๆ",
  };

  const causes = (() => {
    try {
      const parsed = JSON.parse(data?.respond_Cause || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  if (!show) return null;

  return (
    <div className="general-info-page">
      <div className="gi-content">

        {/* SECTION 01: ANALYSIS */}
        <section className="gi-section">
          <div className="gi-section-header">
       
            <div className="gi-section-heading">
              <h3>ผลการวิเคราะห์ข้อร้องเรียน</h3>
              <p>ผลการพิจารณาและรายละเอียดประกอบการวิเคราะห์</p>
            </div>

            <span className="gi-section-index">01</span>
          </div>

          <div className="gi-analysis-card">

            {/* Main result */}
            <div className="gi-result-card">
              <div className="gi-result-icon">
                <CheckCircle2 size={22} />
              </div>

              <div className="gi-result-body">
                <div className="gi-field-label">ผลการพิจารณา</div>
                <div className="gi-result-title">
                  {getRespondTypeText()}
                </div>
              </div>

              <span className="gi-result-badge">ผลการพิจารณา</span>
            </div>

            {/* Reason */}
            <div className="gi-detail-card">
              <div className="gi-detail-icon">
                <ModeEditIcon size={19} />
              </div>

              <div className="gi-detail-body">
                <div className="gi-field-label2">เหตุผล / รายละเอียด</div>
                <div className="gi-detail-text">{getText()}</div>
              </div>
            </div>

            {/* Type 4: Committee */}
            {respondType === "4" && (
              <div className="gi-extra-card">
                <div className="gi-extra-heading">
                  <Users size={18} />
                  <span>คณะกรรมการที่เกี่ยวข้อง</span>
                </div>

                <div className="gi-extra-value">
                  {data?.respond_Committee || "-"}
                </div>
              </div>
            )}

            {/* Type 5: Causes and staff */}
            {respondType === "5" && (
              <div className="gi-extra-card">
                <div className="gi-extra-heading">
                  <ClipboardCheck size={18} />
                  <span>สาเหตุที่เกี่ยวข้อง</span>
                </div>

                <div className="gi-cause-tags">
                  {causes.length > 0 ? (
                    causes.map((cause) => {
                      const key = String(cause);

                      return (
                        <span className="gi-cause-tag" key={key}>
                          {key === "20"
                            ? `อื่น ๆ: ${data?.respond_CauseOther || "-"}`
                            : causeList[key] || "-"}
                        </span>
                      );
                    })
                  ) : (
                    <span className="gi-info-empty">ไม่มีข้อมูลสาเหตุ</span>
                  )}
                </div>

                {(data?.respond_NameSurname || data?.respond_Id) && (
                  <div className="gi-person-card">
                    <div className="gi-person-heading">
                      <UserRound size={17} />
                      ผู้เกี่ยวข้อง
                    </div>

                    <div className="gi-person-grid">
                      <div className="gi-person-field">
                        <span className="gi-field-label">เจ้าหน้าที่</span>
                        <span className="gi-person-value">
                          {data?.respond_NameSurname || "-"}
                        </span>
                      </div>

                      <div className="gi-person-field">
                        <span className="gi-field-label">รหัสเจ้าหน้าที่</span>
                        <span className="gi-person-value">
                          <Hash size={14} />
                          {data?.respond_Id || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 02: SUGGESTIONS */}
        <section className="gi-section gi-suggestion-section">
          <div className="gi-section-header">
       

            <div className="gi-section-heading">
              <h3>ข้อเสนอแนะเพิ่มเติม</h3>
              <p>ข้อเสนอแนะหรือประเด็นเพิ่มเติมจากผลการดำเนินการ</p>
            </div>

            <span className="gi-section-index">02</span>
          </div>

          <div className="gi-analysis-card gi-analysis-card-main">
         


               <div className="gi-analysis-card-header">

                  <div className="gi-analysis-number">
                    02
                  </div>

                  <div>

                    <div className="gi-analysis-kicker">
                      ADDITIONAL SUGGESTIONS
                    </div>

                    <h3 className="gi-analysis-title">
                      ข้อเสนอแนะเพิ่มเติม
                    </h3>

                  </div>

                </div>

            <div className="gi-analysis-body">
              {data?.summary_Suggestions?.trim() || "-"}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default GeneralInfoView;
