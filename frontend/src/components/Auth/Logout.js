import React from 'react';
import { useNavigate  } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('storage'));
        navigate('/login');
    };

  return (
    <button onClick={handleLogout} className="btn btn-link text-white bg-dark m-2">Atsijungti</button>
  );
};

export default Logout;
