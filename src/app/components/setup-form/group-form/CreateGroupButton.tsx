import React from "react";
import Button from "@mui/material/Button";
import { CreateGroupButtonProps } from "../../../create-group/types";

const CreateGroupButton: React.FC<CreateGroupButtonProps> = ({
  group,
  handleSubmit,
  emptyInput,
}) => {
  return (
    <Button
      variant="contained"
      disabled={emptyInput}
      onClick={() => handleSubmit()}
    >
      Create Group
    </Button>
  );
};

export default CreateGroupButton;
