import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getRenginiai, createIvertinimas, deleteRenginys } from '../services/api'; // Pridėti deleteRenginys iš API
import Filtras from './Filtras';
import { useNavigate } from 'react-router-dom';

function RenginiaiList() {
  const [renginiai, setRenginiai] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRenginiai();
  }, []);

  const fetchRenginiai = async () => {
    try {
      const response = await getRenginiai();
      setRenginiai(response.data);
    } catch (error) {
      console.error('Klaida gaunant duomenis:', error);
    }
  };

  const handleRate = async (renginysId, ivertinimas) => {
    try {
      await createIvertinimas({ RenginiaiId: renginysId, ivertinimas });
      fetchRenginiai();
    } catch (error) {
      console.error('Klaida pridedant įvertinimą:', error);
    }
  };

  const handleEdit = (renginysId) => {
    
  };

  const handleDelete = async (renginysId) => {
    try {
      await deleteRenginys(renginysId);
      fetchRenginiai();
    } catch (error) {
      console.error('Klaida trinant renginį:', error);
    }
  };

  return (
    <div>
      <Filtras />
      {renginiai.map(renginys => (
        <Card key={renginys.id} className='m-3'>
          <Card.Body style={{ backgroundColor: '#f8f9fa' }} className="renginys-card">
            <Card.Title>{renginys.pavadinimas}</Card.Title>
            <Card.Text>
              Kategorija: {renginys.kategorija}
              <br />
              Data: {new Date(renginys.laikas).toLocaleString()}
              <br />
              Vieta: {renginys.vieta}
              <br />
              {renginys.nuotrauka && <img src={renginys.nuotrauka} alt="Renginio nuotrauka" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
            </Card.Text>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <Button
                  key={star}
                  onClick={() => handleRate(renginys.id, star)}
                >
                  &#9733;
                </Button>
              ))}
            </div>
            <Button onClick={() => handleEdit(renginys.id)} className="m-3">Edit</Button>
            <Button onClick={() => handleDelete(renginys.id)} variant="danger">Delete</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default RenginiaiList;
