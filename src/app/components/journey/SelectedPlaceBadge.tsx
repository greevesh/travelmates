import React from "react";
import Badge from "react-bootstrap/Badge";

interface SelectedPlaceBadgeProps {
  selectedPlace: string;
  handleDelete: () => void;
}

const SelectedPlaceBadge: React.FC<SelectedPlaceBadgeProps> = ({
  selectedPlace,
  handleDelete,
}) => {
  return (
    <Badge className="mt-2" bg="secondary">
      {selectedPlace}
      <span onClick={handleDelete} className="ms-1">
        X
      </span>
    </Badge>
  );
};

export default SelectedPlaceBadge;
