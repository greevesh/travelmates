import React from "react";
import { LocationSearchProps } from "../../../create-journey/types";

const Search: React.FC<LocationSearchProps> = ({
  input,
  geonamesList,
  handleChange,
  handleSelect,
}) => {
  return (
    <div>
      <form
        id="form"
        className="d-flex"
        type="search"
        placeholder="Search for any city"
        aria-label="Search"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      ></form>
      {input && (
        <div style={{ width: "18rem" }}>
          <ul>
            {geonamesList !== undefined
              ? geonamesList.map((name: string) => (
                  <li onClick={() => handleSelect(name)} key={name}>
                    {name}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
