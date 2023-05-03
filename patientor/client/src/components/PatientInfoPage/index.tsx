import { Box, List, ListItem, Typography } from '@mui/material';
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
          <Box key={entry.id} sx={{ mt: 2 }}>
            <Typography variant='body2'>
              {entry.date}: {entry.description}
            </Typography>
            <List disablePadding={false}>
              {entry.diagnosisCodes?.map((code) => (
                <ListItem key={code}>
                  <Typography variant='body2'>- {code}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default PatientInfoPage;
