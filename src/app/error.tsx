"use client";
import Button from "@mui/material/Button";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <h1>{error.message || "Something went wrong."}</h1>
      <Button variant="contained" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
};

export default error;
