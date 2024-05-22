import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RenginiaiList from './components/RenginiaiList';
import Filtras from './components/Filtras';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Renginiai from './components/Renginiai';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><RenginiaiList /></ProtectedRoute>} />
          <Route path="/add-event" element={<ProtectedRoute><Renginiai /></ProtectedRoute>} />
          {/* <Route path="/redagavimas/:id" element={<ProtectedRoute><RedagavimoForma /></ProtectedRoute>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
