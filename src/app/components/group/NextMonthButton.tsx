import React from "react";
import Button from "@mui/material/Button";
import { NextMonthButtonProps } from "../../group/types";

const NextMonthButton: React.FC<NextMonthButtonProps> = ({
  incrementMonth,
}) => {
  return (
    <Button
      style={{ marginBottom: "5px", marginLeft: "5px" }}
      variant="contained"
      onClick={incrementMonth}
    >
      Next month
    </Button>
  );
};

export default NextMonthButton;
