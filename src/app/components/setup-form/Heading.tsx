import React from "react";
import Typography from "@mui/material/Typography";
import { HeadingProps } from "../../create-group/types";

const Heading: React.FC<HeadingProps> = ({ heading, subheading }) => {
  return (
    <>
      <Typography variant="h4" component="div">
        {heading}
      </Typography>
      <Typography color="textSecondary" variant="h6" component="div" mb={4}>
        {subheading}
      </Typography>
    </>
  );
};

export default Heading;
