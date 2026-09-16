import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({ Mode, submitfunction, SubmitMode, Lable }) {
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleClickOpen = () => {
    if (submitting) return;
    setOpen(true);
  };

  const handleClose = () => {
    if (submitting) return;
    setOpen(false);
  };

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

      <Button
        sx={{
          fontSize: 22,
          p: 1.25,
          margin: '0 auto',
          bgcolor: Mode === "Add" ? "#0f766e" : "#b8b01fff",

          "&:hover": {
            bgcolor: Mode === "Add" ? "#115e59" : "#d97706",
          },
        }}
        variant="contained"
        color="success"
        onClick={handleClickOpen}
        disabled={submitting}
      >
        {submitting ? "กำลังบันทึก..." : Lable}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >

        <DialogTitle
          sx={{ fontFamily: "Mali" }}
          color="success"
        >
          บันทึก
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ fontFamily: "Mali" }}>
            ต้องการส่งข้อมูลเข้าสู่ระบบและทำการยื่นแบบฟอร์มหรือไม่?
          </DialogContentText>
        </DialogContent>

        <DialogActions>

          <Button
            sx={{
              fontFamily: "Mali",
              fontSize: 22,
              width: 100,
              p: 0.25,
              color: 'black'
            }}
            onClick={handleClose}
            disabled={submitting}
          >
            ยกเลิก
          </Button>

          <Button
            sx={{
              fontFamily: "Mali",
              fontSize: 22,
              width: 120,
              p: 0.25,
              backgroundColor: "#065f46ed",

              "&:hover": {
                backgroundColor: "#047857",
              },
            }}
            variant="contained"
            className="ConfirmBTN"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "กำลังบันทึก..." : "ยืนยัน"}
          </Button>

        </DialogActions>

      </Dialog>

    </React.Fragment>
  );
}