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
import { Link, useNavigate } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import { LocationType } from 'models/location'

interface Props {
  defaultValues: LocationType
}

const UpdateLocationForm: FC<Props> = ({ defaultValues }) => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const { handleSubmit, errors, control } = useCreateUpdateLocationForm({defaultValues})

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

  const onSubmit = handleSubmit(
    async (data: CreateLocationFields | UpdateLocationFields) => {
      handleUpdate(data as UpdateLocationFields)
    },
  )

  const handleUpdate = async (data: UpdateLocationFields) => {
    const response = await API.updateLocation(data, defaultValues.id)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      navigate('/')
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
        Edit <span style={{ color: '#619E89' }}>location</span>
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
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="name">Location</FormLabel>
              <input
                {...field}
                type="text"
                value={defaultValues.name}
                aria-label="Name"
                aria-describedby="name"
                className={
                  errors.name ? 'form-control is-invalid' : 'form-control'
                }
                readOnly
              />
              {errors.name && (
                <div className="invalid-feedback text-danger">
                  {errors.name.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <div className="d-flex justify-content-between">
          <Button className="btnRegister col-md-3" onClick={uploadFile}>
            Upload image
          </Button>
          <div className="justify-content-end">
            <Button className="btnRegister mx-3" type="submit">
              Save
            </Button>
            <Link to={routes.HOME}>Cancel</Link>
          </div>
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

export default observer(UpdateLocationForm)
