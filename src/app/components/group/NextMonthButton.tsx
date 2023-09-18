import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextMonthButtonProps } from "../../group/types";

const NextMonthButton: React.FC<NextMonthButtonProps> = ({
  incrementMonth,
}) => {
  return (
    <Button variant="primary" onClick={incrementMonth}>
      Next month
    </Button>
  );
};

export default NextMonthButton;
