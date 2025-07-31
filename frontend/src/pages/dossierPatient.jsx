import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPen, FaArchive, FaDownload } from 'react-icons/fa';
import axios from 'axios';

const DossierPatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [diagnostics, setDiagnostics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/patients/${id}`)
      .then(res => {
        setPatient(res.data);           // patient est à la racine de la réponse
        setDiagnostics(res.data.diagnostics || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement dossier patient :', err);
        setLoading(false);
      });
  }, [id]);

  const handleDownload = () => {
    if (!patient) return;

    // Construction CSV avec en-tête
    const header = [
      "Champ", "Valeur"
    ].join(",") + "\n";

    const rows = [
      ["Nom", patient.nom],
      ["Prénoms", patient.prenoms],
      ["Date de naissance", patient.date_naissance],
      ["Sexe", patient.sexe],
      ["Téléphone", patient.telephone],
      ["Poids", patient.poids || 'Néant'],
      ["Taille", patient.taille || 'Néant'],
      ["Groupe sanguin", patient.groupe_sanguin],
      ["Allergies", patient.allergies || 'Néant'],
      ["Antécédents", patient.antecedents || 'Néant'],
      ["Traitements", patient.traitements || 'Néant']
    ].map(row => row.join(",")).join("\n");

    const content = header + rows;

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `DossierPatient_${patient.nom}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleArchive = () => {
    if (!window.confirm('Voulez-vous vraiment archiver ce patient ?')) return;
    // Ici, tu peux appeler ton API d'archivage
    alert('Fonction d\'archivage non encore implémentée.');
  };

  if (loading) return <p>Chargement du dossier patient...</p>;
  if (!patient) return <p>Patient introuvable.</p>;

  return (
    <main className="px-4 lg:px-8 xl:px-24 pt-8 md:pt-10 pb-5 space-y-8 md:space-y-12 lg:space-y-16">
      <section className="bg-slate-50 shadow-md rounded p-5">
        <div className="flex flex-wrap justify-between gap-3 md:gap-10 lg:gap-24 items-center">
          <h2 className="text-xl font-bold">Dossier Patient</h2>
          <div className="flex space-x-3">
            <Link to={`/editpatient/${id}`} className="bg-green-700 text-white px-3 py-1 rounded flex items-center gap-2">
              <FaPen />
              <span className="hidden sm:inline">Modifier</span>
            </Link>
            <button
              onClick={handleDownload}
              className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaDownload />
              <span className="hidden sm:inline">Télécharger</span>
            </button>
            <button
              onClick={handleArchive}
              className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaArchive />
              <span className="hidden sm:inline">Archiver</span>
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-1 sm:gap-2">
          <p><strong>Nom :</strong> {patient.nom}</p>
          <p><strong>Prénoms :</strong> {patient.prenoms}</p>
          <p><strong>Date de naissance :</strong> {patient.date_naissance}</p>
          <p><strong>Sexe :</strong> {patient.sexe}</p>
          <p><strong>Numéro de téléphone :</strong> {patient.telephone}</p>
          <p><strong>Poids :</strong> {patient.poids || 'Néant'}</p>
          <p><strong>Taille :</strong> {patient.taille || 'Néant'}</p>
          <p><strong>Groupe sanguin :</strong> {patient.groupe_sanguin}</p>
          <p><strong>Allergies :</strong> {patient.allergies || 'Néant'}</p>
          <p><strong>Antécédents médicaux :</strong> {patient.antecedents || 'Néant'}</p>
          <p><strong>Traitements en cours :</strong> {patient.traitements || 'Néant'}</p>
        </div>
      </section>

      <section className="bg-slate-100 shadow-md rounded p-5">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-xl font-bold">Diagnostics</h2>
          <Link to={`/diagnostic/${id}`} className="bg-green-700 text-white px-3 py-1 rounded font-medium">
            Nouveau Diagnostic
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {diagnostics.length === 0 ? (
            <p>Aucun diagnostic enregistré.</p>
          ) : (
            diagnostics.map((diag, index) => (
              <div key={index} className="bg-white rounded p-4">
                <p><strong>Date :</strong> {diag.date}</p>
                <p><strong>TFG (ml/min/1,73 m²) :</strong> {diag.tfg}</p>
                <p><strong>Protéinurie :</strong> {diag.proteinurie}</p>
                <p><strong>Taille des reins :</strong> {diag.tailleReins}</p>
                <p><strong>Symptômes :</strong> {diag.symptomes || 'Aucun'}</p>
                <p className="pt-2 text-green-700 font-semibold">{diag.conclusion}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default DossierPatient;
