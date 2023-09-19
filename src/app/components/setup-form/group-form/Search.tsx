import React from "react";

import { UserSearchProps } from "../../../create-group/types";
import Image from "next/image";

const Search: React.FC<UserSearchProps> = ({
  input,
  users,
  handleChange,
  handleSelect,
}) => {
  return (
    <div>
      <form
        id="form"
        className="d-flex"
        type="search"
        placeholder="Search for any user"
        aria-label="Search"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      ></form>
      {input && (
        <div style={{ width: "18rem" }}>
          <ul>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <li onClick={() => handleSelect(user)} key={index}>
                  <Image
                    width="50"
                    height="50"
                    src={user.photoURL}
                    alt="user profile picture"
                  />
                  {user.displayName}
                </li>
              ))
            ) : (
              <li>Couldn't retrieve any users</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
