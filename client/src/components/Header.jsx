import React from 'react';
import avatar from '../codinghub.png'; 


const Header = ({ name, title }) => (
  <header className="header-content-cv">
    <img src={avatar} alt="Avatar" className="avatar" /> 
    <div className="header-text-cv">
      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  </header>
);

export default Header;