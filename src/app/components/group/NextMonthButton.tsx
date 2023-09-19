import React from "react";
import { NextMonthButtonProps } from "../../group/types";
import Button from "@mui/material/Button";

const NextMonthButton: React.FC<NextMonthButtonProps> = ({
  incrementMonth,
}) => {
  return (
    <Button variant="outlined" onClick={incrementMonth}>
      Next month
    </Button>
  );
};

export default NextMonthButton;
