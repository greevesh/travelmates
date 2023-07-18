import React from "react";
import { Button } from "react-bootstrap";
import { CreateJourneyButtonProps } from "../../types";

const CreateJourneyButton: React.FC<CreateJourneyButtonProps> = ({
  journey,
  handleSubmit,
  emptyInput,
}) => {
  return (
    <Button disabled={emptyInput} onClick={() => handleSubmit()}>
      Create Journey
    </Button>
  );
};

export default CreateJourneyButton;
