import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PatientEntry from './PatientEntry';
import diagnoseService from '../../services/diagnoses';
import patientService from '../../services/patients';
import { Diagnosis, Patient } from '../../types';

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
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

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  return (
    <div>
      <Box sx={{ mt: 4 }}>
        <Typography variant='h4' sx={{ mb: 2 }}>{patient?.name}</Typography>
        <Typography variant='body2'>
          ssn: {patient?.ssn}
        </Typography>
        <Typography variant='body2'>
          occupation: {patient?.occupation}
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant='h5'>
          entries
        </Typography>
        {patient?.entries.map((entry) => (
          <PatientEntry key={entry.id} diagnoses={diagnoses} entry={entry} />
        ))}
      </Box>
    </div>
  );
};

export default PatientInfoPage;
