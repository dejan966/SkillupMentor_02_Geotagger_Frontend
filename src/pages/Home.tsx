import Layout from 'components/ui/Layout'
import { FC, useEffect, useState } from 'react'
import { Button, Toast, ToastContainer } from 'react-bootstrap'
import { routes } from 'constants/routesConstants'
import authStore from 'stores/auth.store'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { useNavigate } from 'react-router-dom'
import useMediaQuery from 'hooks/useMediaQuery'
import { LocationType } from 'models/location'
import { GuessType } from 'models/guess'
import LocationBlock from '../components/location/LocationBlock'

const Home: FC = () => {
  const { isMobile } = useMediaQuery(1038)
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const navigate = useNavigate()

  const { data: allLocations, status: locationStatus } = useQuery(
    ['allLocations', 1],
    () => API.fetchLocations(1),
    {
      refetchOnWindowFocus: false,
    },
  )

  const { data: personalBest, status: personalBestStatus } = useQuery(
    ['personalBest', 1],
    () => API.fetchPersonalBest(1),
    {
      refetchOnWindowFocus: false,
    },
  )

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
                {personalBest &&
                personalBest.data.data.length > 0 &&
                personalBestStatus === 'success' ? (
                  <div className="locationRow">
                    {personalBest.data.data
                      .slice(0, 3)
                      .map((item: GuessType, index: number) => (
                        <LocationBlock locationGuess={item} key={index} />
                      ))}
                  </div>
                ) : (
                  <div>You havent made any guesses yet.</div>
                )}
              </div>
            </div>
            <div className="mb-3 text-center mx-auto">
              <Button href={routes.ALLGUESSES} className="btnLoadMore">
                Load more
              </Button>
            </div>
          </div>
          <div>
            <div className="text-start">
              <h3 className="green">New locations</h3>
              <p>
                New uploads from users. Try to guess all the locations by
                pressing on a picture.
              </p>
              <div className='text-start d-flex'>
                {locationStatus === 'error' && <p>Error fetching data</p>}
                {locationStatus === 'loading' && <p>Loading data...</p>}
                {allLocations &&
                allLocations.data.data.length > 0 &&
                locationStatus === 'success' ? (
                  <div className="locationRow">
                    {allLocations.data.data.map(
                      (item: LocationType, index: number) => (
                        <LocationBlock location={item} key={index} />
                      ),
                    )}
                  </div>
                ) : (
                  <div>No locations available.</div>
                )}
              </div>
            </div>
            <div className="text-center">
              <Button href={routes.ALLLOCATIONS} className="btnLoadMore">
                Load more
              </Button>
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
                Geotagger is website that allows you to post pictures and tag it
                on the map. Other users than try to locate it via Google Maps.
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
          <div>
            <div className="text-center mx-auto" style={{ width: 420 }}>
              <h2 className="green">Try yourself at Geotagger!</h2>
              <p>
                Try to guess the location of the images by selecting a position
                on the map. When you make a guess, it gives you the error
                distance.{' '}
              </p>
            </div>
            <div>
              {locationStatus === 'error' && <p>Error fetching data</p>}
              {locationStatus === 'loading' && <p>Loading data...</p>}
              {allLocations &&
              allLocations.data.data.length > 0 &&
              locationStatus === 'success' ? (
                <div className="locationRow">
                  {allLocations.data.data.map(
                    (item: LocationType, index: number) => (
                      <LocationBlock location={item} key={index} />
                    ),
                  )}
                </div>
              ) : (
                <div>No locations available.</div>
              )}
            </div>
            <div className="text-center mx-auto">
              <Button className="btnRegister" href={routes.SIGNUP}>
                Sign up
              </Button>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export default Home
