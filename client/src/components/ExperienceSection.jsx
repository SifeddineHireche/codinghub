import React from 'react';
import { Link, useNavigate } from 'react-router-dom';



const ExperienceSection = ({ titleSection, contentSection, image, links}) => (
  <section className="experience-section">
    <div className="experience-content">
      <img src={image} alt="Check Icon" className="experience-image" /> 
      <div className="text-content">
        <h2>{titleSection}</h2>
        <p>{contentSection}</p>
        {links && links.map((link, index) => (
        <p key={index}>
            <Link
              to={link.to}
              style={{
                color: 'black',
                textDecoration: 'none',
              }}
              onMouseOver={(e) => e.target.style.color = 'blue'}
              onMouseOut={(e) => e.target.style.color = 'black'}
            >
              {link.text}
            </Link>
          </p>
        
      ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;

