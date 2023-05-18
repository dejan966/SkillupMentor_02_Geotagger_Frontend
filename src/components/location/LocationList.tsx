import { routes } from 'constants/routesConstants'
import { GuessType } from 'models/guess'
import { FC } from 'react'
import { Button } from 'react-bootstrap'
import LocationBlock from './LocationBlock'
import { LocationType } from 'models/location'

interface Props {
  title: string
  desc: string
  status: string
  locationData?: any
  guessData?: any
  loadmore?: boolean
}

const LocationList: FC<Props> = ({
  title,
  desc,
  status,
  locationData,
  guessData,
  loadmore,
}) => {
  return (
    <>
      {locationData ? (
        <>
          <div className="text-start">
            <h3 className="green">{title}</h3>
            <p>{desc}</p>
            <div>
              {status === 'error' && <p>Error fetching data</p>}
              {status === 'loading' && <p>Loading data...</p>}
              {locationData &&
              locationData.data.data.length > 0 &&
              status === 'success' ? (
                <div className="locationRow">
                  {locationData?.data.data
                    .slice(0, 3)
                    .map((item: LocationType, index: number) => (
                      <LocationBlock location={item} key={index} />
                    ))}
                </div>
              ) : (
                <div className="mb-3">No locations available.</div>
              )}
            </div>
          </div>
          <div className="mb-3 text-center mx-auto">
            {loadmore ? (
              <Button href={routes.ALLGUESSES} className="btnLoadMore">
                Load more
              </Button>
            ) : (
              <Button className="btnRegister" href={routes.SIGNUP}>
                Sign up
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="text-start">
            <h3 className="green">{title}</h3>
            <p>{desc}</p>
            <div>
              {status === 'error' && <p>Error fetching data</p>}
              {status === 'loading' && <p>Loading data...</p>}
              {guessData &&
              guessData.data.data.length > 0 &&
              status === 'success' ? (
                <div className="locationRow">
                  {guessData?.data.data
                    .slice(0, 3)
                    .map((item: GuessType, index: number) => (
                      <LocationBlock locationGuess={item} key={index} />
                    ))}
                </div>
              ) : (
                <div className="mb-3">You havent made any guesses yet.</div>
              )}
            </div>
          </div>
          <div className="mb-3 text-center mx-auto">
            {loadmore ? (
              <Button href={routes.ALLGUESSES} className="btnLoadMore">
                Load more
              </Button>
            ) : (
              <Button className="btnRegister" href={routes.SIGNUP}>
                Sign up
              </Button>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default LocationList
