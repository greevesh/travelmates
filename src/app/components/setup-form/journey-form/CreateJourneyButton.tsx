import React from "react";
import { CreateJourneyButtonProps } from "../../../create-journey/types";
import SpinnerComponent from "../../Spinner";
import Button from "@mui/material/Button";

const CreateJourneyButton: React.FC<CreateJourneyButtonProps> = ({
  journey,
  handleSubmit,
  emptyInput,
  spinnerVisible,
  journeyCount,
}) => {
  return (
    <Button
      variant="contained"
      disabled={emptyInput || spinnerVisible || journeyCount > 4}
      onClick={() => handleSubmit()}
    >
      Create Journey
      {spinnerVisible ? <SpinnerComponent /> : null}
    </Button>
  );
};

export default CreateJourneyButton;
