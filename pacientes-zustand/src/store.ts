import { create } from "zustand"
import  {Pacient}  from "./types"

type PatientState={
    patients: Pacient[]
}

export const usePatientStore= create<PatientState>(()=>({
    patients:[]
}))