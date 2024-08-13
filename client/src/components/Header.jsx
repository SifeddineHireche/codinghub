import React from 'react';
import avatar from '../codinghub.png'; 


const Header = ({ name, title }) => (
  <header className="header-content">
    <img src={avatar} alt="Avatar" className="avatar" /> 
    <div className="header-text">
      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  </header>
);

export default Header;