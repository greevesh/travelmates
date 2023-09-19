import React from "react";
import { NextMonthButtonProps } from "../../group/types";

const NextMonthButton: React.FC<NextMonthButtonProps> = ({
  incrementMonth,
}) => {
  return <button onClick={incrementMonth}>Next month</button>;
};

export default NextMonthButton;
