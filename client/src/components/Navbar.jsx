import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../codinghub.png';


const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/auth'; // Redirige al usuario a la página de autenticación
  };

return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/"><img src={avatar} alt="Avatar" className="avatar" /></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto"> 
          <li className="nav-item">
            <Link className="nav-link" to="/home">Profils</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profilFormulaire">Formulaire</Link>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto"> 
          <li className="nav-item">
            <span className="navbar-text">
              {localStorage.getItem('userName') ? `Welcome, ${localStorage.getItem('userName')}` : ""}
            </span>
          </li>
          {localStorage.getItem('token') && (
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);
};

export default Navbar;