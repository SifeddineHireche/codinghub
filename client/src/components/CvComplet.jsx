import React, { useEffect, useState } from 'react';
import Header from './Header';
import About from './About';
import Timeline from './Timeline';
import Contact from './Contact';
import Footer from './Footer';
import ExperienceSection from './ExperienceSection'; 
import checkImage from '../checkOK.png'; 
import bookImage from '../book.jpg'; 
import outilsImage from '../outils.jpg'; 
import '../cv.css';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';




const CvComplet = () => {
  const { id } = useParams();
  const [donnesList,setDonnes]  = useState([]);
  console.log(donnesList);

    useEffect(() => {
      const fetchDonnes = async () => {
          try {
              const response = await Axios.get(`http://localhost:3001/findProfil/${id}`);
              setDonnes(response.data);
       
          } catch (error) {
              console.error("Error fetching profile data:", error);
          }
      };

      fetchDonnes();
  }, [id]);

  const uniqueExperiences = donnesList
  .map(val => val.experience)
  .filter((value, index, self) => self.indexOf(value) === index);
const firstUniqueExperience = uniqueExperiences[0];


const uniqueStack = donnesList
.map(val => val.stack)
.filter((value, index, self) => self.indexOf(value) === index);
const firstUniqueStack = uniqueStack[0];

const uniqueTitre = donnesList
.map(val => val.titre)
.filter((value, index, self) => self.indexOf(value) === index);
const firstUniqueTitre = uniqueTitre[0];
  


  const translations = {

    
   
    fr: {
      name:  donnesList.map(val => val.nom),
      title: firstUniqueTitre,
      aboutTitle: "À propos de moi",
      aboutDescription: "Je suis "+uniqueTitre+ " avec une expérience dans la création de sites Web modernes et fonctionnels. Je suis passionné par le design et la technologie.",
      timelineTitle: "Experiences",
      projects: donnesList.map((val, index) => ({
        year: val.anneDebut +" - "+ val.anneFin  , // Suponiendo que hay un campo 'annee' en los objetos
        title: val.entreprise, // Combinación de 'nom' y 'lieu'
        description: val.description
      })),
      contactTitle: "Contact",
      email: "hireche8@gmail.com",
      linkedin: "sifeddine-hireche-b4a578148",
        titleSection1: firstUniqueExperience+ "  ans d'expérience",
      contentSection1: uniqueTitre  + " depuis "+firstUniqueExperience+ " ans d'experience, ayant colaboré dans plusiers projets. J'apport des solutions a vos problématiques.",
      titleSection2: "un développeur avec  une vrai vision du recrutement",
      contentSection2: "J'ai aidé plusieurs Startup a trouvé des profiles pour leur besoin en developpement grace a notre CodingHub Talent",
      titleSection3: "Frameworks modernes et en formation continue",
      contentSection3: "Spécialisé dans les technologies " +firstUniqueStack+". Je continue a me former périodiquement"
    
    }
   
  };
  
  
    const [language, setLanguage] = useState('fr');
  
    const changeLanguage = (lang) => {
      setLanguage(lang);
    };
  
    const content = translations[language];
  
  return (
    
    <div>
    <Header className='rgb-text-black' name={content.name} title={content.title} />
   
    <About aboutTitle={content.aboutTitle} aboutDescription={content.aboutDescription} />
    <table className='tableHab'>
    <tbody> 
    <tr> 
    <td><ExperienceSection titleSection={content.titleSection1} contentSection= {content.contentSection1} image = {checkImage}/></td>
     <td><ExperienceSection titleSection={content.titleSection3} contentSection= {content.contentSection3} image={outilsImage}/></td>
    </tr>
    </tbody>

    </table>
    <Timeline projects={content.projects} timelineTitle={content.timelineTitle} />
    <Contact contactTitle={content.contactTitle} email={content.email} linkedin={content.linkedin} />
   
  </div>
  )
}

export default CvComplet

