import React from "react";
import Badge from "react-bootstrap/Badge";

import { SelectedBadgeProps } from "../create-group/types";

const SelectedBadge: React.FC<SelectedBadgeProps> = ({
  selectedItem,
  handleDelete,
}) => {
  return (
    <Badge className="mt-2" bg="secondary">
      {selectedItem}
      <span onClick={handleDelete} className="ms-1">
        X
      </span>
    </Badge>
  );
};

export default SelectedBadge;
