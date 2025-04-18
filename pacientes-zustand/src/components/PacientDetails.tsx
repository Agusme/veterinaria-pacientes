import { toast } from "react-toastify"
import { usePatientStore } from "../store"
import { Pacient } from "../types"
import PacientDetailItem from "./PacientDetailItem"

type PatientDetailProps = {
    patient: Pacient
}

export default function PacientDetails({ patient }: PatientDetailProps) {
    const deletePatient = usePatientStore((state) => state.deletePatient)
    const getPatientById = usePatientStore((state) => state.getPatientById)


    const handleClick=()=>{
        deletePatient(patient.id)
        toast.success('Paciente eliminado correctamente')
    }
    return (
        <div className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

            <PacientDetailItem
                label="ID"
                data={patient.id}
            />
            <PacientDetailItem
                label="Nombre"
                data={patient.name}
            />
            <PacientDetailItem
                label="Propietario"
                data={patient.caretaker}
            />
            <PacientDetailItem
                label="Email"
                data={patient.email}
            />
            <PacientDetailItem
                label="Fecha Alta"
                data={patient.date.toString()}
            /> <PacientDetailItem
                label="Síntomas"
                data={patient.symptoms}
            />
            <div className="flex   flex-col lg:flex-row gap-3 justify-between  mt-10">
                <button className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase
rounded-lg" onClick={() => getPatientById(patient.id)}>Editar</button>
                <button className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase
rounded-lg" onClick={handleClick}>Eliminar</button>
            </div>
        </div>
    )
}
