import React from "react";
import { DatePicker, Space } from "antd";

const ReactDateRangePicker = ({ value, onChange }) => {
  const { RangePicker } = DatePicker;
  const handleDateChange = (date, dateString) => {
    onChange(dateString);
  };
  return (
    <Space direction="vertical" size={12}>
      <RangePicker value={value} onChange={handleDateChange} />
    </Space>
  );
};

export default ReactDateRangePicker;
