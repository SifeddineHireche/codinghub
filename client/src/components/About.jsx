import React from 'react';
import avatar from '../codinghub.png'; 
const About = ({ aboutTitle, aboutDescription }) => (
  <section className="about">
    <img src={avatar} alt="Avatar" className="avatar" />
    <div className="about-text">
      <h2>{aboutTitle}</h2>
      <p>{aboutDescription}</p>
    </div>
  </section>
);

export default About;