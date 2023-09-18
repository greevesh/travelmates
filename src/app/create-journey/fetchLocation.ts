import { GeonameResponse, GeonameURLParams } from "../create-journey/types";
import generateLocationParams from "./generateLocationParams";
import filterResults from "./filterResults";

const fetchLocation = async (
  query: string,
  setError: any,
  setErrorMessage: any,
  setGeonamesList: React.Dispatch<React.SetStateAction<string[]>>
): Promise<void> => {
  const apiURL: URL = new URL("http://api.geonames.org/searchJSON");

  const params = generateLocationParams(query);

  Object.entries(params).forEach(([key, value]) => {
    apiURL.searchParams.set(key, value);
  });

  try {
    const response: Response = await fetch(apiURL);
    if (!response.ok) {
      setError(true);
      setErrorMessage("Network error");
    }
    const data: GeonameResponse = await response.json();
    filterResults(data, setGeonamesList);
  } catch (error) {
    setError(true);
    setErrorMessage("Couldn't retrieve locations");
    console.error("Error:", error);
  }
};

export default fetchLocation;
