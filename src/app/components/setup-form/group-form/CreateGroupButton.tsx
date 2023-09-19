import React from "react";
import { CreateGroupButtonProps } from "../../../create-group/types";
import Button from "@mui/material/Button";

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
