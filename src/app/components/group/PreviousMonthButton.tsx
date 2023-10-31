import React from "react";
import Button from "@mui/material/Button";
import { PreviousMonthButtonProps } from "../../group/types";

const PreviousMonthButton: React.FC<PreviousMonthButtonProps> = ({
  decrementMonth,
}) => {
  return (
    <Button
      style={{ marginBottom: "5px" }}
      variant="outlined"
      onClick={decrementMonth}
    >
      Previous month
    </Button>
  );
};

export default PreviousMonthButton;
