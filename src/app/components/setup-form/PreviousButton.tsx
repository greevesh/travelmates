import React from "react";
import { PreviousButtonProps } from "../../setup/types";

const PreviousButton: React.FC<PreviousButtonProps> = ({ decrementStep }) => {
  return <button onClick={decrementStep}>Previous</button>;
};

export default PreviousButton;
