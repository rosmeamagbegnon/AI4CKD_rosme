import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../services/api';

// Validation du formulaire avec Yup
const validationSchema = Yup.object().shape({
  nom: Yup.string().required('Le nom est requis'),
  prenoms: Yup.string().required('Le prénom est requis'),       // <== changée ici
  date_naissance: Yup.date().required('La date de naissance est requise'),  // <== changée ici
  sexe: Yup.string().required('Le sexe est requis'),
  telephone: Yup.string()
    .required('Le numéro de téléphone est requis')
    .matches(/^[0-9]{10}$/, 'Numéro de téléphone invalide'),
  groupe_sanguin: Yup.string(),   // <== changée ici
  allergies: Yup.string(),
  antecedents: Yup.string(),      // <== changée ici (anciennement maladies)
  traitements: Yup.string(),      // <== changée ici (anciennement traitementsEnCours)
});

const FormPatient = () => {
  const navigate = useNavigate();

  const initialValues = {
    nom: '',
    prenoms: '',
    date_naissance: '',
    sexe: '',
    telephone: '',
    groupe_sanguin: '',
    allergies: '',
    antecedents: '',
    traitements: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    createPatient(values)
      .then(() => {
        alert('Patient ajouté avec succès !');
        resetForm();
        navigate('/');
      })
      .catch((error) => {
        console.error('Erreur lors de la création du patient :', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className='justify-center flex'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, isSubmitting }) => (
          <Form className='my-6 lg:my-12 mx-4 lg:mx-8 xl:mx-12 bg-slate-100 shadow-md rounded-lg p-8 space-y-6 flex flex-col w-full max-w-2xl'>
            <h2 className='text-blue-500 text-xl font-bold text-center pb-4'>Informations Personnelles</h2>

            <div>
              <label htmlFor="nom">Nom:</label>
              <Field name="nom" type="text" />
              <ErrorMessage name="nom" component="div" className="text-red-600" />
            </div>

            <div>
              <label htmlFor="prenoms">Prénoms:</label>
              <Field name="prenoms" type="text" />
              <ErrorMessage name="prenoms" component="div" className="text-red-600" />
            </div>

            <div>
              <label htmlFor="date_naissance">Date de Naissance:</label>
              <Field name="date_naissance" type="date" />
              <ErrorMessage name="date_naissance" component="div" className="text-red-600" />
            </div>

            <div>
              <label htmlFor="sexe">Sexe:</label>
              <Field name="sexe" as="select">
                <option value="">Sélectionner</option>
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
                <option value="Autres">Autres</option>
              </Field>
              <ErrorMessage name="sexe" component="div" className="text-red-600" />
            </div>

            <div>
              <label htmlFor="telephone">Téléphone:</label>
              <Field name="telephone" type="tel" />
              <ErrorMessage name="telephone" component="div" className="text-red-600" />
            </div>

            <h2 className='text-blue-500 text-xl font-bold text-center pb-4'>Informations Cliniques</h2>

            <div>
              <label htmlFor="groupe_sanguin">Groupe Sanguin:</label>
              <Field name="groupe_sanguin" as="select">
                <option value="">Sélectionner</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Field>
              <ErrorMessage name="groupe_sanguin" component="div" className="text-red-600" />
            </div>

            <div>
              <label htmlFor="allergies">Allergies:</label>
              <Field name="allergies" type="text" />
              <ErrorMessage name="allergies" component="div" className="text-red-600" />
            </div>

            <div>
              <label htmlFor="antecedents">Antécédents médicaux:</label>
              <Field name="antecedents" type="text" />
              <ErrorMessage name="antecedents" component="div" className="text-red-600" />
            </div>

            <div>
              <label htmlFor="traitements">Traitements en cours:</label>
              <Field name="traitements" type="text" />
              <ErrorMessage name="traitements" component="div" className="text-red-600" />
            </div>

            <button
              className='bg-green-700 text-white px-4 py-2 rounded font-medium'
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi...' : 'Soumettre'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormPatient;
