import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Paper,
  Typography,
} from "@mui/material";


const UpdateStatusDialog = ({
  open,
  value,
  setValue,
  onConfirm,
  onClose,
}) => {


  const statusOptions = [
    {
      value: "1",
      title: "ข้อร้องเรียนปกติ",
      description: "รายการยังอยู่ระหว่างดำเนินการ",
      color: "#2563eb",
    },
    {
      value: "2",
      title: "ปิดประเด็น",
      description: "ดำเนินการปิดข้อร้องเรียนเรียบร้อยแล้ว",
      color: "#16a34a",
    },
    {
      value: "0",
      title: "ไม่ใช่ข้อร้องเรียน",
      description: "ระบบจะ inactive รายการนี้",
      color: "#dc2626",
    },
  ];


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        เปลี่ยนสถานะข้อร้องเรียน
      </DialogTitle>


      <DialogContent>

        <Stack spacing={2} sx={{ mt: 2 }}>


          {statusOptions.map((item)=>(

            <Paper
              key={item.value}
              variant="outlined"
              onClick={() => setValue(item.value)}
              sx={{
                p:2,
                cursor:"pointer",

                border:
                  value === item.value
                  ? `2px solid ${item.color}`
                  : "1px solid #ddd",

                backgroundColor:
                  value === item.value
                  ? `${item.color}10`
                  : "#fff",

                transition:"0.2s",

                "&:hover":{
                  boxShadow:"0 3px 10px rgba(0,0,0,.08)"
                }
              }}
            >

              <Typography
                fontWeight={700}
                color={
                  value === item.value
                  ? item.color
                  : "text.primary"
                }
              >
                {item.title}
              </Typography>


              <Typography
                variant="body2"
                color="text.secondary"
              >
                {item.description}
              </Typography>


            </Paper>

          ))}


        </Stack>


      </DialogContent>



      <DialogActions>

        <Button onClick={onClose}>
          ยกเลิก
        </Button>


        <Button
          variant="contained"
          disabled={value === ""}
          onClick={onConfirm}
        >
          บันทึก
        </Button>


      </DialogActions>


    </Dialog>
  );
};


export default UpdateStatusDialog;