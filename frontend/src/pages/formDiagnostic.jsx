import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { createDiagnostic } from '../services/api';

const FormDiagnostic = () => {
  const navigate = useNavigate();
  const { id: patientId } = useParams();

  const formik = useFormik({
    initialValues: {
      date: '',
      tfg: '',
      proteinurie: '',
      tailleReins: '',
      symptomes: '',
    },
    validationSchema: Yup.object({
      date: Yup.date().required('La date est requise'),
      tfg: Yup.number()
        .required('TFG est requis')
        .min(0, 'Doit être un nombre positif ou nul'), // change si 0 est acceptable
      proteinurie: Yup.string().required('Sélectionnez une option'),
      tailleReins: Yup.string().required('Sélectionnez une option'),
      symptomes: Yup.string().required('Les symptômes sont requis'),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      createDiagnostic(patientId, values)
        .then(() => {
          alert('Diagnostic ajouté avec succès');
          resetForm();
          navigate(`/dossier/${patientId}`);
        })
        .catch((error) => {
          console.error('Erreur lors de la création du diagnostic :', error);
          const message = error.response?.data?.error || 'Une erreur est survenue. Veuillez réessayer.';
          alert(message);
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <div className='justify-center flex'>
      <form
        className='my-6 lg:my-12 mx-4 lg:mx-8 xl:mx-12 bg-slate-100 shadow-md rounded-lg p-8 space-y-6 justify-center flex flex-col w-full max-w-2xl'
        onSubmit={formik.handleSubmit}
      >
        <h2 className='text-blue-500 text-xl font-bold text-center pb-4'>
          Formulaire de Diagnostic
        </h2>

        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps('date')}
          />
          {formik.touched.date && formik.errors.date && (
            <div className="text-red-600">{formik.errors.date}</div>
          )}
        </div>

        <div>
          <label htmlFor="tfg">TFG</label>
          <input
            id="tfg"
            type="number"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps('tfg')}
          />
          {formik.touched.tfg && formik.errors.tfg && (
            <div className="text-red-600">{formik.errors.tfg}</div>
          )}
        </div>

        <div>
          <label htmlFor="proteinurie">Protéinurie</label>
          <select
            id="proteinurie"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps('proteinurie')}
          >
            <option value="">Sélectionnez</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
          {formik.touched.proteinurie && formik.errors.proteinurie && (
            <div className="text-red-600">{formik.errors.proteinurie}</div>
          )}
        </div>

        <div>
          <label htmlFor="tailleReins">Taille des reins</label>
          <select
            id="tailleReins"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps('tailleReins')}
          >
            <option value="">Sélectionnez</option>
            <option value="normale">Normale</option>
            <option value="reduite">Réduite</option>
          </select>
          {formik.touched.tailleReins && formik.errors.tailleReins && (
            <div className="text-red-600">{formik.errors.tailleReins}</div>
          )}
        </div>

        <div>
          <label htmlFor="symptomes">Symptômes</label>
          <textarea
            id="symptomes"
            rows="3"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps('symptomes')}
          />
          {formik.touched.symptomes && formik.errors.symptomes && (
            <div className="text-red-600">{formik.errors.symptomes}</div>
          )}
        </div>

        <button
          className='bg-green-700 text-white px-4 py-2 rounded font-medium'
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Envoi...' : 'Diagnostiquer'}
        </button>
      </form>
    </div>
  );
};

export default FormDiagnostic;
