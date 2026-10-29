import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import GreenCircle from "./GreenCircle";
import { BadgeAlert } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Table, InputGroup } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import { formatThaiDate } from "./dateUtils";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { severityLevels,generalRiskOptions,clinicalRiskOptions,complaintCategoryOptions } from "../../data/form/DataDict_Risk";
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
  isAdmin,
  show,
  handleShow,
  setChangePerson,
  handlePatientDiagnosis,
}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tosentvalue, settosentvalue] = useState("select"); // select or textinput
  const [timePicker, setTimePicker] = useState(null); // dayjs
  

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
    <div className="info-row-new">
      <div className="info-label-new">{label}</div>

      <div className="info-value-new">{value || "-"}</div>
    </div>
  );

  const recordText = {
    0: "Nurse Supervisor",
    1: "ผู้จัดการฝ่าย",
    2: "หัวหน้าแผนก",
    3: "ลูกค้าสัมพันธ์",
    4: data?.record_other,
  };

  const complaintText = {
    0: "ทางวาจา",
    1: "ทางโทรศัพท์",
    2: "เยี่ยมผู้ป่วยเชิงรุก",
    3: "เยี่ยมตลาด / บริษัทคู่สัญญา",
    4: data?.complaints_other,
  };

  const involvedText = {
    0: "ต้องการให้ตอบกลับ",
    1: "ไม่ต้องการให้ตอบกลับ",
  };

  const urgentText = {
    0: "ด่วน",
    1: "ไม่ด่วน",
  };

  const appealText = {
    0: "ไม่ระบุบุคคลหรือแผนกที่ร้องเรียน",
    1: "ระบุบุคคลหรือแผนกที่ร้องเรียน",
  };

  const factionText = {
     0: "แพทย์",
    1: "ฝ่ายแพทย์",
    2: "งานพยาบาล",
    3: "ฝ่ายบริหาร",
    4: "ฝ่ายปฏิบัติการ",
  };

  const achievementText = {
    0: "แก้ไขได้ทั้งหมด",
    1: "แก้ไขได้บางส่วน",
    2: "แก้ไขไม่ได้เลย",
  };
 const complaintCategoryOptions = [
  { value: "9.1", label: "จริยธรรม / จรรยาบรรณวิชาชีพ" },
  { value: "9.2", label: "สิทธิผู้ป่วย" },
  { value: "9.3", label: "กระบวนการดูแล / รักษา" },
  { value: "9.4", label: "กระบวนการทำงาน" },
  {
    value: "9.5",
    label: "ให้ข้อมูลไม่เพียงพอ / ให้ข้อมูลผิดพลาด / ไม่ให้ข้อมูล",
  },
  { value: "9.6", label: "การประสานงาน / การส่งต่อข้อมูล" },
  { value: "9.7", label: "พฤติกรรมบริการ" },
  { value: "9.8", label: "ระยะเวลารอคอย" },
  { value: "9.9", label: "โครงสร้าง / อาคารสถานที่ / สิ่งแวดล้อม" },
  { value: "9.10", label: "เครื่องมือ / อุปกรณ์" },
  { value: "9.11", label: "สิ่งอำนวยความสะดวก" },
  { value: "9.12", label: "ค่ารักษาพยาบาล / ค่า DF" },
  { value: "9.13", label: "อื่นๆ" },
];
  const selectedComplaintCategories = (() => {
  const value = data?.complaintCategories;

  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }

  return [];
})();

const selectedComplaintCategoryLabels =
  selectedComplaintCategories.map((value) => {
    const category = complaintCategoryOptions.find(
      (item) => item.value === value
    );

    return category?.value+' '+(category?.label || value);
  });
  const handleEditClick2 = (id, role) => {
    navigate(`/complaints/form/${id}`, {
      state: {
        reportid: role.reportid,
      },
    });
  };

