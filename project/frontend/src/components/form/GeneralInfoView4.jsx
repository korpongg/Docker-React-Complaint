import React from "react";
import GreenCircle from "./GreenCircle";
import { ChartColumn } from "lucide-react";
import Button from "react-bootstrap/Button";

const GeneralInfoView = ({ data, show, handleShow }) => {
  const getRespondTypeText = () => {
    const type = Number(data?.respond_Type);

    if ([0, 1, 2].includes(type)) {
      return "ประเด็นร้องเรียน ไม่เป็นจริง ตามที่ผู้ใช้บริการร้องเรียน / เป็นเรื่องที่ผ่านมาแล้วในอดีต";
    }

    if ([3, 4, 5].includes(type)) {
      return "ประเด็นร้องเรียนเป็นจริงตามที่ผู้ใช้บริการร้องเรียนแต่สามารถป้องกันได้/แก้ไข";
    }

    if ([6, 7, 8, 9].includes(type)) {
      return "ประเด็นร้องเรียน เป็นจริง ตามที่ผู้ใช้บริการร้องเรียน แต่ไม่สามารถป้องกัน/แก้ไขได้ในระยะสั้น";
    }

    return "-";
  };

  const getText = () => {
    switch (data?.respond_Type) {
      case "0":
        return "ประเด็นร้องเรียนไม่มีมูลความจริงตามที่ร้องเรียน";
      case "1":
        return "ความเข้าใจของผู้ใช้บริการผิดพลาด / คลาดเคลื่อน";
      case "2":
        return "ประเด็นร้องเรียนเป็นข้อร้องเรียนที่ผ่านมาแล้วในอดีต (เกิน 1 เดือนขึ้นไป นับจากการร้องเรียนในครั้งนี้)";
      case "3":
        return "ประเด็นร้องเรียนเป็นนโยบายของโรงพยาบาล ให้ศูนย์พัฒนาคุณภาพ ประสานงานทีมนำพัฒนาคุณภาพตัดสินใจดำเนินการ";
      case "4":
        return "ประเด็นร้องเรียนที่คณะกรรมการ";
      case "5":
        return "ประเด็นร้องเรียนเป็นจริงตามที่ผู้ใช้บริการร้องเรียน เนื่องจากสาเหตุ";

      case "6":
        return "ประเด็นข้อร้องเรียนเกินความสามารถของโรงพยาบาล ที่จะดําเนินการให้ได้";
      case "7":
        return "เหตุสุดวิสัย เช่น เกิดการระบาดของโรค มีจํานวนผู้ใช้บริการมากกว่าปกติ แพทย์ลาฉุกเฉิน (ไม่สามารถหาแพทย์ทดแทนได้ทัน) เป็นต้น";
      case "8":
        return "เป็นไปตามขั้นตอนการให้บริการ (On process)";
      case "9":
        return "อื่นๆ";
    }
  };



  const causeList = {
    1: "การสื่อสาร/ให้ข้อมูลไม่ชัดเจน ไม่เพียงพอ",
    2: "ไม่สื่อสาร/ไม่ให้ข้อมูล",
    3: "ขาดการตรวจสอบ/ทวนซ้ำ",
    4: "ขาดการประสานงาน/ติดตาม",
    5: "ขาดความรู้ ความชำนาญด้านวิชาชีพ",
    6: "ขาดความชำนาญด้านภาษา",
    7: "ขาดความเอาใจใส่ ดูแล",
    8: "ละเมิดสิทธิ์ผู้ป่วย",
    9: "ขาดการตรวจสอบข้อมูลก่อนให้บริการ",
    10: "ไม่ปฏิบัติตามนโยบาย /SP/WI ที่กำหนดใว้",
    11: "ไม่ปฏิบัตืตามมาตรฐานวิชาชีพ",
    12: "ข้อมูลเพื่อการสื่อสาร ไม่ละเอียด ชัดเจน",
    13: "ระบบงานไม่ชัดเจน",
    14: "อัตรากำลังไม่สอดคล้องกับภาระงาน",
    15: "เป็นระบบงานของ รพ./หน่วยงาน",
    16: "เครื่องมือไม่พร้อมใช้งาน ขาดการตรวจสอบซ่อมบำรุง",
    17: "ปัญหาจากโครงสร้างอาคาร/สถานที่ให้บริการ/สิ่งแวดล้อม",
    18: "เป็นเหตุสุดวิสัย",
    19: "การให้บริการล่าช้า",
     20: "อื่นๆ",
  };

const causes = (() => {
  try {
    return JSON.parse(data?.respond_Cause || "[]");
  } catch {
    return [];
  }
})();

  return (
    <div className="page-bg">
      <div className="card-section">
        <div className="view-page">
          {/* HEADER */}
          <div className="view-header">
            <div className="view-title-main">
              <ChartColumn size={20} />
              ดูข้อมูลการสรุปผลการวิเคราะห์ข้อร้องเรียน
            </div>

            <Button size="sm" variant="outline-secondary" onClick={handleShow}>
              {show ? "ซ่อน" : "แสดง"}
            </Button>
          </div>

          {show && (
            <div className="view-stack">
              <div className="view-section">
                <div className="view-title">
                  <GreenCircle />
                  ผลการวิเคราะห์ข้อร้องเรียน
                </div>

                <div className="badge-wrap">
                 <div className="analysis-card">

  <div className="analysis-header">
    <div className="analysis-main">
      {getRespondTypeText()}
    </div>
  </div>


  <div className="analysis-detail">
    <div className="detail-label">
      รายละเอียดผลการวิเคราะห์
    </div>

    <div className="detail-text">
      {getText()}
    </div>
  </div>

</div>
                </div>
{data?.respond_Type === "4" && (
  <div className="text-box mt-3">
    <strong>คณะกรรมการ</strong>
    <br />
    {data?.respond_Committee || "-"}
  </div>
)}
                {/* type 5 = เกิดจากสาเหตุ */}
                {data?.respond_Type === "5" && (
                  <div className="sub-box">
                    <div className="sub-title">สาเหตุ</div>

                   <div className="badge-wrap">
  {causes.map((c) => (
    <div key={c} className="badge">
      {String(c) === "20"
        ? `อื่นๆ : ${data?.respond_CauseOther || "-"}`
        : causeList[c]}
    </div>
  ))}
</div>



                    {(data?.respond_NameSurname || data?.respond_Id) && (
                      <div className="info-box">
                        <div>ชื่อ: {data?.respond_NameSurname || "-"}</div>
                        <div>รหัส: {data?.respond_Id || "-"}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SECTION 4 */}
              <div className="view-section">
                <div className="view-title">
                  <GreenCircle />
                  ข้อเสนอแนะเพิ่มเติม
                </div>

                <div className="text-box">
                  {data?.summary_Suggestions || "-"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoView;
