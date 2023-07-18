import React from "react";
import { Button } from "react-bootstrap";
import { CreateJourneyButtonProps } from "../../types";

const CreateJourneyButton: React.FC<CreateJourneyButtonProps> = ({
  journey,
  createJourney,
  emptyInput,
}) => {
  return (
    <Button disabled={emptyInput} onClick={() => createJourney(journey)}>
      Create Journey
    </Button>
  );
};

export default CreateJourneyButton;
