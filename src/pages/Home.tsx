import Layout from 'components/ui/Layout'
import { FC, useState } from 'react'
import { Button, Toast, ToastContainer } from 'react-bootstrap'
import { routes } from 'constants/routesConstants'
import authStore from 'stores/auth.store'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from 'hooks/useMediaQuery'
import { LocationType } from 'models/location'
import { GuessType } from 'models/guess'
import LocationBlock from './LocationBlock'

const Home: FC = () => {
  const { isMobile } = useMediaQuery(1038)
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const [userId, setUserId] = useState(1)
  const [quoteData, setQuoteData] = useState({ id: 1, quote: '' })
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [successDelete, setSuccessDelete] = useState(false)

  const { data: allLocations, status: locationStatus } = useQuery(
    ['allLocations'],
    () => API.fetchLocations(),
    {
      refetchOnWindowFocus: false,
    },
  )

  const { data: personalBest, status: personalBestStatus } = useQuery(
    ['personalBest'],
    () => API.fetchPersonalBest(),
    {
      refetchOnWindowFocus: false,
    },
  )

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const toggleSuccess = () => {
    setSuccessDelete(!successDelete)
  }

  return (
    <Layout>
      {authStore.user ? (
        <>
          <div className="mt-3">
            <div className="text-start">
              <h3 className="green">Personal best guesses</h3>
              <p>
                Your personal best guesses appear here. Go on and try to beat
                your personal records or set a new one!
              </p>
              <div>
                {personalBestStatus === 'error' && <p>Error fetching data</p>}
                {personalBestStatus === 'loading' && <p>Loading data...</p>}
                {/*                 {personalBestStatus === 'success' && (
                  <>
                     {personalBest.data
                      .slice(0, 3)
                      .map((item: GuessType, index: number) => (
                        <LocationBlock
                            location_id={item.location.id}
                            image_url={item.location.image_url}
                            error_distance={item.errorDistance}
                            key={index}
                          />
                      ))}
                  </>
                )} */}
              </div>
            </div>
            <div className="mb-3 text-center mx-auto">
              <Button href="/" className="btnLogin">
                Load more
              </Button>
            </div>
          </div>
          <div className="mb-5">
            <div className="text-start" style={{ width: 420 }}>
              <h3 className="green">New locations</h3>
              <p>
                New uploads from users. Try to guess all the locations by
                pressing on a picture.
              </p>
              <div>
                {locationStatus === 'error' && <p>Error fetching data</p>}
                {locationStatus === 'loading' && <p>Loading data...</p>}
                {locationStatus === 'success' && (
                  <>
                    {allLocations.data
                      .slice(0, 9)
                      .map((item: LocationType, index: number) => (
                        <LocationBlock
                          location_id={item.id}
                          image_url={item.image_url}
                          key={index}
                        />
                      ))}
                  </>
                )}
              </div>
            </div>
            <div className="text-center">
              <Button href={'/'} className="btnLogin">
                Load more
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {isMobile ? (
            <>
              <div className="py-4 grid mb-5 text-center">
                <div>
                  <h1 className="display-2 green">
                    Explore the world with Geotagger!
                  </h1>
                  <p className="col-md-8">
                    Geotagger is website that allows you to post pictures and
                    tag it on the map. Other users than try to locate it via
                    Google Maps.
                  </p>
                  <p className="fs-4">
                    <Button className="btnRegister" href={routes.SIGNUP}>
                      Sign up
                    </Button>
                  </p>
                </div>
                <div>
                  <img
                    src="homepage_background.png"
                    width={456}
                    alt="Location background"
                  />
                </div>
              </div>
              <div className="mb-5 text-center">
                <div style={{ width: 420 }}>
                  <h2 className="green">Try yourself at Geotagger!</h2>
                  <p>
                    Try to guess the location of the images by selecting a
                    position on the map. When you make a guess, it gives you the
                    error distance.
                  </p>
                </div>
                <div className="mb-3">Locations</div>
                <div className="mb-3 text-center mx-auto">
                  <a href={routes.SIGNUP}>
                    <Button className="btnRegister">Sign up</Button>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="py-4 grid mb-5 text-center">
                <div className="text-start">
                  <h1 className="display-2 green">
                    Explore the world with Geotagger!
                  </h1>
                  <p className="col-md-8">
                    Geotagger is website that allows you to post pictures and
                    tag it on the map. Other users than try to locate it via
                    Google Maps.
                  </p>
                  <p className="fs-4">
                    <Button className="btnRegister" href={routes.SIGNUP}>
                      Sign up
                    </Button>
                  </p>
                </div>
                <div>
                  <img
                    src="homepage_background.png"
                    width={456}
                    alt="Location background"
                  />
                </div>
              </div>
              <div className="mb-5">
                <div className="text-center mx-auto" style={{ width: 420 }}>
                  <h2 className="green">Try yourself at Geotagger!</h2>
                  <p>
                    Try to guess the location of the images by selecting a
                    position on the map. When you make a guess, it gives you the
                    error distance.{' '}
                  </p>
                </div>
                <div>
                  {locationStatus === 'error' && <p>Error fetching data</p>}
                  {locationStatus === 'loading' && <p>Loading data...</p>}
                  {locationStatus === 'success' && (
                    <>
                      {allLocations.data
                        .slice(0, 9)
                        .map((item: LocationType, index: number) => (
                          <LocationBlock
                            location_id={item.id}
                            image_url={item.image_url}
                            key={index}
                          />
                        ))}
                    </>
                  )}
                </div>
                <div className="mb-3 text-center mx-auto">
                  <Button className="btnRegister" href={routes.SIGNUP}>
                    Sign up
                  </Button>
                </div>
              </div>
            </>
          )}
          {showError && (
            <ToastContainer className="p-3" position="top-end">
              <Toast onClose={() => setShowError(false)} show={showError}>
                <Toast.Header>
                  <strong className="me-suto text-danger">Error</strong>
                </Toast.Header>
                <Toast.Body className="text-danger bg-light">
                  {apiError}
                </Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </>
      )}
    </Layout>
  )
}

export default Home
