import React from "react";
import Typography from "@mui/material/Typography";
import { MessageProps } from "../../setup/types";

const Message = ({ text }: MessageProps) => {
  return (
    <>
      <Typography color="textSecondary">{text}</Typography>
    </>
  );
};

export default Message;
