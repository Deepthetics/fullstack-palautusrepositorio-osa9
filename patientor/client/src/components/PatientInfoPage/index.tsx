import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Patient } from '../../types';

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]);

  return (
    <div>
      <h2>{patient?.name}</h2>
      <p>
        ssn: {patient?.ssn}<br />
        occupation: {patient?.occupation}
      </p>
    </div>
  );
};

export default PatientInfoPage;
