import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import GreenCircle from "./GreenCircle";
import { BadgeAlert } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Table, InputGroup } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";

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
    0: "ฝ่ายแพทย์",
    1: "งานพยาบาล",
    2: "ฝ่ายบริหาร",
    3: "ฝ่ายปฏิบัติการ",
  };

  const achievementText = {
    0: "แก้ไขได้ทั้งหมด",
    1: "แก้ไขได้บางส่วน",
    2: "แก้ไขไม่ได้เลย",
  };
  const handleEditClick2 = (id, role) => {
    navigate(`/complaints/form/${id}`, {
      state: {
        reportid: role.reportid,
      },
    });
  };

  return (
    <>
      <div className="page-bg">
        <div className="card-section">
          <div className="view-page">
            {" "}
            <div
              className="view-header"
              style={{
                background: "#FEF2F2",
                border: "1px solid #DC2626",
                borderLeft: "5px solid #DC2626",
              }}
            >
              <div
                className="view-title-main"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#991B1B",
                }}
              >
                <BadgeAlert size={22} color="#DC2626" />
                ดูข้อมูลการร้องเรียน
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
            <>
              {isAdmin && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditClick2(data.id, data)}
                      sx={{
                        background: "linear-gradient(135deg,#FDE047,#FACC15)",
                        color: "#1F2937",

                        border: "2px solid #EAB308",
                        borderRadius: "14px",

                        px: 3,
                        py: 1.2,

                        fontWeight: 700,
                        fontSize: "0.95rem",
                        textTransform: "none",

                        boxShadow: "0 6px 16px rgba(234,179,8,.35)",
                        transition: "all .25s ease",

                        "& .MuiSvgIcon-root": {
                          color: "#1F2937",
                        },

                        "&:hover": {
                          background: "linear-gradient(135deg,#FACC15,#EAB308)",
                          borderColor: "#CA8A04",
                          color: "#111827",

                          transform: "translateY(-2px)",
                          boxShadow: "0 10px 24px rgba(202,138,4,.45)",
                        },

                        "&:active": {
                          transform: "scale(.97)",
                        },
                      }}
                    >
                      แก้ไขข้อมูล
                    </Button>
                  </Box>
                </>
              )}

              <div className="complaint-grid">
                <div className="complaint-card">
                  <div className="complaint-card-header">
                    <div className="complaint-card-title">
                      ข้อมูลการร้องเรียน
                    </div>{" "}
                  </div>

                  <div className="complaint-card-body">
                    <InfoRow
                      label="ประเภทผู้ป่วย"
                      value={data?.type === "0" ? "OPD" : "IPD"}
                    />

                    <InfoRow label="วันที่รับข้อร้องเรียน" value={data?.date} />

                    <InfoRow
                      label="เวลา"
                      value={
                        timePicker ? dayjs(timePicker).format("HH:mm") : "-"
                      }
                    />
                  </div>
                </div>
                <div className="complaint-card">
                  <div className="complaint-card-header">
                    <div className="complaint-card-title">
                      ข้อมูลการบันทึก
                    </div>{" "}
                  </div>

                  <div className="complaint-card-body">
                    <InfoRow
                      label="บันทึกโดย"
                      value={recordText[data?.record]}
                    />
                  </div>
                  <div className="complaint-card-header">
                    <div className="complaint-card-title">
                      ช่องทางการรับเรื่อง
                    </div>{" "}
                  </div>

                  <div className="complaint-card-body">
                    <InfoRow
                      label="รับข้อร้องเรียนทาง"
                      value={complaintText[data?.complaints]}
                    />
                  </div>
                </div>

                <div className="complaint-card">
                  <div className="complaint-card-header">
                    <div className="complaint-card-title">
                      ผู้ร้องเรียน
                    </div>{" "}
                  </div>

                  <div className="complaint-card-body">
                    <InfoRow label="ชื่อ - สกุล" value={data?.name} />

                    <InfoRow
                      label="เกี่ยวข้องเป็น"
                      value={data?.related ? `${data.related} ของผู้ป่วย` : "-"}
                    />

                    <InfoRow label="เบอร์โทรศัพท์" value={data?.phone} />
                  </div>
                </div>

                <div className="complaint-card">
                  <div className="complaint-card-header">
                    <div className="complaint-card-title">
                      ข้อมูลผู้ป่วย
                    </div>{" "}
                  </div>

                  <div className="complaint-card-body">
                    <InfoRow label="HN" value={data?.patient_hn} />

                    <InfoRow
                      label="ชื่อ - สกุล ผู้ป่วย"
                      value={data?.patient_name}
                    />

                    <InfoRow
                      label="อายุ"
                      value={data?.patient_age ? `${data.patient_age} ปี` : "-"}
                    />

                    <InfoRow label="AN" value={data?.patient_an} />

                    <InfoRow
                      label="Diagnosis"
                      value={data?.patient_diagnosis}
                    />
                  </div>
                </div>

                <div className="complaint-card">
                  <div className="complaint-card-header">
                    <div className="complaint-card-title">ติดต่อกลับ</div>{" "}
                  </div>

                  <div className="complaint-card-body">
                    <InfoRow
                      label="สถานะ"
                      value={involvedText[data?.involved]}
                    />

                    {showUrgent === 1 && (
                      <>
                        <InfoRow
                          label="ความเร่งด่วน"
                          value={urgentText[data?.urgent]}
                        />

                        {data?.urgent === "0" && (
                          <InfoRow
                            label="ภายในวันที่"
                            value={data?.urgentDate}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="complaint-card complaint-card-full complaint-summary-card">
                  <div className="complaint-card-header complaint-summary-header">
                    <div className="summary-left">
                      <div>
                        <div className="complaint-card-title">
                          หน่วยงาน / บุคคลที่ถูกร้องเรียน
                        </div>{" "}
                      </div>
                    </div>{" "}
                  </div>

                  <div className="complaint-card-body">
                    {showAppeal === 1 && (
                      <div className="complaint-table">
                        <Table bordered hover responsive>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>ชื่อ</th>
                              <th>แผนก</th>
                              <th>สังกัด</th>
                            </tr>
                          </thead>

                          <tbody>
                            {array.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.department}</td>
                                <td>{factionText[item.faction]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </div>
                </div>

                <div className="complaint-card complaint-card-full complaint-summary-card">
                  <div className="complaint-card-header complaint-summary-header">
                    <div className="summary-left">
                      <div>
                        <div className="complaint-card-title">
                          ส่วนที่ 1 : สรุปสาระ / ประเด็นร้องเรียน
                        </div>
                      </div>
                    </div>

                    {selectedSeverity && (
                      <div
                        className="severity-chip"
                        style={{
                          color: selectedSeverity.color,
                          background: selectedSeverity.bg,
                        }}
                      >
                        ระดับ {data?.suggestion} • {selectedSeverity.label}
                      </div>
                    )}
                  </div>

                  <div className="complaint-card-body">
                    <div className="detail-box-new summary-box">
                      {data?.summarize || "-"}
                    </div>
                  </div>
                </div>
                <div className="complaint-card complaint-card-full">
                  <div className="complaint-card-header">
                    <div className="complaint-card-title">
                      บันทึกการตัดสินใจของผู้รับข้อร้องเรียนในการแก้ไขปัญหาเฉพาะหน้า
                    </div>{" "}
                  </div>

                  <div className="complaint-card-body">
                    <InfoRow label="รายละเอียด" value={data?.decision} />
                  </div>
                </div>

                <div className="complaint-card complaint-card-full">
                  <div className="complaint-card-header">
                    <div className="complaint-card-title">
                      ระดับของผลสัมฤทธิ์ในการแก้ปัญหาเฉพาะหน้า
                    </div>{" "}
                  </div>

                  <div className="complaint-card-body">
                    <InfoRow
                      label="ผลการแก้ไข"
                      value={achievementText[data?.achievement]}
                    />
                  </div>
                </div>
                <div className="complaint-card complaint-card-full">
                  <div className="complaint-card-header">
                    <div className="complaint-card-title">
                      ข้อเสนอแนะเพื่อป้องกันและแก้ไขปัญหา
                    </div>{" "}
                  </div>

                  <div className="complaint-card-body">
                    <InfoRow label="รายละเอียด" value={data?.prevent} />
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
