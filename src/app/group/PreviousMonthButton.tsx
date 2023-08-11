import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { PreviousMonthButtonProps } from "../types";

const PreviousMonthButton: React.FC<PreviousMonthButtonProps> = ({
  decrementMonth,
}) => {
  return (
    <Button variant="primary" onClick={decrementMonth}>
      Previous month
    </Button>
  );
};

export default PreviousMonthButton;
