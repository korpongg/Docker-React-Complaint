import styled from "styled-components";

export const ComplaintViewStyle = styled.div`

.page-bg {
  background:#f8fafc;
  padding:16px;
}


.card-section {
  background:#fff;
  border-radius:12px;
  padding:18px;
  border:1px solid #e5e7eb;
}


/* grid */
.complaint-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:16px;
  margin-top:16px;
}


/* card */
.complaint-card{
  background:#fff;
  border:1px solid #e5e7eb;
  border-radius:10px;
  overflow:hidden;

  box-shadow:
  0 2px 8px rgba(15,23,42,.04);
}


/* header */
.complaint-card-header{

  display:flex;
  align-items:center;

  gap:10px;

  padding:12px 16px;

  background:#f8fafc;

  border-bottom:1px solid #e5e7eb;
}


/* title */
.complaint-card-title{

  font-size:17px;

  font-weight:700;

  color:#0f766e;

}


/* body */
.complaint-card-body{

  padding:16px 18px;

}



/* row */
.info-row-new{

  display:flex;

  align-items:flex-start;

  padding:10px 0;

  border-bottom:1px dashed #e5e7eb;

  font-size:14px;

}


.info-row-new:last-child{
 border-bottom:none;
}


/* label */
.info-label-new{

  width:150px;

  flex-shrink:0;

  color:#64748b;

  font-weight:600;

}


/* value */
.info-value-new{

  flex:1;

  color:#1e293b;

  font-weight:600;

  line-height:1.6;

}


/* full width */
.complaint-card-full{

 grid-column:1/-1;

}


/* summary */
.summary-box{

 min-height:120px;

 padding:16px;

 background:#f8fafc;

 border-radius:10px;

 border:1px solid #e2e8f0;

 font-size:15px;

 line-height:1.8;

}



/* responsive */
@media(max-width:992px){

.complaint-grid{

 grid-template-columns:1fr;

}

}


.complaint-summary-card{
    border:2px solid #FDE68A;
    background:linear-gradient(180deg,#FFFDF7 0%,#FFFFFF 100%);
}

/* Header */
.complaint-summary-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:20px;
    background:#FFFBEB;
    border-bottom:1px solid #FDE68A;
}

.summary-left{
    display:flex;
    align-items:center;
    gap:14px;
}

.summary-subtitle{
    font-size:12px;
    font-weight:700;
    letter-spacing:.12em;
    color:#B45309;
    text-transform:uppercase;
    margin-bottom:4px;
}
.cv-container{
  padding:24px;
  background:#f1f5f9;
}

/* stack layout */
.cv-stack{
  display:flex;
  flex-direction:column;
  gap:20px;
}

/* card section */
.section{
  background:#ffffff;
  border-radius:14px;
  padding:20px 22px;
  box-shadow:0 4px 14px rgba(0,0,0,0.04);
  border:1px solid #e2e8f0;
}

/* title */
.section-title{
  font-size:15px;
  font-weight:700;
  color:#0f766e;
  margin-bottom:14px;
  display:flex;
  align-items:center;
  gap:8px;
}

/* row */
.info-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:10px 0;
}

/* label */
.info-label{
  color:#64748b;
  font-size:13px;
}

/* value */
.info-value{
  color:#0f172a;
  font-weight:600;
  font-size:14px;
}

/* divider (แทน dashed เดิม) */
.info-row + .info-row{
  border-top:1px solid #f1f5f9;
}

/* tag group */
.tag-group{
  margin-top:10px;
}

.tag-title{
  font-size:12px;
  color:#94a3b8;
  margin-bottom:6px;
}

/* tag style ใหม่ */
.tag{
  background:#ecfdf5;
  color:#065f46;
  border:1px solid #a7f3d0;
  padding:6px 12px;
  border-radius:999px;
  font-size:12px;
  font-weight:600;
}

/* spacing tag */
.tag-list{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}


/* tag หน่วยงาน */
.tag-dept{
  background:#eef2ff;
  color:#3730a3;
  border:1px solid #c7d2fe;
  padding:6px 12px;
  border-radius:999px;
  font-size:12px;
  font-weight:600;
}

/* spacing */
.info-value .tag-list{
  margin-top:4px;
}
  .complaint-section{
  background:#fff;
  border-radius:16px;
  padding:18px 20px;
  margin-bottom:16px;

  box-shadow:0 2px 8px rgba(0,0,0,0.04);
}

/* header */
.section-header{
  display:flex;
  align-items:center;
  gap:10px;

  font-weight:600;
  font-size:16px;
  color:#0f172a;

  margin-bottom:12px;
}

/* content */
.section-content{
  font-size:14px;
  color:#334155;
  line-height:1.8;
}

/* text block */
.text-content{
  white-space:pre-line;
  padding-left:4px;
}

/* container ของ tag */
.dept-aff-list{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  margin-top:6px;
}

/* ตัว tag */
.dept-aff{
  display:inline-flex;
  align-items:center;
  gap:6px;

  padding:6px 12px;
  border-radius:999px;

  font-size:12.5px;
  font-weight:600;

 background:#e0f2fe;
  color:#075985;
  border:1px solid #bae6fd;


  transition:all .15s ease;
}

/* hover ให้มันมีชีวิตนิดนึง */
.dept-aff:hover{
  background:#e2e8f0;
  border-color:#cbd5f5;
}

/* ถ้าอยากเน้น (active / selected) */
.dept-aff.active{
  background:#ecfdf5;
  color:#065f46;
  border-color:#86efac;
}

/* label (หัวข้อ) */
.dept-aff-label{
  font-size:12px;
  color:#64748b;
  margin-bottom:4px;
}

.view-page{
  display:flex;
  flex-direction:column;
  gap:16px;
}

.view-header{
  display:flex;
  justify-content:space-between;
  align-items:center;

  background:#f0fdf4;
  border:1px solid #bbf7d0;
  border-left:5px solid #16a34a;

  padding:12px 16px;
  border-radius:12px;
}

.view-title-main{
  display:flex;
  align-items:center;
  gap:8px;

  font-weight:700;
  color:#14532d;
}

.view-stack{
  display:flex;
  flex-direction:column;
  gap:16px;
}

.view-section{
  background:#fff;
  border-radius:14px;
  padding:18px;
  border:1px solid #e5e7eb;

  display:flex;
  flex-direction:column;
  gap:12px;
}

.view-title{
  display:flex;
  align-items:center;
  gap:10px;
  font-weight:600;
}

.badge-wrap{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}

.badge{
  padding:6px 14px;
  border-radius:999px;

  font-size:13px;
  background:#f1f5f9;
}

.badge.active{
  background:#dcfce7;
  color:#166534;
  border:1px solid #86efac;
}

.sub-box{
  margin-top:10px;
  padding:12px;
  background:#f8fafc;
  border-radius:10px;
}

.sub-title{
  font-weight:600;
  margin-bottom:6px;
}

.info-box{
  margin-top:10px;
  font-size:13px;
  color:#475569;
}

.text-box{
  padding:12px;
  background:#f8fafc;
  border-radius:10px;
}
.badge{
  padding:6px 14px;
  border-radius:999px;

  font-size:13px;

  background:#e0f2fe;   /* ฟ้าอ่อนนุ่มขึ้น */
  color:#334155;        /* เทาเข้ม อ่านง่ายขึ้น */
  border:1px solid #bae6fd; /* เพิ่มมิติ */
}

.badge.active{
  background:#dcfce7;   /* เขียวนุ่ม */
  color:#166534;        /* เขียวเข้มอ่านชัด */
  border:1px solid #86efac;
}


.analysis-card {
  margin-top: 15px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #dbe4ea;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}


.analysis-header {
  padding: 18px 22px;
  background: linear-gradient(
    135deg,
    #ecfdf5,
    #f0fdf4
  );
  border-bottom: 1px solid #dcfce7;
}


.analysis-main {
  font-size: 1rem;
  font-weight: 700;
  color: #166534;
  line-height: 1.7;
}


.analysis-detail {
  padding: 20px 22px;
}


.detail-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 8px;
}


.detail-text {
  font-size: 0.95rem;
  color: #1e293b;
  line-height: 1.9;
  background: #f8fafc;
  padding: 16px 18px;
  border-radius: 12px;
  border-left: 4px solid #22c55e;
}
.upload-label {
  font-weight:700;
  color:#334155;
  margin-bottom:12px;
}


.upload-input {
  border:2px dashed #cbd5e1 !important;
  border-radius:14px !important;
  padding:16px !important;
  background:#f8fafc;

  transition:.2s ease;
}


.upload-input:hover{
  border-color:#10b981 !important;
  background:#ecfdf5;
}


.upload-input::file-selector-button{

  background:#059669;
  color:white;

  border:none;
  padding:10px 18px;

  border-radius:10px;

  font-weight:600;

  cursor:pointer;

  margin-right:15px;

}


.upload-text{
  margin-top:8px;
  font-size:13px;
  color:#64748b;
}



/* =========================
 IMAGE PREVIEW
========================= */

.image-preview-list{

  display:grid;

  grid-template-columns:
  repeat(auto-fill,minmax(160px,1fr));

  gap:16px;

  margin-top:20px;

}



.image-preview-item{

  position:relative;

  height:170px;

  border-radius:16px;

  overflow:hidden;

  background:#f8fafc;

  border:1px solid #e2e8f0;

  box-shadow:
  0 4px 12px rgba(15,23,42,.06);


  transition:.2s ease;

}


.image-preview-item:hover{

  transform:translateY(-3px);

  box-shadow:
  0 8px 20px rgba(15,23,42,.12);

}



/* รูป */

.image-preview{


  width:100%;

  height:100%;

  object-fit:cover;

  display:block;

}



/* ปุ่มลบ */

.image-delete-btn{

  position:absolute;

  top:8px;

  right:8px;


  width:30px;

  height:30px;


  border-radius:50%;

  border:none;


  background:#ef4444;

  color:white;


  font-size:20px;

  font-weight:bold;


  display:flex;

  align-items:center;
  justify-content:center;


  cursor:pointer;


  box-shadow:
  0 4px 10px rgba(0,0,0,.2);


  transition:.2s;

}


.image-delete-btn:hover{

  background:#dc2626;

  transform:scale(1.1);

}
  

.upload-section{

  background:#fff;

  border:1px solid #e5e7eb;

  border-radius:14px;

  padding:18px;

}



.upload-title{

  display:flex;

  align-items:center;

  gap:10px;

  font-size:15px;

  font-weight:700;

  color:#334155;

  margin-bottom:14px;

}


.upload-title i{

  width:32px;
  height:32px;

  display:flex;

  align-items:center;
  justify-content:center;

  border-radius:10px;

  background:#ecfdf5;

  color:#16a34a;

}



.upload-title span{

  color:#94a3b8;

  font-size:13px;

  font-weight:500;

}



.upload-input{

  background:#f8fafc;

}

.image-gallery{

  display:grid;

  grid-template-columns:
  repeat(auto-fill,minmax(180px,1fr));

  gap:16px;

}


.image-gallery-item{

  height:180px;

  border-radius:12px;

  overflow:hidden;

  border:1px solid #e5e7eb;

  background:#f8fafc;

}


.image-gallery-item img{

  width:100%;

  height:100%;

  object-fit:cover;

  cursor:pointer;

  transition:.25s;

}


.image-gallery-item img:hover{

  transform:scale(1.05);

}

.image-gallery-item {
  cursor: zoom-in;
}

.image-gallery-item img {
  transition: transform 0.2s ease;
}

.image-gallery-item:hover img {
  transform: scale(1.03);
}


/* =========================
   IMAGE MODAL
========================= */

.image-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;

  background: rgba(0, 0, 0, 0.85);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;

  cursor: zoom-out;
}

.image-modal-preview {
  max-width: 90vw;
  max-height: 90vh;

  object-fit: contain;

  border-radius: 8px;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  cursor: default;
}

.image-modal-close {
  position: absolute;

  top: 20px;
  right: 25px;

  width: 45px;
  height: 45px;

  border: none;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.15);
  color: white;

  font-size: 30px;

  /* สำคัญ */
  display: flex;
  align-items: center;
  justify-content: center;

  /* ไม่ใช้ line-height เดิม */
  line-height: 1;

  padding: 0;

  cursor: pointer;

  transition: all 0.2s ease;
}

.image-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.08);
}
`;