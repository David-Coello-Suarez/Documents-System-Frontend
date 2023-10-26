import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/index"
import { getProfil } from "@/controllers/profil"
import { clear_perfiles } from "@/reducers/perfil"

interface iperfil {
  onchangeclick: (event: React.ChangeEvent<HTMLSelectElement>) => void
  value: number
  nameInput: string
  isInvalid: boolean
}

const Perfil = ({ onchangeclick, value, nameInput, isInvalid }: iperfil) => {
  const dispatch = useAppDispatch()

  const { perfil_perfil } = useAppSelector((state) => state.perfil)

  useEffect(() => {
    dispatch(getProfil())

    return () => {
      dispatch(clear_perfiles())
    }
  }, [])

  return (
    <>
      <div className={`form-group `}>
        <label htmlFor="usuari_perfil">
          Perfil <span className="text-danger">*</span>
        </label>
        <select
          className={`form-control  ${isInvalid && "is-invalid"}`}
          name={nameInput}
          id={nameInput}
          value={value}
          onChange={onchangeclick}
        >
          <option value={0}>SELECCIONA</option>
          {perfil_perfil.map((pf) => (
            <option key={pf.profil_profil} value={pf.profil_profil}>
              {pf.profil_nampro}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Perfil
