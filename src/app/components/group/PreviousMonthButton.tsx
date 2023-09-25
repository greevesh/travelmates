import React from "react";
import { PreviousMonthButtonProps } from "../../group/types";
import Button from "@mui/material/Button";

const PreviousMonthButton: React.FC<PreviousMonthButtonProps> = ({
  decrementMonth,
}) => {
  return (
    <Button variant="outlined" onClick={decrementMonth}>
      Previous month
    </Button>
  );
};

export default PreviousMonthButton;
