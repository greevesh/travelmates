import React from "react";
import { NextButtonProps } from "../../setup/types";

const NextButton: React.FC<NextButtonProps> = ({ incrementStep }) => {
  return <button onClick={incrementStep}>Next</button>;
};

export default NextButton;
