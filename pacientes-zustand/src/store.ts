import { create } from "zustand";
import {devtools, persist} from 'zustand/middleware';
import { DraftPatient, Pacient } from "./types";
import { v4 as uuidv4 } from "uuid";

type PatientState = {
  patients: Pacient[];
  activeId: Pacient["id"];
  addPacient: (data: DraftPatient) => void;
  deletePatient: (id: Pacient["id"]) => void;
  getPatientById: (id: Pacient["id"]) => void;
 updatePatient:(data: DraftPatient) => void;
};
const createPatient = (patient: DraftPatient): Pacient => {
  return { ...patient, id: uuidv4() };
};/*  */

export const usePatientStore = create<PatientState>() (
  devtools(
    persist((set) => ({
  patients: [],
  activeId: "",
  addPacient: (data) => {
    const newPatient = createPatient(data);
    set((state) => ({
      patients: [...state.patients, newPatient],
    }));
  },
  deletePatient: (id) => {
    set((state) => ({
      patients: state.patients.filter((patient) => patient.id !== id),
    }));
  },

  getPatientById: (id) => {
    set(() => ({
        activeId:id
    }));
  },
  updatePatient:(data)=>{
set((state)=>({
  patients: state.patients.map( patient => patient.id === state.activeId ? {id: state.activeId, ...data } : patient),
  activeId: ''
}))
  }
}), { name:'patient-store'})
));
