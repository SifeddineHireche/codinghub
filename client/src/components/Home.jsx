import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Contact from './Contact';
import ProfilTable from './ProfilTable';
import Axios from 'axios';
import config from '../config'; // Importa la configuración
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const notif = withReactContent(Swal);

const Home = () => {
  const [profil, setProfil] = useState("");
  const [titre, setTitre] = useState();
  const [experience, setExperience] = useState("");
  const [tjm, setTjm] = useState("");
  const [stack, setStack] = useState("");
  const [mobilite, setMobilite] = useState("");
  const [disponibilite, setDisponibilite] = useState();
  const [statu, setStatu] = useState();
  const [contact, setContact] = useState();
  const [id, setId] = useState();
  const [profilsList, setProfils] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  
  const backendUrl = config.backendUrl; // Usa la configuración

  // Verifica si hay un token para determinar si el usuario está autenticado
  const isAuthenticated = !!localStorage.getItem('token');

  const add = () => {
    Axios.post(`${backendUrl}/create`, {
      profil,
      titre,
      experience,
      tjm,
      stack,
      disponibilite,
      mobilite,
      statu,
      contact
    }).then(() => {
      getProfils();
      emptyValues();
      Swal.fire({
        title: "<strong>Saved successfully!</strong>",
        html: `<i>The employer <strong>${profil}</strong> has been added!</i>`,
        icon: "success",
        timer: 3000
      });
    }).catch((error) => {
      console.error("There was an error!", error);
    });
  };

  const sendMail = async (profileId) => {
    try {
      const response = await Axios.post(`${backendUrl}/send-email`, { profileId });
      console.log('Mail sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending mail:', error.response ? error.response.data : error.message);
    }
  };

  const update = () => {
    Axios.put(`${backendUrl}/update`, {
      id,
      profil,
      titre,
      experience,
      tjm,
      stack,
      disponibilite,
      mobilite,
      statu,
      contact
    }).then(() => {
      getProfils();
      emptyValues();
      Swal.fire({
        title: "<strong>Updated successfully!</strong>",
        html: `<i>The employer <strong>${profil}</strong> has been updated!</i>`,
        icon: "success",
        timer: 3000
      });
    });
  };

  const deleted = (val) => {
    Swal.fire({
      title: "Are you sure?",
      html: `<i>The employer <strong>${val.profil}</strong> is going to be deleted!</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`${backendUrl}/delete/${val.id}`)
          .then(() => {
            getProfils();
            emptyValues();
            Swal.fire({
              title: "Deleted!",
              html: `<i>Your employer <strong>${val.profil}</strong> has been deleted.</i>`,
              icon: "success",
              timer: 3000
            });
          }).catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong with the delete!",
              footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Server down!" : JSON.parse(JSON.stringify(error)).message
            });
          });
      }
    });
  };

  const emptyValues = () => {
    setProfil('');
    setContact('');
    setDisponibilite('');
    setExperience('');
    setTjm('');
    setStack('');
    setStatu('');
    setTitre('');
    setMobilite('');
    setEdit(false);
  };

  const editProfil = (val) => {
    setId(val.id);
    setEdit(true);
    setProfil(val.profil);
    setContact(val.contact);
    setDisponibilite(val.disponibilite);
    setExperience(val.experience);
    setTjm(val.tjm);
    setStack(val.stack);
    setStatu(val.statu);
    setTitre(val.titre);
    setMobilite(val.mobilite);
  };

  const handleDetailClick = async (id) => {
    await sendMail(id);
    navigate(`/cvComplet/${id}`);
  };

  const getProfils = () => {
    Axios.get(`${backendUrl}/profils`).then((response) => {
      setProfils(response.data);
    });
  };

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    if (userRole === 'admin' && isAuthenticated)  {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getProfils(); 
    }
  }, [isAuthenticated]);

  const content = {
    contactTitle: "Contact",
    email: "hireche8@gmail.com",
    linkedin: "sifeddine-hireche-b4a578148",
  };

  return (
    <div className="container">
     {isAdmin && (
      <>
        <div className="card text-center">
          <div className="card-header">
            EMPLOYEERS DATA
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Profil:</span>
              <input
                type="text"
                onChange={(event) => setProfil(event.target.value)}
                className="form-control"
                placeholder="Set profil"
                value={profil || ''}
                aria-label="Set profil"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Titre:</span>
              <input
                type="text"
                onChange={(event) => setTitre(event.target.value)}
                className="form-control"
                placeholder="Set titre"
                value={titre || ''}
                aria-label="Set titre"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Années d'expérience:</span>
              <input
                type="text"
                onChange={(event) => setExperience(event.target.value)}
                className="form-control"
                placeholder="Set experience"
                value={experience || ''}
                aria-label="Set experience"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Tjm:</span>
              <input
                type="number"
                onChange={(event) => setTjm(event.target.value)}
                className="form-control"
                placeholder="Set tjm"
                value={tjm || ''}
                aria-label="Set tjm"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Stack tecknique:</span>
              <input
                type="text"
                onChange={(event) => setStack(event.target.value)}
                className="form-control"
                placeholder="Set stack"
                value={stack || ''}
                aria-label="Set stack"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Disponibilités:</span>
              <input
                type="text"
                onChange={(event) => setDisponibilite(event.target.value)}
                className="form-control"
                placeholder="Set disponibilite"
                value={disponibilite || ''}
                aria-label="Set disponibilite"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Mobilité:</span>
              <input
                type="text"
                onChange={(event) => setMobilite(event.target.value)}
                className="form-control"
                placeholder="Set mobilite"
                value={mobilite || ''}
                aria-label="Set mobilite"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Status:</span>
              <input
                type="text"
                onChange={(event) => setStatu(event.target.value)}
                className="form-control"
                placeholder="Set status"
                value={statu || ''}
                aria-label="Set status"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Contact:</span>
              <input
                type="text"
                onChange={(event) => setContact(event.target.value)}
                className="form-control"
                placeholder="Set contact"
                value={contact || ''}
                aria-label="Set contact"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="card-footer text-muted">
            {edit ? (
              <div>
                <button className="btn btn-warning m-2" onClick={update}>Update</button>
                <button className="btn btn-info m-2" onClick={emptyValues}>Cancel</button>
              </div>
            ) : (
              <button className="btn btn-success" onClick={add}>Register</button>
            )}
       
            </div>
          </div>
        </>
      )}
      {isAuthenticated ? (
        <ProfilTable
          profilsList={profilsList}
          isAdmin={isAdmin}
          editProfil={editProfil}
          deleted={deleted}
          handleDetailClick={handleDetailClick}
        />
      ) : (
        <div className="text-center mt-5">
          <h2>Veuillez vous connecter pour voir les profils</h2>
          <Link to="/auth" className="btn btn-primary">Se connecter</Link>
        </div>
      )}
      <Contact contactTitle={content.contactTitle} email={content.email} linkedin={content.linkedin} />
    </div>
  );
};

export default Home;