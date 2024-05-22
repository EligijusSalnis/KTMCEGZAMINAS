import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/api";
import { Form, Button } from "react-bootstrap";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ elPastas: email, slaptažodis: password });
      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      console.error("Prisijungimo klaida:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Prisijungimas</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>El. paštas</Form.Label>
          <Form.Control
            type="email"
            placeholder="Įveskite el. paštą"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Slaptažodis</Form.Label>
          <Form.Control
            type="password"
            placeholder="Įveskite slaptažodį"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Prisijungti
        </Button>
        <p className="mt-3">
          Neturite paskyros? <Link to="/register">Registruokitės čia</Link>
        </p>
        <p className="mt-3 text-danger">Prisijungti privaloma!</p>
        <p className="mt-3">Naudojant paruošta duomenų bazę:</p>
        <p className="m-1">Admin: admin@admin.com | Admin123</p>
        <p className="m-1">
          Vartotojas: vartotojas@vartotojas.com | Vartotojas123
        </p>
      </Form>
    </div>
  );
}

export default Login;
