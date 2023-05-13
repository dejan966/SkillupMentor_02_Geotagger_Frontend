import { routes } from 'constants/routesConstants'
import { GuessType } from 'models/guess'
import { LocationType } from 'models/location'
import { FC, useState } from 'react'
import { Button, Toast, ToastContainer } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import authStore from 'stores/auth.store'
import SuccessPopup from '../../pages/Success'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'

interface Props {
  location?: LocationType
  locationGuess?: GuessType
}

const LocationBlock: FC<Props> = ({ location, locationGuess }) => {
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const [isOpen, setIsOpen] = useState(false)
  const [successDelete, setSuccessDelete] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const toggleSuccess = () => {
    setSuccessDelete(!successDelete)
  }

  const deleteLocation = async (locationId: number) => {
    const response = await API.deleteLocation(locationId)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    }
  }

  return (
    <>
      {authStore.user ? (
        <>
          {location ? (
            <div className="locationContainer mb-3 me-3">
              <Link
                to={`${routes.MAKEGUESS}/${location?.id}`}
                state={{ data: location }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads/locations/${location?.image_url}`}
                  alt="location_img"
                  width="420"
                  height="235"
                />
              </Link>
              <Button className="top-left">
                <Link
                  to={`${routes.EDITLOCATION}/${location.id}`}
                  state={{ data: location }}
                >
                  <img src="/edit.svg" alt="edit" />
                </Link>
              </Button>
              <Button
                className="btnRed top-right"
                onClick={() => setIsOpen(true)}
              >
                <img width={25} height={15} src="/x.svg" alt="delete" />
              </Button>
              {isOpen && (
                <SuccessPopup
                  content={
                    <>
                      <h1 className="text display-6 mb-4">Are you sure?</h1>
                      <p>
                        The locations will be deleted. There is no undo of this
                        action.
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
            <>
              {locationGuess?.location && (
                <div className="locationContainer mb-3 me-3">
                  <Link
                    to={`${routes.MAKEGUESS}/${locationGuess?.location.id}`}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/locations/${locationGuess?.location.image_url}`}
                      alt="location_img"
                      width="420"
                      height="235"
                    />
                  </Link>
                  <div className="centered">
                    {locationGuess?.errorDistance} m
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="locationContainer mb-3 me-3">
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

export default LocationBlock
