import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CvComplet from './components/CvComplet';
import AuthPage from './components/AuthPage';
import ProfilFormulaire from './components/ProfilFormulaire'; 
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/cvComplet/:id'];

  const shouldHideNavbar = hideNavbarRoutes.some(route => {
    const regex = new RegExp(route.replace(/:\w+/g, '\\w+'));
    return regex.test(location.pathname);
  });

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cvComplet/:id" element={<CvComplet />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/profilFormulaire" element={<ProfilFormulaire />} />
      </Routes>
      <Footer footerText="CodingHub - Collectif de Développeurs Freelance à la Recherche d'Opportunités" />
    </div>
  );
}

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;