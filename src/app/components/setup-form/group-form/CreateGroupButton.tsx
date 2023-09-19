import React from "react";
import { CreateGroupButtonProps } from "../../../create-group/types";

const CreateGroupButton: React.FC<CreateGroupButtonProps> = ({
  group,
  handleSubmit,
  emptyInput,
}) => {
  return (
    <button disabled={emptyInput} onClick={() => handleSubmit()}>
      Create Group
    </button>
  );
};

export default CreateGroupButton;
