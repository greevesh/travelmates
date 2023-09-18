import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

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
      <form id="form" className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search for any user"
          className="me-2"
          aria-label="Search"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </form>
      {input && (
        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <ListGroup.Item onClick={() => handleSelect(user)} key={index}>
                  <Image
                    width="50"
                    height="50"
                    src={user.photoURL}
                    alt="user profile picture"
                  />
                  {user.displayName}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>Couldn't retrieve any users</ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      )}
    </div>
  );
};

export default Search;
