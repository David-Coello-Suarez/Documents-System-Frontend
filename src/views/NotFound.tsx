import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  return (
    <div className="main-wrapper error-wrapper" style={{ height: '100vh ' }}>
      <div className="error-box">
        <h1>404</h1>
        <h3>
          <i className="fa fa-warning"></i> ¡Ups! ¡Página no encontrada!
        </h3>
        <p>La página que usted solicitó no fue encontrada.</p>
        <button type="button" className="btn btn-primary go-home" onClick={handleBack}>
          Ir a casa
        </button>
      </div>
    </div>
  )
}

export default NotFound
