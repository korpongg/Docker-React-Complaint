import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate("/");

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e9eef5 100%)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "48px 40px",
          textAlign: "center",
          background: "#fff",
          borderRadius: "24px",
          boxShadow: "0 15px 45px rgba(0, 0, 0, 0.08)",
          boxSizing: "border-box",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "42px",
            borderRadius: "50%",
            background: "#fff3f3",
          }}
        >
          🔒
        </div>

        {/* 403 */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1,
            color: "#dc3545",
            marginBottom: "12px",
          }}
        >
          403
        </div>

        {/* Title */}
        <h1
          style={{
            margin: "0 0 12px",
            fontSize: "28px",
            fontWeight: 700,
            color: "#222",
          }}
        >
          ไม่มีสิทธิ์เข้าถึง
        </h1>

        {/* Description */}
        <p
          style={{
            margin: 0,
            color: "#6c757d",
            fontSize: "15px",
            lineHeight: 1.8,
          }}
        >
          ขออภัย คุณไม่มีสิทธิ์เข้าถึงหน้านี้
          <br />
          กรุณาติดต่อผู้ดูแลระบบหากคิดว่าเป็นข้อผิดพลาด
        </p>

        {/* Button */}
        <button
          onClick={goBack}
          style={{
            marginTop: "28px",
            padding: "12px 24px",
            border: "none",
            borderRadius: "10px",
            background: "#dc3545",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(220, 53, 69, 0.2)",
          }}
        >
          ← กลับหน้าหลัก
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;