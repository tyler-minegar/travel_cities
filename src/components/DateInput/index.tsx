import { useState } from "react";
import { Form } from "react-bootstrap";

import { InputLabel } from "../SearchCitySelect/components";
import { StyledDatePicker } from "./components";

interface DateInputProps {
  label: string;
  className?: string;
  value: string;
  onChange: Function;
}

const DateInput = ({ label, className, value, onChange }: DateInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(value)
  );

  function handleOnChange(date: Date | null) {
    onChange(date);
    setSelectedDate(date);
  }

  return (
    <Form.Group className={`position-relative ${className}`}>
      <InputLabel>{label}</InputLabel>
      <StyledDatePicker
        selected={selectedDate}
        onChange={handleOnChange}
        dateFormat="MM/dd/yyyy"
      />
    </Form.Group>
  );
};

export default DateInput;
