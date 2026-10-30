import { styled } from "styled-components";
import Box from "@mui/material/Box";

export const HomeBox = styled(Box)`

  /* =========================================================
     HOME
     Theme: Same visual language as Login
  ========================================================= */

  width: 90vw;
  max-width: 1200px;

  position: relative;
  margin: 0 auto;

  padding: 24px 0 70px;

  box-sizing: border-box;

  /*
    Keep the decorative atmosphere behind the content.
    These are intentionally very soft so the page still
    feels like a hospital system rather than a marketing page.
  */
  &::before {
    content: "";

    position: fixed;

    width: 520px;
    height: 520px;

    left: -280px;
    top: 120px;

    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(255, 193, 7, 0.10) 0%,
        rgba(255, 193, 7, 0.045) 38%,
        transparent 72%
      );

    pointer-events: none;

    z-index: -1;
  }

  &::after {
    content: "";

    position: fixed;

    width: 620px;
    height: 620px;

    right: -320px;
    bottom: -330px;

    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(104, 170, 110, 0.09) 0%,
        rgba(104, 170, 110, 0.035) 40%,
        transparent 72%
      );

    pointer-events: none;

    z-index: -1;
  }


  /* =========================================================
     OPTIONAL SOFT ATMOSPHERE
     Small diagonal texture inspired by Login
  ========================================================= */

  .home-atmosphere {
    position: fixed;

    inset: 0;

    pointer-events: none;

    z-index: -2;

    opacity: 0.32;

    background:
      repeating-linear-gradient(
        125deg,
        rgba(255, 193, 7, 0.018) 0px,
        rgba(255, 193, 7, 0.018) 1px,
        transparent 1px,
        transparent 22px
      );
  }


  /* =========================================================
     HEADER / PAGE INTRO
  ========================================================= */

  .home-heading {

    position: relative;

    text-align: center;

    margin: 0 auto 36px;

    max-width: 760px;

    animation:
      homeHeadingIn 0.6s ease both;
  }


  /*
    Small English brand line
  */

  .home-kicker {

    display: inline-flex;

    align-items: center;
    justify-content: center;

    gap: 10px;

    margin-bottom: 9px;

    font-size: 11px;

    font-weight: 700;

    letter-spacing: 0.18em;

    color: #0e734bff;

    text-transform: uppercase;
  }


  .home-kicker::before,
  .home-kicker::after {

    content: "";

    width: 24px;

    height: 1px;

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(0, 180, 72, 0.45)
      );
  }


  .home-kicker::after {

    background:
      linear-gradient(
        90deg,
        rgba(0, 180, 123, 0.45),
        transparent
      );
  }


  /*
    Main title
  */

  .home-heading h1 {

    margin: 0;

    color: #263238;

    font-size: clamp(25px, 2.4vw, 32px);

    line-height: 1.25;

    font-weight: 700;

    letter-spacing: -0.025em;
  }


  /*
    Subtitle
  */

  .home-heading p {

    margin: 9px 0 0;

    color: #94a3b8;

    font-size: 14px;

    line-height: 1.5;

    font-weight: 400;
  }


  /*
    Tiny divider under heading
  */

  .home-heading-divider {

    width: 46px;

    height: 3px;

    margin: 18px auto 0;

    border-radius: 999px;

    background:
      linear-gradient(
        90deg,
        #1d8c39ff,
        #007445ff
      );

    box-shadow:
      0 3px 10px rgba(0, 240, 124, 0.18);
  }


  /* =========================================================
     CONTENT
  ========================================================= */

  .ItemBox {

    width: 100%;

    display: flex;

    justify-content: center;
  }


  /* =========================================================
     MENU GRID
  ========================================================= */

.menu-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  /* ถ้าเหลือเมนูเดียว ให้อยู่ตรงกลาง */
  &:has(> :only-child) {
    grid-template-columns: minmax(0, 560px);
    justify-content: center;
  }
}

  /* =========================================================
     MENU ITEM
  ========================================================= */

  .LinkToMNG {

    width: 100%;

    cursor: pointer;

    text-decoration: none;

    display: block;

    outline: none;
  }


  /* =========================================================
     CARD
  ========================================================= */

  .menu-card {

    position: relative;

    display: flex;

    align-items: center;

    width: 100%;

    min-height: 138px;

    box-sizing: border-box;

    padding: 22px 25px;

    background:
      rgba(255, 255, 255, 0.94);

    border-radius: 24px;

    /*
      Very subtle border.
      The top accent comes from the React data.
    */
    border:
      1px solid rgba(226, 228, 224, 0.92);

    /*
      Neutral shadow instead of green shadow.
      This is important for the premium feeling.
    */
    box-shadow:
      0 14px 34px rgba(38, 42, 36, 0.055),
      0 3px 10px rgba(38, 42, 36, 0.035);

    overflow: visible;

    transform: translateY(0);

    transition:
      transform 0.28s cubic-bezier(.2,.7,.2,1),
      box-shadow 0.28s ease,
      border-color 0.28s ease;
  }


  /*
    Very subtle white highlight
  */

  .menu-card::before {

    content: "";

    position: absolute;

    left: 16px;
    right: 16px;

    top: 0;

    height: 1px;

    border-radius: 999px;

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.95),
        transparent
      );

    pointer-events: none;
  }


  /* =========================================================
     CARD HOVER
  ========================================================= */

  .LinkToMNG:hover .menu-card {

    transform: translateY(-5px);

    border-color:
      rgba(215, 218, 213, 0.95);

    box-shadow:
      0 22px 45px rgba(38, 42, 36, 0.085),
      0 5px 14px rgba(38, 42, 36, 0.045);
  }


  .LinkToMNG:active .menu-card {

    transform: translateY(-1px);

    transition-duration: 0.1s;
  }


  /* =========================================================
     ICON
  ========================================================= */

  .menu-icon {

    position: relative;

    flex: 0 0 auto;

    width: 88px;

    height: 88px;

    border-radius: 23px;

    display: flex;

    align-items: center;

    justify-content: center;

    margin-right: 22px;

    box-sizing: border-box;

    transition:
      transform 0.28s cubic-bezier(.2,.7,.2,1),
      box-shadow 0.28s ease;
  }


  /*
    Inner highlight
  */

  .menu-icon::after {

    content: "";

    position: absolute;

    inset: 0;

    border-radius: inherit;

    background:
      linear-gradient(
        135deg,
        rgba(255,255,255,0.30),
        transparent 48%
      );

    pointer-events: none;
  }


  .menu-icon svg {

    position: relative;

    z-index: 1;

    width: 42px;

    height: 42px;

    transition:
      transform 0.28s ease;
  }


  .LinkToMNG:hover .menu-icon {

    transform: scale(1.035);
  }


  .LinkToMNG:hover .menu-icon svg {

    transform: scale(1.045);
  }


  /* =========================================================
     TEXT
  ========================================================= */

  .menu-text {

    flex: 1;

    min-width: 0;

    text-align: center;

    padding-right: 8px;
  }


  .menu-text h5 {

    margin: 0;

    color: #334155;

    font-size: 1.08rem;

    line-height: 1.45;

    font-weight: 700;

    letter-spacing: -0.012em;
  }


  .menu-text p {

    margin: 7px 0 0;

    color: #94a3b8;

    font-size: 0.82rem;

    line-height: 1.4;

    font-weight: 400;
  }


  /* =========================================================
     ADMIN / DEPARTMENT CHIP
  ========================================================= */

  .MuiChip-root {

    backdrop-filter: blur(10px);

    -webkit-backdrop-filter: blur(10px);

    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }


  .LinkToMNG:hover .MuiChip-root {

    transform: translateY(-2px);

    box-shadow:
      0 10px 22px rgba(30, 35, 30, 0.10) !important;
  }


  /* =========================================================
     COUNT BADGE
  ========================================================= */

  .menu-text > .MuiBox-root {

    font-size: 12px;

    line-height: 1;

    letter-spacing: -0.01em;

    border:
      3px solid rgba(255,255,255,0.92);

    box-sizing: border-box;

    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }


  .LinkToMNG:hover .menu-text > .MuiBox-root {

    transform: scale(1.06);

    box-shadow:
      0 7px 18px rgba(30, 35, 30, 0.17) !important;
  }


  /* =========================================================
     KEYBOARD ACCESSIBILITY
  ========================================================= */

  .LinkToMNG:focus-visible .menu-card {

    outline:
      3px solid rgba(245, 183, 20, 0.28);

    outline-offset: 4px;
  }


  /* =========================================================
     ANIMATION
  ========================================================= */

  @keyframes homeHeadingIn {

    from {

      opacity: 0;

      transform:
        translateY(8px);
    }

    to {

      opacity: 1;

      transform:
        translateY(0);
    }
  }


  /* =========================================================
     TABLET
  ========================================================= */

  @media screen and (max-width: 850px) {

    width: 94vw;

    padding:
      42px
      0
      60px;


    .menu-grid {

      grid-template-columns:
        1fr;

      gap: 18px;
    }

  }


  /* =========================================================
     MOBILE
  ========================================================= */

  @media screen and (max-width: 680px) {

    width: 94vw;

    padding:
      34px
      0
      48px;


    .home-heading {

      margin-bottom: 26px;
    }


    .home-kicker {

      font-size: 9px;

      letter-spacing: 0.15em;
    }


    .home-kicker::before,
    .home-kicker::after {

      width: 16px;
    }


    .home-heading h1 {

      font-size: 24px;
    }


    .home-heading p {

      font-size: 13px;
    }


    .menu-card {

      min-height: 116px;

      padding:
        18px;
    }


    .menu-icon {

      width: 74px;

      height: 74px;

      border-radius: 20px;

      margin-right: 16px;
    }


    .menu-icon svg {

      width: 36px;

      height: 36px;
    }


    .menu-text {

      padding-right: 4px;
    }


    .menu-text h5 {

      font-size: 0.98rem;

      line-height: 1.4;
    }


    .menu-text p {

      font-size: 0.76rem;

      margin-top: 5px;
    }

  }


  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media screen and (max-width: 420px) {

    .menu-card {

      padding:
        16px;
    }


    .menu-icon {

      width: 66px;

      height: 66px;

      border-radius: 18px;

      margin-right: 13px;
    }


    .menu-icon svg {

      width: 32px;

      height: 32px;
    }


    .menu-text h5 {

      font-size: 0.92rem;
    }

  }

`;