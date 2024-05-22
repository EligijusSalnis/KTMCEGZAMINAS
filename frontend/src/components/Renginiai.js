import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createRenginys } from '../services/api';
import { jwtDecode } from "jwt-decode";

const Renginiai = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
  
      if (!userId) {
        console.error('Vartotojas neprisijungęs');
        return;
      }
  
      const eventData = {
        pavadinimas: name,
        kategorija: category,
        laikas: time,
        vieta: location,
        nuotrauka: imageURL,
        VartotojaiId: userId
      };
  
      await createRenginys(eventData);
  
    } catch (error) {
      console.error('Klaida pridedant renginį:', error);
    }
  };
  
  return (
    <Form onSubmit={handleAddEvent}>
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
      <Button type="submit">Add Event</Button>
    </Form>
  );
};

export default Renginiai;
