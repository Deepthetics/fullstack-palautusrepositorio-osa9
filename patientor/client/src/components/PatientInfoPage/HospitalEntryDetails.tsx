import { LocalHospital } from '@mui/icons-material';
import { Icon, List, ListItem, Typography } from '@mui/material';

import { Diagnosis, HospitalEntry } from '../../types';

interface Props {
  diagnoses: Diagnosis[];
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ diagnoses, entry }: Props) => {
  return (
    <div>
      <Typography variant='body2'>
        {entry.date}
        <Icon>
          <LocalHospital />
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
      <Typography variant='body2'>
        diagnose by {entry.specialist}
      </Typography>
    </div>
  );
};

export default HospitalEntryDetails;
