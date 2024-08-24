import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import avatar from '../codinghub.png'; 
import comunite from '../comunite.png'; 
import deal from '../deal.png'; 
import businessmen from '../businessmen.jpg'; 
import '../LandingPage.css';
import '../cv.css';
import ExperienceSection from './ExperienceSection'; 

const content = {

    
    title: "titre",
    aboutTitle: "À propos de moi",
    contentCodingHub: "CODINGHUB est une communauté de développeurs freelances en recherche de missions.",
    contentTjm:"C'est basé sur l'apport d'affaires, entre le freelance et l´apporteur.",
    linkTextCodingHub: "En savoir plus sur CodingHub",
    linkToCodingHub: "/codinghub-details",
    linkTextTjm: "En savoir plus sur le TJM",
    linkToTjm: "/tjm-details",
    linkTextBeCod: "Intègre CodingHub",
    linkToBeCod: "/profilFormulaire",
    linkTextProfil: "Trouve le profil idéal ",
    linkToProfil: "/home",
    contentLink: "Trouver une mission"
};

const LandingPage = () => {
  return (
    <div >
      <div className="bg-image"></div>    
      <header className="text-white text-center py-5 position-relative">
        <div className="container">
          <div className="logo-container mb-4">
            <img src={avatar} alt="Logo" className="mb-3" style={{ maxWidth: '150px' }} />
          </div>
          <h1 className="display-4 text-uppercase rgb-text  ">CodingHub</h1>
          <p className="shiny-text">Plateforme du collectif de développeurs freelance dans différentes technologies</p>
        </div>
      </header>

       
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <ExperienceSection titleSection={content.titleSection3} contentSection={content.contentCodingHub} image={comunite} />
          </div>
          <div className="col-md-4 mb-4">
            <ExperienceSection titleSection={content.titleSection3} contentSection={content.contentTjm} image={deal} />
          </div>
          <div className="col-md-4 mb-4">
            <ExperienceSection titleSection={content.titleSection3} contentSection="" image={businessmen} links={[
              { text: content.linkTextBeCod, to: content.linkToBeCod },
              { text: content.linkTextProfil, to: content.linkToProfil }
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;