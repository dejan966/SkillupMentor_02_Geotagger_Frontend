import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { Button } from 'react-bootstrap'
import authStore from 'stores/auth.store'
import { routes } from 'constants/routesConstants'
import LocationList from 'components/location/LocationList'

const MyLocationsInfo: FC = () => {
  const { data: currUserPersonalBest, status: currUserPersonalBestStatus } = useQuery(
    ['currUserPersonalBestProfile', 1],
    () => API.fetchPersonalBest(1),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  const { data: currUserLocations, status: currUserLocationsStatus } = useQuery(
    ['currUserLocations', 1],
    () => API.currUserLocations(1),
    {
      refetchOnWindowFocus: false,
    },
  )

  return (
    <Layout>
      <div>
        <div className="mb-4 mt-4">
          <div className="d-flex justify-content-start">
            <img
              src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${authStore.user?.avatar}`}
              alt="avatar"
              className="userAvatar"
            />
            <h2>
              {authStore.user?.first_name + ' ' + authStore.user?.last_name}
            </h2>
          </div>
        </div>
        <div className="mb-3">
          <div>
            <div className="mb-3">
              {currUserPersonalBest && (
                <LocationList
                  title="Personal best guesses"
                  desc="Your personal best guesses appear here. Go on and try to beat
              your personal records or set a new one!"
                  status={currUserPersonalBestStatus}
                  guessData={currUserPersonalBest}
                />
              )}
            </div>
            <div className="text-center">
              <Button href={routes.ALLUSERGUESSES} className="btnLoadMore">
                Load more
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-3">
            {currUserLocations && (
              <LocationList
              title="My uploads"
              desc="All your uploads appear here"
              status={currUserLocationsStatus}
              locationData={currUserLocations}
            />
            )}
          </div>
          <div className="text-center">
            <Button href={routes.ALLUSERLOCATIONS} className="btnLoadMore">Load more</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyLocationsInfo
