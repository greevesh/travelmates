import React from "react";

import { SelectedBadgeProps } from "../create-group/types";

const SelectedBadge: React.FC<SelectedBadgeProps> = ({
  selectedItem,
  handleDelete,
}) => {
  return (
    <div>
      {selectedItem}
      <span onClick={handleDelete} className="ms-1">
        X
      </span>
    </div>
  );
};

export default SelectedBadge;
