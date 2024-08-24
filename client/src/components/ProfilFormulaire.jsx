import React, { useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom"; 
import config from '../config';

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

  const backendUrl = config.backendUrl;
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

    console.log(`${backendUrl}/create`);
    try {
      const profilResponse = await Axios.post(`${backendUrl}/create`, {
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
      console.log(profilResponse.data);
      const profilId = profilResponse.data.insertId;

      for (const exp of experiences) {
        await Axios.post(`${backendUrl}/createDetails`, {
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
        html: "<i>Votre profil<strong> " + profil + "</strong> et experiences sont sauvegardés. Votre profil sera bientôt validé</i>",
        icon: "success",
        timer: 4000,
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
      navigate(`/cvComplet/${profilId}`);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const generateYears = () => {
    const years = [];
    for (let i = 2; i <= 30; i++) {
      years.push(i);
    }
    return years;
  };

  const generateTjm = () => {
    const tjm = [];
    for (let i = 0; i <= 1000; i += 10) {
      tjm.push(i); // Cambiado de `years.push(i)` a `tjm.push(i)`
    }
    return tjm;
  };

  const generateDisponibilite = () => {
    const disponible = [];
    for (let i = 0; i <= 60; i++) {
      disponible.push("Disponible sous " + i + " jours");
    }
    return disponible;
  };

  const generateMobilite = () => {
    return [
      "Île-de-France",
      "Auvergne-Rhône-Alpes",
      "Bourgogne-Franche-Comté",
      "Bretagne",
      "Centre-Val de Loire",
      "Corse",
      "Grand Est",
      "Hauts-de-France",
      "Normandie",
      "Nouvelle-Aquitaine",
      "Occitanie",
      "Pays de la Loire",
      "Provence-Alpes-Côte d'Azur"
    ];
  };

  const years = generateYears();
  const tjms = generateTjm();
  const dispo = generateDisponibilite();
  const mobil = generateMobilite();

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
                placeholder="Nom prénom"
                value={profil || ''}
                aria-label="Nom prénom"
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
                placeholder="Ex: développeur java fullstack"
                value={titre || ''}
                aria-label="Ex: développeur java fullstack"
                aria-describedby="basic-addon1"
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Années d'expérience:</span>
              <select
                className="form-select"
                onChange={(e) => setExperience(e.target.value)}
                value={experience || ''}
                aria-label="Années d'expérience"
                required
              >
                <option value="">...</option>
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>  
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">TJM:</span>
              <select
                className="form-select"
                onChange={(e) => setTjm(e.target.value)}
                value={tjm || ''}
                aria-label="TJM"
                required
              >
                <option value="">...</option>
                {tjms.map(tjm => (
                  <option key={tjm} value={tjm}>
                    {tjm}
                  </option>
                ))}
              </select>
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
              <select
                className="form-select"
                onChange={(e) => setDisponibilite(e.target.value)}
                value={disponibilite || ''}
                aria-label="Disponibilités"
                required
              >
                <option value="">...</option>
                <option value="Disponible">Disponible</option>
                {dispo.map(dispo => (
                  <option key={dispo} value={dispo}>
                    {dispo}
                  </option>
                ))}
              </select>
            </div> 
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Mobilité:</span>
              <select
                className="form-select"
                onChange={(e) => setMobilite(e.target.value)}
                value={mobilite || ''}
                aria-label="Mobilité"
                required
              >
                <option value="">...</option>
                <option value="100 % télétravail">100 % télétravail</option>
                {mobil.map(mobilite => (
                  <option key={mobilite} value={mobilite}>
                    {mobilite}
                  </option>
                ))}
              </select>
            </div> 
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Status:</span>
              <select
                className="form-select"
                onChange={(e) => setStatu(e.target.value)}
                value={statu || ''}
                aria-label="Status"
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

            <h4>Expériences</h4>
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
                    placeholder="Ex: Développement d'une API..."
                    name="description"
                    value={exp.description}
                    onChange={(event) => handleExperienceChange(index, event)}
                    required
                  />
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-primary mb-3" onClick={handleAddExperience}>
              Ajouter une expérience
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