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
import * as API from 'api/Api'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import { LocationType } from 'models/location'
import SuccessPopup from 'pages/Success'
import Geocode from 'react-geocode'

interface Props {
  defaultValues: LocationType
}

const UpdateLocationForm: FC<Props> = ({ defaultValues }) => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [address, setAddress] = useState({location:'iu'})
  const [currentPosition, setCurrentPosition] = useState({
    lat: +defaultValues.latitude,
    lng: +defaultValues.longitude,
  })

  const { handleSubmit, errors, control } = useCreateUpdateLocationForm({
    defaultValues,
  })

  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

  const onSubmit = handleSubmit(async (data: UpdateLocationFields) => {
    handleUpdate(data as UpdateLocationFields)
  })

  const handleUpdate = async (data: UpdateLocationFields) => {
    const formData = new FormData()
    formData.append('image_url', file!, file!.name)
    const fileResponse = await API.uploadLocationImg(formData, defaultValues.id)
    if (fileResponse.status === StatusCode.BAD_REQUEST) {
      setApiError(fileResponse.data.message)
      setShowError(true)
      console.log(fileResponse.data.message)
    } else if (fileResponse.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(fileResponse.data.message)
      setShowError(true)
    } else {
      console.log(fileResponse.data.messag)
    }
  }

  Geocode.fromLatLng(
    currentPosition.lat.toString(),
    currentPosition.lng.toString(),
  ).then(
    (response) => {
      const addressFromCoordinats = response.results[0].formatted_address
      console.log(addressFromCoordinats)
      setAddress({location:addressFromCoordinats})
    },
    (error) => {
      console.error(error)
    },
  )

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myfile = target.files[0]
      setFile(myfile)
    }
  }

  const uploadFile = () => {
    document.getElementById('locationUpload')?.click()
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setFileError(false)
      }
      reader.readAsDataURL(file)
    }
  }, [file])

  return (
    <>
      <h3 className="mx-auto text-center">
        Edit <span style={{ color: '#619E89' }}>location</span>
      </h3>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <input
            name="image_url"
            type="image"
            src={
              preview
                ? (preview as string)
                : `${process.env.REACT_APP_API_URL}/uploads/locations/${defaultValues.image_url}`
            }
            width="100%"
            height="500"
            aria-label="Image_url"
            aria-describedby="image_url"
            className="mx-auto d-block"
          />
        </Form.Group>
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
        <div className="d-flex justify-content-between">
          <Button className="btnRegister col-md-3" onClick={uploadFile}>
            Upload image
          </Button>
          <input
            onChange={handleFileChange}
            id="locationUpload"
            name="image_url"
            type="file"
            aria-label="LocationImage"
            aria-describedby="location_image"
            className="d-none"
            accept="image/png, 'image/jpg', image/jpeg"
          />
          <div className="justify-content-end">
            <Button
              className="btnRegister mx-3"
              onClick={() => {
                togglePopup()
              }}
            >
              Save
            </Button>
            <a
              className="text-decoration-none col-md-3"
              style={{ color: '#000000' }}
              href={routes.HOME}
            >
              Cancel
            </a>
          </div>
        </div>
        {isOpen && (
          <SuccessPopup
            content={
              <>
                <p className="text fs-5">
                  Your <span className="green">location</span> was edited.
                </p>
                <div className="text-center">
                  <Button
                    href="/"
                    className="btnRegister col-md-3"
                    onClick={() => {
                      togglePopup()
                    }}
                    type="submit"
                  >
                    Close
                  </Button>
                </div>
              </>
            }
          />
        )}
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

export default observer(UpdateLocationForm)
