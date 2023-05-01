import { StatusCode } from 'constants/errorConstants'
import {
  CreateLocationFields,
  UpdateLocationFields,
  useCreateUpdateLocationForm,
} from 'hooks/react-hook-form/useCreateUpdateLocation'
import { observer } from 'mobx-react'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { FormLabel, Button, Toast, ToastContainer } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import * as API from 'api/Api'
import { useNavigate } from 'react-router-dom'
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'

const CreateLocationForm: FC = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const { handleSubmit, errors, control } = useCreateUpdateLocationForm({})

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

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

  const onSubmit = handleSubmit(
    async (data: CreateLocationFields | UpdateLocationFields) => {
      handleAdd(data as CreateLocationFields)
    },
  )

  const handleAdd = async (data: CreateLocationFields) => {
    if (!file) return
    const response = await API.createLocation(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      const formData = new FormData()
      formData.append('image_url', file, file.name)
      const fileResponse = await API.uploadLocationImg(formData, response.data.id)
      if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else if (
        fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else {
        navigate('/')
      }
    }
  }

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myfile = target.files[0]
      setFile(myfile)
    }
  }

  const uploadFile = () => {
    document.getElementById('locationUpload')?.click()
  }

  const clearImg = () => {
    setPreview('/default_location.svg')
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setFileError(false)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview('/default_location.svg')
    }
  }, [file])

  return (
    <>
      <h3 className="mx-auto text-center">
        Add a new <span style={{ color: '#619E89' }}>location</span>
      </h3>
      <Form onSubmit={onSubmit}>
        <Controller
          control={control}
          name="image_url"
          render={({ field }) => (
            <Form.Group>
              <input
                {...field}
                type="image"
                src={
                  preview === 'default_location.svg'
                    ? (preview as string)
                    : preview!
                }
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
        <div className="d-flex justify-content-end mb-4">
          <Button className="btnRegister col-md-3 mx-3" onClick={uploadFile}>Upload image</Button>
          <input
            onChange={handleFileChange}
            id="locationUpload"
            name="avatar"
            type="file"
            aria-label="Avatar"
            aria-describedby="avatar"
            className="d-none"
            accept="image/png, 'image/jpg', image/jpeg"
          />
          <Button className="btnRed" onClick={clearImg}>x</Button>
        </div>
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
                position={currentPosition}
              />
            </GoogleMap>
          )}
        </div>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="name">Location</FormLabel>
              <input
                {...field}
                type="text"
                aria-label="Name"
                aria-describedby="name"
                className={
                  errors.name ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.name && (
                <div className="invalid-feedback text-danger">
                  {errors.name.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <div className="d-flex justify-content-end">
          <Button className="btnRegister" type="submit">
            Add new
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

export default observer(CreateLocationForm)
