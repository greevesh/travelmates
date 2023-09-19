import React from "react";
import { PreviousMonthButtonProps } from "../../group/types";

const PreviousMonthButton: React.FC<PreviousMonthButtonProps> = ({
  decrementMonth,
}) => {
  return <button onClick={decrementMonth}>Previous month</button>;
};

export default PreviousMonthButton;
