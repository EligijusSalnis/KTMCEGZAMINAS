import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Filtras({ kategorijos, onFilter }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleFilter = () => {
    onFilter({ kategorija: selectedCategory, data: selectedDate });
  };

  return (
    <Form>
      <Form.Group controlId="category">
        <Form.Label>Kategorija</Form.Label>
        <Form.Control
          as="select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Visos kategorijos</option>
          {kategorijos.map((kategorija) => (
            <option key={kategorija} value={kategorija}>
              {kategorija}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="date">
        <Form.Label>Data</Form.Label>
        <Form.Control
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleFilter}>Filtruoti</Button>
    </Form>
  );
}

export default Filtras;
