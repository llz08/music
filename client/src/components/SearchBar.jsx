import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function SearchBar({ handleSearch }) {
  const [searchKey, setSearchKey] = useState("");

  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchKey);
    e.target.reset();
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>

        <Form.Control
          type="text"
          placeholder="Search here..."
          onChange={handleChange}
        />
      <Button variant="outline-secondary" size="lg" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;
