import React from 'react';
import emailPic from '../email.png'; 
import linkedPic from '../linked.png'; 
import githubPic from '../github.jpg'; 


const Contact = ({ email, linkedin, contactTitle }) => (
  <section className="contact">
    <h2>{contactTitle}</h2>
    <div className="contact-item">
      <img src={emailPic} alt="Email Icon" className="emailPic" />
      <span><a href={`mailto:${email}`}>{email}</a></span>
    </div>
    <p> <img src={linkedPic} alt="Linkedin Icon" className="linkedPic" />
    <a href={`https://linkedin.com/in/${linkedin}`}>https://linkedin.com/in/{linkedin}</a></p>
    <p> <img src={githubPic} alt="Github Icon" className="githubPic" />
    <a href={`https://github.com/SifeddineHireche`}>https://github.com/SifeddineHireche</a></p>
  </section>
);

export default Contact;