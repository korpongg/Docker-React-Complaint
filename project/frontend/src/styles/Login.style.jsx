import styled from "styled-components";
import Box from "@mui/material/Box";

export const LoginBox = styled(Box)`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  font-family: "Mali", sans-serif;

  /* =========================================================
     LOGIN WRAPPER
  ========================================================= */

  .login-wrapper {
    width: 820px;
    max-width: calc(100vw - 40px);

    display: flex;
    align-items: stretch;

    background: #ffffff;

    border-radius: 28px;

    overflow: hidden;

    box-shadow:
      0 25px 60px rgba(0, 0, 0, 0.15),
      0 8px 25px rgba(0, 0, 0, 0.08);

    height: 500px;
  }

  /* =========================================================
     LEFT SIDE
  ========================================================= */

  .login-brand {
    width: 43%;

    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 50px 35px;

    box-sizing: border-box;

    overflow: hidden;

    text-align: center;

    color: #ffffff;

    background:
      radial-gradient(
        circle at 15% 20%,
        rgba(255, 255, 255, 0.18),
        transparent 22%
      ),
      radial-gradient(
        circle at 90% 75%,
        rgba(255, 255, 255, 0.10),
        transparent 25%
      ),
      linear-gradient(
        160deg,
        #285943 0%,
        #174a35 45%,
        #0d3527 100%
      );
  }

  /* decorative wave */

  .login-brand::before {
    content: "";

    position: absolute;

    width: 520px;
    height: 260px;

    left: -170px;
    bottom: -110px;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.08);

    transform: rotate(-8deg);
  }

  .login-brand::after {
    content: "";

    position: absolute;

    width: 450px;
    height: 220px;

    right: -230px;
    top: -100px;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.06);
  }

  /* =========================================================
     BRAND CONTENT
  ========================================================= */

  .brand-content {
    position: relative;

    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .brand-icon {
    width: 100px;
    height: 100px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 22px;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.96);

    color: #174a35;

    box-shadow:
      0 10px 25px rgba(0, 30, 20, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }

  .brand-icon svg {
    font-size: 58px;
  }

  .brand-title {
    margin: 0;

    font-size: 25px;

    font-weight: 700;

    letter-spacing: 1px;

    color: #ffffff;
  }

  .brand-subtitle {
    margin: 8px 0 0;

    font-size: 12px;

    line-height: 1.7;

    color: rgba(255, 255, 255, 0.85);

    max-width: 230px;
  }

  /* =========================================================
     RIGHT SIDE
  ========================================================= */

  .login-card {
    width: 57%;

    padding: 55px 58px;

    box-sizing: border-box;

    background: #ffffff;

    display: flex;
    align-items: center;
  }

  /* =========================================================
     LOGIN FORM
  ========================================================= */

  .login {
    width: 100%;

    text-align: left;
  }

  /* =========================================================
     HEADER
  ========================================================= */

  .login-header {
    margin-bottom: 28px;
  }

  .login-header h1 {
    margin: 0;

    color: #444444;

    font-size: 26px;

    font-weight: 500;

    line-height: 1.4;

    letter-spacing: 0;
  }

  .login-header p {
    margin: 7px 0 0;

    color: #aaaaaa;

    font-size: 11px;

    line-height: 1.6;
  }

  /* =========================================================
     INPUT
  ========================================================= */

  .login input {
    width: 100%;

    height: 48px;

    box-sizing: border-box;

    padding: 8px 5px;

    margin: 5px 0 12px;

    border: none;

    border-bottom: 1px solid #bdbdbd;

    border-radius: 0;

    outline: none;

    background: transparent;

    color: #555555;

    font-family: "Mali", sans-serif !important;

    font-size: 14px;

    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  .login input::placeholder {
    color: #aaaaaa;
  }

  .login input:hover {
    border-bottom-color: #7c8f86;
  }

  .login input:focus {
    border-bottom-color: #174a35;

    box-shadow: 0 2px 0 #174a35;
  }

  /* =========================================================
     LOGIN BUTTON
  ========================================================= */

  .login button {
    width: 100%;

    height: 46px;

    margin-top: 18px;

    border: none;

    border-radius: 24px;

    cursor: pointer;

    font-family: "Mali", sans-serif !important;

    font-size: 15px;

    font-weight: 600;

    color: #ffffff;

    background: #174a35;

    box-shadow:
      0 6px 15px rgba(23, 74, 53, 0.25);

    transition:
      transform 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .login button:hover {
    background: #103c2b;

    transform: translateY(-1px);

    box-shadow:
      0 9px 20px rgba(23, 74, 53, 0.32);
  }

  .login button:active {
    transform: translateY(0);
  }

  .login button:disabled {
    cursor: not-allowed;

    opacity: 0.6;

    transform: none;
  }

  /* =========================================================
     EXTRA DECORATION
  ========================================================= */

  .login-divider {
    width: 100%;

    height: 1px;

    margin-top: 28px;

    background: #dddddd;
  }

  .login-footer {
    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-top: 12px;

    font-size: 9px;

    color: #aaaaaa;
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media screen and (max-width: 700px) {
    align-items: center;

    padding: 25px 0;

    .login-wrapper {
      width: 90vw;

      max-width: 430px;

      min-height: auto;

      flex-direction: column;

      border-radius: 24px;
    }

    .login-brand {
      width: 100%;

      min-height: 230px;

      padding: 35px 25px;
    }

    .brand-icon {
      width: 75px;
      height: 75px;

      margin-bottom: 15px;
    }

    .brand-icon svg {
      font-size: 42px;
    }

    .brand-title {
      font-size: 21px;
    }

    .login-card {
      width: 100%;

      padding: 40px 35px;
    }

    .login-header h1 {
      font-size: 23px;
    }
  }

  @media screen and (max-width: 400px) {
    .login-card {
      padding: 35px 25px;
    }

    .login-brand {
      min-height: 210px;
    }
  }
    .hospital-logo {
  width: 80px;
  height: 80px;

  margin: 0 auto 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;
  border-radius: 18px;

  box-shadow:
    0 8px 22px rgba(0, 0, 0, 0.10);

  overflow: hidden;
}

.hospital-logo img {
  width: 68px;
  height: 68px;
  object-fit: contain;
  display: block;
}

  .login-kicker {
    margin-bottom: 8px;

    color: #0e734bff;

    font-family: "DB-Helvethaica-X", "Kanit", sans-serif;

    font-size: 11px;

    font-weight: 600;

    letter-spacing: 1.8px;
  }

   .login-line {
    width: 34px;

    height: 3px;

    margin: 14px auto 0;

    border-radius: 10px;

    background:
      linear-gradient(
        90deg,
        #1d8c39ff,
        #007445ff
      );

  }
`;