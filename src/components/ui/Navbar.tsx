import Button from 'react-bootstrap/Button'
import { routes } from 'constants/routesConstants'
import { FC, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast'
import authStore from 'stores/auth.store'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { StatusCode } from 'constants/errorConstants'
import * as API from 'api/Api'
import useMediaQuery from 'hooks/useMediaQuery'

const Navbar: FC = () => {
  const location = useLocation()
  const { isMobile } = useMediaQuery(1038)
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const toggleHamburger = () => {
    setShowMenu((showMenu) => !showMenu)
  }

  const signout = async () => {
    const response = await API.signout()
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.signout()
      navigate(routes.HOME)
    }
  }

  return (
    <>
      <header>
        {isMobile && showMenu ? (
          <nav className="navbar navbar-expand-lg bg-light">
            {authStore.user ? (
              <>
                <div className="container-xxl d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <Link to={routes.HOME}>
                      <img
                        src="/geotagger_logo.png"
                        alt="Geotagger logo"
                        width={123}
                      />
                    </Link>
                  </div>
                  <div>
                    <span className="close-icon" onClick={toggleHamburger}>
                      x
                    </span>
                  </div>
                </div>
                <div className="container-xxl d-flex justify-content-center align-items-center mb-3">
                  <ul className="navbar-nav">
                    <div>
                      <div>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${authStore.user?.avatar}`}
                          alt="User avatar"
                        />
                      </div>
                      <div>
                        {authStore.user.first_name +
                          ' ' +
                          authStore.user.last_name}
                      </div>
                    </div>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={routes.HOME}>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={routes.SIGNUP}>
                        Profile settings
                      </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                      <NavLink
                        className="nav-link btnLoginHamb"
                        to={routes.HOME}
                        onClick={signout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="container-xxl d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <Link to={routes.HOME}>
                      <img
                        src="/geotagger_logo.png"
                        alt="Geotagger logo"
                        width={123}
                      />
                    </Link>
                  </div>
                  <div>
                    <span className="close-icon" onClick={toggleHamburger}>
                      x
                    </span>
                  </div>
                </div>
                <div className="container-xxl d-flex justify-content-center align-items-center mb-3">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" to={routes.HOME}>
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={routes.SIGNUP}>
                        <Button className="btnRegisterHamb">SIGN UP</Button>
                      </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                      <NavLink
                        className="nav-link btnLoginHamb"
                        to={routes.LOGIN}
                      >
                        <Button className="btnLoginHamb">Sign in</Button>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </nav>
        ) : (
          <nav className="navbar navbar-expand-lg">
            <div className="container-xxl">
              <Link className="navbar.brand" to={routes.HOME}>
                <img
                  src="/geotagger_logo.png"
                  alt="Geotagger logo"
                  width={123}
                />
              </Link>
              <div className="navbar navbar-expand-lg">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span
                    className="navbar-toggler-icon"
                    onClick={() => toggleHamburger()}
                  ></span>
                </button>
              </div>
              <div
                className="collapse navbar-collapse justify-content-end align-items-center"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav mb-2 mb-lg-0">
                  {authStore.user ? (
                    <>
                      <li className="nav-item pe-4">
                        <a
                          className="text-decoration-none textColor"
                          href={routes.HOME}
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item pe-4">
                        <a
                          className="text-decoration-none textColor"
                          href={routes.USERINFO}
                        >
                          Profile settings
                        </a>
                      </li>
                      <li className="nav-item pe-4">
                        <a
                          className="text-decoration-none textColor"
                          onClick={signout}
                        >
                          Logout
                        </a>
                      </li>
                      <li className="nav-item pe-3">
                        <Link to={routes.USERLOCATIONSINFO}>
                          <img
                            className="userAvatar"
                            src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${authStore.user?.avatar}`}
                            alt="User avatar"
                            width={40}
                          />
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a href={routes.ADDNEWLOCATION} className="addLocation">
                          +
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item pe-4">
                        <NavLink className="nav-link" to={routes.LOGIN}>
                          <Button className="btnLogin">Sign in</Button>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link pe-0" to={routes.SIGNUP}>
                          <Button className="btnRegister">SIGN UP</Button>
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        )}
      </header>
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-suto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}
export default Navbar
