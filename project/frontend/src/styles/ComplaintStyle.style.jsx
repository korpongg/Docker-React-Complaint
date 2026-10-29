import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Dialog } from "@mui/material";

export const ComplaintStyle = styled(Box)`

  color:#000000;
  // min-height:88vh;
  width:960px;
  // padding:5px;
  display:flex;
  flex-direction:column;
  border-radius:5px;
margin:0 auto;
margin-top:20px;
  .MainContainer{
    display:flex;
    flex-direction:column;
    // justify-content:center;
    position: relative;
    width: 100%; 

    // overflow:scroll;
    // border: 1px solid #000;  }
.main-css {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: #FEF2F2;
  padding: 20px 24px;

  border: 1px solid #FECACA;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08);

  margin-top: 10px;
  box-sizing: border-box;
}


.MainContainer2{
display:flex;
    flex-direction:column;
    // justify-content:center;
    position: relative;
    width: 100%; 
    
    background: rgba(236, 249, 238, 1);
    min-height:400px;
    // overflow:scroll;
    // border: 1px solid #000;  
}

  .FormHeader{
    display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  font-size:24px;
  // position: absolute;
  // bottom: 0;
  // width:100%;
  height:50px;
  padding:8px;
  padding-left:15px;
  background: rgba(145, 161, 130, 1);
  background: linear-gradient(90deg, rgba(94, 130, 62, 1) 0%, rgba(193,194,178,1) 100%);
    color:#000000;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
  }




  
  .CheckBoxMain{
    padding-left:25px;
  }
  .GeneralBox {
  background: #fff;
  width:100%;
  border-radius: 8px;
  padding: 24px;
}

.form-label {
  font-weight: 600;
  font-size: 15px;
  color: #2f2f2f;
}

.form-group {
  display: flex;
  flex-direction: column;
}


  .ContentBoxMain{
    display:flex;
    flex-direction:column;
    padding-left:25px;
    padding-right:25px;
    padding-top:10px;
    padding-bottom:10px;
  }
  .FormFooter{
    position:;
    display:flex;
  flex-direction:row;
  justify-content:flex-end;
  align-items:center;
  font-size:12px;
  // position: absolute;
  // bottom: 0;
  // width:100%;
  height:25px;

  padding:12px;
  padding-left:15px;
  background: rgb(155,164,147);
  background: linear-gradient(90deg, rgba(155,164,147,1) 0%, rgba(193,194,178,1) 100%);
    color:#000000;
  }
  .TopicHeader{
    display:flex;
    background: rgb(221,230,214,0.4);
    // background: linear-gradient(180deg, rgba(231,230,214,1) 0%, rgba(254,254,254,1) 90%, rgba(255,255,255,0) 100%);
    color:#000000;
    font-size:18px;
    padding:10px;
    align-items: center;
  }
  .DatetimeBox{
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    border: 0;
    border-bottom: 1px solid rgb(118, 118, 118);
    align-items:left;
    // padding:10px;
    font-size:18px;
    // background: #f1f1f1;
    background:unset;
    padding-left:12px;
    padding-right:50px;
    span{
      padding-left:12px;
      padding-top:10px;
      font-size:12px;
      text-align:left;
      color: rgba(51, 51, 51, 0.87);
    }
    input{
      background:unset;
    }
  }
  input,textarea{
    background:unset;
  }
  input:disabled{
    background:#f1f1f1;
  }
  textarea:disabled{
    background:#f1f1f1;
  }
  .MuiInputBase-root{
    background:unset;
  }
  .MuiInputBase-root:hover{
    background:unset;
  }
  .MuiInputBase-root:focused{
    background:unset;
  }
  .MuiFilledInput-root{
    background:unset;
  }
  .AutoBox{
    width:100%;
    height:80px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    border: 0;
    border-bottom: 1px solid rgb(118, 118, 118);
    align-items:left;
    // padding:10px;
    font-size:18px;
    // background: #f1f1f1;
    background:unset;
    // span{
    //   padding-left:12px;
    //   padding-top:10px;
    //   font-size:12px;
    //   text-align:left;
    //   color: rgba(51, 51, 51, 0.87);
    // }
  }
  .DatetimeInput{
    font: inherit;
    letter-spacing: inherit;
    // width:50px;
    color: rgba(51, 51, 51, 0.87);
    padding: 4px 0 5px;
    border: 0;
    border:1px solid #a6a6a6;
    // border: 1px solid rgb(118, 118, 118);
    border-radius:3px;
    box-sizing: content-box;
    // background: #f1f1f1;
    height: 1.4375em;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
    // display: block;
    // min-width: 0;
    width: 290px;
    -webkit-animation-name: mui-auto-fill-cancel;
    animation-name: mui-auto-fill-cancel;
    -webkit-animation-duration: 10ms;
    animation-duration: 10ms;
    padding-top: 5px;
    padding-right: 12px;
    padding-bottom: 8px;
    padding-left: 12px;
    cursor:text;
  }
  input[type="datetime-local"]::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
    cursor:pointer;
}
  .DatetimeInput:disabled{
    // background: unset;
    background: #f1f1f1;
    color: rgba(0, 0, 0, 0.38);
    // cursor:pointer;
  }
  .DatetimeInput:hover{
    background :#f5f5f5;
  }
  .DatetimeInput:disabled:hover {
    background: #f1f1f1;
    cursor:unset;
}
  .SubmitBTN{
    display:flex;
    justify-content:center;
    align-items: center;

    width:180px;
    height:40px;
    border:2px solid #ffffff;
    border-radius:3px;
    background:#4ecf4e;
    color:#ffffff;
    font-size:30px;
    padding:unset;
    transition:0.35s;
  }
  .SubmitBTN:hover{
    background:#559f55;
    color:#f1f1f1;
  }
  .ConfirmBTN{
    display:flex;
    justify-content:center;
    align-items: center;

    width:180px;
    height:40px;
    border:2px solid #ffffff;
    border-radius:3px;
    background:#4ecf4e;
    color:#ffffff;
    font-size:30px;
    padding:unset;
    transition:0.35s;
  }

  .FormInputBorder{
    // width:95%;
    background: unset;
    border: unset;
  }
  .SETERROR{
    background: #ffe5e580;
    border: 1px solid #ff000080 !important;
    border-radius:5px !important;
  }
  .AreaBOX{
    background: unset;

    border-radius:5px;
    padding:5px;
  }

  .SETERRORBOX{
    background: #ffe5e580;
    border: 1px solid #ff000080 !important;
  }
  .RadioBoxED{
    width:100%;
    height:100%;
    margin:15px;
  }

  .ReportViewStyle{
    color:red;
  }


  .GeneralBox{
    // border:1px solid green;
    display:flex;
    // margin-bottom:10px;
  }
  .ContentBox{
    // border:1px solid red;
    width:100%;
    // display:flex;
    // justify-content: flex-start;
    // text-align: left;
    // align-items: center;
    // span{
    //   border:1px solid blue;
    // }
  }
  .ContentRow{
    // border:1px solid red;
    width:100%;
    display:flex;
    justify-content: flex-start;
    text-align: left;
    min-height:50px;
    align-items: center;
    // span{
    //   border:1px solid blue;
    // }
  }
  .ContentMultiRow{
    // border:1px solid red;
    width:100%;
    display:flex;
    justify-content: flex-start;
    text-align: left;
    height:fit-content;
    align-items: center;
  }
  
  .w30P{
    // border:1px solid blue;
    // padding-left:35px;
    font-size:18px;
    width:30%;
    height:50px;
    display:flex;
    // justify-content: flex-start;
    justify-content: center;
    align-items: center;
    // text-align: left;
  }
  .w70P{
    display:flex;
    justify-content:space-between;
    align-items: center;
    // border:1px solid blue;
    width:70%;
    // padding:5px;
    height:50px;
  }
  .w70PM{
    // display:flex;
    // justify-content:space-between;
    // align-items: center;
    // border:1px solid blue;
    // width:70%;
    // padding:5px;
    // height:50px;
  }
  .TextInputContent{
    font-family: "Mali", sans-serif !important;
    padding:5px;
    font-size:16px;
    width:100%;
    color:#000;
    // color: rgba(51, 51, 51, 0.87);
    margin-right:6px;
    border:1px solid #a6a6a6;
    border-radius:3px;
    // height:30px;
  }
  .TextInputContent:disabled{
    color: rgba(0, 0, 0, 0.38);
  }
  .SyncBTN{
    margin:15px;
    color:#fff;
    width:35px;
    height:35px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .AreaContentBox{
    // width:945px;
    // border:1px solid blue;
    display:flex;
    flex-direction:column;
    justify-content: center;
    padding-left:40px;
  }
  .TextAreaTopic{
    display:flex;
    justify-content: flex-start;
    // justify-content: center;
    align-items: center;
    text-align: left;
    padding-left:15px;
    width:280px;
  }

  .TextAreaInputContent{
    font-family: "Mali", sans-serif !important;
    padding:5px;
    font-size:16px;
    width:860px;
    color:#000;
    margin:6px;
    border:1px solid #a6a6a6;
    border-radius:3px;
    // height:30px;
    display:flex;
    // justify-content: flex-start;
    justify-content: center;
    align-items: center;
    // text-align: left;
  }

  .SelectInput{
    padding:5px;
    font-size:16px;
    background:unset;
    color:inherit;
    font-family: "Mali", sans-serif !important;
    border:1px solid #a6a6a6;
    border-radius:3px;
    width:100%;
    margin-right:6px;
    cursor:pointer;
  }

  .SelectInputDominant{
    padding:5px;
    font-size:18px;
    background:#f1f1f1;
    color:inherit;
    font-family: "Mali", sans-serif !important;
    border:1px solid #a6a6a6;
    border-radius:3px;
    width:100%;
    margin-right:6px;
    cursor:pointer;
  }
  
  .ListSelectTable{
    margin:5px;
    border:1px solid #a6a6a6;
    height:220px;
    overflow:scroll;
  }

  .ListSelectTable_Row{
    display:flex;
    width:100%;
    // border-bottom:1px solid #a6a6a6;
    cursor:pointer
  }

  .ListSelectTable_Row:hover{
    background:rgb(243 243 243);
  }

  .ListSelectTable_Row:first-child{
    background:rgb(243 243 243);
    // width:100%;
    border-bottom:1px solid #a6a6a6;
    // border-bottom:unset ;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .ListSelectTable_Cell{
    width:100%;
    // border:1px solid #fe0;
    padding:4px;
  }

  .MuiAutocomplete-root .Mui-disabled{
    background:#f1f1f1;
    // color:yellow;
    // padding: 9px;
    .MuiButtonBase-root.Mui-disabled{
      background:#cacaca;
      color:#000000;
    }
    .MuiAutocomplete-popupIndicator{
      display:none;
    }
  }
  .MuiInputBase-root.MuiFilledInput-root.Mui-disabled{
    background:#f1f1f1;
  }

  .AccessBox{
    margin:200px;
  }

.TopicHeader {
  background: #b8beaa;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 600;
  color: #1f1f1f;
  border-radius: 8px 8px 0 0;
  margin-top: 32px;
}

.GeneralBox {
  background: #fff;
  border-radius: 0 0 10px 10px;
  padding: 24px 32px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.AreaBOX {
  padding: 8px;
}

.AreaBOX .MuiFilledInput-root {
  background: #f7f7f7;
  border-radius: 8px;
}

.section-label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2c2c2c;
}

.option-block {
  background: #f9faf7;
  padding: 20px 24px;
  border-radius: 10px;
}

.option-group {
  gap: 24px;
}
  .apple-table {
  border-collapse: separate;
  border-spacing: 0 12px;
}

.apple-table thead th {
  border: none;
  font-weight: 500;
  color: #6e6e73;
}

.apple-table tbody tr {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.apple-table td {
  border: none;
  vertical-align: middle;
  padding: 16px;
}

.apple-input {
  height: 48px;
  border-radius: 10px;
}

.apple-delete {
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background: transparent;
  color: #ff3b30;
  font-size: 20px;
}



.section-action {
  display: flex;
  justify-content: flex-end;
}


.field-row {
  display: grid;
  grid-template-columns: 180px 1fr;
  align-items: center;
  gap: 16px;
}

.field-label {
  font-size: 14px;
  color: #6e6e73;
}

.urgent-group {
  display: flex;
  align-items: center;
}

.urgent-date {
  height: 44px;
  width: 180px;
  margin: 0 16px;
  border-radius: 10px;
}




.form-label {
  font-weight: 500;
  margin-bottom: 6px;
}



.form-input {
  height: 48px;
}

.section-label {
  font-weight: 600;
  color: #444;
  padding-top: 6px;
}




.form-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
}

.form-input {
  height: 48px;
}

.section-label {
  font-weight: 500;
  color: #444;
  padding-top: 6px;
}

.field-row {
  display: grid;
  grid-template-columns: 220px 1fr;
  align-items: center;
  margin-bottom: 16px;
}

.field-label {
  font-weight: 500;
  color: #444;
}

.urgent-date {
  width: 180px;
  height: 48px;
}

.section-card {
   position: relative;
  width: 100%;

  margin: 42px 0 34px;
  padding:  20px;

  box-sizing: border-box;

  background: #ffffff;

  /* กรอบเหลืองเข้ม บาง แต่ชัด */
  border: 1px solid #005927ff;
  border-radius: 18px;

  box-shadow:
    0 2px 5px rgba(38, 120, 0, 0.06),
    0 8px 20px rgba(120, 85, 0, 0.05),
    0 18px 40px rgba(0, 0, 0, 0.025);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  overflow: visible;
      

}
.section-card:hover {
transform: translateY(-4px);

  border-color: #257d4aff;

  box-shadow:
    0 5px 10px rgba(50, 120, 0, 0.08),
    0 14px 30px rgba(0, 120, 12, 0.1)
    0 25px 50px rgba(0, 0, 0, 0.04);
}
.section-header {
font-family: "Mali", sans-serif !important;
  color: #004D40; /* เขียวเข้มดูแพง */

  font-weight: 600;
  display: flex;
  align-items: center;
  font-size:15px;
  gap: 15px; /* ระยะห่างจากวงกลม */
}
input[type="text"], .MuiTextField-root {
  background: white !important;
  border-radius: 12px !important;
}
.section-body {
  padding-left: 20px;
  padding-right: 20px;
  margin-top:30px;
  font-size:15px;
}

.field-row {
  margin-bottom: 18px;
  align-items: center;
}

.field-label {
  font-weight: 500;
  color: #555;
}

.field-hint {
  margin-top: 6px;
  font-size: 13px;
  color: #888;
}

.form-input {
  height: 48px;
}

.inline-date {
  height: 48px;
  width: 170px;
  margin-left: 8px;
}

.field-label {
  font-weight: 500;
  color: #444;

  /* กันข้อความแตกตัว */
  white-space: normal;
  word-break: keep-all;
  line-height: 1.6;
}

.field-row {
  margin-bottom: 20px;
}

.field-label {
  width: 100%;          /* ตัวนี้ตัวหลัก */
  white-space: normal;
  word-break: keep-all;
  line-height: 1.6;
  font-weight: 500;

}

.form-input {
  height: 48px;
}

.radio-line {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.inline-date {
  height: 48px;
  width: 180px;
}

.field-hint {
  font-size: 13px;
  color: #666;
  margin-top: 6px;
}

.field-label {
  white-space: nowrap;      /* 🔥 ห้ามขึ้นบรรทัดใหม่ */
  display: flex;
  align-items: center;
}

.radio-line {
  display: flex;
  align-items: center;
  gap: 16px;
}

.inline-date {
  height: 48px;
  line-height: 48px;
  padding: 0 12px;
  box-sizing: border-box;
}
.section-wrapper {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.section-header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
 background: #f0fdf4;
border: 1px solid #bbf7d0;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 12px 12px 0 0;
}

.section-header-main .title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-header-main h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #064e3b;
}

.section-content {
  padding: 20px;
}
.page-bg {
  background: #f8fafc;
  padding: 24px;
  border:1px solid #d2d2d2ff;
}

.card-section {
  background: #ffffff;
  border-radius: 14px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}


.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #065f46;
}

.section-title .dot {
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
}
.form-check-input:checked {
  background-color: #065f46;
  border-color: #065f46;
}
.action-bar {
  bottom: 0;
margin-top:10px;
  border-top: 1px solid #e5e7eb;
  padding: 16px;
  display: flex;
  justify-content: center;
  z-index: 10;
}
.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  border-color: #065f46 !important;
}

.MuiInputLabel-root.Mui-focused {
  color: #065f46 !important;
}

.MuiRadio-root.Mui-checked {
  color: #065f46 !important;
}

.MuiCheckbox-root.Mui-checked {
  color: #065f46 !important;
}

.MuiRadio-root:hover {
  background-color: rgba(6, 95, 70, 0.08);
}


.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
  border-color: #065f46;
}
  .MuiInput-root.Mui-focused:after {
  border-bottom: 2px solid #065f46 !important;
}

/* label ตอน focus */
.MuiInputLabel-root.Mui-focused {
  color: #065f46 !important;
}

/* เส้นล่างตอน hover */
.MuiInput-root:hover:not(.Mui-disabled):before {
  border-bottom: 1px solid #065f46;
}

.MuiInput-underline:after {
  border-bottom: 2px solid #065f46 !important;
}

/* label ตอน focus */
.MuiInputLabel-root.Mui-focused {
  color: #065f46 !important;
}
  .form-input {
  transition: all 0.2s ease;
}

/* hover */
.form-input:hover {
  border-color: #065f46;
}

/* focus */
.form-input:focus {
  border-color: #065f46 !important;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25) !important;
  outline: none;
}


/* hover */
.custom-input:hover:not(:disabled) {
  border-color: #198754;
}

/* focus */
.custom-input:focus:not(:disabled) {
  border-color: #198754 !important;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25) !important;
  outline: none;
}

/* disabled */
.custom-input:disabled {
  background-color: #f8f9fa;
  opacity: 0.8;
  cursor: not-allowed;
}

.custom-input {
  height: 56px;
  margin-left: 12px;

  border-radius: 8px;
  transition: all 0.2s ease;
}

/* 🔥 override bootstrap focus */
.form-control.custom-input:focus {
  border-color: #198754 !important;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25) !important;
  outline: none !important;
}

/* hover */
.form-control.custom-input:hover:not(:disabled) {
  border-color: #198754;
}

/* disabled */
.form-control.custom-input:disabled {
  background-color: #f1f3f5;
  opacity: 0.8;
}

/* สำหรับ Bootstrap InputGroup */
.input-group .form-control {
  border-radius:  3px !important;
}
  .required-badge {
  background: #fee2e2;
  color: #b91c1c;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
}

.btn-add-person {
  border-color: #198754;   /* bootstrap green */
  background-color: transparent;
  color:#198754
}

.btn-add-person:hover {
  background-color: #198754;   /* bootstrap green */
  border-color: #198754;
  color: #fff;
}



.complaint-grid{
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:24px;
    margin-top:24px;
}

@media(max-width:992px){
    .complaint-grid{
        grid-template-columns:1fr;
    }
}

.page-title {
  margin: 20px 0 0;
  padding: 22px 26px;

  background: #ffffff;

  border: 1px solid #e2e8f0;
  border-bottom: none;

  border-radius: 16px 16px 0 0;

  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
}

.page-title-top {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* เลข 01 */
.page-title-index {
  width: 46px;
  height: 46px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: #fffbeb;
  border: 1px solid #fde68a;

  color: #a16207;

  font-size: 15px;
  font-weight: 800;
}

/* กลุ่มข้อความ */
.page-title-content {
  flex: 1;
  min-width: 0;
}

.page-title-eyebrow {
  margin-bottom: 2px;

  font-size: 11px;
  font-weight: 800;

  letter-spacing: 0.14em;

  color: #b45309;
}

.page-title-content h2 {
  margin: 0;

  font-size: 24px;
  line-height: 1.3;

  font-weight: 700;

  color: #1e293b;
}

.page-title-content p {
  margin: 4px 0 0;

  font-size: 13px;
  line-height: 1.5;

  color: #64748b;
}

/* badge ด้านขวา */
.page-title-mode {
  flex-shrink: 0;

  padding: 7px 13px;

  border-radius: 999px;

  background: #f8fafc;
  border: 1px solid #e2e8f0;

  color: #64748b;

  font-size: 12px;
  font-weight: 700;
}

/* =========================
   FORM
========================= */

.page-form {
  background: #f8fafc;

  border: 1px solid #e2e8f0;
  border-top: 1px solid #f1f5f9;

  border-radius: 0 0 16px 16px;

  padding: 18px;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 14px;

  padding-bottom: 16px;
  margin-bottom: 20px;

  border-bottom: 1px solid #e5e7eb;
}

/* =========================
   SECTION NUMBER
========================= */

.section-number {
  position: relative;

  width: 42px;
  height: 42px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: linear-gradient(
    145deg,
    #064e3b 0%,
    #065f46 100%
  );

  color: #ffffff;

  font-family: "Mali", sans-serif;
  font-size: 13px;
  font-weight: 700;

  letter-spacing: 0.04em;

  box-shadow:
    0 3px 8px rgba(6, 78, 59, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

/* เส้น accent เล็ก ๆ ด้านล่างเลข */

.section-number::after {
  content: "";

  position: absolute;

  bottom: -5px;
  left: 50%;

  width: 12px;
  height: 2px;

  transform: translateX(-50%);

  border-radius: 999px;

  background: #10b981;
}


/* =========================
   HEADER CONTENT
========================= */

.section-header-content {
  display: flex;
  flex-direction: column;

  gap: 3px;

  min-width: 0;
}

.section-title {
  font-family: "Mali", sans-serif;

  font-size: 17px;
  font-weight: 700;

  line-height: 1.4;

  color: #064e3b;
}

.section-description {
  font-family: "Mali", sans-serif;

  font-size: 12.5px;
  font-weight: 400;

  line-height: 1.5;

  color: #7b8794;
}

.iYQVTQ .section-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f766e;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-card .MuiFormControlLabel-label {
  font-size: 14px !important;
}
  .form-group-title {
  display: flex;
  align-items: center;
  position: relative;

  padding-left: 14px;

  font-family: "Mali", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  color: #065f46;
}

.form-subdescription {
  margin: -10px 0 18px 19px;

  font-family: "Mali", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #7b8794;
  text-align:left;
}


/* =========================================
   SUB SECTION
========================================= */

.form-subsection {
  position: relative;

  padding: 20px 24px;
  margin-bottom: 18px;

  border: 1px solid #d8e1dc;
  border-radius: 12px;

  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #fcfdfc 100%
  );

  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 4px 10px rgba(15, 23, 42, 0.045);

  box-sizing: border-box;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}


.form-subsection:hover {
  border-color: #c5d4cd;

  box-shadow:
    0 2px 4px rgba(15, 23, 42, 0.05),
    0 6px 14px rgba(6, 78, 59, 0.06);
}

.form-subsection:last-child {
  margin-bottom: 0;
}

.form-subsection + .form-subsection {
  padding-top: 20px;
}


/* หัวข้อย่อย */

.form-subtitle {
  display: flex;
  align-items: center;
  gap: 10px;

  margin: 0 0 6px;

  font-family: "Mali", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;

  color: #065f46;
}


/* คำอธิบาย */

.form-subdescription {
  margin: 0 0 16px 17px;

  font-family: "Mali", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;

  color: #8a949e;

  text-align: left;
}

.form-subtitle-number {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  flex-shrink: 0;

  border-radius: 7px;

  background: #ecfdf5;
  border: 1px solid #a7f3d0;

  color: #047857;

  font-size: 11px;
  font-weight: 700;
}

.section-header-important {
  position: relative;
}

.section-number-important {
  background: linear-gradient(
    145deg,
    #b45309 0%,
    #d97706 100%
  );

  color: #ffffff;

  box-shadow:
    0 4px 10px rgba(180, 83, 9, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.section-number-important span {
  font-size: 17px;
}

.section-title-important {
  color: #92400e;
}

.section-important-badge {
  flex-shrink: 0;

  display: flex;
  align-items: center;

  padding: 6px 12px;

  border-radius: 999px;

  background: #fff7ed;
  border: 1px solid #fed7aa;

  color: #c2410c;

  font-family: "Mali", sans-serif;
  font-size: 11px;
  font-weight: 700;
}
/* =========================================================
   SECTION 08 : FILE UPLOAD
   ========================================================= */

.FileSection {
  width: 100%;
}


/* =========================================================
   FILE SECTION HEADER
   ========================================================= */

.FileSectionHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  margin-bottom: 10px;
}

.FileSectionTitle {
  color: #374151;
  font-family: "Mali", sans-serif;
  font-size: 13px;
  font-weight: 700;
}

.FileSectionHint {
  color: #9ca3af;
  font-family: "Mali", sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.3px;
}


/* =========================================================
   UPLOAD AREA
   ========================================================= */

.FileUploadArea {
  width: 100%;
}


/* =========================================================
   HIDDEN INPUT LABEL
   ========================================================= */

.file-input-label {
  min-height: 50px;

  display: flex;
  align-items: center;
  gap: 18px;

  width: 100%;
  padding: 8px 14px;

  box-sizing: border-box;

  background: #f8faf9;

  border: 1px dashed #b8ccc4;
  border-radius: 9px;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.file-input-label:hover {
  background: #f0f8f5;
  border-color: #059669;

  box-shadow:
    0 3px 10px rgba(6, 95, 70, 0.07);
}


/* =========================================================
   UPLOAD LABEL
   ========================================================= */

.file-selected {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  flex-shrink: 0;

  color: #047857;

  font-family: "Mali", sans-serif;
  font-size: 13px;
  font-weight: 700;
}

.file-selected i {
  font-size: 14px;
}


/* =========================================================
   FILE NAME / PLACEHOLDER
   ========================================================= */

.file-input-label .text {
  min-width: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #7b8794;

  font-family: "Mali", sans-serif;
  font-size: 12px;
  font-weight: 400;
}


/* =========================================================
   REMARK
   ========================================================= */

.remark {
  display: block;

  margin-top: 6px;
  margin-left: 2px;

  color: #9aa5a1;

  font-family: "Mali", sans-serif;
  font-size: 10px;
  line-height: 1.5;
}


/* =========================================================
   IMAGE PREVIEW LIST
   ========================================================= */

.image-preview-list {
  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(150px, 1fr));

  gap: 12px;

  width: 100%;

  margin-top: 16px;
}


/* =========================================================
   IMAGE PREVIEW ITEM
   ========================================================= */

.image-preview-item {
  position: relative;

  width: 100%;
  height: 130px;

  overflow: hidden;

  background: #f8faf9;

  border: 1px solid #dce7e2;
  border-radius: 9px;

  box-shadow:
    0 2px 8px rgba(15, 23, 42, 0.035);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.image-preview-item:hover {
  border-color: #a7c8bb;

  box-shadow:
    0 5px 14px rgba(6, 95, 70, 0.08);

  transform: translateY(-1px);
}


/* =========================================================
   IMAGE
   ========================================================= */

.image-preview {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
}


/* =========================================================
   DELETE BUTTON
   ========================================================= */

.image-delete-btn {
  position: absolute;

  top: 7px;
  right: 7px;

  width: 25px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;

  background: rgba(31, 41, 55, 0.72);

  color: #ffffff;

  font-size: 17px;
  font-weight: 400;

  line-height: 1;

  cursor: pointer;

  backdrop-filter: blur(4px);

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.image-delete-btn:hover {
  background: #dc2626;

  transform: scale(1.08);
}


/* =========================================================
   SUBSECTION SPACING
   ========================================================= */

.form-subsection + .form-subsection {
  margin-top: 26px;
  padding-top: 26px;


}

/* =========================================================
   DOCUMENT UPLOAD
   ========================================================= */

.document-upload-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eef2f0;
}

.document-upload-label {
  background: #fafbf9;
}

.document-upload-label:hover {
  background: #f3f8f5;
}

.document-file-selected {
  color: #065f46;
}

.document-file-selected i {
  font-size: 14px;
}
.document-file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-top: 14px;
}

.document-file-item {
  display: flex;
  align-items: center;
  gap: 12px;

  min-height: 48px;
  padding: 8px 10px;

  box-sizing: border-box;

  background: #fafcfb;

  border: 1px solid #e1e9e5;
  border-radius: 8px;

  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.document-file-item:hover {
  background: #f4f9f6;
  border-color: #b9d3c8;
}

.document-file-icon {
 width: 40px;
  height: 40px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;
  background: #ffffff;
  border: 1px solid #e2e8f0;

  font-size: 20px;
}
.document-file-icon .bi-file-earmark-word {
  color: #2563eb;
}

.document-file-icon .bi-file-earmark-excel {
  color: #16a34a;
}

.document-file-icon .bi-file-earmark-pdf {
  color: #dc2626;
}
.document-file-info {
  min-width: 0;
  flex: 1;
}

.document-file-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: #374151;

  font-family: "Mali", sans-serif;
  font-size: 12px;
  font-weight: 600;
}

.document-file-size {
  margin-top: 2px;

  color: #9ca3af;

  font-family: "Mali", sans-serif;
  font-size: 10px;
}

.document-file-delete {
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  padding: 0;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 6px;

  color: #9ca3af;

  cursor: pointer;

  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.document-file-delete:hover {
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
}

.document-file-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  flex-shrink: 0;
}

.document-file-open,
.document-file-download,
.document-file-delete {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.document-file-open {
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
}

.document-file-open:hover {
  color: #065f46;
  background: #d1fae5;
}

.document-file-download {
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.document-file-download:hover {
  color: #1d4ed8;
  background: #dbeafe;
}

.document-file-delete {
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
}

.document-file-delete:hover {
  color: #ffffff;
  background: #dc2626;
  border-color: #dc2626;
}

.document-file-actions i {
  font-size: 13px;
}

/* =========================
   IMAGE DIALOG
========================= */

.image-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px;

  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(3px);
}

.image-dialog {
  position: relative;

  width: min(900px, 90vw);
  max-height: 90vh;

  background: #ffffff;

  border: 1px solid #e2e8f0;
  border-radius: 14px;

  overflow: hidden;

  box-shadow:
    0 20px 50px rgba(15, 23, 42, 0.18),
    0 5px 15px rgba(15, 23, 42, 0.08);

  animation: imageDialogShow 0.18s ease-out;
}

/* Header */

.image-dialog-header {
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 14px 0 18px;

  box-sizing: border-box;

  background: #ffffff;

  border-bottom: 1px solid #eef2f0;
}

.image-dialog-title {
  display: flex;
  align-items: center;
  gap: 8px;

  font-family: "Mali", sans-serif;
  font-size: 13px;
  font-weight: 700;

  color: #065f46;
}

.image-dialog-title i {
  font-size: 15px;
  color: #047857;
}

/* Close */

.image-dialog-close {
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;
  border-radius: 7px;

  background: transparent;

  color: #64748b;

  cursor: pointer;

  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.image-dialog-close:hover {
  background: #fef2f2;
  color: #dc2626;
}

/* Image area */

.image-dialog-body {
  width: 100%;

  min-height: 300px;
  max-height: calc(90vh - 52px);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px;

  box-sizing: border-box;

  background: #f8fafc;

  overflow: auto;
}

/* ตัวรูปจริง */

.image-dialog-image {
  display: block;

  /* สำคัญ */
  width: auto !important;
  height: auto !important;

  /* จำกัดขนาดรูป */
  max-width: 100%;
  max-height: calc(90vh - 120px);

  object-fit: contain;

  border-radius: 6px;

  box-shadow:
    0 2px 10px rgba(15, 23, 42, 0.08);
}

/* Animation */

@keyframes imageDialogShow {
  from {
    opacity: 0;
    transform: scale(0.96);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* =========================================================
   COMPLAINT RESULT
========================================================= */

.complaint-result-body {
  padding-left: 56px;
  padding-right: 8px;
}

.complaint-result-label {
  font-family: "Mali", sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 12px;
}


/* =========================================================
   MAIN RESULT CARD
========================================================= */

.complaint-result-card {
  position: relative;
  width: 100%;
  box-sizing: border-box;

  margin-bottom: 14px;
  padding: 18px 20px;

  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.complaint-result-card:hover {
  border-color: #cbd5e1;
}

.complaint-result-card.selected {
  border-color: #d6a84f;
  background: #fffdf7;

  box-shadow:
    0 4px 14px rgba(180, 130, 40, 0.08);
}


/* =========================================================
   CARD HEADER
========================================================= */

.complaint-result-card-header {
  display: flex;
  align-items: center;

  min-height: 44px;
  gap: 10px;
}


/* เอา margin default ของ MUI FormControlLabel ออก */

.complaint-result-card-header
.MuiFormControlLabel-root {
  margin-left: 0;
  margin-right: 0;
}


/* =========================================================
   NUMBER
========================================================= */

.complaint-result-number {
  width: 34px;
  height: 34px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: #f8fafc;
  border: 1px solid #e2e8f0;

  color: #64748b;

  font-family: "Mali", sans-serif;
  font-size: 11px;
  font-weight: 700;
}

.complaint-result-card.selected
.complaint-result-number {
  background: #fffbeb;
  border-color: #f3d58a;
  color: #a16207;
}


/* =========================================================
   TITLE
========================================================= */

.complaint-result-heading {
  min-width: 0;
}

.complaint-result-title {
  font-family: "Mali", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;

  color: #334155;
}

.complaint-result-card.selected
.complaint-result-title {
  color: #92400e;
}

.complaint-result-description {
  margin-top: 2px;

  font-family: "Mali", sans-serif;
  font-size: 12px;
  line-height: 1.5;

  color: #94a3b8;
}


/* =========================================================
   CONTENT
========================================================= */

.complaint-result-content {
  margin-top: 14px;
  margin-left: 48px;

  padding: 16px 18px;

  border-top: 1px solid #eef2f7;
  background: #fafbfc;
  border-radius: 10px;
}

.complaint-sub-label {
  margin-bottom: 8px;

  font-family: "Mali", sans-serif;
  font-size: 12px;
  font-weight: 700;

  color: #64748b;
}


/* =========================================================
   RADIO
========================================================= */

.complaint-result-content
.MuiFormControlLabel-root {
  margin-left: 0;
  margin-right: 0;

  margin-bottom: 4px;

  width: 100%;
}

.complaint-result-content
.MuiFormControlLabel-label {
  font-family: "Mali", sans-serif;
  font-size: 13px;
  line-height: 1.6;
  color: #475569;
}


/* =========================================================
   OPTION ROW
========================================================= */

.complaint-option-row {
  padding: 10px 0;

  border-bottom: 1px solid #edf0f3;
}

.complaint-option-row:last-child {
  border-bottom: none;
}

.complaint-option-note {
  margin-left: 34px;
  margin-top: 0;

  font-family: "Mali", sans-serif;
  font-size: 11.5px;
  line-height: 1.6;

  color: #94a3b8;
}

.complaint-inline-control {
  margin: 4px 0 4px 34px;

  max-width: 720px;
}


/* =========================================================
   CAUSE PANEL
========================================================= */

.cause-panel {
  margin-top: 10px;
  margin-left: 34px;

  padding: 16px;

  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;

  opacity: 0.65;
  transition: opacity 0.2s ease,
              border-color 0.2s ease;
}

.cause-panel-active {
  opacity: 1;
  border-color: #e5d29a;
}


.cause-panel-header {
  margin-bottom: 12px;
}

.cause-panel-title {
  font-family: "Mali", sans-serif;
  font-size: 13px;
  font-weight: 700;

  color: #475569;
}

.cause-panel-description {
  margin-top: 2px;

  font-family: "Mali", sans-serif;
  font-size: 11px;

  color: #94a3b8;
}


/* =========================================================
   SPECIAL CAUSE
========================================================= */

.cause-special {
  padding: 10px 12px;

  background: #fafafa;
  border: 1px solid #edf0f3;
  border-radius: 8px;
}

.cause-special
.MuiFormControlLabel-root {
  margin-left: 0;
}


.cause-detail-box {
  margin-top: 10px;
  padding: 16px;

  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}


.cause-field-label {
  font-family: "Mali", sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
}


/* =========================================================
   INFO
========================================================= */

.cause-info {
  margin-top: 14px;
  padding: 10px 12px;

  background: #f8fafc;
  border-radius: 7px;

  font-family: "Mali", sans-serif;
  font-size: 11px;
  line-height: 1.7;

  color: #94a3b8;
}


/* =========================================================
   CAUSE GRID
========================================================= */

.cause-grid {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 4px 20px;

  margin-top: 14px;
  padding-top: 14px;

  border-top: 1px solid #edf0f3;
}

.cause-grid
.MuiFormControlLabel-root {
  margin-left: 0;
  margin-right: 0;

  width: 100%;
}

.cause-grid
.MuiFormControlLabel-label {
  font-family: "Mali", sans-serif;
  font-size: 12px;
  line-height: 1.5;

  color: #64748b;
}


/* =========================================================
   OTHER
========================================================= */

.cause-other {
  display: flex;
  align-items: center;

  gap: 8px;

  min-width: 0;
}

.cause-other
.MuiFormControlLabel-root {
  flex-shrink: 0;
}


/* =========================================================
   THIRD GROUP OTHER
========================================================= */

.complaint-other-inline {
  display: flex;
  align-items: center;
  gap: 12px;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 900px) {

  .complaint-result-body {
    padding-left: 0;
    padding-right: 0;
  }

  .complaint-result-content {
    margin-left: 0;
  }

  .cause-grid {
    grid-template-columns: 1fr;
  }

  .complaint-inline-control {
    margin-left: 0;
  }

  .complaint-option-note {
    margin-left: 0;
  }

  .cause-panel {
    margin-left: 0;
  }

}

@media (max-width: 600px) {

  .complaint-result-card {
    padding: 14px;
  }

  .complaint-result-card-header {
    align-items: flex-start;
  }

  .complaint-result-title {
    font-size: 13px;
  }

  .complaint-result-description {
    font-size: 11px;
  }

  .complaint-other-inline {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .complaint-other-inline .custom-input {
    width: 100% !important;
  }

}

.section-title {
  margin-bottom: 0 !important;
}

/* =========================================================
   VIEW — STEP 01 : COMPLAINT
   Premium Document View
========================================================= */

.cv-container {
  width: 100%;
  box-sizing: border-box;



  font-family: "Mali", sans-serif;
  color: #1f2937;
}

.cv-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}


/* =========================================================
   SECTION CARD
========================================================= */

.cv-container .section {
  position: relative;

  width: 100%;
  box-sizing: border-box;

  background: #ffffff;

  border: 1px solid #e2e8f0;
  border-radius: 14px;

  padding: 20px 22px;

  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.03),
    0 5px 16px rgba(15, 23, 42, 0.035);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.cv-container .section:hover {
  border-color: #d5dce5;

  box-shadow:
    0 2px 4px rgba(15, 23, 42, 0.04),
    0 8px 22px rgba(15, 23, 42, 0.05);
}


/* =========================================================
   SECTION TITLE
========================================================= */

.cv-container .section-title {
  position: relative;

  display: flex;
  align-items: center;

  min-height: 30px;

  margin: 0 0 18px !important;
  padding: 0 0 12px 15px;

  border-bottom: 1px solid #eef2f7;

  font-family: "Mali", sans-serif;

  font-size: 15px;
  font-weight: 700;

  line-height: 1.5;

  color: #334155;
}


/* accent bar ด้านซ้าย */

.cv-container .section-title::before {
  content: "";

  position: absolute;

  left: 0;
  top: 2px;

  width: 4px;
  height: 24px;

  border-radius: 999px;

  background: linear-gradient(
    180deg,
    #dc2626 0%,
    #991b1b 100%
  );
}


/* =========================================================
   INFO ROW
========================================================= */

.cv-container .info-row {
  display: grid;

  grid-template-columns: 165px minmax(0, 1fr);

  align-items: center;

  min-height: 48px;

  padding: 8px 0;

  border-bottom: 1px solid #f1f5f9;
}

.cv-container .info-row:last-child {
  border-bottom: none;
}


/* label */

.cv-container .info-row-label {
  padding-right: 18px;

  font-family: "Mali", sans-serif;

  font-size: 12px;
  font-weight: 600;

  color: #64748b;
}


/* value */

.cv-container .info-row-value {
  min-width: 0;

  font-family: "Mali", sans-serif;

  font-size: 13px;
  font-weight: 500;

  line-height: 1.7;

  color: #1f2937;

  word-break: break-word;
}


/* =========================================================
   VALUE HIGHLIGHT
========================================================= */

.cv-container .info-row-value strong {
  font-weight: 700;
}


/* =========================================================
   WORKFLOW SECTION
========================================================= */

.cv-container .section:has(.tag-group) {
  background:
    linear-gradient(
      180deg,
      #ffffff 0%,
      #fcfdfd 100%
    );
}


/* =========================================================
   TAG GROUP
========================================================= */

.cv-container .tag-group {
  display: grid;

  grid-template-columns: 145px minmax(0, 1fr);

  align-items: center;

  min-height: 52px;

  padding: 9px 0;

  border-bottom: 1px solid #f1f5f9;
}

.cv-container .tag-group:last-child {
  border-bottom: none;
}


/* ชื่อกลุ่ม */

.cv-container .tag-group-title {
  font-family: "Mali", sans-serif;

  font-size: 12px;
  font-weight: 700;

  color: #64748b;
}


/* กลุ่ม tag */

.cv-container .tag-group-items {
  display: flex;

  flex-wrap: wrap;

  align-items: center;

  gap: 7px;
}


/* =========================================================
   TAG
========================================================= */

.cv-container .tag {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-height: 30px;

  padding: 5px 11px;

  border-radius: 7px;

  background: #f8fafc;

  border: 1px solid #e2e8f0;

  color: #475569;

  font-family: "Mali", sans-serif;

  font-size: 11px;
  font-weight: 600;

  line-height: 1.4;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.cv-container .tag:hover {
  background: #f1f5f9;

  border-color: #cbd5e1;

  transform: translateY(-1px);
}


/* =========================================================
   STATUS / BADGE
========================================================= */

.cv-container .status-badge {
  display: inline-flex;

  align-items: center;

  width: fit-content;

  min-height: 30px;

  padding: 5px 11px;

  border-radius: 999px;

  background: #fef2f2;

  border: 1px solid #fecaca;

  color: #b91c1c;

  font-family: "Mali", sans-serif;

  font-size: 11px;
  font-weight: 700;
}


/* =========================================================
   LONG TEXT / REMARK
========================================================= */

.cv-container .info-row-value.text-long {
  padding: 11px 13px;

  background: #f8fafc;

  border: 1px solid #eef2f7;

  border-radius: 9px;

  line-height: 1.8;
}


/* =========================================================
   RESPONSE REQUIREMENT
========================================================= */

.cv-container .section:last-child .info-row-value {
  color: #334155;
}


/* =========================================================
   EMPTY VALUE
========================================================= */

.cv-container .empty-value {
  color: #94a3b8;

  font-style: normal;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 768px) {

  .cv-container {
    padding: 4px 0 24px;
  }

  .cv-container .section {
    padding: 17px;
    border-radius: 12px;
  }

  .cv-container .section-title {
    font-size: 14px;
  }

  .cv-container .info-row {
    grid-template-columns: 1fr;

    gap: 5px;

    padding: 10px 0;
  }

  .cv-container .info-row-label {
    padding-right: 0;

    font-size: 11px;
  }

  .cv-container .info-row-value {
    font-size: 12px;
  }

  .cv-container .tag-group {
    grid-template-columns: 1fr;

    gap: 7px;

    padding: 11px 0;
  }

  .cv-container .tag-group-title {
    font-size: 11px;
  }
}

/* =========================================================
   SECTION 05
   หน่วยงานและบุคคลที่ถูกร้องเรียน
   CSS ONLY
   ========================================================= */

/* ตารางหลัก */
.appeal-person-table {
  width: 100%;
  margin-top: 10px;
  border: 1px solid #e3e8ed;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

/* Header */
.appeal-person-table thead th {
  padding: 11px 14px !important;

  background: #f7f9fb !important;
  color: #566170 !important;

  border-color: #e5e9ee !important;

  font-family: "Mali", sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.4;
  vertical-align: middle;
}

/* ให้สัดส่วนใกล้ของเดิม แต่จัดให้เหมาะกับเนื้อหา */
.appeal-person-table thead th:nth-child(1) {
  width: 5%;
  text-align: center;
}

.appeal-person-table thead th:nth-child(2) {
  width: 23%;
}

.appeal-person-table thead th:nth-child(3) {
  width: 27%;
}

.appeal-person-table thead th:nth-child(4) {
  width: 45%;
}

/* Body */
.appeal-person-table tbody td {
  padding: 10px 12px !important;

  border-color: #edf0f3 !important;
  background: #ffffff;

  vertical-align: middle;
}

/* ลำดับ */
.appeal-person-table tbody td:first-child {
  color: #8b95a1;
  font-family: "Mali", sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
}

/* =========================================================
   ชื่อ
   ========================================================= */

.appeal-person-table tbody td:nth-child(2) {
  min-width: 150px;
}

.appeal-person-table tbody td:nth-child(2) .custom-input {
  width: 100% !important;
  height: 42px !important;

  box-sizing: border-box;

  padding: 8px 11px !important;

  border: 1px solid #dfe4e9 !important;
  border-radius: 7px !important;

  background: #ffffff !important;

  color: #293548;
  font-family: "Mali", sans-serif;
  font-size: 13px;

  box-shadow: none !important;
}

.appeal-person-table tbody td:nth-child(2) .custom-input:focus {
  border-color: #78a796 !important;

  box-shadow:
    0 0 0 3px rgba(6, 95, 70, 0.07) !important;
}

.appeal-person-table tbody td:nth-child(2) .custom-input::placeholder {
  color: #aab2bc;
}

/* =========================================================
   แผนก
   ========================================================= */

.appeal-person-table tbody td:nth-child(3) {
  min-width: 190px;
}

/* =========================================================
   สังกัด
   ========================================================= */

.appeal-person-table tbody td:nth-child(4) {
  position: relative;

  min-width: 350px;

  padding-right: 38px !important;
}

/* RadioGroup เดิมของคุณ */
.appeal-person-table tbody td:nth-child(4) .MuiRadioGroup-root {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 0 4px;

  padding: 4px !important;
}

/* แต่ละตัวเลือก */
.appeal-person-table tbody td:nth-child(4) .MuiFormControlLabel-root {
  margin: 0 !important;
  padding: 2px 4px !important;

  min-height: 32px;
}

/* Radio */
.appeal-person-table tbody td:nth-child(4) .MuiRadio-root {
  padding: 5px !important;
}

/* Text */
.appeal-person-table tbody td:nth-child(4) .MuiFormControlLabel-label {
  color: #4f5b68;

  font-family: "Mali", sans-serif;
  font-size: 11px;
  line-height: 1.4;

  white-space: nowrap;
}

/* =========================================================
   ปุ่มลบ
   ========================================================= */

.appeal-person-table tbody td:nth-child(4) .btndelete {
  position: absolute !important;

  top: 7px !important;
  right: 6px !important;

  width: 24px;
  height: 24px;
  min-width: 24px !important;

  padding: 0 !important;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none !important;
  border-radius: 6px !important;

  background: transparent !important;

  color: #aeb6bf !important;

  font-size: 20px !important;
  line-height: 1 !important;
}

.appeal-person-table tbody td:nth-child(4) .btndelete:hover {
  background: #fff1f1 !important;
  color: #d34b4b !important;
}

/* =========================================================
   ปุ่ม + เพิ่มรายชื่อ
   ========================================================= */

.btn-add-person {
  border: 1px solid #d5e3de !important;
  border-radius: 7px !important;

  background: #f7faf9 !important;
  color: #17644f !important;

  font-family: "Mali", sans-serif !important;
  font-size: 12px !important;
  font-weight: 700 !important;

  padding: 7px 13px !important;

  box-shadow: none !important;
}

.btn-add-person:hover {
  background: #edf6f2 !important;
  border-color: #bfd5cd !important;
  color: #0d5944 !important;
}

/* =========================================================
   Mobile / จอแคบ
   ========================================================= */

@media (max-width: 900px) {
  .appeal-person-table {
    min-width: 760px;
  }
}

.appeal-person-table th:nth-child(1),
.appeal-person-table td:nth-child(1) {
  width: 5%;
}

.appeal-person-table th:nth-child(2),
.appeal-person-table td:nth-child(2) {
  width: 40%;
}

.appeal-person-table th:nth-child(3),
.appeal-person-table td:nth-child(3) {
  width: 35%;
}

.appeal-person-table th:nth-child(4),
.appeal-person-table td:nth-child(4) {
  width: 20%;
}
  
/* ===== Risk Type Section ===== */
.risk-type-section {
  --risk-border: #e5e7eb;
  --risk-text: #273449;
  --risk-muted: #7b8798;
  --risk-gold: #b7791f;
  --risk-red: #b91c1c;
}

.risk-detail-button {
  margin-left: auto;
  flex-shrink: 0;
  padding: 8px 14px;
  border: 1px solid #e8d6a2;
  border-radius: 9px;
  background: #fffbeb;
  color: #946200;
  font-size: 13px;
  font-weight: 650;
  transition: 0.2s ease;
}

.risk-detail-button:hover {
  background: #fef3c7;
  border-color: #d6b656;
}

.risk-type-cards {
  display: flex;
  gap: 14px;
  margin-bottom: 26px;
}

.risk-type-card {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 16px 18px;
  border: 1px solid var(--risk-border);
  border-radius: 13px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease,
    box-shadow 0.2s ease;
        width: fit-content
}

.risk-type-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgb(15 23 42 / 5%);
}

.risk-type-card.general.active {
  border-color: #d6b656;
  background: linear-gradient(135deg, #fffdf6, #fffbeb);
  box-shadow: inset 0 0 0 1px rgb(183 121 31 / 8%);
}

.risk-type-card.clinical.active {
  border-color: #e5a0a0;
  background: linear-gradient(135deg, #fffafa, #fef2f2);
  box-shadow: inset 0 0 0 1px rgb(185 28 28 / 5%);
}

.risk-type-card-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.risk-type-card-title {
  color: var(--risk-text);
  font-size: 13px;
  font-weight: 750;
}

.risk-type-card.active.general .risk-type-card-title {
  color: #946200;
}

.risk-type-card.active.clinical .risk-type-card-title {
  color: var(--risk-red);
}

.risk-type-card-subtitle {
  color: var(--risk-muted);
  font-size: 12px;
}

.risk-type-check {
  display: grid;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  place-items: center;
  border: 1px solid #d1d5db;
  border-radius: 50%;
  color: #fff;
  font-size: 13px;
}

.risk-type-card.general.active .risk-type-check {
  border-color: var(--risk-gold);
  background: var(--risk-gold);
}

.risk-type-card.clinical.active .risk-type-check {
  border-color: var(--risk-red);
  background: var(--risk-red);
}

/* ===== Risk Tabs ===== */
.risk-level-panel {
  overflow: hidden;
  border: 1px solid #e5eaf0;
  border-radius: 15px;
  background: #fff;
}

.risk-level-heading {
  padding: 20px 22px 16px;
  border-bottom: 1px solid #edf0f3;
  background: linear-gradient(180deg, #fff, #fafbfd);
}

.risk-level-title {
  color: var(--risk-text);
  font-size: 16px;
  font-weight: 750;
}

.risk-level-description {
  margin-top: 5px;
  color: var(--risk-muted);
  font-size: 12px;
}

.risk-level-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #e9edf2;
  background: #f8fafc;
}

.risk-level-tab {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 11px;
  min-width: 0;
  padding: 13px 16px;
  border: 1px solid transparent;
  border-bottom: 3px solid transparent;
  border-radius: 10px 10px 0 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;
}

.risk-level-tab.general.active {
  border-color: #eee3c6;
  border-bottom-color: #b7791f;
  background: #fffdf7;
}

.risk-level-tab.clinical.active {
  border-color: #f2dada;
  border-bottom-color: #b91c1c;
  background: #fffafa;
}

.risk-tab-dot {
  width: 9px;
  height: 9px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #cbd5e1;
}

.risk-level-tab.general.active .risk-tab-dot {
  background: #b7791f;
  box-shadow: 0 0 0 4px #f8edce;
}

.risk-level-tab.clinical.active .risk-tab-dot {
  background: #b91c1c;
  box-shadow: 0 0 0 4px #fee2e2;
}

.risk-level-tab > span:last-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.risk-tab-title {
  color: var(--risk-text);
  font-size: 13px;
  font-weight: 750;
}

.risk-tab-subtitle {
  color: var(--risk-muted);
  font-size: 11px;
}

.risk-level-content {
  padding: 20px;
}

.risk-content-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid #edf0f3;
}

.risk-content-icon {
  display: grid;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 12px;
  background: #fef3c7;
  color: #946200;
  font-weight: 800;
}

.risk-level-content.clinical .risk-content-icon {
  background: #fee2e2;
  color: #b91c1c;
}

.risk-content-title {
  color: var(--risk-text);
  font-size: 15px;
  font-weight: 750;
}

.risk-content-subtitle {
  margin-top: 4px;
  color: var(--risk-muted);
  font-size: 12px;
}

.clinical-risk-group + .clinical-risk-group {
  margin-top: 22px;
}

.clinical-risk-group-title {
  margin-bottom: 9px;
  padding: 9px 12px;
  border-radius: 0 7px 7px 0;
  font-size: 13px;
  font-weight: 750;
}

.risk-option-label {
  display: flex;
  flex: 1;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 0;
}

.risk-option-code {
  display: inline-flex;
  min-width: 34px;
  min-height: 30px;
  align-items: center;
  justify-content: center;
  padding: 4px 9px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 800;
}

.risk-option-description {
  flex: 1;
  min-width: 180px;
  color: #374151;
  font-size: 13px;
  line-height: 1.75;
}

.risk-option-badge {
  padding: 5px 9px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 650;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .risk-type-cards {
    grid-template-columns: 1fr;
  }

  .risk-level-tabs {
    flex-direction: column;
    padding: 10px;
  }

  .risk-level-tab {
    border: 1px solid #e5e7eb;
    border-radius: 9px;
  }

  .risk-level-tab.general.active {
    border-color: #d6b656;
  }

  .risk-level-tab.clinical.active {
    border-color: #e5a0a0;
  }

  .risk-level-content {
    padding: 13px;
  }

  .risk-option-description {
    min-width: 100%;
  }

  .risk-option-badge {
    margin-left: 44px;
  }

  .risk-detail-button {
    padding: 7px 10px;
    font-size: 12px;
  }
}
.gi-info-label {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 4px;
}
    .RiskFieldLabel {
   margin-right: 10px;
  }

`;
