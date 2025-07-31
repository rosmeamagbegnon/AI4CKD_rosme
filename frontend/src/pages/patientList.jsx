import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEye, FaArchive, FaDownload } from 'react-icons/fa';
import { fetchPatients } from '../services/api';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients()
      .then((res) => {
        setPatients(res.data); // Assure-toi que ton backend renvoie un tableau
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des patients :', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='px-4 lg:px-8 xl:px-12 pt-8 md:pt-10 pb-5'>
      <div className='flex flex-wrap gap-4 justify-between items-center mb-10 md:mb-14'>
        <h1 className='text-2xl font-semibold'>Liste des Patients</h1>
        <Link to="/addpatient">
          <button className='bg-green-700 text-white px-3 py-1 rounded font-medium flex items-center gap-2'>
            <FaPlus />
            <span>Nouveau Patient</span>
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Chargement des patients...</p>
      ) : patients.length === 0 ? (
        <p className='text-gray-500'>Aucun patient enregistré.</p>
      ) : (
        <div className='flex flex-wrap gap-4'>
          {patients.map((patient) => (
            <div
              key={patient.id}
              className='shadow-md bg-slate-50 rounded-lg p-4 space-y-4 max-w-md w-full'
            >
              <div className='space-y-2'>
                <h1><strong>Nom:</strong> {patient.nom}</h1>
                <h1><strong>Prénoms:</strong> {patient.prenoms}</h1> {/* correction ici */}
                <h1><strong>Sexe:</strong> {patient.sexe}</h1>
                <h1><strong>Date de naissance:</strong> {new Date(patient.date_naissance).toLocaleDateString()}</h1> {/* correction ici */}
              </div>
              <div className='flex justify-center space-x-5'>
                <Link
                  className='bg-green-700 text-white px-3 py-1 rounded font-medium flex items-center gap-2'
                  to={`/dossier/${patient.id}`}
                >
                  <FaEye />
                  <span className='hidden sm:block'>Voir</span>
                </Link>
                <button className='bg-yellow-500 text-white px-3 py-1 rounded font-medium flex items-center gap-2'>
                  <FaDownload />
                  <span className='hidden sm:block'>Télécharger</span>
                </button>
                <button className='bg-blue-500 text-white px-3 py-1 rounded font-medium flex items-center gap-2'>
                  <FaArchive />
                  <span className='hidden sm:block'>Archiver</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
