import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { get_profils_active } from "../../controllers/profil"
import { clean_perfiles } from "../../reducers/perfil"

interface iperfil {
  onchangeclick: (event: React.ChangeEvent<HTMLSelectElement>) => void
  value: number
  nameInput: string
  isInvalid?: string
}

const Perfil = ({ onchangeclick, value, nameInput, isInvalid }: iperfil) => {
  const dispatch = useAppDispatch()

  const { perfils_perfils } = useAppSelector((state) => state.perfil)

  useEffect(() => {
    dispatch(get_profils_active())

    return () => {
      dispatch(clean_perfiles())
    }
  }, [dispatch])

  return (
    <>
      <div className={`form-group `}>
        <label htmlFor="usuari_perfil">
          Perfil <span className="text-danger">*</span>
        </label>
        <select
          className={`form-control  ${Boolean(isInvalid) && "is-invalid"}`}
          name={nameInput}
          id={nameInput}
          value={value}
          onChange={onchangeclick}
        >
          <option value={0}>SELECCIONA</option>
          {perfils_perfils.map((pf) => (
            <option key={pf.profil_profil} value={pf.profil_profil}>
              {pf.profil_nampro}
            </option>
          ))}
        </select>
        {Boolean(isInvalid) && (
          <small className="text-danger">{isInvalid}</small>
        )}
      </div>
    </>
  )
}

export default Perfil
