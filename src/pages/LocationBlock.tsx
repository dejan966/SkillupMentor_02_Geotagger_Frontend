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
            <div>
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
