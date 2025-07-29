import React from 'react';
import { Link } from 'react-router-dom';
import {  FaPen, FaArchive, FaDownload  } from 'react-icons/fa';
// Composant DossierPatient
const DossierPatient = () => {
    return (
        <div className="px-4 lg:px-8 xl:px-12  pt-8 md:pt-10 pb-5 justify-center flex flex-wrap gap-8 xl:gap-36   ">
            <div className='bg-slate-50 shadow-md rounded p-5  '>
                <div className='justify-between flex flex-wrap gap-3 md:gap-10 lg:gap-24 items-center'>
                    <h2 className="text-xl font-bold">Dossier Patient</h2>
                    <div className='flex justify-center space-x-5'>
                        <button className='bg-green-700 text-white px-3 py-1 rounded font-medium flex items-center gap-2'>   
                            <Link className='flex items-center gap-2' to="/addpatient" >
                                <FaPen />
                                <h1 className='hidden sm:block'>Modifier</h1>
                            </Link>
                        </button>
                        <button className='bg-yellow-500 text-white px-3 py-1 rounded font-medium flex items-center gap-2'> <FaDownload /> <h1 className='hidden sm:block'>Télécharger</h1> </button>
                        <button className='bg-blue-500 text-white px-3 py-1 rounded font-medium flex items-center gap-2'> <FaArchive /> <h1 className='hidden sm:block'>Archiver</h1>  </button>
                    </div>
                </div>
                
                <div className="mt-4">
                    <p><strong>Nom :</strong> </p>
                    <p><strong>Prénoms :</strong> </p>
                    <p><strong>Date de naissance :</strong> </p>
                    <p><strong>Sexe :</strong>  </p>
                    <p><strong>Numéro de téléphone :</strong> </p>
                    <p><strong>Poids :</strong> </p>
                    <p><strong>Taille :</strong> </p>
                    <p><strong>Groupe sanguin :</strong> </p>
                    <p><strong>Allergies :</strong> </p>
                    <p><strong>Antécédents médicaux :</strong> </p>
                    <p><strong>Traitements en cours :</strong> </p>
                </div>
            </div>
            <div className='bg-slate-100 shadow-md rounded p-5 '>
                <div className='justify-between flex flex-wrap gap-3 md:gap-10 lg:gap-24 items-center'>
                    <h2 className="text-xl font-bold">Diagnostics</h2>
                    <button className='bg-green-700 text-white px-3 py-1 rounded font-medium '>
                        <Link to="/addpatient">Nouveau Diagnostic</Link>
                    </button>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className="mt-4 rounded bg-white p-4">
                        <p><strong>Date :</strong> </p>
                        <p><strong>Âge :</strong>  ans</p>
                        <p><strong>Résultat du diagnostic :</strong> </p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

// Exportation du composant par défaut
export default DossierPatient;
