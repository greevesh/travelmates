import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const NextButton = () => {
  const handleNextClick = () => {
    console.log("Next button clicked!");
  };

  return (
    <Button variant="primary" onClick={handleNextClick}>
      Next
    </Button>
  );
};

export default NextButton;
