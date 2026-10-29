import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";


export default function ConfirmDialog({
  Mode,
  submitfunction,
  SubmitMode,
  Lable,

  Icon,

  ButtonColor,
  ButtonHoverColor,
  ButtonBackground,
  ButtonBorder,

}) {

  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);


  /* =====================================================
     OPEN
  ===================================================== */

  const handleClickOpen = () => {

    if (submitting) return;

    setOpen(true);
  };


  /* =====================================================
     CLOSE
  ===================================================== */

  const handleClose = () => {

    if (submitting) return;

    setOpen(false);
  };


  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (event) => {

    event.preventDefault();

    // กันกดซ้ำ
    if (submitting) return;

    setSubmitting(true);

    try {

      // รอ API ทำงานให้เสร็จก่อน
      await submitfunction(SubmitMode);

      // สำเร็จแล้วค่อยปิด Dialog
      setOpen(false);

    } catch (error) {

      console.error(error);

    } finally {

      // API เสร็จแล้ว ปลดล็อกปุ่ม
      setSubmitting(false);

    }
  };


  return (
    <React.Fragment>

      {/* =================================================
          MAIN ACTION BUTTON
      ================================================= */}

      <Button

        variant="contained"

        onClick={handleClickOpen}

        disabled={submitting}

        startIcon={
          submitting
            ? null
            : Icon
        }

        sx={{

          minWidth: "175px",

          height: "42px",

          px: 2.2,

          borderRadius: "9px",

          fontFamily: "Mali, sans-serif",

          fontSize: "14px",

          fontWeight: 700,

          textTransform: "none",

          color: "#FFFFFF",

          backgroundColor:
            ButtonColor || "#0F766E",

          border:
            `1px solid ${
              ButtonColor || "#0F766E"
            }`,

          boxShadow:
            `0 3px 8px ${
              ButtonColor || "#0F766E"
            }35`,

          transition:
            "all 0.2s ease",

          "&:hover": {

            backgroundColor:
              ButtonHoverColor ||
              ButtonColor ||
              "#115E59",

            borderColor:
              ButtonHoverColor ||
              ButtonColor ||
              "#115E59",

            boxShadow:
              `0 5px 12px ${
                ButtonColor || "#0F766E"
              }40`,

            transform:
              "translateY(-1px)",
          },

          "&:active": {

            transform:
              "translateY(0)",
          },

          "& .MuiButton-startIcon": {

            marginRight: "7px",

            "& svg": {

              fontSize: "20px",
            },
          },

          "&.Mui-disabled": {

            color: "#FFFFFF",

            backgroundColor:
              "#94A3B8",

            borderColor:
              "#94A3B8",

            boxShadow:
              "none",
          },

        }}
      >

        {submitting
          ? "กำลังบันทึก..."
          : Lable}

      </Button>


      {/* =================================================
          CONFIRM DIALOG
      ================================================= */}

      <Dialog

        open={open}

        onClose={handleClose}

        PaperProps={{

          component: "form",

          onSubmit: handleSubmit,

          sx: {

            borderRadius: "12px",

            minWidth: {
              xs: "90%",
              sm: "420px",
            },

            boxShadow:
              "0 15px 40px rgba(15, 23, 42, 0.16)",
          },

        }}

      >

        {/* =================================================
            TITLE
        ================================================= */}

        <DialogTitle

          sx={{

            display: "flex",

            alignItems: "center",

            gap: 1,

            fontFamily:
              "Mali, sans-serif",

            fontSize: "18px",

            fontWeight: 700,

            color:
              ButtonColor ||
              "#0F766E",

            borderBottom:
              "1px solid #E2E8F0",

            pb: 1.5,

          }}

        >

          {/* ICON */}

          <div
            style={{

              width: "34px",

              height: "34px",

              borderRadius: "8px",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              backgroundColor:
                ButtonBackground ||
                "#F0FDFA",

              color:
                ButtonColor ||
                "#0F766E",

            }}
          >

            {Icon}

          </div>


          ยืนยันการดำเนินการ

        </DialogTitle>


        {/* =================================================
            CONTENT
        ================================================= */}

        <DialogContent
          sx={{
            pt: 2.5,
          }}
        >

          <DialogContentText

            sx={{

              fontFamily:
                "Mali, sans-serif",

              fontSize: "14px",

              lineHeight: 1.8,

              color: "#475569",

            }}

          >

            ต้องการส่งข้อมูลเข้าสู่ระบบ
            และทำการยื่นแบบฟอร์มหรือไม่?

          </DialogContentText>

        </DialogContent>


        {/* =================================================
            ACTIONS
        ================================================= */}

        <DialogActions

          sx={{

            px: 2.5,

            pb: 2,

            gap: 1,

          }}

        >

          {/* =========================
              CANCEL
          ========================== */}

          <Button

            startIcon={
              <CloseOutlinedIcon />
            }

            onClick={handleClose}

            disabled={submitting}

            sx={{

              minWidth: "100px",

              height: "38px",

              borderRadius: "8px",

              fontFamily:
                "Mali, sans-serif",

              fontSize: "13px",

              fontWeight: 600,

              textTransform:
                "none",

              color: "#475569",

              backgroundColor:
                "#FFFFFF",

              border:
                "1px solid #CBD5E1",

              "&:hover": {

                backgroundColor:
                  "#F8FAFC",

                borderColor:
                  "#94A3B8",

              },

              "& .MuiButton-startIcon": {

                "& svg": {

                  fontSize: "18px",
                },
              },

            }}

          >

            ยกเลิก

          </Button>


          {/* =========================
              CONFIRM
          ========================== */}

          <Button

            startIcon={
              submitting
                ? null
                : <CheckCircleOutlineIcon />
            }

            variant="contained"

            className="ConfirmBTN"

            type="submit"

            disabled={submitting}

            sx={{

              minWidth: "120px",

              height: "38px",

              borderRadius: "8px",

              fontFamily:
                "Mali, sans-serif",

              fontSize: "13px",

              fontWeight: 700,

              textTransform:
                "none",

              color: "#FFFFFF",

              backgroundColor:
                ButtonColor ||
                "#065F46",

              boxShadow:
                `0 3px 8px ${
                  ButtonColor ||
                  "#065F46"
                }35`,

              "&:hover": {

                backgroundColor:
                  ButtonHoverColor ||
                  ButtonColor ||
                  "#047857",

                boxShadow:
                  `0 5px 12px ${
                    ButtonColor ||
                    "#065F46"
                  }40`,
              },

              "&.Mui-disabled": {

                color: "#FFFFFF",

                backgroundColor:
                  "#94A3B8",

                boxShadow:
                  "none",
              },

              "& .MuiButton-startIcon": {

                "& svg": {

                  fontSize: "18px",
                },
              },

            }}

          >

            {submitting
              ? "กำลังบันทึก..."
              : "ยืนยัน"}

          </Button>

        </DialogActions>

      </Dialog>

    </React.Fragment>
  );
}