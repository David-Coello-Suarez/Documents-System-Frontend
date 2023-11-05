import { useFormik } from "formik"
import { useAppSelector } from "../../../hooks"
import { InputControl } from "../../../components/views"

const ForInCaj = () => {
  const { incaj_ingcaj } = useAppSelector((state) => state.ingcaj)

  const { errors, values, handleChange } = useFormik({
    enableReinitialize: true,
    initialValues: incaj_ingcaj,
    onSubmit: console.log,
  })

  return (
    <div className="card-box">
      <h4 className="card-title">Ingreso de cajas</h4>

      <div className="form-group row mb-0">
        <div className="col-md-12 mb-2">
          <InputControl
            readonly
            titleLabel={"N°. Ingreso"}
            nameInput={"ingcaj_ingcaj"}
            value={values.ingcaj_ingcaj}
            handleChange={handleChange}
            classInvalid={errors.ingcaj_ingcaj}
          />
        </div>
        <div className="col-md-12 mb-2">
          <InputControl
            type="date"
            titleLabel={"Fec. Ingreso"}
            nameInput={"ingcaj_fecing"}
            value={values.ingcaj_fecing}
            handleChange={handleChange}
            classInvalid={errors.ingcaj_fecing}
          />
        </div>
      </div>

      <div className="form-group row mb-0">
        <div className="col-md-12 mb-2">
          <label htmlFor="ingcaj_refere">Referencia</label>
          <textarea
            rows={2}
            id="ingcaj_refere"
            name="ingcaj_refere"
            className="form-control form-control-sm"
            value={values.ingcaj_refere}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-12 col-form-label">¿Es Transferencia?</label>
        <div className="col-md-12 d-inline-flex">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="ingcaj_tiptra"
              id="ingcaj_tiptra_n"
              value="n"
              checked={values.ingcaj_tiptra === "n"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="ingcaj_tiptra_n">
              No
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="ingcaj_tiptra"
              id="ingcaj_tiptra_s"
              value="s"
              checked={values.ingcaj_tiptra === "s"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="ingcaj_tiptra_s">
              Si
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md">
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-sm btn-primary">
              <i className="fa fa-floppy-o m-r-5" aria-hidden="true"></i>
              Terminar
            </button>
            <button type="button" className="btn btn-sm btn-danger">
              <i className="fa fa-trash m-r-5" aria-hidden="true"></i>
              Borrar todo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForInCaj
