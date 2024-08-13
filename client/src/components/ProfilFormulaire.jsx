import React, { useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom"; 



const notif = withReactContent(Swal);


const ProfilFormulaire = () => {
  const [profil, setProfil] = useState("");
  const [titre, setTitre] = useState("");
  const [experience, setExperience] = useState("");
  const [tjm, setTjm] = useState("");
  const [stack, setStack] = useState("");
  const [mobilite, setMobilite] = useState("");
  const [disponibilite, setDisponibilite] = useState("");
  const [statu, setStatu] = useState("");
  const [contact, setContact] = useState("");
  const [experiences, setExperiences] = useState([{ nom: "", anneDebut: "", anneFin: "", entreprise: "", description: "" }]);

  const navigate = useNavigate(); 
  const handleAddExperience = () => {
    setExperiences([...experiences, { nom: "", anneDebut: "", anneFin: "", entreprise: "", description: "" }]);
  };

  const handleExperienceChange = (index, event) => {
    const newExperiences = experiences.map((exp, expIndex) => {
      if (index === expIndex) {
        return { ...exp, [event.target.name]: event.target.value };
      }
      return exp;
    });
    setExperiences(newExperiences);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const profilResponse = await Axios.post('http://localhost:3001/create', {
        profil,
        titre,
        experience,
        tjm,
        stack,
        disponibilite,
        mobilite,
        statu,
        contact,
      });

      const profilId = profilResponse.data.insertId;

      for (const exp of experiences) {
        await Axios.post('http://localhost:3001/createDetails', {
          id_profil: profilId,
          nom: exp.nom,
          anneDebut: exp.anneDebut,
          anneFin: exp.anneFin,
          entreprise: exp.entreprise,
          description: exp.description,
        });
      }

      Swal.fire({
        title: "<strong>Profil sauvegardé!</strong>",
        html: "<i>Votre profil<strong>" + profil + "</strong> et experiences sont sauvegardé!</i>",
        icon: "success",
        timer: 3000,
      });

      // Reset form
      setProfil("");
      setTitre("");
      setExperience("");
      setTjm("");
      setStack("");
      setMobilite("");
      setDisponibilite("");
      setStatu("");
      setContact("");
      setExperiences([{ nom: "", anneDebut: "", anneFin: "", entreprise: "", description: "" }]);
      navigate(`/cvComplet/${profilId}`)


    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card text-center" style={{ width: '60rem' }}>
        <div className="card-header">
          CREATION PROFILE FREELANCE
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nom:</span>
              <input
                type="text"
                onChange={(e) => setProfil(e.target.value)}
                className="form-control"
                placeholder="Nom prenom"
                value={profil || ''}
                aria-label="Nom prenom"
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Titre:</span>
              <input
                type="text"
                onChange={(e) => setTitre(e.target.value)}
                className="form-control"
                placeholder="Ex: developpeur java fullstack"
                value={titre || ''}
                aria-label="Ex: developpeur java fullstack"
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Années d'expérience:</span>
              <input
                type="text"
                onChange={(e) => setExperience(e.target.value)}
                className="form-control"
                placeholder="Ex: 5"
                value={experience || ''}
                aria-label="Ex: 5"
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">TJM:</span>
              <input
                type="number"
                onChange={(e) => setTjm(e.target.value)}
                className="form-control"
                placeholder="Ex: 450"
                value={tjm || ''}
                aria-label="Ex: 450"
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Stack technique:</span>
              <input
                type="text"
                onChange={(e) => setStack(e.target.value)}
                className="form-control"
                placeholder="Java, python.."
                value={stack || ''}
                aria-label="Java, python.."
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Disponibilités:</span>
              <input
                type="text"
                onChange={(e) => setDisponibilite(e.target.value)}
                className="form-control"
                placeholder="Disponible sous 15 Jours"
                value={disponibilite || ''}
                aria-label="Disponible sous 15 Jours"
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Mobilité:</span>
              <input
                type="text"
                onChange={(e) => setMobilite(e.target.value)}
                className="form-control"
                placeholder="Ile de France..."
                value={mobilite || ''}
                aria-label="Ile de France..."
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Status:</span>
              <select
                className="form-select"
                onChange={(e) => setStatu(e.target.value)}
                value={statu || ''}
                aria-label="..."
                required
              >
                <option value="">...</option>
                <option value="En mission">En mission</option>
                <option value="Disponible">Disponible</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Contact:</span>
              <input
                type="text"
                onChange={(e) => setContact(e.target.value)}
                className="form-control"
                placeholder="+33..."
                value={contact || ''}
                aria-label="+33..."
                aria-describedby="basic-addon1"
                required
              />
            </div>

            <h4>Experiences</h4>
            {experiences.map((exp, index) => (
              <div key={index} className="card mb-3 p-2 text-start">
                 <div className="input-group mb-2">
                  <span className="input-group-text">Entreprise:</span>
                  <input
                    type="text"
                    className="form-control"
                    name="entreprise"
                    value={exp.entreprise}
                    onChange={(event) => handleExperienceChange(index, event)}
                    required
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text">Année Début:</span>
                  <input
                    type="text"
                    placeholder="Ex: 07-2020"
                    className="form-control"
                    name="anneDebut"
                    value={exp.anneDebut}
                    onChange={(event) => handleExperienceChange(index, event)}
                    required
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text">Année Fin:</span>
                  <input
                    type="text"
                    className="form-control"
                     placeholder="Ex: 07-2022"
                    name="anneFin"
                    value={exp.anneFin}
                    onChange={(event) => handleExperienceChange(index, event)}
                    required
                  />
                </div>
               
                <div className="input-group mb-2">
                  <span className="input-group-text">Description:</span>
                  <textarea
                    className="form-control"
                    placeholder="Ex: Developpement d'une Api..."
                    name="description"
                    value={exp.description}
                    onChange={(event) => handleExperienceChange(index, event)}
                    required
                  />
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-primary mb-3" onClick={handleAddExperience}>
              Ajouter une experience
            </button>

            <div className="card-footer text-muted">
              <button type="submit" className="btn btn-success">
                Sauvegarder
              </button>
            </div>
          </form>
         
        </div>
      </div>
      
    </div>
  );
};

export default ProfilFormulaire;