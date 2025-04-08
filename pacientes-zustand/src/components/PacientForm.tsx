import { useForm } from "react-hook-form"
import Error from "./Error"
import { DraftPatient } from "../types"
import { usePatientStore } from "../store"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function PacientForm() {

  const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm<DraftPatient>()

  /*   const {addPacient}=usePatientStore()
   */
  //otra forma -mas comun en redux-toolkit- :
  const addPacient = usePatientStore(state => state.addPacient)
  const activeId = usePatientStore(state => state.activeId)
  const patients = usePatientStore(state => state.patients)
  const updatePatient = usePatientStore(state => state.updatePatient)

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(patient => patient.id === activeId)[0]
      setValue('name', activePatient.name)
      setValue('caretaker', activePatient.caretaker)
      setValue('email', activePatient.email)
      setValue('date', activePatient.date)
      setValue('symptoms', activePatient.symptoms)
    }
  }, [activeId])

  const registerPatient = (data: DraftPatient) => {
    if (activeId) {
      updatePatient(data)
      toast.success('Paciente actualizado correctamente')
    } else {
      addPacient(data)
      toast.success('Paciente registrado correctamente ')
    }
    reset()
  }


  return (
    <div className="md:w-1/2 lg:w-1/2 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y <span className="text-indigo-600 font-bold">Administralos</span></p>
      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" noValidate onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">Paciente</label>
          <input type="text" id="name" placeholder="Nombre del Paciente" className="w-full p-3 border border-gray-100" {...register('name', {
            required: 'El nombre del paciente es obligatorio',
            /*             maxLength: {value:8, message:'Máximo 8 Caracteres'} */
          })} />
          {errors.name && (
            <Error>
              {errors.name?.message}

            </Error>
          )}

        </div>
        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">Propietario</label>
          <input type="text" id="caretaker" placeholder="Nombre del Propietario" className="w-full p-3 border border-gray-100"
            {...register('caretaker', { required: 'El propietario es obligatorio' })} />
          {errors.caretaker && (
            <Error>
              {errors.caretaker?.message}
            </Error>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">Email</label>
          <input type="email" id="email" placeholder="Email de Registro" className="w-full p-3 border border-gray-100"
            {...register('email', {
              required: "El Email es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

                message: 'Email no válido'
              }
            })}
          />
          {errors.email && (
            <Error>
              {errors.email?.message}
            </Error>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">Fecha Alta</label>
          <input type="date" id="date" className="w-full p-3 border border-gray-100"
            {...register('date', {
              required: 'La fecha de alta es obligatoria'
            })} />

          {errors.date && (
            <Error>
              {errors.date?.message}
            </Error>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">Síntomas</label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register('symptoms', {
              required: 'Los síntomas son obligatorios'
            })}
          />
          {errors.symptoms && (
            <Error>
              {errors.symptoms?.message}
            </Error>
          )}
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={activeId ? 'Guardar Paciente' : "Agregar Paciente"}
        />
      </form>
    </div>
  )
}
