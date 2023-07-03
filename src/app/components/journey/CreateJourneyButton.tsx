import React from "react";
import { Button } from "react-bootstrap";
import { Journey } from "../../types";

interface CreateJourneyButtonProps {
  journey: Journey | null;
  createJourney: (journey: Journey | null) => void;
}

const CreateJourneyButton: React.FC<CreateJourneyButtonProps> = ({
  journey,
  createJourney,
}) => {
  return (
    <Button
      disabled={
        !journey?.place ||
        !journey?.date_range.start ||
        !journey?.date_range.end
      }
      onClick={() => createJourney(journey)}
    >
      Create Journey
    </Button>
  );
};

export default CreateJourneyButton;
