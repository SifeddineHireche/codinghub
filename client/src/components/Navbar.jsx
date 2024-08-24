import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../codinghub.png';
import '../cv.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Asegúrate de que este archivo JS está incluido

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    window.location.href = '/auth';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo y nombre de la marca */}
        <Link className="navbar-brand" to="/">
          <img src={avatar} alt="Avatar" className="avatar" />
        </Link>
        
       
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

    
        <div className="collapse navbar-collapse" id="navbarNav">
        
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Profils</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profilFormulaire">Formulaire</Link>
            </li>
          </ul>

        
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {localStorage.getItem('userName') ? (
              <>
               
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                    Logout {localStorage.getItem('userName')}
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/auth">
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;