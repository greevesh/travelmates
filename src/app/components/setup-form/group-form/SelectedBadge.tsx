import React from "react";
import Chip from "@mui/material/Chip";
import { SelectedBadgeProps } from "../../../create-group/types";

const SelectedBadge: React.FC<SelectedBadgeProps> = ({
  selectedItem,
  handleDelete,
}) => {
  return (
    <div>
      <Chip label={selectedItem} variant="outlined" onDelete={handleDelete} />
    </div>
  );
};

export default SelectedBadge;
