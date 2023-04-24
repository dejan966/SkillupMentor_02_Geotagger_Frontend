import { StatusCode } from 'constants/errorConstants'
import {
  CreateLocationFields,
  UpdateLocationFields,
  useCreateUpdateLocationForm,
} from 'hooks/react-hook-form/useCreateUpdateLocation'
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'
import { FormLabel, Button, Toast, ToastContainer } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import * as API from 'api/Api'
import { useNavigate } from 'react-router-dom'

const CreateLocationForm: FC = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const { handleSubmit, errors, control } = useCreateUpdateLocationForm({})

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

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
      const fileResponse = await API.uploadAvatar(formData, response.data.id)
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
      <h3 className='mx-auto text-center'>
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
                src={preview as string}
                width="500"
                height="500"
                aria-label="Image_url"
                aria-describedby="image_url"
                className='mx-auto d-block'
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
        {/*Google map component*/}
        <div className="d-flex justify-content-end">
          <Button className="btnRegister col-md-3" type="submit">
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
