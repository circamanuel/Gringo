import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/forums">Foren</Link>
                </li>
                <li>
                    <Link to="/forums/new">Neues Forum</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Registrieren</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
