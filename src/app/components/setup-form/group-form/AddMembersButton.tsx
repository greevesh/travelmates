import React from "react";
import Button from "@mui/material/Button";
import { AddMembersButtonProps } from "../../../create-group/types";

const AddMembersButton: React.FC<AddMembersButtonProps> = ({
  handleSubmit,
  emptyInput,
}) => {
  return (
    <Button
      variant="contained"
      disabled={emptyInput}
      onClick={() => handleSubmit()}
    >
      Add Members
    </Button>
  );
};

export default AddMembersButton;
