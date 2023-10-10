import React from "react";
import Button from "@mui/material/Button";
import { MembersButtonProps } from "../../../create-group/types";

const AddMembersButton: React.FC<MembersButtonProps> = ({
  handleSubmit,
  emptyInput,
}) => {
  return (
    <Button
      sx={{ marginTop: "5px" }}
      variant="contained"
      disabled={emptyInput}
      onClick={() => handleSubmit()}
    >
      Add Members
    </Button>
  );
};

export default AddMembersButton;
