import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Logout from './Auth/Logout';

const NavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand className="m-2" as={Link} to="/">Miesto Renginiai</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Nav.Link as={Link} to="/">Pagrindinis</Nav.Link>
                    <Nav.Link as={Link} to="/add-event">Pridėti renginį</Nav.Link>
                </Nav>
                <Nav>
                    {isAuthenticated ? (
                        <Logout />
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Prisijungti</Nav.Link>
                            <Nav.Link as={Link} to="/register">Registruotis</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
