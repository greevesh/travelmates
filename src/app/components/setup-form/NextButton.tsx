import React from "react";
import { NextButtonProps } from "../../setup/types";
import Button from "@mui/material/Button";

const NextButton: React.FC<NextButtonProps> = ({ incrementStep }) => {
  return (
    <Button variant="outlined" onClick={incrementStep}>
      Next
    </Button>
  );
};

export default NextButton;
