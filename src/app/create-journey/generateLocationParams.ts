import { GeonameURLParams } from "../create-journey/types";

const generateLocationParams = (query: string): GeonameURLParams => {
  return {
    username: "greevesh",
    q: query,
    maxRows: "10",
    orderBy: "name",
    name_startsWith: query,
    featureCode: "PPL", // filters cities, filters out countries
  };
};

export default generateLocationParams;
