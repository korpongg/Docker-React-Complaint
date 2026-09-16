import { styled } from "styled-components";
import Box from "@mui/material/Box";

export const GloballFilterStyle = styled(Box)`
.filter-container {
  padding: 20px 24px;

  border-radius: 16px;
  border: 1px solid #e2e8f0;

  background:#fff;

border:1px solid #d9e3ef;

box-shadow:
0 8px 30px rgba(15,118,110,.05);

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}




  /* field */
  .filter-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 220px;
    flex: 1;
  }

  /* label */
  .filter-label {
font-size:13px;
font-weight:600;
color:#475569;
margin-bottom:6px;
}

.filter-input{

height:46px!important;

background:#fff;

border:1px solid #d8dee9!important;

border-radius:12px!important;

padding:0 14px;

font-size:14px;

transition:.25s;
}

.filter-input:hover{

border-color:#94a3b8!important;

box-shadow:0 4px 10px rgba(0,0,0,.03);

}

.filter-input:focus{

border-color:#0f766e!important;

box-shadow:
0 0 0 4px rgba(15,118,110,.12);

}

  /* placeholder */
  .filter-input::placeholder {
    color: #94a3b8;
  }

  /* responsive */
  @media (max-width: 768px) {
    .filter-field {
      min-width: 100%;
    }
  }
.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: -20px -24px 20px;
  padding: 14px 22px;

  background: linear-gradient(
    135deg,
    #0f766e 0%,
    #0b5d56 100%
  );

  border-radius: 16px 16px 0 0;

  border-bottom: 1px solid rgba(255,255,255,.08);
}

.filter-header .title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
}

.filter-header .sub {
  font-size: 12px;
  color: rgba(255,255,255,.82);
  margin-left: 8px;
}
.filter-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.filter-field {
  flex: 1 1 calc(16.66% - 12px); /* 6 ช่อง */
  min-width: 180px;
}

@media (max-width: 1200px) {
  .filter-field {
    flex: 1 1 calc(25% - 12px); /* 4 ช่อง */
  }
}

@media (max-width: 768px) {
  .filter-field {
    flex: 1 1 calc(50% - 12px); /* 2 ช่อง */
  }
}

@media (max-width: 480px) {
  .filter-field {
    flex: 1 1 100%; /* 1 ช่อง */
  }
}

.filter-body{

    padding:22px 24px;

}
`;