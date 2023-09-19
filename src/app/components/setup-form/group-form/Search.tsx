import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Image from "next/image";
import fetchUsers from "../../../create-group/fetchUsers";
import { UserSearchProps, UserResults } from "../../../create-group/types";

const Search: React.FC<UserSearchProps> = ({
  input,
  handleChange,
  handleSelect,
  users,
  groupMembers,
  setUsers,
}) => {
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    fetchUsers(userInput, groupMembers, setUsers);
  }, [userInput, groupMembers, setUsers]);

  return (
    <div>
      <Autocomplete
        freeSolo
        id="search-input"
        options={users.map((user: UserResults) => user.displayName)}
        value={userInput}
        onChange={(event, newValue) => setUserInput(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for users"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      {/* {input && (
        <div style={{ width: "18rem" }}>
          <ul>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <li
                  onClick={() => handleSelect(user)}
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    width={50}
                    height={50}
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
      )} */}
    </div>
  );
};

export default Search;
