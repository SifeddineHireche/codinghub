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

  alert("profils: "+ `${backendUrl}/profils`);
  const getProfils = () => {
    Axios.get(`${backendUrl}/profils`).then((response) => {
      setProfils(response.data);
    });
  };

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userRole = userName ? "admin" : "Guest";

    console.log("userRole: " + userRole);
    if (userRole === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);
  getProfils();

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
              {/* Input fields for adding and editing */}
              {/* ... */}
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
      <ProfilTable
        profilsList={profilsList}
        isAdmin={isAdmin}
        editProfil={editProfil}
        deleted={deleted}
        handleDetailClick={handleDetailClick}
      />
      <Contact contactTitle={content.contactTitle} email={content.email} linkedin={content.linkedin} />
    </div>
  );
};

export default Home;