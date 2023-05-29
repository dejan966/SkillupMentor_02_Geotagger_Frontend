import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { Button } from 'react-bootstrap'
import { routes } from 'constants/routesConstants'
import authStore from 'stores/auth.store'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { useNavigate } from 'react-router-dom'
import LocationList from 'components/location/LocationList'

const Home: FC = () => {
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
          <div className="mt-3 text-start">
            <div>
              {personalBest && (
                <LocationList
                  title="Personal best guesses"
                  desc="Your personal best guesses appear here. Go on and try to beat
              your personal records or set a new one!"
                  status={personalBestStatus}
                  guessData={personalBest}
                />
              )}
            </div>
            <div className="mb-3 text-center mx-auto">
              <Button href={routes.ALLGUESSES} className="btnLoadMore">
                Load more
              </Button>
            </div>
          </div>
          <div className="text-start">
            <div>
              <LocationList
                title="New locations"
                desc="New uploads from users. Try to guess all the locations by
              pressing on a picture."
                status={locationStatus}
                locationData={allLocations}
              />
            </div>
            <div className="mb-3 text-center mx-auto">
              <Button href={routes.ALLLOCATIONS} className="btnLoadMore">
                Load more
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="py-4 grid text-center">
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
            <div>
              <LocationList
                title="Try yourself at Geotagger!"
                desc="Try to guess the location of the images by selecting a position
              on the map. When you make a guess, it gives you the error
              distance."
                status={locationStatus}
                locationData={allLocations}
              />
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
