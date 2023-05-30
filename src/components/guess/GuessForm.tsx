import { FC, useEffect, useState } from 'react'
import * as API from 'api/Api'
import { Form, Button, FormLabel, ToastContainer, Toast } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { GuessUserFields, useGuess } from 'hooks/react-hook-form/useGuess'
import { StatusCode } from 'constants/errorConstants'
import { GuessType } from 'models/guess'
import { useQuery } from 'react-query'
import Geocode from 'react-geocode'
import authStore from 'stores/auth.store'
import MapG from 'components/location/Map'

const GuessForm: FC = () => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY!)

  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [distanceInMeters, setDistanceInMeters] = useState({ distance: 0 })
  const [address, setAddress] = useState({ location: '' })

  const { id } = useParams()
  const locationId: number = parseInt(id!)

  const { handleSubmit, setValue, errors, control } = useGuess()

  const [defaultLocation, setDefaultLocation] = useState({
    lat: +46.5,
    lng: +24.1,
  })

  const [currentPosition, setCurrentPosition] = useState({
    lat: +0.0,
    lng: +0.0,
  })

  const { data: locationData } = useQuery(
    ['locationData'],
    () => API.fetchLocation(locationId),
    {
      onSuccess(data) {
        setDefaultLocation({
          lat: +data.data.latitude,
          lng: +data.data.longitude,
        })
        setCurrentPosition({
          lat: +data.data.latitude,
          lng: +data.data.longitude,
        })
      },
      refetchOnWindowFocus: false,
    },
  )

  const { data: personalBestAll, status: personalBestAllStatus } = useQuery(
    ['personalBestAll'],
    () => API.getPeoplesPersonalBestForLocation(locationId),
    {
      refetchOnWindowFocus: false,
    },
  )

  const compareDistance = (e: any) => {
    setDistanceInMeters({
      distance: Math.ceil(
        google.maps.geometry.spherical.computeDistanceBetween(
          { lat: e.latLng!.lat(), lng: e.latLng!.lng() },
          defaultLocation,
        ),
      ),
    })

    setCurrentPosition({
      lat: e.latLng!.lat(),
      lng: e.latLng!.lng(),
    })

    setValue('latitude', currentPosition.lat)
    setValue('longitude', currentPosition.lng)
    setValue('errorDistance', distanceInMeters.distance)
  }

  useEffect(() => {
    Geocode.fromLatLng(
      currentPosition.lat.toString(),
      currentPosition.lng.toString(),
    ).then(
      (response) => {
        const addressFromCoordinats = response.results[0].formatted_address
        setAddress({ location: addressFromCoordinats })
      },
      (error) => {
        console.error(error)
      },
    )
  }, [currentPosition])

  const onSubmit = handleSubmit(async (data: GuessUserFields) => {
    const response = await API.makeGuess(data, locationId)
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      navigate('/')
    }
  })

  return (
    <div className="grid">
      <div className="me-3">
        <h2 className="text-start">
          Take a <span className="green">guess</span>!
        </h2>
        <Form onSubmit={onSubmit}>
          {locationData && (
            <>
              <Form.Group className="mb-3">
                <input
                  name="image_url"
                  type="image"
                  src={`${process.env.REACT_APP_API_URL}/uploads/locations/${locationData.data.image_url}`}
                  width="100%"
                  height="500"
                  aria-label="Image_url"
                  aria-describedby="image_url"
                  className="mx-auto d-block"
                />
              </Form.Group>
              <div className="mb-3">
                <MapG currentPosition={currentPosition} compareDistance={compareDistance} />
              </div>
              <div className="grid">
                <div className="col-md-5">
                  <Controller
                    control={control}
                    name="errorDistance"
                    render={() => (
                      <Form.Group className="mb-3">
                        <FormLabel htmlFor="errorDistance">
                          Error distance
                        </FormLabel>
                        <input
                          value={distanceInMeters && distanceInMeters.distance}
                          type="text"
                          aria-label="Error Distance"
                          aria-describedby="errorDistance"
                          className={
                            errors.errorDistance
                              ? 'form-control is-invalid'
                              : 'form-control'
                          }
                          readOnly
                        />
                        {errors.errorDistance && (
                          <div className="invalid-feedback text-danger">
                            {errors.errorDistance.message}
                          </div>
                        )}
                      </Form.Group>
                    )}
                  />
                </div>
                <div>
                  <Form.Group className="mb-3">
                    <FormLabel htmlFor="last_name">Guessed location</FormLabel>
                    <input
                      value={address && address.location}
                      name="Guessed location"
                      type="text"
                      aria-label="guessed_location"
                      aria-describedby="guessed_location"
                      className="form-control"
                    />
                  </Form.Group>
                </div>
              </div>
            </>
          )}
          <div className="d-flex justify-content-end">
            <Button className="btnRegister" type="submit">
              Guess
            </Button>
          </div>
        </Form>
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
      </div>
      <div>
        <h2>Leaderboard</h2>
        <div>
          {personalBestAllStatus === 'error' && <p>Error fetching data</p>}
          {personalBestAllStatus === 'loading' && <p>Loading data...</p>}
          {personalBestAll &&
            personalBestAll.data.length > 0 &&
            personalBestAllStatus === 'success' && (
              <>
                {personalBestAll?.data.map((item: GuessType, index: number) => (
                  <>
                    {item.user ? (
                      <>
                        {item.user.first_name === authStore.user?.first_name &&
                        item.user.last_name === authStore.user?.last_name ? (
                          <div
                            className="leaderboardRow me"
                            key={index}
                            style={{ width: 400 }}
                          >
                            {index + 1 === 1 ? (
                              <div className="ms-2 leaderboardPlace gold">
                                {index + 1}
                              </div>
                            ) : (
                              <>
                                {index + 1 === 2 ? (
                                  <div className="ms-2 leaderboardPlace silver">
                                    {index + 1}
                                  </div>
                                ) : (
                                  <>
                                    {index + 1 === 3 ? (
                                      <div className="ms-2 leaderboardPlace bronze">
                                        {index + 1}
                                      </div>
                                    ) : (
                                      <div className="ms-2 leaderboardPlace none">
                                        {index + 1}
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                            <img
                              src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${item.user.avatar}`}
                              alt="user avatar"
                              className="userAvatar"
                            />
                            <div>
                              <div>You</div>
                              {new Date().getDate() ===
                              new Date(item.created_at).getDate() ? (
                                <div>
                                  {new Date(
                                    item.created_at,
                                  ).toLocaleTimeString()}
                                </div>
                              ) : (
                                <div>
                                  {new Date(
                                    item.created_at,
                                  ).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                            <div>{item.errorDistance} m</div>
                          </div>
                        ) : (
                          <div
                            className="leaderboardRow"
                            key={index}
                            style={{ width: 400 }}
                          >
                            {index + 1 === 1 ? (
                              <div className="ms-2 leaderboardPlace gold">
                                {index + 1}
                              </div>
                            ) : (
                              <>
                                {index + 1 === 2 ? (
                                  <div className="ms-2 leaderboardPlace silver">
                                    {index + 1}
                                  </div>
                                ) : (
                                  <>
                                    {index + 1 === 3 ? (
                                      <div className="ms-2 leaderboardPlace bronze">
                                        {index + 1}
                                      </div>
                                    ) : (
                                      <div className="ms-2 leaderboardPlace none">
                                        {index + 1}
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                            <img
                              src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${item.user.avatar}`}
                              alt="user avatar"
                              className="userAvatar"
                            />
                            <div style={{color:'black'}}>
                              <div>
                                {item.user.first_name} {item.user.last_name}
                              </div>
                              <div>
                                {new Date(item.created_at).toLocaleDateString()}
                              </div>
                            </div>
                            <div>{item.errorDistance} m</div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div
                        className="leaderboardRow"
                        key={index}
                        style={{ width: 400 }}
                      >
                        {index + 1 === 1 ? (
                          <div className="ms-2 leaderboardPlace gold">
                            {index + 1}
                          </div>
                        ) : (
                          <>
                            {index + 1 === 2 ? (
                              <div className="ms-2 leaderboardPlace silver">
                                {index + 1}
                              </div>
                            ) : (
                              <>
                                {index + 1 === 3 ? (
                                  <div className="ms-2 leaderboardPlace bronze">
                                    {index + 1}
                                  </div>
                                ) : (
                                  <div className="ms-2 leaderboardPlace none">
                                    {index + 1}
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                        <img
                          src={`${process.env.REACT_APP_API_URL}/uploads/avatars/default_profile.svg`}
                          alt="user avatar"
                          className="userAvatar"
                        />
                        <div style={{ color: 'black' }}>
                          <div>Unknown</div>
                          <div>
                            {new Date(item.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div>{item.errorDistance} m</div>
                      </div>
                    )}
                  </>
                ))}
              </>
            )}
        </div>
      </div>
    </div>
  )
}

export default GuessForm
