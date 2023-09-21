import React from "react";
import { HeadingProps } from "../../create-group/types";

const Heading: React.FC<HeadingProps> = ({ heading, subheading }) => {
  return (
    <>
      <h1>{heading}</h1>
      <h2>{subheading}</h2>
    </>
  );
};

export default Heading;
