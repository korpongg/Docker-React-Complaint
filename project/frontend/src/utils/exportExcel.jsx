
import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

const complaintMap = {
  0: "ทางวาจา",
  1: "ทางโทรศัพท์",
  2: "เยี่ยมผู้ป่วยเชิงรุก",
  3: "เยี่ยมตลาด / บริษัทคู่สัญญา",
  4: "อื่นๆ",
};

const severityLevels = {
  I: "อันตรายมาก",
  H: "สูงมาก",
  G: "สูง",
  F: "ค่อนข้างสูง",
  E: "ปานกลาง",
  D: "ค่อนข้างต่ำ",
  C: "ต่ำ",
  B: "ต่ำมาก",
  A: "เล็กน้อย",
};

// ==========================================
// Format วันที่ภาษาไทย
// ==========================================
const formatThaiDate = (date) => {
  if (!date) return "-";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatThaiDate2 = (date) => {
  if (!date) return "-";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "ต้องการด่วนที่สุด";

  return d.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatThaiDate3 = (date) => {
  if (!date) return "-";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "ไม่ต้องการให้ตอบกลับ";

  return d.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// ==========================================
// เช็กเวลาตอบกลับ
// ==========================================
const checkOnTime = (actualDate, dueDate) => {
  if (!actualDate || !dueDate) return "-";

  const actual = new Date(actualDate);
  const due = new Date(dueDate);

  if (
    isNaN(actual.getTime()) ||
    isNaN(due.getTime())
  ) {
    return "-";
  }

  return actual <= due ? "ทัน" : "ไม่ทัน";
};


// ==========================================
// Format หน่วยงานที่รับผิดชอบ
// ==========================================
const formatResponsiblePersons = (value) => {
  if (!value) return "-";

  return value
    .split(",")
    .map((item) => {
      const parts = item.split("/");

      const department = parts[0]?.trim() || "-";
      const person = parts[1]?.trim() || "-";

      return `${department}\nผู้ถูกร้องเรียน: ${person}`;
    })
    .join("\n\n");
};
// ==========================================
// Export Excel
// ==========================================
export const exportComplaintExcel = (data) => {
  const rows = data.map((row, index) => ({
    // ======================================
    // ข้อมูลข้อร้องเรียน
    // ======================================

    "ลำดับ": index + 1,

    "เลขที่":
      row.reportid || "-",

    "ประเภท":
      row.type == 0
        ? "OPD"
        : row.type == 1
        ? "IPD"
        : "-",

    "วันที่":
      formatThaiDate(row.date),

    "ผู้บันทึก":
      row.requestby || "-",

    "แหล่งที่มา":
      complaintMap[row.complaints] || "-",

    "ระดับ":
      row.suggestion
        ? `${row.suggestion} : ${
            severityLevels[row.suggestion] || "-"
          }`
        : "-",

    "สรุปสาระ":
      row.managementremark || "-",

    // ======================================
    // การตอบกลับ
    // ======================================

    "ต้องการตอบกลับ":
      row.involved
        ? "ต้องการ"
        : "ไม่ต้องการ",

    "สถานะ":
      row.status == 0
        ? "ไม่ใช่ข้อร้องเรียน"
        : row.risk == 3
        ? "วิเคราะห์แล้ว"
        : row.risk == 2
        ? "ตอบกลับเรียบร้อย"
        : row.risk == 1
        ? "รอตอบกลับ"
        : "ข้อร้องเรียนใหม่",

    // ======================================
    // ข้อมูลผู้ร้องเรียน
    // ======================================

    "ชื่อ - สกุลผู้ร้องเรียน":
      row.name || "-",

    "Tel.ติดต่อกลับ":
      row.phone || "-",

    "ท่านเป็น":
      row.related || "-",

    // ======================================
    // ข้อมูลผู้ป่วย
    // ======================================

    "ชื่อ - สกุลผู้ป่วย":
      row.patient_name || "-",

    "HN ของผู้ป่วย":
      row.patient_hn || "-",

    // ======================================
    // การดำเนินการของหน่วยงาน
    // ======================================

    "วันที่ส่งให้หน่วยงาน":
      formatThaiDate(row.createAt),

    "กำหนดส่งกลับคืนฝ่ายบริหารความเสี่ยง":
      formatThaiDate2(row.riskdate),

    "วันที่หน่วยงานตอบกลับข้อร้องเรียน":
      formatThaiDate(row.responseDueDate),

    "หน่วยงานตอบกลับทันเวลา":
      checkOnTime(
        row.createAt,
        row.riskdate
      ),

    // ======================================
    // การตอบกลับผู้ร้องเรียน
    // ======================================

  "หน่วยงานที่รับผิดชอบตอบกลับผู้ร้องเรียน":
  formatResponsiblePersons(row.all_persons),

    "กำหนดการตอบกลับผู้ร้องเรียน":
      formatThaiDate3(row.urgentDate),

    "วันที่ตอบกลับผู้ร้องเรียน":
      formatThaiDate(row.comrescreatedate),

    "หน่วยงานตอบกลับผู้ร้องเรียนทันเวลา":
      checkOnTime(
        row.comrescreatedate,
        row.urgentDate
      ),

    // อยู่ใน Group "การตอบกลับผู้ร้องเรียน"
    "วันที่เกิดเหตุ":
      formatThaiDate(row.date),

    // ======================================
    // ข้อมูลเพิ่มเติม
    // ======================================

    "ประเภทสิทธิ์การรักษา":
      "-",

    "บริษัท":
      "-",

    "ผู้รับเรื่องร้องเรียน":
      "-",

    "หมายเหตุ":
      "-",
  }));

  // ==========================================
  // Worksheet
  // ==========================================
  const worksheet = XLSX.utils.json_to_sheet(
    rows,
    {
      origin: "A4",
    }
  );

  // ==========================================
  // Title + Group Header
  // ==========================================
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      // Row 1
      [
        "รายงานข้อร้องเรียน / ข้อเสนอแนะ",
      ],

      // Row 2
      [
        `วันที่ Export : ${new Date().toLocaleDateString(
          "th-TH"
        )}`,
      ],

      // Row 3
      [
        // A:H
        "ข้อมูลข้อร้องเรียน",
        null,
        null,
        null,
        null,
        null,
        null,
        null,

        // I:J
        "การตอบกลับ",
        null,

        // K:M
        "ข้อมูลผู้ร้องเรียน",
        null,
        null,

        // N:O
        "ข้อมูลผู้ป่วย",
        null,

        // P:S
        "การดำเนินการของหน่วยงาน",
        null,
        null,
        null,

        // T:X
        "การตอบกลับผู้ร้องเรียน",
        null,
        null,
        null,
        null,

        // Y:AB
        "ข้อมูลเพิ่มเติม",
        null,
        null,
        null,
      ],
    ],
    {
      origin: "A1",
    }
  );

  // ==========================================
  // Column Width
  // ==========================================
  worksheet["!cols"] = [
    { wch: 8 },   // A  ลำดับ
    { wch: 12 },  // B  เลขที่
    { wch: 10 },  // C  ประเภท
    { wch: 18 },  // D  วันที่
    { wch: 22 },  // E  ผู้บันทึก
    { wch: 25 },  // F  แหล่งที่มา
    { wch: 22 },  // G  ระดับ
    { wch: 45 },  // H  สรุปสาระ

    { wch: 18 },  // I  ต้องการตอบกลับ
    { wch: 22 },  // J  สถานะ

    { wch: 28 },  // K  ชื่อผู้ร้องเรียน
    { wch: 18 },  // L  Tel
    { wch: 18 },  // M  ท่านเป็น

    { wch: 28 },  // N  ชื่อผู้ป่วย
    { wch: 18 },  // O  HN

    { wch: 24 },  // P  วันที่ส่ง
    { wch: 34 },  // Q  กำหนดส่งกลับ
    { wch: 34 },  // R  วันที่หน่วยงานตอบ
    { wch: 24 },  // S  หน่วยงานตอบกลับทันเวลา

    { wch: 40 },  // T  หน่วยงานรับผิดชอบ
    { wch: 30 },  // U  กำหนดการตอบกลับ
    { wch: 28 },  // V  วันที่ตอบกลับ
    { wch: 34 },  // W  หน่วยงานตอบกลับทันเวลา
    { wch: 22 },  // X  วันที่เกิดเหตุ

    { wch: 20 },  // Y  สิทธิ์
    { wch: 20 },  // Z  บริษัท
    { wch: 20 },  // AA ผู้รับเรื่อง
    { wch: 20 },  // AB หมายเหตุ
  ];

  const totalColumns = Object.keys(
    rows[0] || {}
  ).length;

  // ==========================================
  // Merge
  // ==========================================
  worksheet["!merges"] = [
    // ======================================
    // Title
    // ======================================
    {
      s: { r: 0, c: 0 },
      e: {
        r: 0,
        c: totalColumns - 1,
      },
    },

    // ======================================
    // Export Date
    // ======================================
    {
      s: { r: 1, c: 0 },
      e: {
        r: 1,
        c: totalColumns - 1,
      },
    },

    // ======================================
    // Group Header
    // ======================================

    // A:H
    {
      s: { r: 2, c: 0 },
      e: { r: 2, c: 7 },
    },

    // I:J
    {
      s: { r: 2, c: 8 },
      e: { r: 2, c: 9 },
    },

    // K:M
    {
      s: { r: 2, c: 10 },
      e: { r: 2, c: 12 },
    },

    // N:O
    {
      s: { r: 2, c: 13 },
      e: { r: 2, c: 14 },
    },

    // P:S
    {
      s: { r: 2, c: 15 },
      e: { r: 2, c: 18 },
    },

    // T:X
    // แก้ตรงนี้จาก T:W เป็น T:X
    {
      s: { r: 2, c: 19 },
      e: { r: 2, c: 23 },
    },

    // Y:AB
    // แก้จาก X:AB เป็น Y:AB
    {
      s: { r: 2, c: 24 },
      e: { r: 2, c: 27 },
    },
  ];

  // ==========================================
  // Freeze
  // ==========================================
  worksheet["!freeze"] = {
    xSplit: 0,
    ySplit: 4,
  };

  // ==========================================
  // Filter
  // ==========================================
  worksheet["!autofilter"] = {
    ref: `A4:${XLSX.utils.encode_col(
      totalColumns - 1
    )}${rows.length + 4}`,
  };

  // ==========================================
  // Default Style
  // ==========================================
  Object.keys(worksheet).forEach((cell) => {
    if (cell.startsWith("!")) return;

    worksheet[cell].s = {
      font: {
        name: "Tahoma",
        sz: 11,
      },

      alignment: {
        vertical: "center",
        wrapText: true,
      },

      border: {
        top: {
          style: "thin",
          color: {
            rgb: "D1D5DB",
          },
        },

        bottom: {
          style: "thin",
          color: {
            rgb: "D1D5DB",
          },
        },

        left: {
          style: "thin",
          color: {
            rgb: "D1D5DB",
          },
        },

        right: {
          style: "thin",
          color: {
            rgb: "D1D5DB",
          },
        },
      },
    };
  });

  // ==========================================
  // Title Style
  // ==========================================
  worksheet["A1"].s = {
    fill: {
      fgColor: {
        rgb: "7F1D1D",
      },
    },

    font: {
      name: "Tahoma",
      bold: true,
      sz: 18,
      color: {
        rgb: "FFFFFF",
      },
    },

    alignment: {
      horizontal: "center",
      vertical: "center",
    },
  };

  // ==========================================
  // Export Date Style
  // ==========================================
  worksheet["A2"].s = {
    font: {
      name: "Tahoma",
      italic: true,
      sz: 11,
    },

    alignment: {
      horizontal: "center",
      vertical: "center",
    },
  };

  // ==========================================
  // Group Colors
  // ==========================================
  const groupColors = [
    // A:H
    {
      start: 0,
      end: 7,
      color: "991B1B",
    },

    // I:J
    {
      start: 8,
      end: 9,
      color: "7C3AED",
    },

    // K:M
    {
      start: 10,
      end: 12,
      color: "2563EB",
    },

    // N:O
    {
      start: 13,
      end: 14,
      color: "0891B2",
    },

    // P:S
    {
      start: 15,
      end: 18,
      color: "059669",
    },

    // T:X
    // รวม "วันที่เกิดเหตุ" เข้า Group นี้ด้วย
    {
      start: 19,
      end: 23,
      color: "D97706",
    },

    // Y:AB
    // 4 ช่องที่ยังไม่มีข้อมูล = สีส้ม
    {
      start: 24,
      end: 27,
      color: "EA580C",
    },
  ];

  // ==========================================
  // Header Style
  // Group + Column Header
  // ==========================================
  groupColors.forEach(
    ({ start, end, color }) => {
      // ======================================
      // Group Header Row 3
      // ======================================
      for (
        let c = start;
        c <= end;
        c++
      ) {
        const groupCell =
          XLSX.utils.encode_cell({
            r: 2,
            c,
          });

        if (worksheet[groupCell]) {
          worksheet[groupCell].s = {
            fill: {
              fgColor: {
                rgb: color,
              },
            },

            font: {
              name: "Tahoma",
              bold: true,
              color: {
                rgb: "FFFFFF",
              },
            },

            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: true,
            },

            border: {
              top: {
                style: "thin",
                color: {
                  rgb: "FFFFFF",
                },
              },

              bottom: {
                style: "thin",
                color: {
                  rgb: "FFFFFF",
                },
              },

              left: {
                style: "thin",
                color: {
                  rgb: "FFFFFF",
                },
              },

              right: {
                style: "thin",
                color: {
                  rgb: "FFFFFF",
                },
              },
            },
          };
        }
      }

      // ======================================
      // Column Header Row 4
      // ใช้สีเดียวกับ Group
      // ======================================
      for (
        let c = start;
        c <= end;
        c++
      ) {
        const headerCell =
          XLSX.utils.encode_cell({
            r: 3,
            c,
          });

        if (worksheet[headerCell]) {
          worksheet[headerCell].s = {
            fill: {
              fgColor: {
                rgb: color,
              },
            },

            font: {
              name: "Tahoma",
              bold: true,
              color: {
                rgb: "FFFFFF",
              },
            },

            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: true,
            },

            border: {
              top: {
                style: "thin",
                color: {
                  rgb: "FFFFFF",
                },
              },

              bottom: {
                style: "thin",
                color: {
                  rgb: "FFFFFF",
                },
              },

              left: {
                style: "thin",
                color: {
                  rgb: "FFFFFF",
                },
              },

              right: {
                style: "thin",
                color: {
                  rgb: "FFFFFF",
                },
              },
            },
          };
        }
      }
    }
  );

  // ==========================================
  // Clinical Risk Color
  // Column G
  // ==========================================
  const riskColors = {
    I: ["FEE2E2", "B91C1C"],
    H: ["FECACA", "DC2626"],
    G: ["FFEDD5", "EA580C"],
    F: ["FED7AA", "F97316"],
    E: ["FEF9C3", "CA8A04"],
    D: ["ECFCCB", "65A30D"],
    C: ["DCFCE7", "16A34A"],
    B: ["E0F2FE", "0284C7"],
    A: ["F3F4F6", "6B7280"],
  };

  rows.forEach((row, index) => {
    const excelRow = index + 5;

    const cell =
      worksheet[`G${excelRow}`];

    if (!cell) return;

    const level =
      row["ระดับ"]?.split(" : ")[0];

    const color = riskColors[level];

    if (color) {
      cell.s = {
        ...cell.s,

        fill: {
          fgColor: {
            rgb: color[0],
          },
        },

        font: {
          name: "Tahoma",
          sz: 11,
          bold: true,
          color: {
            rgb: color[1],
          },
        },

        alignment: {
          horizontal: "center",
          vertical: "center",
          wrapText: true,
        },
      };
    }
  });

  // ==========================================
  // Status Color
  // Column J
  // ==========================================
  rows.forEach((row, index) => {
    const excelRow = index + 5;

    const statusCell =
      worksheet[`J${excelRow}`];

    if (!statusCell) return;

    let style = {};

    // ไม่ใช่ข้อร้องเรียน
    if (
      row["สถานะ"] ===
      "ไม่ใช่ข้อร้องเรียน"
    ) {
      style = {
        fill: {
          fgColor: {
            rgb: "FFEDD5",
          },
        },

        font: {
          name: "Tahoma",
          bold: true,
          color: {
            rgb: "EA580C",
          },
        },
      };
    }

    // ข้อร้องเรียนใหม่
    if (
      row["สถานะ"] ===
      "ข้อร้องเรียนใหม่"
    ) {
      style = {
        fill: {
          fgColor: {
            rgb: "FEE2E2",
          },
        },

        font: {
          name: "Tahoma",
          bold: true,
          color: {
            rgb: "DC2626",
          },
        },
      };
    }

    // รอตอบกลับ
    if (
      row["สถานะ"] ===
      "รอตอบกลับ"
    ) {
      style = {
        fill: {
          fgColor: {
            rgb: "FEF3C7",
          },
        },

        font: {
          name: "Tahoma",
          bold: true,
          color: {
            rgb: "92400E",
          },
        },
      };
    }

    // ตอบกลับเรียบร้อย
    if (
      row["สถานะ"] ===
      "ตอบกลับเรียบร้อย"
    ) {
      style = {
        fill: {
          fgColor: {
            rgb: "E0F2FE",
          },
        },

        font: {
          name: "Tahoma",
          bold: true,
          color: {
            rgb: "0369A1",
          },
        },
      };
    }

    // วิเคราะห์แล้ว
    if (
      row["สถานะ"] ===
      "วิเคราะห์แล้ว"
    ) {
      style = {
        fill: {
          fgColor: {
            rgb: "DCFCE7",
          },
        },

        font: {
          name: "Tahoma",
          bold: true,
          color: {
            rgb: "166534",
          },
        },
      };
    }

    statusCell.s = {
      ...statusCell.s,
      ...style,

      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true,
      },
    };
  });

  // ==========================================
  // On Time Status Color
  // S และ W
  // ==========================================
  const applyOnTimeStyle = (cell) => {
    if (!cell || !cell.v) return;

    // ทัน
    if (cell.v === "ทัน") {
      cell.s = {
        ...cell.s,

        fill: {
          fgColor: {
            rgb: "DCFCE7",
          },
        },

        font: {
          name: "Tahoma",
          bold: true,
          color: {
            rgb: "166534",
          },
        },

        alignment: {
          horizontal: "center",
          vertical: "center",
        },
      };
    }

    // ไม่ทัน
    if (cell.v === "ไม่ทัน") {
      cell.s = {
        ...cell.s,

        fill: {
          fgColor: {
            rgb: "FEE2E2",
          },
        },

        font: {
          name: "Tahoma",
          bold: true,
          color: {
            rgb: "B91C1C",
          },
        },

        alignment: {
          horizontal: "center",
          vertical: "center",
        },
      };
    }
  };

  rows.forEach((row, index) => {
    const excelRow = index + 5;

    // S
    applyOnTimeStyle(
      worksheet[`S${excelRow}`]
    );

    // W
    applyOnTimeStyle(
      worksheet[`W${excelRow}`]
    );
  });

  // ==========================================
  // Workbook
  // ==========================================
  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "ข้อร้องเรียน"
  );

  // ==========================================
  // Write Excel
  // ==========================================
  const buffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array",
    }
  );

  // ==========================================
  // Save
  // ==========================================
  saveAs(
    new Blob([buffer], {
      type: "application/octet-stream",
    }),
    `รายงานข้อร้องเรียน_${Date.now()}.xlsx`
  );
};

