import { months } from "./columns";
import { Row } from "../group/types";

import fetchCurrentUserDisplayName from "./fetchCurrentUserDisplayName";
import fetchCurrentUserLocations from "./fetchLocations";
import { FetchRowDataProps } from "../group/types";

const fetchRows = async ({ currentMonth, currentYear }: FetchRowDataProps) => {
  const currentUserDisplayName: string = await fetchCurrentUserDisplayName();
  const currentUserLocations: string[] = await fetchCurrentUserLocations({
    currentMonth,
    currentYear,
  });

  const rows: Row[] = [
    {
      id: 1,
      photoURL:
        "https://lh3.googleusercontent.com/a/AAcHTtdHw1hx0h-_MhWLPT7lw9jom3nIZLOJok8fQ0U_=s96-c",
      name: currentUserDisplayName,
      month: months[currentMonth],
      year: currentYear,
      locations: currentUserLocations,
    },
  ];

  return rows;
};

export default fetchRows;
