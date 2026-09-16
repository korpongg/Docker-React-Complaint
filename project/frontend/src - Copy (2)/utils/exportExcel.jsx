import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";


export const exportComplaintExcel = (data) => {


  const rows = data.map((row,index)=>({

    "ลำดับ": index + 1,

    "เลขที่":
      row.reportid || "-",


    "ประเภท":
      row.type == 0
      ? "OPD"
      : "IPD",


    "วันที่":
      row.date
      ? new Date(row.date).toLocaleDateString("th-TH")
      : "-",


    "ผู้บันทึก":
      row.requestby || "-",


    "แหล่งที่มา":
      complaintMap[row.complaints] || "-",


    "ระดับ":
      row.suggestion || "-",


    "สรุปสาระ":
      row.managementremark || "-",


    "ต้องการตอบกลับ":
      row.involved
      ? "ต้องการ"
      : "ไม่ต้องการ",


    "สถานะ":

      row.risk == 3
      ? "วิเคราะห์แล้ว"

      : row.risk == 2
      ? "ตอบกลับเรียบร้อย"

      : row.risk == 1
      ? "รอตอบกลับ"

      : "ข้อร้องเรียนใหม่"

  }));



  const worksheet =
    XLSX.utils.json_to_sheet(rows,{
      origin:"A3"
    });



  // ===============================
  // Title
  // ===============================

  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      ["รายงานข้อร้องเรียน"],
      [
        `วันที่ Export : ${
          new Date().toLocaleDateString("th-TH")
        }`
      ]

    ],
    {
      origin:"A1"
    }
  );



  // ===============================
  // column width
  // ===============================


  worksheet["!cols"]=[

    {wch:8},
    {wch:15},
    {wch:12},
    {wch:15},
    {wch:20},
    {wch:25},
    {wch:10},
    {wch:55},
    {wch:18},
    {wch:22},

  ];



  // merge title

  worksheet["!merges"]=[

    {
      s:{r:0,c:0},
      e:{r:0,c:9}
    },

    {
      s:{r:1,c:0},
      e:{r:1,c:9}
    }

  ];



  // freeze header

  worksheet["!freeze"]={
    xSplit:0,
    ySplit:3
  };


  // filter

  worksheet["!autofilter"]={
    ref:"A3:J"+(rows.length+3)
  };




  // ===============================
  // Default style
  // ===============================


  Object.keys(worksheet).forEach(cell=>{


    if(cell.startsWith("!"))
      return;


    worksheet[cell].s={

      font:{
        name:"Tahoma",
        sz:11
      },


      alignment:{
        vertical:"center",
        wrapText:true
      },


      border:{

        top:{
          style:"thin",
          color:{rgb:"D1D5DB"}
        },

        bottom:{
          style:"thin",
          color:{rgb:"D1D5DB"}
        },

        left:{
          style:"thin",
          color:{rgb:"D1D5DB"}
        },

        right:{
          style:"thin",
          color:{rgb:"D1D5DB"}
        }

      }


    };


  });





  // ===============================
  // Title Style
  // ===============================


  worksheet["A1"].s={

    fill:{
      fgColor:{
        rgb:"991B1B"
      }
    },


    font:{
      name:"Tahoma",
      bold:true,
      sz:18,
      color:{
        rgb:"FFFFFF"
      }
    },


    alignment:{
      horizontal:"center",
      vertical:"center"
    }

  };



  worksheet["A2"].s={

    font:{
      name:"Tahoma",
      italic:true,
      sz:11
    },

    alignment:{
      horizontal:"center"
    }

  };






  // ===============================
  // Header row A3:J3
  // ===============================


  for(let c=0;c<=9;c++){


    const cell =
      XLSX.utils.encode_cell({
        r:2,
        c
      });


    worksheet[cell].s={


      fill:{
        fgColor:{
          rgb:"DC2626"
        }
      },


      font:{
        name:"Tahoma",
        bold:true,
        color:{
          rgb:"FFFFFF"
        }
      },


      alignment:{
        horizontal:"center",
        vertical:"center"
      },


      border:{

        top:{style:"thin"},
        bottom:{style:"thin"},
        left:{style:"thin"},
        right:{style:"thin"}

      }

    };

  }






  // ===============================
  // Status color
  // ===============================


  rows.forEach((row,index)=>{


    const excelRow=index+4;


    const statusCell =
      worksheet[`J${excelRow}`];


    if(!statusCell)
      return;



    let style={};


    if(row.สถานะ==="ข้อร้องเรียนใหม่"){


      style={
        fill:{fgColor:{rgb:"FEE2E2"}},
        font:{
          bold:true,
          color:{rgb:"DC2626"}
        }
      };


    }


    if(row.สถานะ==="รอตอบกลับ"){


      style={
        fill:{fgColor:{rgb:"FEF3C7"}},
        font:{
          bold:true,
          color:{rgb:"92400E"}
        }
      };

    }



    if(row.สถานะ==="ตอบกลับเรียบร้อย"){


      style={
        fill:{fgColor:{rgb:"E0F2FE"}},
        font:{
          bold:true,
          color:{rgb:"0369A1"}
        }
      };


    }




    if(row.สถานะ==="วิเคราะห์แล้ว"){


      style={
        fill:{fgColor:{rgb:"DCFCE7"}},
        font:{
          bold:true,
          color:{rgb:"166534"}
        }
      };


    }



    statusCell.s={
      ...statusCell.s,
      ...style,

      alignment:{
        horizontal:"center",
        vertical:"center"
      }

    };



  });






  // ===============================
  // Level color A-I
  // ===============================


  rows.forEach((row,index)=>{


    const cell =
      worksheet[`G${index+4}`];


    if(!cell)
      return;



    const colors={

      A:["FEE2E2","B91C1C"],
      B:["FECACA","DC2626"],
      C:["FFEDD5","EA580C"],
      D:["FED7AA","F97316"],
      E:["FEF9C3","CA8A04"],
      F:["ECFCCB","65A30D"],
      G:["DCFCE7","16A34A"],
      H:["E0F2FE","0284C7"],
      I:["F3F4F6","6B7280"]

    };


    const color =
      colors[row.ระดับ];


    if(color){

      cell.s={

        ...cell.s,

        fill:{
          fgColor:{
            rgb:color[0]
          }
        },

        font:{
          bold:true,
          color:{
            rgb:color[1]
          }
        },

        alignment:{
          horizontal:"center"
        }

      };


    }


  });







  const workbook =
    XLSX.utils.book_new();



  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "ข้อร้องเรียน"
  );



  const buffer =
    XLSX.write(
      workbook,
      {
        bookType:"xlsx",
        type:"array"
      }
    );



  saveAs(

    new Blob(
      [buffer],
      {
        type:
        "application/octet-stream"
      }
    ),

    `รายงานข้อร้องเรียน_${Date.now()}.xlsx`

  );

};





const complaintMap={

  0:"ทางวาจา",
  1:"ทางโทรศัพท์",
  2:"เยี่ยมผู้ป่วยเชิงรุก",
  3:"เยี่ยมตลาด / บริษัทคู่สัญญา",
  4:"อื่นๆ"

};