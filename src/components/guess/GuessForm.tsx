import { LocationType } from 'models/location'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import { Form, Button, FormLabel, ToastContainer, Toast } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import { GuessType } from 'models/guess'

interface Props {
  locationData: LocationType | GuessType
}

const GuessForm: FC<Props> = ({ locationData }) => {
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const [currentPosition, setCurrentPosition] = useState({
    lat: 41.3851,
    lng: 2.1734,
  })

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  })

  const mapStyles = {
    height: '50vh',
    width: '100%',
  }

  const onMarkerDragEnd = (e: any) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    currentPosition.lat = lat
    currentPosition.lng = lng
    setCurrentPosition(currentPosition)
  }

  return (
    //check if location is type LocationType or not
    <>
      <h3 className="mx-auto text-center">
        Take a <span style={{ color: '#619E89' }}>guess</span>!
      </h3>
      {/* <Form onSubmit={onSubmit}>
        <Controller
          control={control}
          name="image_url"
          render={({ field }) => (
            <Form.Group>
              <input
                {...field}
                type="image"
                src={`${process.env.REACT_APP_API_URL}/uploads/locations/${locationToGuess.data.data.image_url}`}
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
            >
              <MarkerF
                position={currentPosition}
                onDragEnd={(e) => onMarkerDragEnd(e)}
                draggable={true}
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
                  <FormLabel htmlFor="errorDistance">Error distance</FormLabel>
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
                    style={{
                      border: '1px solid #0000006b',
                      borderRadius: 0,
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                    }}
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
          <div className="col-md-5">
            <Form.Group className="mb-3">
              <FormLabel htmlFor="last_name">Guessed location</FormLabel>
              <input
                name="Guessed location"
                type="text"
                aria-label="guessed_location"
                aria-describedby="guessed_location"
                style={{
                  border: '1px solid #0000006b',
                  borderRadius: 0,
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              />
            </Form.Group>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Button className="btnRegister" type="submit">
            Guess
          </Button>
        </div>
      </Form> */}
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
