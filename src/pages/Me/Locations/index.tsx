import Layout from 'components/ui/Layout'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { Button, Toast, ToastContainer } from 'react-bootstrap'
import authStore from 'stores/auth.store'
import { StatusCode } from 'constants/errorConstants'
import { useNavigate } from 'react-router-dom'
import { GuessType } from 'models/guess'
import LocationBlock from 'pages/LocationBlock'
import { LocationType } from 'models/location'

const MyLocationsInfo: FC = () => {
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  const userId = authStore.user?.id as number

  const { data: personalBest, status: personalBestStatus } = useQuery(
    ['personalBestProfile'],
    () => API.fetchPersonalBest(),
    {
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
            <div className="mb-3">My best guesses</div>
            <div className="mb-3">
              {personalBestStatus === 'error' && <p>Error fetching data</p>}
              {personalBestStatus === 'loading' && <p>Loading data...</p>}
              {personalBestStatus === 'success' && (
                <>
                  <div className="locationRow">
                    {personalBest.data
                      .slice(0, 3)
                      .map((item: GuessType, index: number) => (
                        <LocationBlock locationGuess={item} key={index} />
                      ))}
                  </div>
                </>
              )}
            </div>
            <div className="text-center">
              <Button className="btnLoadMore">Load more</Button>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-3">My uploads</div>
          <div className="mb-3">
            {currUserLocationsStatus === 'error' && <p>Error fetching data</p>}
            {currUserLocationsStatus === 'loading' && <p>Loading data...</p>}
            {currUserLocationsStatus === 'success' && (
              <>
                <div className="locationRow">
                  {currUserLocations.data
                    .slice(0, 3)
                    .map((item: LocationType, index: number) => (
                      <LocationBlock location={item} key={index} />
                    ))}
                </div>
              </>
            )}
          </div>
          <div className="text-center">
            <Button className="btnLoadMore">Load more</Button>
          </div>
        </div>
      </div>
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-suto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Layout>
  )
}

export default MyLocationsInfo
