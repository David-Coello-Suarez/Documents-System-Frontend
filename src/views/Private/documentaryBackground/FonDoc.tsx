import { memo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { useFormik } from "formik"
import { clean_fondoc_form } from "../../../reducers/fondoc"
import { FonDocSchema } from "../../../validation"
import { ButtonSave } from "../../../components/iu"
import { InputControl } from "../../../components/views"
import { ifondoc } from "../../../interfaces"
import { post_fondoc, put_fondoc } from "../../../controllers/fondoc"

const FonDoc = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  const { fondoc_state } = useAppSelector((state) => state.fondoc)

  const handleSave = (body: ifondoc) => {
    const data = { body, navigate }

    if (body.fondoc_fondoc === 0) {
      dispatch(post_fondoc(data))
    } else {
      dispatch(put_fondoc(data))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clean_fondoc_form())
    }
  }, [dispatch])

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: FonDocSchema,
    initialValues: fondoc_state,
    onSubmit: handleSave,
    validateOnChange: false,
  })

  return (
    <>
      <div>
        <div className="col-lg-8 offset-lg-2">
          <h4 className="page-title">
            {formik.values.fondoc_fondoc === 0 ? "Agregar" : "Actualizar"} Fondo
            Documental
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <form onSubmit={formik.handleSubmit}>
            <InputControl
              required
              titleLabel="Nombre"
              nameInput={"fondoc_nombre"}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              value={formik.values.fondoc_nombre}
              classInvalid={formik.errors.fondoc_nombre}
            />

            <InputControl
              required
              titleLabel="Abreviatura"
              nameInput={"fondoc_descri"}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              value={formik.values.fondoc_descri}
              classInvalid={formik.errors.fondoc_descri}
            />

            <ButtonSave
              titleSaveButton={`${
                formik.values.fondoc_fondoc === 0 ? "CREAR" : "Actualizar"
              } Fondo Documental`}
              disabled={false}
              handleBack={handleBack}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default memo(FonDoc)
