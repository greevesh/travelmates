import React from "react";
import Button from "@mui/material/Button";
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
    <Button
      sx={{ marginTop: "7px" }}
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
