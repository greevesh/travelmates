import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextButtonProps } from "src/app/types";

const NextButton: React.FC<NextButtonProps> = ({ incrementStep }) => {
  return (
    <Button variant="primary" onClick={incrementStep}>
      Next
    </Button>
  );
};

export default NextButton;
