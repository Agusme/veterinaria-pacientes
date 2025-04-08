import { create } from "zustand";
import { DraftPatient, Pacient } from "./types";
import {v4 as uuidv4 } from 'uuid';

type PatientState = {
  patients: Pacient[];
  addPacient: (data: DraftPatient) => void;

};
const createPatient =(patient:DraftPatient):Pacient=>{
    return{...patient, id: uuidv4()}
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  addPacient: (data) => {
    const newPatient = createPatient(data)
   set((state)=>({
    patients: [...state.patients, newPatient]
   }))
  },
}));
