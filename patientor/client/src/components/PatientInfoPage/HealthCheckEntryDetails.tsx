import { Favorite, MedicalInformation } from '@mui/icons-material';
import { Icon, List, ListItem, Typography } from '@mui/material';
import { Diagnosis, HealthCheckEntry } from '../../types';

interface Props {
  diagnoses: Diagnosis[];
  entry: HealthCheckEntry;
}

const iconMap = {
  0: <Icon sx={{ color: 'green' }}><Favorite /></Icon>,
  1: <Icon sx={{ color: 'yellow' }}><Favorite /></Icon>,
  2: <Icon sx={{ color: 'red' }}><Favorite /></Icon>,
  3: <Icon sx={{ color: 'black' }}><Favorite /></Icon>,
};

const HealthCheckEntryDetails = ({ diagnoses, entry }: Props) => {
  return (
    <div>
      <Typography variant='body2'>
        {entry.date}
        <Icon>
          <MedicalInformation />
        </Icon>
      </Typography>
      <Typography variant='body2' sx={{ fontStyle: 'italic' }}>
        {entry.description}
      </Typography>
      <List disablePadding={false}>
        {entry.diagnosisCodes?.map((code) => {
          const diagnosis = diagnoses.find((d) => d.code === code);
          return (
          <ListItem key={code}>
            <Typography variant='body2'>- {code} {diagnosis?.name}</Typography>
          </ListItem>
          );
        })}
      </List>
      {iconMap[entry.healthCheckRating]}
      <Typography variant='body2'>
        diagnose by {entry.specialist}
      </Typography>
    </div>
  );
};

export default HealthCheckEntryDetails;
