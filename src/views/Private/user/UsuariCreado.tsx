import { useEffect } from "react"
import { toast } from "react-toastify"
import "bootstrap"
import jQuery from "jquery"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { close_modal } from "../../../reducers/usuari"

const UsuariCreado = () => {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector((state) => state.usuari.usuari_opemod)
  const { usuari_creado } = useAppSelector((state) => state.usuari)

  const handleClose = () => {
    dispatch(close_modal())
    handleCopy()
  }

  useEffect(() => {
    const $modalElement = jQuery("#exampleModal")

    if ($modalElement.length && typeof $modalElement.modal === "function") {
      if (isOpen) {
        $modalElement.modal("show")
      }
    }
  }, [isOpen])

  const handleCopy = () => {
    const formattedText = `USUARIO: ${usuari_creado.usuario}\n CONTRASEÑA: ${usuari_creado.contrasena}`
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard.writeText(formattedText).then(
        function () {
          toast.success("Texto copiado al portapapeles")
        },
        function () {
          toast.warning("No se pudo copiar el texto: ")
        },
      )
    } else {
      const textArea = document.createElement("textarea")
      textArea.value = formattedText
      document.body.appendChild(textArea)

      textArea.select()

      try {
        document.execCommand("copy")
        toast.success("Texto copiado al portapapeles")
      } catch (err) {
        toast.warning("No se pudo copiar el texto: ")
      }

      document.body.removeChild(textArea)
    }
  }

  return (
    <>
      <div
        className={`modal fade`}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Credenciales de usuario
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="usuario">Nombre de usuario</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="usuario"
                          name="usuario"
                          readOnly
                          value={usuari_creado.usuario}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="contrasena">Contraseña</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="contrasena"
                          name="contrasena"
                          readOnly
                          value={usuari_creado.contrasena}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-content-center modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Copiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UsuariCreado
