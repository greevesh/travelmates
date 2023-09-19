import React from "react";
import { CreateJourneyButtonProps } from "../../../create-journey/types";
import SpinnerComponent from "../../Spinner";

const CreateJourneyButton: React.FC<CreateJourneyButtonProps> = ({
  journey,
  handleSubmit,
  emptyInput,
  spinnerVisible,
  journeyCount,
}) => {
  return (
    <button
      disabled={emptyInput || spinnerVisible || journeyCount > 4}
      onClick={() => handleSubmit()}
    >
      Create Journey
      {spinnerVisible ? <SpinnerComponent /> : null}
    </button>
  );
};

export default CreateJourneyButton;
