import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getKategorijos } from '../services/api';
import ProtectedRoute from './ProtectedRoute';

function Filtras({ onFilter }) {
  const [kategorijos, setKategorijos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchKategorijos();
  }, []);

  const fetchKategorijos = async () => {
    try {
      const response = await getKategorijos();
      setKategorijos(response.data);
    } catch (error) {
      console.error('Klaida gaunant kategorijas:', error);
    }
  };

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
          {kategorijos.map(kategorija => (
            <option key={kategorija.id} value={kategorija.pavadinimas}>
              {kategorija.pavadinimas}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="date">
        <Form.Label>Data</Form.Label>
        <Form.Control
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)} />
      </Form.Group>
      <Button onClick={handleFilter}>Filtruoti</Button>
    </Form>
  );
}

export default Filtras;
