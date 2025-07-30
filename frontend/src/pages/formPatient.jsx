import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

const FormPatient = () => {
  const navigate = useNavigate(); // Créer une instance de navigate

  // Validation du formulaire avec Yup
  const validationSchema = Yup.object().shape({
    nom: Yup.string().required('Le nom est requis'),
    prenom: Yup.string().required('Le prénom est requis'),
    dateNaissance: Yup.date().required('La date de naissance est requise'),
    sexe: Yup.string().required('Le sexe est requis'),
    telephone: Yup.string().required('Le numéro de téléphone est requis').matches(/^[0-9]{10}$/, 'Numéro de téléphone invalide'),
    groupeSanguin: Yup.string(), // Rendre ce champ non obligatoire
    allergies: Yup.string(),
    maladies: Yup.string(),
    traitementsEnCours: Yup.string(),
  });

  const initialValues = {
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: '',
    telephone: '',
    groupeSanguin: '',
    allergies: '',
    maladies: '',
    traitementsEnCours: '',
  };

  const handleSubmit = (values) => {
    console.log('Données soumises:', values);
    // Ici, vous pouvez ajouter le code pour envoyer les données à un serveur

    // Redirection vers la page d'accueil après soumission
    navigate('/'); // Redirection
  };

  return (
    <div className='justify-center flex'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched }) => (
          <Form className='my-6 lg:my-12 mx-4 lg:mx-8 xl:mx-12 bg-slate-100 shadow-md rounded-lg p-8 space-y-6 justify-center flex flex-col'>
            <h2 className='text-blue-500 text-xl font-bold text-center pb-4'>Informations Personnelles</h2>
            <div>
              <label htmlFor="nom">Nom:</label>
              <Field name="nom" type="text" />
              {touched.nom && <ErrorMessage name="nom" component="div" className="error text-red-600" />}
            </div>
            <div>
              <label htmlFor="prenom">Prénoms:</label>
              <Field name="prenom" type="text" />
              {touched.prenom && <ErrorMessage name="prenom" component="div" className="error text-red-600" />}
            </div>
            <div>
              <label htmlFor="dateNaissance">Date de Naissance:</label>
              <Field name="dateNaissance" type="date" />
              {touched.dateNaissance && <ErrorMessage name="dateNaissance" component="div" className="error text-red-600" />}
            </div>
            <div>
              <label htmlFor="sexe">Sexe:</label>
              <Field name="sexe" as="select">
                <option value="">Sélectionner</option>
                <option value="Masculin">Masculin</option>
                <option value="Féminin">Féminin</option>
                <option value="Autres">Autres</option>
              </Field>
              {touched.sexe && <ErrorMessage name="sexe" component="div" className="error text-red-600" />}
            </div>
            <div>
              <label htmlFor="telephone">Numéro de téléphone:</label>
              <Field name="telephone" type="tel" />
              {touched.telephone && <ErrorMessage name="telephone" component="div" className="error text-red-600" />}
            </div>
            <h2 className='text-blue-500 text-xl font-bold text-center pb-4'>Informations Cliniques</h2>
            <div>
              <label htmlFor="groupeSanguin">Groupe Sanguin:</label>
              <Field name="groupeSanguin" as="select">
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
              {touched.groupeSanguin && <ErrorMessage name="groupeSanguin" component="div" className="error" />}
            </div>
            <div>
              <label htmlFor="allergies">Allergies:</label>
              <Field name="allergies" type="text" />
            </div>
            <div>
              <label htmlFor="maladies">Maladies:</label>
              <Field name="maladies" type="text" />
            </div>
            <div>
              <label htmlFor="traitementsEnCours">Traitements en cours:</label>
              <Field name="traitementsEnCours" type="text" />
            </div>

            <button className='bg-green-700 text-white text-lg font-medium rounded' type="submit">Soumettre</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormPatient;
