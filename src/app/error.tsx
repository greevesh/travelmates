"use client";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <Typography variant="h4">{"Something went wrong"}</Typography>
      <Button variant="contained" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
};

export default error;
