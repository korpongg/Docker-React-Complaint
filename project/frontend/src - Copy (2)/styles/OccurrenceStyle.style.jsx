import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Dialog } from "@mui/material";

export const ComplaintStyle = styled(Box)`
  background:#ffffff;
  color:#000000;
  // min-height:88vh;
  width:960px;
  // padding:5px;
  display:flex;
  flex-direction:column;
  border-radius:5px;
  margin-bottom:30px;
  .MainContainer{
    display:flex;
    flex-direction:column;
    // justify-content:center;
    position: relative;
    width: 100%; 
    
    background: rgba(236, 249, 238, 1);
    min-height:200px;
    // overflow:scroll;
    // border: 1px solid #000;  }

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
    border: unset ;
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

.option-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  row-gap: 12px;
  column-gap: 24px;
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

.option-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap: 12px 24px;
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
background: white; /* ขาวใส */
border-left: 6px solid #065f46;

padding: 24px 28px;

  margin-top: 15px;
  color: #1f2937;
font-weight: 400;
box-shadow: 0 4px 12px rgba(0,0,0,0.06);

transition: all 0.2s ease;

}
.section-card:hover {
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}
.section-header {
font-family: "Mali", sans-serif !important;
  color: #004D40; /* เขียวเข้มดูแพง */
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
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
  background: #ffffff;
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



/* Detail */

`;
