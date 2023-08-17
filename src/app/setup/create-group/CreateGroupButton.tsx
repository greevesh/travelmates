import React from "react";
import { Button } from "react-bootstrap";
import { CreateGroupButtonProps } from "src/app/types";

const CreateGroupButton: React.FC<CreateGroupButtonProps> = ({
  group,
  handleSubmit,
  emptyInput,
}) => {
  return (
    <Button disabled={emptyInput} onClick={() => handleSubmit()}>
      Create Group
    </Button>
  );
};

export default CreateGroupButton;
