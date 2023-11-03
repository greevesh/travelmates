import { GridCellParams, GridTreeNode } from "@mui/x-data-grid-pro";
import { Row } from "./types";

const mapColorsToJourneys = (
  params: GridCellParams<any, any, any, GridTreeNode>,
  currentMonthRows: Row[]
): string => {
  const currentRowLocations = currentMonthRows
    .flatMap((row) => row.locations)
    .filter((location: string) => location !== "");

  const currentRowLocationsSet = new Set(currentRowLocations);
  const uniqueLocations = Array.from(currentRowLocationsSet);

  const classNames = uniqueLocations.map((location, index) => {
    if (params.value === location) {
      const className = `journey-${index + 1}`;
      return className;
    }
    return "";
  });

  return classNames.join(" ");
};

export default mapColorsToJourneys;
