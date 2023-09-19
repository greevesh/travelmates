import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
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
        id="search-input"
        options={users.map((user: UserResults) => user.displayName)}
        value={userInput}
        onChange={(event, newValue) => setUserInput(newValue)}
        getOptionLabel={(option) => option}
        renderOption={(props, option) => {
          const user = users.find((user) => user.displayName === option);

          return (
            <li {...props}>
              <Avatar src={user?.photoURL} alt={option} />
              <Typography style={{ paddingLeft: "5px" }}>{option}</Typography>
            </li>
          );
        }}
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
    </div>
  );
};

export default Search;
