import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { Button } from 'react-bootstrap'
import authStore from 'stores/auth.store'
import LocationBlock from 'components/location/LocationBlock'
import { LocationType } from 'models/location'
import { routes } from 'constants/routesConstants'
import LocationList from 'components/location/LocationList'

const MyLocationsInfo: FC = () => {
  const { data: personalBest, status: personalBestStatus } = useQuery(
    ['personalBestProfile', 1],
    () => API.fetchPersonalBest(1),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  const { data: currUserLocations, status: currUserLocationsStatus } = useQuery(
    ['currUserLocations'],
    () => API.currUserLocations(authStore.user?.id!),
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
              {personalBest && (
                <LocationList
                  title="My best guesses"
                  desc="Your personal best guesses appear here. Go on and try to beat
              your personal records or set a new one!"
                  status={personalBestStatus}
                  guessData={personalBest}
                />
              )}
            </div>
            <div className="text-center">
              <Button href={routes.ALLGUESSES} className="btnLoadMore">
                Load more
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-3 green">My uploads</h3>
          <div className="text-start d-flex mb-3">
            {currUserLocationsStatus === 'error' && <p>Error fetching data</p>}
            {currUserLocationsStatus === 'loading' && <p>Loading data...</p>}
            {currUserLocationsStatus === 'success' && (
              <>
                <div className="locationRow">
                  {currUserLocations.data
                    .slice(0, 4)
                    .map((item: LocationType, index: number) => (
                      <LocationBlock location={item} key={index} />
                    ))}
                </div>
              </>
            )}
          </div>
          <div className="text-center">
            <Button href={routes.ALLLOCATIONS} className="btnLoadMore">Load more</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyLocationsInfo
