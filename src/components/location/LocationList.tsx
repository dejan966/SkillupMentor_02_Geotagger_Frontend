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
  pageNumber?: number
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>
  loadmore?: boolean
  multiplePages?: boolean
}

const LocationList: FC<Props> = ({
  title,
  desc,
  status,
  locationData,
  guessData,
  pageNumber,
  setPageNumber,
  loadmore,
  multiplePages,
}) => {
  return (
    <>
      <h3 className="green">{title}</h3>
      <p>{desc}</p>
      {status === 'error' && <p>Error fetching data</p>}
      {status === 'loading' ? (
        <p>Loading data...</p>
      ) : (
        <>
          {locationData &&
          locationData.data.data.length > 0 &&
          status === 'success' ? (
            <>
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
              {loadmore || multiplePages ? (
                <>
                  {multiplePages && !loadmore ? (
                    <>
                      {locationData.data.meta.last_page > 1 && (
                        <div className="d-flex justify-content-between">
                          <Button
                            className="btnRegister me-2"
                            onClick={() => setPageNumber!((prev) => prev - 1)}
                            disabled={pageNumber === 1}
                          >
                            Prev page
                          </Button>
                          <Button
                            className="btnRegister"
                            onClick={() => setPageNumber!((prev) => prev + 1)}
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
                      <Button
                        href={routes.ALLLOCATIONS}
                        className="btnLoadMore"
                      >
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
              {guessData ? (
                <>
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
                  {loadmore || multiplePages ? (
                    <>
                      {multiplePages && !loadmore ? (
                        <>
                          {guessData.data.meta.last_page > 1 && (
                            <div className="d-flex justify-content-between">
                              <Button
                                className="btnRegister me-2"
                                onClick={() =>
                                  setPageNumber!((prev) => prev - 1)
                                }
                                disabled={pageNumber === 1}
                              >
                                Prev page
                              </Button>
                              <Button
                                className="btnRegister"
                                onClick={() =>
                                  setPageNumber!((prev) => prev + 1)
                                }
                                disabled={
                                  pageNumber === guessData.data.meta.last_page
                                }
                              >
                                Next page
                              </Button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="mb-3 text-center mx-auto">
                          <Button
                            href={routes.ALLGUESSES}
                            className="btnLoadMore"
                          >
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
                  <div>No data to display</div>
                  <Button className="btnRegister" href={routes.SIGNUP}>
                    Sign up
                  </Button>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default LocationList
