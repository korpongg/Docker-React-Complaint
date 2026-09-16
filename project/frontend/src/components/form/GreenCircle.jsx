import React from 'react';

const GreenCircle = () => (
  <span style={{
    height: '12px',
    width: '12px',
    backgroundColor: '#065f46', // สีเขียวไทยนครินทร์
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '12px',
    flexShrink: 0 // ป้องกันวงกลมเบี้ยวเวลาข้อความยาว
  }} />
);

export default GreenCircle;