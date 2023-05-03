import { Box } from '@mui/material';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';
import { Diagnosis, Entry } from '../../types';

interface Props {
  diagnoses: Diagnosis[];
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<Props> = ({ diagnoses, entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryDetails diagnoses={diagnoses} entry={entry} />;
    case 'Hospital':
      return <HospitalEntryDetails diagnoses={diagnoses} entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails diagnoses={diagnoses} entry={entry} />;
    default:
      return assertNever(entry);
    }
};

const PatientEntry = ({ diagnoses, entry }: Props ) => {
  return (
    <div>
      <Box key={entry.id}
        sx={{
        mt: 2,
        border: '1px solid black',
        borderRadius: 2,
        padding: 1
        }}>
        <EntryDetails diagnoses={diagnoses} entry={entry} />
      </Box>
    </div>
    );
};

export default PatientEntry;
