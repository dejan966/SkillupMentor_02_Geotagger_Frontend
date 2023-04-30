import { FC, useState } from 'react'
import * as API from 'api/Api'
import { GoogleMap, LoadScriptProps, MarkerF } from '@react-google-maps/api'
import { Form, Button, FormLabel, ToastContainer, Toast } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { GuessUserFields, useGuess } from 'hooks/react-hook-form/useGuess'
import { StatusCode } from 'constants/errorConstants'
import { useLoadScript } from '@react-google-maps/api'

interface Props {
  defaultValues?: any
}

const libraries:LoadScriptProps['libraries'] = ['geometry']

const GuessForm: FC<Props> = ({ defaultValues }) => {
  /*   const {data:locationData, status:locationStatus} = useQuery(
    ['locationData'],
    () => API.fetchLocation(defaultValues?.id!),
    {
      refetchOnWindowFocus: false,
    },
  ) */

  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [distanceInMeters, setDistanceInMeters] = useState(null)

  const { handleSubmit, errors, control } = useGuess({ defaultValues })

  const defaultLocation = {
    lat: +defaultValues.latitude,
    lng: +defaultValues.longitude,
  }
  
  const [currentPosition, setCurrentPosition] = useState({
    lat: +defaultValues.latitude,
    lng: +defaultValues.longitude,
  })

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries,
  })

  const mapStyles = {
    height: '50vh',
    width: '100%',
  }

  const compareDistance = (e: any) => {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      { lat: e.latLng!.lat(), lng: e.latLng!.lng() },
      defaultLocation,
    )
    console.log(distance)
    setCurrentPosition({
      lat: e.latLng!.lat(),
      lng: e.latLng!.lng(),
    })
  }

  const onSubmit = handleSubmit(async (data: GuessUserFields) => {
    const response = await API.makeGuess(data, defaultValues.id)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      navigate('/')
    }
  })

  return (
    <>
      <h2 className="text-start">
        Take a <span style={{ color: '#619E89' }}>guess</span>!
      </h2>
      <Form onSubmit={onSubmit}>
        {defaultValues.errorDistance ? (
          <>
            <Controller
              control={control}
              name="image_url"
              render={({ field }) => (
                <Form.Group className="mb-3">
                  <input
                    {...field}
                    type="image"
                    src={`${process.env.REACT_APP_API_URL}/uploads/locations/${defaultValues.location.image_url}`}
                    width="100%"
                    height="500"
                    aria-label="Image_url"
                    aria-describedby="image_url"
                    className="mx-auto d-block"
                  />
                  {errors.image_url && (
                    <div className="invalid-feedback text-danger">
                      {errors.image_url.message}
                    </div>
                  )}
                </Form.Group>
              )}
            />
            <div className="mb-3">
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={currentPosition}
                  onClick={(e) => compareDistance(e)}
                >
                  <MarkerF position={currentPosition} />
                </GoogleMap>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div className="col-md-3">
                <Controller
                  control={control}
                  name="errorDistance"
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <FormLabel htmlFor="errorDistance">
                        Error distance
                      </FormLabel>
                      <input
                        {...field}
                        /*  {!distanceInMeters ? {...field} : distanceInMeters} */
                        type="text"
                        aria-label="Error Distance"
                        aria-describedby="errorDistance"
                        className={
                          errors.errorDistance
                            ? 'form-control is-invalid'
                            : 'form-control'
                        }
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
              <div className="col-md-7">
                <Form.Group className="mb-3">
                  <FormLabel htmlFor="last_name">Guessed location</FormLabel>
                  <input
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
        ) : (
          <>
            
            <Controller
              control={control}
              name="image_url"
              render={({ field }) => (
                <Form.Group className="mb-3">
                  <input
                    {...field}
                    type="image"
                    src={`${process.env.REACT_APP_API_URL}/uploads/locations/${defaultValues.image_url}`}
                    width="100%"
                    height="500"
                    aria-label="Image_url"
                    aria-describedby="image_url"
                    className="mx-auto d-block"
                  />
                  {errors.image_url && (
                    <div className="invalid-feedback text-danger">
                      {errors.image_url.message}
                    </div>
                  )}
                </Form.Group>
              )}
            />
            <div className="mb-3">
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={currentPosition}
                  onClick={(e) =>
                    setCurrentPosition({
                      lat: e.latLng!.lat(),
                      lng: e.latLng!.lng(),
                    })
                  }
                >
                  <MarkerF
                    position={{
                      lat: currentPosition.lat,
                      lng: currentPosition.lng,
                    }}
                  />
                </GoogleMap>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div className="col-md-3">
                <Controller
                  control={control}
                  name="errorDistance"
                  render={({ field }) => (
                    <Form.Group className="mb-3">
                      <FormLabel htmlFor="errorDistance">
                        Error distance
                      </FormLabel>
                      <input
                        {...field}
                        type="text"
                        aria-label="Error Distance"
                        aria-describedby="errorDistance"
                        className={
                          errors.errorDistance
                            ? 'form-control is-invalid'
                            : 'form-control'
                        }
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
              <div className="col-md-7">
                <Form.Group className="mb-3">
                  <FormLabel htmlFor="last_name">Guessed location</FormLabel>
                  <input
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
            <Toast.Body className="text-danger bg-light">{apiError}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}

export default GuessForm
