// Importations nécessaires
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientList from './pages/patientList';
import NavbarConn from './components/navbarConn';
import FormPatient from './pages/formPatient';
import DossierPatient from './pages/dossierPatient'
const App = () => {
  return (
    <Router>
      <NavbarConn />
      <Routes>
        {/* Définition des routes */}
        <Route path="/" element={<PatientList />} />
        <Route path="/addpatient" element={<FormPatient />} />
        <Route path="/dossier" element={<DossierPatient />} />
        {/* Vous pouvez ajouter d'autres routes ici */}
      </Routes>
    </Router>
  );
};

export default App;
