import React from 'react';



const ExperienceSection = ({ titleSection, contentSection, image}) => (
  <section className="experience-section">
    <div className="experience-content">
      <img src={image} alt="Check Icon" className="check-icon" /> 
      <div className="text-content">
        <h2>{titleSection}</h2>
        <p>{contentSection}</p>
      </div>
    </div>
  </section>
);

export default ExperienceSection;

