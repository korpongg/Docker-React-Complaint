import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import useAuth from "../../hooks/useAuth";
import { LoginBox } from "../../styles/Login.style";
import Swal from 'sweetalert2';
import FeedbackIcon from "@mui/icons-material/Feedback";
import occurrence_logo from "../../assets/occurrence_logo.png";
import complaint_logo from "../../assets/complaint_logo.png";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
  }

   .login-header{
  text-align:center;

  }

.login-card input {
  font-size: 20px !important;
}

.login-card input::placeholder {
  font-size: 20px !important;
}

  body.login-page {
    background:
      radial-gradient(
        circle at 12% 15%,
        rgba(35, 91, 67, 0.18),
        transparent 32%
      ),
      radial-gradient(
        circle at 88% 18%,
        rgba(27, 94, 69, 0.15),
        transparent 34%
      ),
      radial-gradient(
        circle at 82% 85%,
        rgba(18, 61, 43, 0.13),
        transparent 38%
      ),
      radial-gradient(
        circle at 15% 85%,
        rgba(47, 118, 91, 0.15),
        transparent 36%
      ),
      linear-gradient(
        135deg,
        #edf5f0 0%,
        #dcebe3 45%,
        #cfe2d8 100%
      );

    background-attachment: fixed;
  }

  #root {
    text-align: unset;
  }

  
.other-system {
  margin-top: 20px;
  text-align: center;

}

.other-system-title {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
  
}
.other-system-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: fit-content;
  margin: 12px auto 0;
  padding: 8px 12px;

  text-decoration: none;
  border-radius: 8px;

  transition: all 0.2s ease;
    background-color: #f8ffe25a;
}

.other-system-icon {
  width: 34px;
  height: 34px;
  object-fit: contain;
  flex-shrink: 0;
}

.other-system-text {
  text-align: left;
  line-height: 1.2;
}

.other-system-name {
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

.other-system-hint {
  margin-top: 3px;
  font-size: 10px;
  color: #aaa;
}

.other-system-link:hover {
  background: rgba(135, 161, 7, 0.06);
}

.other-system-link:hover .other-system-name {
  color: #706f10ff;
}
  .occurrence-logo-icon{
  width:100%;}
`;
const Login = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const userRef = useRef();
  const passRef = useRef();

  const [userid, setUserid] = useState("");
  const [pass, setPass] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const userData = storedAuth
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const handleApiError = (err) => {
    if (!err?.response) {
      setErrMsg("ไม่มีการตอบกลับของเซิร์ฟเวอร์");
    } else {
      switch (err.response.status) {
        case 400:
          setErrMsg("โปรดตรวจสอบ รหัสพนักงาน, รหัสผ่าน");
          break;
        // case 401:
        //   setErrMsg("ไม่ได้รับอนุญาต");
        //   break;
        default:
          setErrMsg("ไม่สามารถเข้าสู่ระบบได้");
          break;
      }
    }
    setError(true);
    passRef.current.focus();
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrMsg("");
    setError(false);
  };

  const handleAuthSuccess = (response) => {
    const { accessToken, role } = response?.data || {};
    localStorage.setItem("auth", JSON.stringify({ userid, role, accessToken }));
    setAuth({ userid, role, accessToken });
  };

  const handleUserData = async () => {
    try {
      const storedAuth = JSON.parse(localStorage.getItem("auth"));
      const config = {
        headers: { Authorization: `Bearer ${storedAuth.accessToken}` },
      };
      const url = `${apiUrl}/users/${userid}`;
      const response2 = await axios.get(url, { ...config });
      if (response2.status === 200 || response2.status === 201) {
        const userData = response2.data;
        localStorage.setItem("userData", JSON.stringify(userData));

        setUserid("");
        setPass("");
        navigate("/home", { replace: true });
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/auth`,
        { userid, pass },
        { headers: { "Content-Type": "application/json" } },
      );

      handleAuthSuccess(response);
      await handleUserData();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        Swal.fire({
  icon: "error",
  title: "Unauthorized Access",
  html: `
    <p style="font-size:14px">
      การเข้าถึงถูกปฏิเสธ<br/>
      กรุณาตรวจสอบสิทธิ์หรือเข้าสู่ระบบใหม่
    </p>
  `,
  confirmButtonText: "ตกลง",
  confirmButtonColor: "#166534",
  backdrop: `
    rgba(0,0,0,0.4)
  `,
  customClass: {
    popup: "swal-radius",
  },
});
      } else {
        handleApiError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  // เช็ค user login
  useEffect(() => {
    if (storedAuth?.userid && userData) {
      navigate("/home", { replace: true });
    }
  }, [storedAuth, navigate]);
  useEffect(() => {
    setErrMsg("");
  }, [userid, pass]);

  useEffect(() => {
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

 return (
  <>
    <LoginBox>
      <GlobalStyle />

      <div className="login-wrapper">

        {/* =====================================================
            LEFT BRAND
        ====================================================== */}

        <div className="login-brand">

          <div className="brand-content">

      <div className="brand-icon">
                <img src={complaint_logo} className="occurrence-logo-icon" />
              </div>
            <h2 className="brand-title">
              ระบบการร้องเรียนและข้อเสนอแนะ
            </h2>

            <p className="brand-subtitle">
              
              <br />
              Complaint & Suggestion System
            </p>

          </div>

        </div>


        {/* =====================================================
            RIGHT LOGIN
        ====================================================== */}

        <div className="login-card">

          <form
            className="login"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
    <div className="login-header">
                  <div className="login-kicker">
              Complaint & Suggestion
            </div>

            <h1>
             เข้าสู่ระบบ 
            </h1>

            <div className="login-line" />
    

              </div>


            {/* USERNAME */}

            <input
              ref={userRef}
              type="text"
              name="userid"
              id="userid"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              placeholder="รหัสพนักงาน"
              required
            />


            {/* PASSWORD */}

            <input
              ref={passRef}
              type="password"
              name="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="รหัสผ่าน"
              required
            />


            {/* LOGIN */}

            <button disabled={loading}>
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>


            {/* BOTTOM LINE */}

              <div className="login-divider" />

              <div className="other-system">
                <div className="other-system-title">เข้าสู่ระบบอื่น</div>

                <a
                  href="http://10.1.1.95:3001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="other-system-link"
                >
                  <img
                    src={occurrence_logo}
                    alt="Complaint & Suggestion"
                    className="other-system-icon"
                  />

                  <div className="other-system-text">
                    <div className="other-system-name">
                      ระบบการร้องเรียนและข้อเสนอแนะ
                    </div>

                    <div className="other-system-hint">
                      Complaint & Suggestion
                    </div>
                  </div>
                </a>
              </div>

          </form>

        </div>

      </div>
    </LoginBox>
  </>
);
};

export default Login;
