import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/api';
import { Form, Button } from 'react-bootstrap';
function Register() {
  const [vardas, setVardas] = useState('');
  const [elPastas, setElPastas] = useState('');
  const [slaptazodis, setSlaptazodis] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ vardas, elPastas, slaptažodis: slaptazodis, isAdmin });
      localStorage.setItem('token', response.data.token);
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch (error) {
      console.error('Registracijos klaida:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registracija</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
          <Form.Label>Vardas</Form.Label>
          <Form.Control type="text" placeholder="Įveskite vardą" value={vardas} onChange={(e) => setVardas(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>El. paštas</Form.Label>
          <Form.Control type="email" placeholder="Įveskite el. paštą" value={elPastas} onChange={(e) => setElPastas(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Slaptažodis</Form.Label>
          <Form.Control type="password" placeholder="Įveskite slaptažodį" value={slaptazodis} onChange={(e) => setSlaptazodis(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Registruotis
        </Button>
        <p className="mt-3">Jau turite paskyrą? <Link to="/login">Prisijunkite čia</Link></p>
      </Form>
    </div>
  );
};

export default Register;