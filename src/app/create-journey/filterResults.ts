import { Geoname, GeonameResponse } from "../create-journey/types";

const filterResults = (
  data: GeonameResponse,
  setGeonamesList: React.Dispatch<React.SetStateAction<string[]>>
): void => {
  const startsWithCapital = (text: string): boolean => {
    return text[0] === text[0].toUpperCase();
  };
  const filteredResults: Geoname[] = data.geonames.filter((location: Geoname) =>
    startsWithCapital(location.name)
  );
  const locationNames: string[] = filteredResults.map(
    (location: Geoname) => `${location.name}, ${location.countryName}`
  );
  const uniqueLocationNames: string[] = [...new Set(locationNames)];
  setGeonamesList(uniqueLocationNames);
};

export default filterResults;
