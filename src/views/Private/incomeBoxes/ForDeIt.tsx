import { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { FormikErrors } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import {
  FondocActive,
  LocaliActive,
  SeccioActive,
  SectorActive,
  SeriexActive,
  SubsctActive,
  SubsecActive,
  SubserActive,
  TipdocActive,
  UbicacActive,
} from "../../../components/uiBoxSelect"
import { InputControl } from "../../../components/views"
import { iingcaj } from "../../../interfaces"
import { clean_form_ingcaj } from "../../../reducers/ingcaj"

interface iforingdet {
  errors: FormikErrors<iingcaj>
  values: iingcaj
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void
}

const ForDeIt = (propiesties: iforingdet) => {
  const dispatch = useAppDispatch()

  const { errors, values, handleChange, setFieldValue } = propiesties

  const navigate = useNavigate()

  const { ubicacs_ubicacs } = useAppSelector((state) => state.ubicac)

  const num_div = ubicacs_ubicacs.find(
    (ub) => ub.ubicac_ubicac === values.ubicac_ubicac,
  )

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFieldValue("ingcaj_codcaj", "AUTO")
      setFieldValue("ingcaj_genaut", false)
    } else {
      setFieldValue("ingcaj_codcaj", "")
      setFieldValue("ingcaj_genaut", true)
    }
  }

  const handleBack = () => navigate(-1)

  const handleClean = () => dispatch(clean_form_ingcaj())

  return (
    <div className="card-box">
      <h4 className="card-title">Items</h4>

      <div className="form-group row mb-2">
        <div className="col-md-4">
          <TipdocActive
            nameSelect={"tipdoc_tipdoc"}
            value={values.tipdoc_tipdoc}
            displayLabel="Tipo Documento"
            classInvalid={errors.tipdoc_tipdoc}
            handleChange={(x) => propiesties.setFieldValue("tipdoc_tipdoc", x)}
          />
        </div>
        <div className="col-md-1">
          <div className="form-group m-0">
            <label htmlFor="ingcaj_genaut">Generar Auto.</label>
            <input
              type="checkbox"
              name="ingcaj_genaut"
              id="ingcaj_genaut"
              onChange={handleCheck}
              checked={values.ingcaj_codcaj === "AUTO"}
            />
            {Boolean(errors.ingcaj_genaut) && (
              <small className="text-danger">{errors.ingcaj_genaut}</small>
            )}
          </div>
        </div>
        <div className="col-md">
          <InputControl
            titleLabel={"Cod. Caja"}
            nameInput={"ingcaj_codcaj"}
            value={values.ingcaj_codcaj}
            readonly={values.ingcaj_codcaj === "AUTO"}
            handleChange={handleChange}
            classInvalid={errors.ingcaj_codcaj}
          />
        </div>
        <div className="col-md">
          <InputControl
            titleLabel={"Cod. RFID"}
            nameInput={"ingcaj_codrfi"}
            value={values.ingcaj_codrfi}
            handleChange={handleChange}
            classInvalid={errors.ingcaj_codrfi}
          />
        </div>
      </div>

      <div className="form-group row mb-2">
        <div className="col-md">
          <InputControl
            titleLabel={"AÑO"}
            nameInput={"ingcaj_anioxx"}
            value={values.ingcaj_anioxx}
            handleChange={handleChange}
            classInvalid={errors.ingcaj_anioxx}
          />
        </div>
        <div className="col-md">
          <FondocActive
            displayLabel="Fondo Doc."
            nameSelect={"fondoc_fondoc"}
            value={values.fondoc_fondoc}
            classInvalid={errors.fondoc_fondoc}
            handleChange={(x) => propiesties.setFieldValue("fondoc_fondoc", x)}
          />
        </div>
        <div className="col-md">
          <SeccioActive
            displayLabel="Sección"
            nameSelect={"seccio_seccio"}
            value={values.seccio_seccio}
            classInvalid={errors.seccio_seccio}
            refreshValue={values.fondoc_fondoc}
            handleChange={(x) => propiesties.setFieldValue("seccio_seccio", x)}
          />
        </div>
      </div>

      <div className="form-group row mb-2">
        <div className="col-md">
          <SubsecActive
            displayLabel="Sub sección"
            nameSelect={"subsec_subsec"}
            value={values.subsec_subsec}
            classInvalid={errors.subsec_subsec}
            refreshValue={values.seccio_seccio}
            handleChange={(x) => propiesties.setFieldValue("subsec_subsec", x)}
          />
        </div>
        <div className="col-md">
          <SeriexActive
            displayLabel="Serie"
            nameSelect={"seriex_seriex"}
            value={values.seriex_seriex}
            classInvalid={errors.seriex_seriex}
            refreshValue={values.subsec_subsec}
            handleChange={(x) => propiesties.setFieldValue("seriex_seriex", x)}
          />
        </div>
        <div className="col-md">
          <SubserActive
            displayLabel={`Sub serie`}
            nameSelect={"subser_subser"}
            value={values.subser_subser}
            classInvalid={errors.subser_subser}
            refreshValue={values.seriex_seriex}
            handleChange={(x) => propiesties.setFieldValue("subser_subser", x)}
          />
        </div>
      </div>

      <div className="form-group row mb-2">
        <div className="col-md">
          <hr />
        </div>
      </div>

      <div className="form-group row mb-2">
        <div className="col-md">
          <LocaliActive
            displayLabel="Localidad"
            nameSelect={"locali_locali"}
            value={values.locali_locali}
            classInvalid={errors.locali_locali}
            handleChange={(x) => propiesties.setFieldValue("locali_locali", x)}
          />
        </div>
        <div className="col-md">
          <SectorActive
            displayLabel="Sector"
            nameSelect={"sector_sector"}
            value={values.sector_sector}
            classInvalid={errors.sector_sector}
            refreshValue={values.locali_locali}
            handleChange={(x) => propiesties.setFieldValue("sector_sector", x)}
          />
        </div>
        <div className="col-md">
          <SubsctActive
            displayLabel="Sub Sector"
            nameSelect={"subsct_subsct"}
            value={values.subsct_subsct}
            classInvalid={errors.subsct_subsct}
            refreshValue={values.sector_sector}
            handleChange={(x) => propiesties.setFieldValue("subsct_subsct", x)}
          />
        </div>
        <div className="col-md">
          <UbicacActive
            displayLabel="Ubicación"
            nameSelect={"ubicac_ubicac"}
            value={values.ubicac_ubicac}
            classInvalid={errors.ubicac_ubicac}
            refreshValue={values.subsct_subsct}
            handleChange={(x) => propiesties.setFieldValue("ubicac_ubicac", x)}
          />
        </div>
      </div>

      <div className="form-group row mb-2">
        <div className="col-md">
          <label htmlFor="ingcaj_tipser">Tipo Serie </label>
          <select
            id="ingcaj_tipser"
            name="ingcaj_tipser"
            onChange={handleChange}
            value={values.ingcaj_tipser}
            className="form-control form-control-sm"
          >
            <option value={"n"}>Númerico</option>
            <option value={"t"}>Texto</option>
            <option value={"f"}>Fecha</option>
          </select>
        </div>

        <div className="col-md">
          <label htmlFor={`ingcaj_desde${values.ingcaj_tipser}`}>Desde</label>
          <input
            type={`${
              values.ingcaj_tipser === "t"
                ? "text"
                : values.ingcaj_tipser === "n"
                ? "number"
                : "date"
            }`}
            min={"1"}
            required
            className="form-control form-control-sm"
            id={`ingcaj_desde${values.ingcaj_tipser}`}
            name={`ingcaj_desde${values.ingcaj_tipser}`}
            onChange={handleChange}
            value={String(
              values[
                `ingcaj_desde${values.ingcaj_tipser}` as keyof typeof errors
              ],
            )}
          />
          {Boolean(
            errors[
              `ingcaj_desde${values.ingcaj_tipser}` as keyof typeof errors
            ],
          ) && (
            <small className="text-danger">
              {
                errors[
                  `ingcaj_desde${values.ingcaj_tipser}` as keyof typeof errors
                ]
              }
            </small>
          )}
        </div>

        <div className="col-md">
          <label htmlFor={`ingcaj_desde${values.ingcaj_tipser}`}>Hasta</label>
          <input
            type={`${
              values.ingcaj_tipser === "t"
                ? "text"
                : values.ingcaj_tipser === "n"
                ? "number"
                : "date"
            }`}
            min={"1"}
            required
            onChange={handleChange}
            className="form-control form-control-sm"
            id={`ingcaj_hasta${values.ingcaj_tipser}`}
            name={`ingcaj_hasta${values.ingcaj_tipser}`}
            value={String(
              values[
                `ingcaj_hasta${values.ingcaj_tipser}` as keyof typeof errors
              ],
            )}
          />
          {Boolean(
            errors[
              `ingcaj_desde${values.ingcaj_tipser}` as keyof typeof errors
            ],
          ) && (
            <small className="text-danger">
              {
                errors[
                  `ingcaj_desde${values.ingcaj_tipser}` as keyof typeof errors
                ]
              }
            </small>
          )}
        </div>

        <div className="col-md">
          <label htmlFor="ingcaj_numdiv">Division</label>
          <select
            id="ingcaj_numdiv"
            name="ingcaj_numdiv"
            onChange={handleChange}
            value={String(values.ingcaj_numdiv)}
            className="form-control form-control-sm"
          >
            {num_div &&
              Array.from(
                { length: num_div.ubicac_numdiv },
                (_, index) => index + 1,
              ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md">
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-sm btn-light"
              onClick={handleBack}
            >
              <i className="fa fa-reply m-r-5" aria-hidden="true"></i>
              Regresar
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              <i className="fa fa-plus-circle m-r-5" aria-hidden="true"></i>
              {values.ingcaj_numsec === 0 ? "Añadir" : "Actualizar"} Item
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={handleClean}
            >
              <i className="fa fa-eraser m-r-5" aria-hidden="true"></i>
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForDeIt
