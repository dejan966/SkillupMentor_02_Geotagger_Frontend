import { routes } from 'constants/routesConstants'
import { GuessType } from 'models/guess'
import { LocationType } from 'models/location'
import { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import authStore from 'stores/auth.store'

interface Props {
  location?: LocationType
  locationGuess?: GuessType
}

const LocationBlock: FC<Props> = ({ location, locationGuess }) => {
  const [locationData, setLocationData] = useState({
    id: 1,
    name: '',
    image_url: '',
    lat: 0.0,
    lng: 0.0,
  })

  const [isOpen, setIsOpen] = useState(false)
  const [successDelete, setSuccessDelete] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const toggleSuccess = () => {
    setSuccessDelete(!successDelete)
  }

  return (
    <>
      {authStore.user ? (
        <>
          {location ? (
            <>
              {authStore.user === location.user ? (
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
                  <Button className="btnRed" href={routes.EDITLOCATION}>
                    <img src="/edit.svg" alt="edit" className="centered" />
                  </Button>
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
                  <Button href={routes.EDITLOCATION} className="top-left mx-2">
                    <img src="/edit.svg" alt="edit" />
                  </Button>
                  <Button className="btnRed top-right">x</Button>
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
