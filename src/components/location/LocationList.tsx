import { routes } from 'constants/routesConstants'
import { GuessType } from 'models/guess'
import { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import LocationBlock from './LocationBlock'
import { LocationType } from 'models/location'

interface Props {
  title: string
  desc: string
  status: string
  locationData?: any
  guessData?: any
  changePage?: (
    upDown: string
  )=>number
  loadmore?: boolean
  multiplePages?: boolean
}

const LocationList: FC<Props> = ({
  title,
  desc,
  status,
  locationData,
  guessData,
  changePage,
  loadmore,
  multiplePages,
}) => {
  const [pageNumber, setPageNumber] = useState(1)
  return (
    <>
      {locationData ? (
        <>
          <h3 className="green">{title}</h3>
          <p>{desc}</p>
          <div>
            {status === 'error' && <p>Error fetching data</p>}
            {status === 'loading' && <p>Loading data...</p>}
            {locationData &&
            locationData.data.data.length > 0 &&
            status === 'success' ? (
              <div className="locationRow">
                {multiplePages ? (
                  <>
                    {locationData?.data.data.map(
                      (item: LocationType, index: number) => (
                        <LocationBlock location={item} key={index} />
                      ),
                    )}
                  </>
                ) : (
                  <>
                    {locationData?.data.data
                      .slice(0, 3)
                      .map((item: LocationType, index: number) => (
                        <LocationBlock location={item} key={index} />
                      ))}
                  </>
                )}
              </div>
            ) : (
              <div className="mb-3">No locations available.</div>
            )}
          </div>
          {loadmore || multiplePages ? (
            <>
              {multiplePages && !loadmore ? (
                <>
                  {locationData.data.meta.last_page > 1 && (
                    <div className="d-flex justify-content-between">
                      <Button
                        className="btnRegister me-2"
                        onClick={() => setPageNumber(changePage!('prev'))}
                        disabled={pageNumber === 1}
                      >
                        Prev page
                      </Button>
                      <Button
                        className="btnRegister"
                        onClick={() => setPageNumber(changePage!('next'))}
                        disabled={
                          pageNumber === locationData.data.meta.last_page
                        }
                      >
                        Next page
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="mb-3 text-center mx-auto">
                  <Button href={routes.ALLLOCATIONS} className="btnLoadMore">
                    Load more
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Button className="btnRegister" href={routes.SIGNUP}>
              Sign up
            </Button>
          )}
        </>
      ) : (
        <>
          <h3 className="green">{title}</h3>
          <p>{desc}</p>
          <div>
            {status === 'error' && <p>Error fetching data</p>}
            {status === 'loading' && <p>Loading data...</p>}
            {guessData &&
            guessData.data.data.length > 0 &&
            status === 'success' ? (
              <div className="locationRow">
                {multiplePages ? (
                  <>
                    {guessData?.data.data.map(
                      (item: GuessType, index: number) => (
                        <LocationBlock locationGuess={item} key={index} />
                      ),
                    )}
                  </>
                ) : (
                  <>
                    {guessData?.data.data
                      .slice(0, 3)
                      .map((item: GuessType, index: number) => (
                        <LocationBlock locationGuess={item} key={index} />
                      ))}
                  </>
                )}
              </div>
            ) : (
              <div className="mb-3">You havent made any guesses yet.</div>
            )}
          </div>
          
        </>
      )}
    </>
  )
}

export default LocationList
