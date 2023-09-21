import React from "react";
import { MessageProps } from "../../setup/types";

const Message = ({ text }: MessageProps) => {
  return (
    <>
      <p>{text}</p>
    </>
  );
};

export default Message;
