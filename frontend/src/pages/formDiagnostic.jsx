import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const FormDiagnostic = () => {
  const navigate = useNavigate(); // Remplacer useHistory par useNavigate

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
      tfg: Yup.number().required('TFG est requis').positive('Doit être un nombre positif'),
      proteinurie: Yup.string().required('Sélectionnez une option'),
      tailleReins: Yup.string().required('Sélectionnez une option'),
      symptomes: Yup.string().required('Les symptômes sont requis'),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Redirection vers /dossier
      navigate('/dossier'); // Utiliser navigate pour rediriger
    },
  });

  return (
    <div className='justify-center flex'>
    <form className='my-6 lg:my-12 mx-4 lg:mx-8 xl:mx-12 bg-slate-100 shadow-md rounded-lg p-8 space-y-6 justify-center flex flex-col' onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          {...formik.getFieldProps('date')}
        />
        {formik.touched.date && formik.errors.date ? (
          <div>{formik.errors.date}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="tfg">TFG</label>
        <input
          id="tfg"
          type="number"
          {...formik.getFieldProps('tfg')}
        />
        {formik.touched.tfg && formik.errors.tfg ? (
          <div>{formik.errors.tfg}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="proteinurie">Protéinurie</label>
        <select id="proteinurie" {...formik.getFieldProps('proteinurie')}>
          <option value="">Sélectionnez</option>
          <option value="oui">Oui</option>
          <option value="non">Non</option>
        </select>
        {formik.touched.proteinurie && formik.errors.proteinurie ? (
          <div>{formik.errors.proteinurie}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="tailleReins">Taille des reins</label>
        <select id="tailleReins" {...formik.getFieldProps('tailleReins')}>
          <option value="">Sélectionnez</option>
          <option value="normale">Normale</option>
          <option value="reduite">Réduite</option>
        </select>
        {formik.touched.tailleReins && formik.errors.tailleReins ? (
          <div>{formik.errors.tailleReins}</div>
        ) : null}
      </div>

      <div>
        <div className='items-center'>
            <label htmlFor="symptomes">Symptômes</label>
            <textarea
            id="symptomes"
            {...formik.getFieldProps('symptomes')}
            />
        </div>
       
        {formik.touched.symptomes && formik.errors.symptomes ? (
          <div>{formik.errors.symptomes}</div>
        ) : null}
      </div>

      <button className='bg-green-700 text-white text-lg font-medium rounded' type="submit">Diagnostiquer</button>
    </form>
    </div>
    
  );
};

export default FormDiagnostic;
