import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { SearchProps } from "../types";

const Search: React.FC<SearchProps> = ({
  input,
  usersList,
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
            {usersList.map((name: string) => (
              <ListGroup.Item onClick={() => handleSelect(name)} key={name}>
                {name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </div>
  );
};

export default Search;
