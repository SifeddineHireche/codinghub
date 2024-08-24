import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import avatar from '../codinghub.png'; 
import config from '../config'; // Importa la configuración

const MySwal = withReactContent(Swal);

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', 
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const endpoint = isLogin ? '/login' : '/register';
    const url = `${config.backendUrl}${endpoint}`;
  
    try {
      const response = await axios.post(url, formData);
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.userName); 
        localStorage.setItem('role', response.data.role); 
        
        // SweetAlert2 success alert
        await MySwal.fire({
          title: 'Login successful',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        });

        navigate('/'); 
      } else {
        // SweetAlert2 success alert
        await MySwal.fire({
          title: 'Registration successful',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        });
        setIsLogin(true); 
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        // SweetAlert2 error alert
        MySwal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
        });
      } else if (error.request) {
        // SweetAlert2 error alert
        MySwal.fire({
          title: 'Error',
          text: 'No response from the server. Please check your network connection.',
          icon: 'error',
        });
      } else {
        // SweetAlert2 error alert
        MySwal.fire({
          title: 'Error',
          text: 'An error occurred. Please try again later.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <img src={avatar} alt="Logo" className="mb-3" style={{ maxWidth: '150px' }} />
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setIsLogin(!isLogin)}
            >
            
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;