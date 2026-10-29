import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F6F7F4",
        padding: "23px",
        boxSizing: "border-box",
        fontFamily: "inherit",
      }}
    >
      <article style={{ textAlign: "center", maxWidth: "420px" }}>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "5px",
            color: "#315C4B",
            marginBottom: "20px",
          }}
        >
          PAGE NOT FOUND
        </p>

        <h1
          style={{
            fontSize: "clamp(100px, 18vw, 150px)",
            lineHeight: 0.95,
            fontWeight: 300,
            letterSpacing: "-8px",
            color: "#243A32",
            margin: 0,
          }}
        >
          404
        </h1>

        <div
          style={{
            width: "48px",
            height: "2px",
            background: "#477461",
            margin: "28px auto",
          }}
        />

        <h2
          style={{
            fontSize: "23px",
            fontWeight: 500,
            color: "#243A32",
            margin: "0 0 12px",
          }}
        >
          ไม่พบหน้าที่คุณกำลังค้นหา
        </h2>

        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.8,
            color: "#777F79",
            margin: "0 0 30px",
          }}
        >
          หน้านี้อาจไม่มีอยู่ หรือที่อยู่ลิงก์อาจไม่ถูกต้อง
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "13px 30px",
            background: "#243A32",
            color: "#FFFFFF",
            border: "1px solid #243A32",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "13px",
            letterSpacing: "0.5px",
            transition: "all 0.2s ease",
          }}
        >
          ← กลับสู่หน้าหลัก
        </Link>
      </article>
    </div>
  );
};

export default Missing;