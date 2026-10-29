import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const GlobalFilter = ({
  docNo,
  hn,
  complaintDate,
  severity,
  patientType,
  status,
  onChangeDocNo,
  onChangeHN,
  onChangeDate,
  onChangeSeverity,
  onChangePatientType,
  onChangeStatus,
}) => {

  const severityOptions = [
  { value: "", label: "ทั้งหมด" },
 { value: "complaint", label: "ข้อร้องเรียน" },
  { value: "suggestion", label: "ข้อเสนอแนะ" },
];


const patientTypeOptions = [
  { value: "", label: "ทั้งหมด" },
  { value: 0, label: "OPD" },
  { value: 1, label: "IPD" },
];

const statusOptions = [
  { value: "", label: "ทั้งหมด" },
  { value: "__NULL__", label: "ข้อร้องเรียนใหม่" },
  { value: "1", label: "รอตอบกลับ" },
  { value: "2", label: "ตอบกลับเรียบร้อย" },
  { value: "3", label: "วิเคราะห์แล้ว" },
  { value: "5", label: "ไม่ใช่ข้อร้องเรียน" },
];
const filterFields = [
  {
    key: "docNo",
    label: "เลขที่เอกสาร",
    type: "text",
    placeholder: "กรอกเลขที่เอกสาร",
    value: docNo,
    onChange: onChangeDocNo,
  },
  {
    key: "hn",
    label: "HN",
    type: "text",
    placeholder: "กรอก HN",
    value: hn,
    onChange: onChangeHN,
  },
  {
    key: "date",
    label: "วันที่ร้องเรียน",
    type: "date",
    value: complaintDate,
    onChange: onChangeDate,
  },
  {
    key: "severity",
    label: "ความรุนแรง",
    type: "select",
    value: severity,
    onChange: onChangeSeverity,
    options: severityOptions,
  },
  {
    key: "patientType",
    label: "ประเภทผู้ป่วย",
    type: "select",
    value: patientType,
    onChange: onChangePatientType,
    options: patientTypeOptions,
  },
  {
    key: "status",
    label: "สถานะ",
    type: "select",
    value: status,
    onChange: onChangeStatus,
    options: statusOptions,
  },
];
  return (
   <div className="filter-grid">
  {filterFields.map((field) => (
    <div className="filter-field" key={field.key}>
      <label className="filter-label">{field.label}</label>

      {field.type === "select" ? (
    <Form.Select
  value={field.value ?? ""}
  onChange={field.onChange}
  className="filter-input"
>
  {field.options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</Form.Select>
      ) : (
        <Form.Control
          type={field.type}
          value={field.value}
          onChange={field.onChange}
          placeholder={field.placeholder}
          className="filter-input"
        />
      )}
    </div>
  ))}
</div>
  );
};
export default GlobalFilter;