const ImageGallery = ({ images }) => {
  let fileList = [];

  try {
    fileList = images ? JSON.parse(images) : [];
  } catch (err) {
    fileList = [];
  }

  const [selectedImage, setSelectedImage] = useState(null);

  if (!Array.isArray(fileList) || fileList.length === 0) {
    return null;
  }

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

  const getFileType = (filename) => {
    if (!filename) return "ไฟล์เอกสาร";

    const ext = filename.split(".").pop().toLowerCase();

    if (["doc", "docx"].includes(ext)) {
      return "Microsoft Word";
    }

    if (["xls", "xlsx"].includes(ext)) {
      return "Microsoft Excel";
    }

    if (["pdf"].includes(ext)) {
      return "PDF";
    }

    return "เอกสารแนบ";
  };

  const imageFiles = fileList.filter((file) => isImageFile(file));
  const documentFiles = fileList.filter((file) => !isImageFile(file));

  return (
    <>
      {/* รูปภาพ */}
      {imageFiles.length > 0 && (
        <div className="image-gallery">
          {imageFiles.map((img, index) => {
            const fileUrl = `/storage/attachfiles/${img}`;

            return (
              <div
                className="image-gallery-item"
                key={`image-${index}`}
                onClick={() => setSelectedImage(fileUrl)}
              >
                <img
                  src={fileUrl}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      )}

      {/* เอกสาร Word / Excel / PDF */}
      {documentFiles.length > 0 && (
        <div className="view-document-list">
          {documentFiles.map((file, index) => {
            const fileUrl = `/storage/attachfiles/${file}`;

            return (
              <div
                className="view-document-item"
                key={`document-${index}`}
              >
                <div className="view-document-icon">
                  <i
                    className={`bi ${getFileIcon(file)}`}
                  ></i>
                </div>

                <div className="view-document-info">
                  <div className="view-document-name">
                    {file}
                  </div>

                  <div className="view-document-type">
                    {getFileType(file)}
                  </div>
                </div>

                <div className="view-document-action">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-document-open"
                    title="เปิดไฟล์"
                  >
                    <i className="bi bi-box-arrow-up-right"></i>
                  </a>

                  <a
                    href={fileUrl}
                    download={file}
                    className="view-document-download"
                    title="ดาวน์โหลด"
                  >
                    <i className="bi bi-download"></i>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="image-modal"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="image-modal-close"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt=""
            className="image-modal-preview"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
return (
  <>
    {show && (
      <div className="general-info-page">

        {/* =====================================================
            ACTION
        ====================================================== */}
        {isAdmin && (
          <div className="gi-toolbar">
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              className="gi-edit-button"
              onClick={() => handleEditClick2(data.id, data)}
            >
              แก้ไขข้อมูล
            </Button>
          </div>
        )}


        <div className="gi-content">


          {/* ===================================================
              GENERAL INFORMATION
          ==================================================== */}
          <section className="gi-section">

            <div className="gi-section-header">
              <div>
                <h2 className="gi-section-heading">
                  ข้อมูลทั่วไป
                </h2>

                <div className="gi-section-caption">
                  ข้อมูลการรับเรื่องและการบันทึกข้อร้องเรียน
                </div>
              </div>
            </div>


            <div className="gi-general-panel">

              <div className="gi-general-columns">

                {/* ---------------------------------------------
                    ข้อมูลการร้องเรียน
                ---------------------------------------------- */}
                <div className="gi-general-group">

                  <div className="gi-group-title">
                    ข้อมูลการร้องเรียน
                  </div>

                  <div className="gi-info-list">

                    <div className="gi-info-row">

                      <div className="gi-info-label">
                        ประเภทผู้ป่วย
                      </div>

                      <div className="gi-info-value">
                        {data?.type === "0"
                          ? "OPD"
                          : data?.type === "1"
                            ? "IPD"
                            : "-"}
                      </div>

                    </div>

                    <div className="gi-info-row">

                      <div className="gi-info-label">
                        วันที่รับข้อร้องเรียน
                      </div>

                      <div className="gi-info-value">
                         {data?.date ? (
      <span className="thai-date">
        {formatThaiDate(data.date)}
      </span>
    ) : (
      "-"
    )}
                      </div>

                    </div>

                    <div className="gi-info-row">

                      <div className="gi-info-label">
                        เวลา
                      </div>

                      <div className="gi-info-value">
                        {timePicker
                          ? dayjs(timePicker).format("HH:mm")
                          : "-"}
                      </div>

                    </div>

                  </div>

                </div>


                {/* ---------------------------------------------
                    ข้อมูลการบันทึก + ช่องทาง
                ---------------------------------------------- */}
                <div className="gi-general-group">

                  <div className="gi-group-title">
                    ข้อมูลการบันทึก
                  </div>

                  <div className="gi-info-list">

                    <div className="gi-info-row">

                      <div className="gi-info-label">
                        บันทึกโดย
                      </div>

                      <div className="gi-info-value">
                        {recordText[data?.record] || "-"}
                      </div>

                    </div>

                  </div>


                  <div
                    className="gi-group-title"
                    style={{ marginTop: "24px" }}
                  >
                    ช่องทางการรับเรื่อง
                  </div>

                  <div className="gi-info-list">

                    <div className="gi-info-row">

                      <div className="gi-info-label">
                        รับข้อร้องเรียนทาง
                      </div>

                      <div className="gi-info-value">
                        {complaintText[data?.complaints] || "-"}
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* ===================================================
              PEOPLE
          ==================================================== */}
          <section className="gi-section">

            <div className="gi-section-header">
              <div>

                <h2 className="gi-section-heading">
                  ผู้ร้องเรียนและข้อมูลผู้ป่วย
                </h2>

                <div className="gi-section-caption">
                  ข้อมูลบุคคลที่เกี่ยวข้องกับข้อร้องเรียน
                </div>

              </div>
            </div>


            <div className="gi-people-panel">

              <div className="gi-people-columns">

                {/* ---------------------------------------------
                    ผู้ร้องเรียน
                ---------------------------------------------- */}
                <div className="gi-person-panel">

                  <div className="gi-person-header">

                    <div className="gi-person-icon">
                      01
                    </div>

                    <div className="gi-person-title">
                      ผู้ร้องเรียน
                    </div>

                  </div>

                  <div className="gi-person-name">
                    {data?.name || "-"}
                  </div>

                  <div className="gi-person-details">

                    <div className="gi-person-detail">

                      <span className="gi-person-label">
                        เกี่ยวข้องเป็น
                      </span>

                      <span className="gi-person-value">
                        {data?.related
                          ? `${data.related} ของผู้ป่วย`
                          : "-"}
                      </span>

                    </div>

                    <div className="gi-person-detail">

                      <span className="gi-person-label">
                        เบอร์โทรศัพท์
                      </span>

                      <span className="gi-person-value">
                        {data?.phone || "-"}
                      </span>

                    </div>

                  </div>

                </div>


                {/* ---------------------------------------------
                    ผู้ป่วย
                ---------------------------------------------- */}
                <div className="gi-person-panel">

                  <div className="gi-person-header">

                    <div className="gi-person-icon">
                      02
                    </div>

                    <div className="gi-person-title">
                      ข้อมูลผู้ป่วย
                    </div>

                  </div>

                  <div className="gi-person-name">
                    {data?.patient_name || "-"}
                  </div>

                  <div className="gi-person-details">

                    <div className="gi-person-detail">

                      <span className="gi-person-label">
                        HN
                      </span>

                      <span className="gi-person-value">
                        {data?.patient_hn || "-"}
                      </span>

                    </div>

                    <div className="gi-person-detail">

                      <span className="gi-person-label">
                        AN
                      </span>

                      <span className="gi-person-value">
                        {data?.patient_an || "-"}
                      </span>

                    </div>

                    <div className="gi-person-detail">

                      <span className="gi-person-label">
                        อายุ
                      </span>

                      <span className="gi-person-value">
                        {data?.patient_age
                          ? `${data.patient_age} ปี`
                          : "-"}
                      </span>

                    </div>

                    <div className="gi-person-detail">

                      <span className="gi-person-label">
                        Diagnosis
                      </span>

                      <span className="gi-person-value">
                        {data?.patient_diagnosis || "-"}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* ===================================================
              IMPORTANT COMPLAINT
          ==================================================== */}
          <section className="gi-section">

            <div className="gi-focus">

              {/* ---------------------------------------------
                  HERO HEADER
              ---------------------------------------------- */}
              <div className="gi-focus-header">

                <div className="gi-focus-title-wrap">

                  <div className="gi-focus-kicker">
                    Complaint Focus
                  </div>

                  <h2 className="gi-focus-title">
                    รายละเอียดสำคัญของข้อร้องเรียน
                  </h2>

                  <div className="gi-focus-description">
                    ประเด็นที่ต้องติดตาม การตอบกลับ
                    และสาระสำคัญของข้อร้องเรียน
                  </div>

                </div>

              </div>


              {/* ---------------------------------------------
                  CONTACT
              ---------------------------------------------- */}
              <div className="gi-focus-section">

                <div className="gi-focus-section-title">

                  <div className="gi-focus-section-title-text">
                         <div className="gi-person-icon">
                      01
                    </div>
                    ติดต่อกลับผู้ร้องเรียน
                  </div>

                </div>


                <div className="gi-contact-grid">

                  <div className="gi-contact-item">

                    <div className="gi-contact-label">
                      สถานะการตอบกลับ
                    </div>

                    <div
                      className={
                        data?.involved === "0"
                          ? "gi-contact-value gi-status gi-status-required"
                          : "gi-contact-value gi-status gi-status-normal"
                      }
                    >

                      <span className="gi-status-dot" />

                      {involvedText[data?.involved] || "-"}

                    </div>

                  </div>


                  {showUrgent === 1 && (
                    <div className="gi-contact-item">

                      <div className="gi-contact-label">
                        ความเร่งด่วน
                      </div>

                      <div
                        className={
                          data?.urgent === "0"
                            ? "gi-contact-value gi-status gi-urgent"
                            : "gi-contact-value gi-status gi-status-normal"
                        }
                      >

                        <span className="gi-status-dot" />

                        {urgentText[data?.urgent] || "-"}

                      </div>

                    </div>
                  )}


                  {showUrgent === 1 &&
                    data?.urgent === "0" && (
                      <div className="gi-contact-item">

                        <div className="gi-contact-label">
                          วันที่ต้องดำเนินการ
                        </div>
<div className="gi-contact-value">
  {data?.urgentDate ? (
    <span className="thai-date">
      {formatThaiDate(data.urgentDate)}
    </span>
  ) : (
    "-"
  )}
</div>

                      </div>
                    )}

                </div>

              </div>


              {/* ---------------------------------------------
                  APPEAL
              ---------------------------------------------- */}
              <div className="gi-focus-section">

                <div className="gi-focus-section-title">

                  <div className="gi-focus-section-title-text">
                         <div className="gi-person-icon">
                      02
                    </div>
                    หน่วยงาน / บุคคลที่ถูกร้องเรียน
                  </div>

                </div>


                {showAppeal === 1 ? (

                  <div className="gi-table-wrapper">

                    <Table
                      responsive
                      className="gi-table"
                    >

                      <thead>

                        <tr>

                          <th className="gi-table-index">
                            #
                          </th>

                          <th>
                            ชื่อ
                          </th>

                          <th>
                            แผนก
                          </th>

                          <th>
                            สังกัด
                          </th>

                        </tr>

                      </thead>


                      <tbody>

                        {array?.length > 0 ? (

                          array.map((item, index) => (
                            <tr key={index}>

                              <td className="gi-table-index">
                                {index + 1}
                              </td>

                              <td className="gi-table-name">
                                {item.name || "-"}
                              </td>

                              <td>
                                {item.department || "-"}
                              </td>

                              <td>
                                {factionText[item.faction] || "-"}
                              </td>

                            </tr>
                          ))

                        ) : (

                          <tr>

                            <td
                              colSpan={4}
                              className="gi-empty"
                            >
                              ไม่พบข้อมูลบุคคลหรือหน่วยงานที่ถูกร้องเรียน
                            </td>

                          </tr>

                        )}

                      </tbody>

                    </Table>

                  </div>

                ) : (

                  <div className="gi-empty">
                    ไม่ระบุบุคคลหรือแผนกที่ร้องเรียน
                  </div>

                )}

              </div>


              {/* ---------------------------------------------
                  SUMMARY
              ---------------------------------------------- */}
              <div className="gi-focus-section">

                <div className="gi-summary-header">

                  <div className="gi-focus-section-title">
                    <div className="gi-focus-section-title-text">
                           <div className="gi-person-icon">
                      03
                    </div>
                      ส่วนที่ 1 : สรุปสาระ / ประเด็นร้องเรียน     <span className="required-badge">สำคัญ</span>
                    </div>
                  </div>


              

                </div>


                <div className="gi-summary">
                  {data?.summarize || "-"}
                </div>

              </div>
{/* ===================================================
    COMPLAINT CATEGORIES
==================================================== */}

            </div>

          </section>



<section className="gi-section">
  <div className="gi-section-header">
    <div>
      <h2 className="gi-section-heading">ระดับความรุนแรง</h2>
      <div className="gi-section-caption">
        ประเภทความเสี่ยงและระดับความรุนแรงที่บันทึกไว้
      </div>
    </div>
  </div>

  <div className="gi-risk-view">
    {/* ความเสี่ยงทั่วไป: แสดงเมื่อ generalRisk = 1 */}
    {Number(data?.generalRisk) === 1 && (
      <div className="gi-risk-type">
        <div className="gi-risk-type-header">
          <span className="gi-risk-type-icon">✓</span>
          <div>
            <div className="gi-risk-type-title">
              ความเสี่ยงทั่วไป
            </div>
            <div className="gi-risk-type-subtitle">
              General Risk
            </div>
          </div>
        </div>

    {(() => {
  const selected = generalRiskOptions.find(
    (item) =>
      String(item.value) === String(data?.generalRiskLevel ?? "")
  );

  return selected ? (
    <div
      className="gi-risk-selected"
      style={{
        backgroundColor: selected.bg,
        borderColor: selected.color,
      }}
    >
      <span
        className="gi-risk-code"
        style={{
          backgroundColor: selected.bg,
          color: selected.color,
          borderColor: selected.color,
        }}
      >
        ระดับ {selected.value}
      </span>

      <div className="gi-risk-detail">
        <div className="gi-risk-description">
          {selected.label}
        </div>

        <span
          className="gi-risk-badge"
          style={{
            backgroundColor: selected.bg,
            color: selected.color,
            borderColor: selected.color,
          }}
        >
          {selected.aka}
        </span>
      </div>
    </div>
  ) : (
    <div className="gi-risk-empty">
      ยังไม่ได้ระบุระดับความรุนแรง
    </div>
  );
})()}
      </div>
    )}

    {/* ความเสี่ยงทางคลินิก: แสดงเมื่อ clinicalRisk = 1 */}
    {Number(data?.clinicalRisk) === 1 && (
      <div className="gi-risk-type">
        <div className="gi-risk-type-header">
          <span className="gi-risk-type-icon">✓</span>
          <div>
            <div className="gi-risk-type-title">
              ความเสี่ยงทางคลินิก
            </div>
            <div className="gi-risk-type-subtitle">
              Clinical Risk
            </div>
          </div>
        </div>
{(() => {
  const selected = clinicalRiskOptions
    .flatMap((section) =>
      section.items.map((item) => ({
        ...item,
        group: section.group,
      }))
    )
    .find(
      (item) =>
        String(item.value) === String(data?.suggestion ?? "")
    );

  const severity = severityLevels.find(
    (item) =>
      String(item.code) === String(data?.suggestion ?? "")
  );

  const riskColor = severity?.color || "#6b7280";
  const riskBg = severity?.bg || "#f3f4f6";

  return selected ? (
    <div
      className="gi-risk-selected"
      style={{
        backgroundColor: riskBg,
        borderColor: riskColor,
      }}
    >
      <span
        className="gi-risk-code"
        style={{
          backgroundColor: riskBg,
          color: riskColor,
          borderColor: riskColor,
        }}
      >
        ระดับ {selected.value}
      </span>

      <div className="gi-risk-detail">
        <div
          className="gi-risk-group"
          style={{ color: riskColor }}
        >
          {selected.group}
        </div>

        <div className="gi-risk-description">
          {selected.label}
        </div>

        {severity && (
          <span
            className="gi-risk-badge"
            style={{
              backgroundColor: riskBg,
              color: riskColor,
              borderColor: riskColor,
            }}
          >
            {severity.label}
          </span>
        )}
      </div>
    </div>
  ) : (
    <div className="gi-risk-empty">
      ยังไม่ได้ระบุระดับความรุนแรง
    </div>
  );
})()}
      </div>
    )}

    {/* ไม่มีการเลือกทั้งสองประเภท */}
    {Number(data?.generalRisk) !== 1 &&
      Number(data?.clinicalRisk) !== 1 && (
        <div className="gi-risk-empty">
          ไม่มีข้อมูลประเภทความเสี่ยง
        </div>
      )}
  </div>
</section>



<section className="gi-section">
  <div className="gi-section-header">
    <div>
      <h2 className="gi-section-heading">
        ประเภทข้อร้องเรียน/ข้อเสนอแนะ
      </h2>
      <div className="gi-section-caption">
        หมวดหมู่ของประเด็นข้อร้องเรียนที่เลือกไว้
      </div>
    </div>
  </div>

  <div className="gi-general-panel gi-category-panel">
    {selectedComplaintCategoryLabels.length > 0 ? (
      <div className="gi-category-badges">
        {selectedComplaintCategoryLabels.map((label, index) => (
          <span className="gi-category-badge" key={`${label}-${index}`}>
         {label}
          </span>
        ))}
      </div>
    ) : (
      <div className="gi-empty">
        ไม่มีข้อมูลประเภทข้อร้องเรียน/ข้อเสนอแนะ
      </div>
    )}
  </div>
</section>


          {/* ===================================================
              ACTION / RESULT
          ==================================================== */}
          <section className="gi-section">

            <div className="gi-section-header">

              <div>

                <h2 className="gi-section-heading">
                  ผลการดำเนินการและผลการแก้ไข
                </h2>

                <div className="gi-section-caption">
                  การจัดการปัญหา ผลสัมฤทธิ์ และข้อเสนอแนะ
                </div>

              </div>

            </div>


            <div className="gi-result-panel">

            


              {/* ---------------------------------------------
                  01 DECISION
              ---------------------------------------------- */}
              <div className="gi-result-section">

            

                  <div className="gi-focus-section-title-text">
                    <div className="gi-person-icon">
                      01
                    </div> บันทึกการตัดสินใจของผู้รับข้อร้องเรียนในการแก้ไขปัญหาเฉพาะหน้า
                </div>

                <div className="gi-result-content">
                  {data?.decision || "-"}
                </div>

              </div>


              {/* ---------------------------------------------
                  02 ACHIEVEMENT
              ---------------------------------------------- */}
              <div className="gi-result-section">

            
      <div className="gi-focus-section-title-text">
                    <div className="gi-person-icon">
                      02
                    </div> ระดับของผลสัมฤทธิ์ในการแก้ปัญหาเฉพาะหน้า
                </div>


                <div className="gi-result-content">

                  <span className="gi-achievement">
                    {achievementText[data?.achievement] || "-"}
                  </span>

                </div>

              </div>


              {/* ---------------------------------------------
                  03 PREVENTION
              ---------------------------------------------- */}
              <div className="gi-result-section">

                <div className="gi-focus-section-title-text">
                    <div className="gi-person-icon">
                      03
                    </div> ข้อเสนอแนะเพื่อป้องกันและแก้ไขปัญหา
                </div>

                <div className="gi-result-content">
                  {data?.prevent || "-"}
                </div>

              </div>

            </div>

          </section>


          {/* ===================================================
              ATTACHMENTS
          ==================================================== */}
          {data?.image && (
            <section className="gi-section gi-attachments">

              <div className="gi-section-header">

                <div>

                  <h2 className="gi-section-heading">
                    รูปภาพและเอกสารประกอบ
                  </h2>

                  <div className="gi-section-caption">
                    ไฟล์ที่แนบมากับข้อร้องเรียน
                  </div>

                </div>

              </div>


              <div className="gi-attachment-panel">

                <div className="gi-attachment-header">

                  <div className="gi-attachment-title">
                    เอกสารประกอบ
                  </div>

                </div>

                <ImageGallery
                  images={data?.image}
                />

              </div>

            </section>
          )}

        </div>

      </div>
    )}
  </>
);
};

export default GeneralInfo;
