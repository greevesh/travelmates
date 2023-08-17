import React from "react";
import { Button } from "react-bootstrap";
import { CreateJourneyButtonProps } from "src/app/types";
import SpinnerComponent from "src/app/components/Spinner";

const CreateJourneyButton: React.FC<CreateJourneyButtonProps> = ({
  journey,
  handleSubmit,
  emptyInput,
  spinnerVisible,
}) => {
  return (
    <Button disabled={emptyInput} onClick={() => handleSubmit()}>
      Create Journey
      {spinnerVisible ? <SpinnerComponent /> : null}
    </Button>
  );
};

export default CreateJourneyButton;
