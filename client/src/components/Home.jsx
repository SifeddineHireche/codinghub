import React , { useState, useEffect }from 'react'
import {Link, useNavigate} from "react-router-dom";
import Contact from './Contact';

import Axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Resend } from 'resend';

const notif = withReactContent(Swal);

const Home = () => {

  const [profil,setProfil] = useState("");
  const [titre,setTitre] = useState();
  const [experience,setExperience] = useState("");
  const [tjm,setTjm] = useState("");
  const [stack,setStack] = useState("");
  const [mobilite,setMobilite] = useState("");
  const [disponibilite,setDisponibilite] = useState();
  const [statu,setStatu] = useState();
  const [contact,setContact] = useState();
  const [id,setId] = useState();
  const [profilsList,setProfils]= useState([]);
  const [edit,setEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  
  const add = () => {
    Axios.post('http://localhost:3001/create', {
      profil:profil,
      titre:titre,
      experience:experience,
      tjm:tjm,
      stack:stack,
      disponibilite:disponibilite,
      mobilite:mobilite,
      statu:statu,
      contact:contact
    
    }).then(() => {
      getProfils();
      emptyValues();
      Swal.fire({
        title: "<strong>Saved succesfully! </strong>",
        html: "<i>The employer <strong>" + profil + "</strong> has been added!</i>",
        icon: "success",
        timer:3000
      });
    }).catch((error) => {
      console.error("There was an error!", error);
    });
  };

  const sendMail = async (profileId) => {
    try {
      const response = await Axios.post('http://localhost:3003/send-email', { profileId });
      console.log('Mail sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending mail:', error.response ? error.response.data : error.message);
    }
  };


  const update= ()=>{
    Axios.put("http://localhost:3001/update",{
      id:id,
      profil:profil,
      titre:titre,
      experience:experience,
      tjm:tjm,
      stack:stack,
      disponibilite:disponibilite,
      mobilite:mobilite,
      statu:statu,
      contact:contact
    }).then(()=>{
      getProfils();
      emptyValues();
      Swal.fire({
        title: "<strong>Updated succesfully!</strong>",
        html: "<i>The employer <strong>" + profil + "</strong> has been updated!</i>",
        icon: "success",
        timer:3000
      });
     
    });
  }

  const deleted= (val)=>{
    Swal.fire({
          title: "Are you sure?",
          html: "<i>The employer <strong>" + val.profil + "</strong> is gonna be deleted!</i>",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            Axios.delete(`http://localhost:3001/delete/${val.id}`,{
            }).then(()=>{
            getProfils();
            emptyValues(); 
            Swal.fire({
              title: "Deleted!",
              html:  "<i>Your employeer <strong>" + val.profil + "</strong> has been deleted.<i>",
              icon: "success",
              timer:3000
            });
          }).catch(function(error){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong with the delete !",
              footer: JSON.parse(JSON.stringify(error)).message === "Network Error"? "Server down!": JSON.parse(JSON.stringify(error)).message 
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


  const editProfil= (val)=>{
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
     
     
  }
  
const handleDetailClick = async (id) => {

  await sendMail(id);
  navigate(`/cvComplet/${id}`);
};


    const getProfils= ()=>{
      Axios.get("http://localhost:3001/profils").then((response)=>{
        setProfils(response.data);
       
      });
   
      
  }

  getProfils();

  useEffect(() => {

   const userName = localStorage.getItem('userName');
   const userRole = userName ? "admin" : "Guest";

  console.log("userRole : "+userRole);
  if (userRole === 'admin') {
    setIsAdmin(true);
  } else {
    setIsAdmin(false);
  }
}, []);

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

    <table className="table table-striped mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{isAdmin ? `Profil` : ``}</th>
          <th scope="col">Titre</th>
          <th scope="col">Années d'expérience</th>
          <th scope="col">TJM</th>
          <th scope="col">Stack tecknique</th>
          <th scope="col">Disponibilités</th>
          <th scope="col">Mobilité</th>
          <th scope="col">Status</th>
          <th scope="col">{isAdmin ? `Contact` : ``}</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {profilsList.map((val) => (
          <tr key={val.id}>
            <th>{val.id}</th>
            <td>{isAdmin ? val.profil : ``}</td>
            <td>{val.titre}</td>
            <td>{val.experience}</td>
            <td>{val.tjm}</td>
            <td>{val.stack}</td>
            <td>{val.disponibilite}</td>
            <td>{val.mobilite}</td>
            <td>{val.statu}</td>
            <td>{isAdmin ? val.contact : ``}</td>
            <td>
              <div className="btn-group" role="group" aria-label="Basic example">
              <th scope="col">{isAdmin ? `Profil` : ``}</th>
              {isAdmin ? <button type="button" onClick={() => editProfil(val)} className="btn btn-info">Edit</button> : ``}  
              {isAdmin ? <button type="button" onClick={() => deleted(val)} className="btn btn-danger">Delete</button> : ``}  
              <button type="button" onClick={() => handleDetailClick(val.id)} className="btn btn-success">CV</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Contact contactTitle={content.contactTitle} email={content.email} linkedin={content.linkedin} />
  </div>

  
);

};

export default Home;