// patientList.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEye, FaArchive, FaDownload  } from 'react-icons/fa';
// Exemple de données patients


const PatientList = () => {
  

  return (
    <div className='px-4 lg:px-8 xl:px-12 pt-8 md:pt-10 pb-5'>
      <div className='flex flex-wrap gap-4 justify-between items-center mb-10 md:mb-14 '>
        <h1 className='text-2xl font-semibold '>Liste des Patients</h1>
        <button className='bg-green-700 text-white px-3 py-1 rounded font-medium flex items-center gap-2'>
          <FaPlus />
          <Link to="/addpatient">Nouveau Patient</Link>
        </button>
      </div>
      <div className='flex flex-wrap gap-4 justify-start'>
        <div className='shadow-md bg-slate-50 rounded-lg p-4 space-y-4 max-w-md '>
          <div className=' space-y-2'>
            <h1> <strong>Nom:</strong>  AMAGBEGNON</h1>
            <h1> <strong>Prénoms:</strong> Rosmé Essé</h1>
            <h1> <strong>Sexe:</strong> Féminin</h1>
            <h1> <strong>Age:</strong> 19ans</h1>
          </div>
          <div className='flex justify-center space-x-5'>
            <button className='bg-green-700 text-white px-3 py-1 rounded font-medium flex items-center gap-2'>   
              <Link className='flex items-center gap-2' to="/dossier" >
                <FaEye />
                <h1 className='hidden sm:block'>Voir</h1>
              </Link>
            </button>
            <button className='bg-yellow-500 text-white px-3 py-1 rounded font-medium flex items-center gap-2'> <FaDownload /> <h1 className='hidden sm:block'>Télécharger</h1> </button>
            <button className='bg-blue-500 text-white px-3 py-1 rounded font-medium flex items-center gap-2'> <FaArchive /> <h1 className='hidden sm:block'>Archiver</h1>  </button>
          </div>
        </div>
      </div>
    </div>
    
      
    
  );
};

export default PatientList;
