import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { PreviousButtonProps } from "../types";

const PreviousButton: React.FC<PreviousButtonProps> = ({ decrementStep }) => {
  return (
    <Button variant="primary" onClick={decrementStep}>
      Previous
    </Button>
  );
};

export default PreviousButton;
