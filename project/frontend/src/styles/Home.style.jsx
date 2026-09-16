import { styled } from "styled-components";
import Box from "@mui/material/Box";

export const HomeBox = styled(Box)`

width: 90vw;
max-width: 1200px;

.ItemBox {
  display: flex;
  justify-content: center;
  align-items: center; /* center แนวตั้งด้วย */
}
  .IBW80 {
    width:80% !important;
  }
.menu-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.LinkToMNG {
  width: 480px;
  cursor: pointer;
}
.menu-card {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  padding: 22px;
  height: 130px;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 25px rgba(22, 101, 52, 0.08);
}

.menu-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(22, 101, 52, 0.18);
  background: linear-gradient(135deg, #f0fdf4, #ffffff);
}

.menu-icon {
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #e6f4ea, #d1fae5);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.menu-icon img {
  width: 55px;
}
  

.menu-text h5 {
  margin: 0 ;
  font-size: 1.05rem;
  font-weight: 600;
  color: #1f2937;
  text-align:center;
}

.menu-text p {
  margin: 6px 0 0;
  font-size: 0.85rem;
  color: #6b7280;
}
  
.menu-text {
  flex: 1;                
  text-align: center;
}

  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flip-card-front {
    color: black;
  }


  .LinkToMNG:hover {
   opacity:0.8;
  }

  @media screen and (max-width: 680px){
    width:98vw;

    .ItemBox {
      display:flex;
      justify-content: center;
      align-items: center;
      width:100%;
    }
  }
    .menu-text h5 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #166534;
  text-align: center;
}
  .menu-text p {
  margin: 6px 0 0;
  font-size: 0.85rem;
  color: #64748b;
}

.flip-card-back {
  background-color: #166534;  /* แทน dodgerblue */
  color: white;
}

`;