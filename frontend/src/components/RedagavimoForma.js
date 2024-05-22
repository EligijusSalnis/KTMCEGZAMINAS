import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { updateRenginys } from "../services/api";

function RedagavimoForma({ event, onUpdate, onCancel }) {
  const [name, setName] = useState(event.pavadinimas);
  const [category, setCategory] = useState(event.kategorija);
  const [time, setTime] = useState(event.laikas);
  const [location, setLocation] = useState(event.vieta);
  const [imageURL, setImageURL] = useState(event.nuotrauka);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRenginys(event.id, {
        pavadinimas: name,
        kategorija: category,
        laikas: time,
        vieta: location,
        nuotrauka: imageURL,
      });
      onUpdate();
    } catch (error) {
      console.error("Klaida atnaujinant renginį:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="time">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="imageURL">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Save</Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
}

export default RedagavimoForma;
