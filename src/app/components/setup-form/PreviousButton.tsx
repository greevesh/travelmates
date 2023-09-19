import React from "react";
import { PreviousButtonProps } from "../../setup/types";
import Button from "@mui/material/Button";

const PreviousButton: React.FC<PreviousButtonProps> = ({ decrementStep }) => {
  return <Button onClick={decrementStep}>Previous</Button>;
};

export default PreviousButton;
