import { Link } from "react-router-dom"

const Loggin = () => {
  return (
    <>
      <form className="form-signin">
        <div className="account-logo">
          <Link to={"/"}>
            <img src="assets/img/logo.png" />
          </Link>
        </div>
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input type="text" autoFocus className="form-control" />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" className="form-control" />
        </div>
        {/* <div className="form-group text-right">
          <a href="forgot-password.html">Forgot your password?</a>
        </div> */}
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary account-btn">
            Ingresar
          </button>
        </div>
        {/* <div className="text-center register-link">
          Don’t have an account? <a href="register.html">Register Now</a>
        </div> */}
      </form>
    </>
  )
}

export default Loggin
