import { routes } from 'constants/routesConstants'
import { GuessType } from 'models/guess'
import { LocationType } from 'models/location'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import authStore from 'stores/auth.store'

interface Props {
  location?: LocationType
  locationGuess?: GuessType
}

const LocationBlock: FC<Props> = ({ location, locationGuess }) => {
  return (
    <>
      {authStore.user ? (
        <>
          {location ? (
            <>
              {authStore.user?.id === location.user.id ? (
                <div className="locationContainer">
                  <Link
                    to={`${routes.MAKEGUESS}/${location?.id}`}
                    state={{ data: location }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/locations/${location?.image_url}`}
                      alt="location_img"
                      width="420"
                      height="235"
                      className="imgSpacing"
                    />
                  </Link>
                  <Button className="top-left mx-2">
                    <Link to={`${routes.EDITLOCATION}/${location.id}`} state={{ data: location }}>
                      <img src="/edit.svg" alt="edit" />
                    </Link>
                  </Button>
                  <Button
                    className="btnRed top-right"
                    onClick={() => setIsOpen(true)}
                  >
                    x
                  </Button>
                  {isOpen && (
                    <SuccessPopup
                      content={
                        <>
                          <h1 className="text display-6 mb-4">Are you sure?</h1>
                          <p>
                            The locations will be deleted. There is no undo of
                            this action.
                          </p>
                          <div className="d-flex align-items-center justify-content-between">
                            <Button
                              className="btnRegister col-md-3"
                              style={{ borderColor: '#DE8667' }}
                              onClick={() => {
                                deleteLocation(location.id)
                                togglePopup()
                                toggleSuccess()
                              }}
                            >
                              Delete
                            </Button>
                            <p onClick={togglePopup}>Cancel</p>
                          </div>
                        </>
                      }
                    />
                  )}
                  {successDelete && (
                    <SuccessPopup
                      content={
                        <>
                          <p className="text fs-5">
                            Your <span className="green">location</span> was
                            deleted.
                          </p>
                          <div className="text-center">
                            <Button
                              href="/"
                              className="btnRegister col-md-3"
                              onClick={() => {
                                toggleSuccess()
                              }}
                            >
                              Close
                            </Button>
                          </div>
                        </>
                      }
                    />
                  )}
                </div>
              ) : (
                <div className="locationContainer">
                  <Link
                    to={`${routes.MAKEGUESS}/${location?.id}`}
                    state={{ data: location }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/locations/${location?.image_url}`}
                      alt="location_img"
                      width="420"
                      height="235"
                      className="imgSpacing"
                    />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="locationContainer">
              <Link
                to={`${routes.MAKEGUESS}/${locationGuess?.location.id}`}
                state={{ data: locationGuess }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads/locations/${locationGuess?.location.image_url}`}
                  alt="location_img"
                  width="420"
                  height="235"
                />
              </Link>
              <div className="centered">{locationGuess?.errorDistance} m</div>
            </div>
          )}
        </>
      ) : (
        <div className="locationContainer">
          <img
            src={`${process.env.REACT_APP_API_URL}/uploads/locations/${location?.image_url}`}
            alt="location_img"
            width="420"
            height="235"
          />
          <a href={routes.LOGIN}>
            <img src="/lock.svg" className="centered" alt="Lock" />
          </a>
        </div>
      )}
    </>
  )
}

export default LocationBlock
