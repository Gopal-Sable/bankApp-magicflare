import { Link, useLocation, useHistory } from 'react-router-dom'
import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


function Navbar() {
  
  const context = useContext(noteContext);
  const { user } = context;
  let history = useHistory()
  const handleLogout = () => {
    console.log("clicked");
    localStorage.removeItem('token');
    history.push("/login")
  }
  let location = useLocation();
  // React.useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">i-Notebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/users" ? "active" : ""}`} to="/users">Users</Link>
              </li>
              <li className='nav-item'>
                  <button className='btn btn-success' disabled>{user.balance}</button>
              </li>
            </ul>

            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">LOGIN</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">SIGNUP</Link>
            </form>
              // eslint-disable-next-line
              : <button className="btn btn-primary mx-2" onClick={handleLogout} role="button">LOGOUT</button>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
