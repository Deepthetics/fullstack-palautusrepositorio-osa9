import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};


const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return {
    id: newPatient.id,
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    gender: newPatient.gender,
    occupation: newPatient.occupation
  };
};

export default {
  getNonSensitivePatients,
  getPatientById,
  addPatient
};