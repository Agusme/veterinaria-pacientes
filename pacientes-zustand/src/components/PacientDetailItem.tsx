type PacientDetailItemProps ={
    label: string
    data:string
}
export default function PacientDetailItem({label, data}: PacientDetailItemProps) {
  return (
    <p className="font-bold mb-5 text-gray-700 uppercase">{label}:{''} <span className="font-normal normal-case">{data} </span></p>
  )
}
