import { routes } from 'constants/routesConstants'
import { GuessType } from 'models/guess'
import { LocationType } from 'models/location'
import { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import authStore from 'stores/auth.store'
import SuccessPopup from '../../pages/Success'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'

interface Props {
  location?: LocationType
  locationGuess?: GuessType
}

const LocationBlock: FC<Props> = (props: Props) => {
  const { location, locationGuess } = props
  const [successMessage, setSuccessMessage] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const [response, setResponse] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const toggleResponse = () => {
    setResponse(!response)
  }

  const deleteLocation = async (locationId: number) => {
    const response = await API.deleteLocation(locationId)
    if (response.status === StatusCode.BAD_REQUEST) {
      setSuccessMessage('Unable to delete the location.')
      toggleResponse()
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setSuccessMessage('Unable to delete the location.')
      toggleResponse()
    } else {
      setSuccessMessage('The location was successfully deleted.')
      toggleResponse()
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
              {location.user.id === authStore.user.id && (
                <>
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
                </>
              )}
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
              {response && (
                <SuccessPopup
                  content={
                    <>
                      <p className="text fs-5">{successMessage}</p>
                      <div className="text-center">
                        <Button
                          href="/"
                          className="btnRegister col-md-3"
                          onClick={() => {
                            toggleResponse()
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
    </>
  )
}

export default LocationBlock
