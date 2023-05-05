import {
  UpdateUserFields,
  useUpdateUserForm,
} from 'hooks/react-hook-form/useUpdateUser'
import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import { observer } from 'mobx-react'
import { UserType } from 'models/auth'
import { routes } from 'constants/routesConstants'

interface Props {
  defaultValues?: UserType & { isActiveUser?: boolean }
}

const UpdateUserForm: FC<Props> = ({ defaultValues }) => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useUpdateUserForm({
    defaultValues,
  })

  const [userAvatar, setUserAvatar] = useState({
    id: 1,
    avatar: 'default-avatar.png',
  })
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmit = handleSubmit(async (data: UpdateUserFields) => {
    handleUpdate(data as UpdateUserFields)
  })

  const handleUpdate = async (data: UpdateUserFields) => {
    const response = await API.updateUser(data, defaultValues?.id as number)
    console.log(defaultValues?.id)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      navigate('/me')
    }
  }

  return (
    <>
      <Form className="form-group forms" onSubmit={onSubmit}>
        <div className="text-start text">
          <h1>
            Profile <span className="green">settings</span>
          </h1>
          <div className="mb-3">Change your profile settings</div>
        </div>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="email">Email</FormLabel>
              <input
                {...field}
                type="email"
                aria-label="Email"
                aria-describedby="email"
                className={
                  errors.email ? 'form-control is-invalid' : 'form-control'
                }
                style={{
                  border: '1px solid #0000006b',
                  borderRadius: 0,
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              />
              {errors.email && (
                <div className="invalid-feedback text-danger">
                  {errors.email.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <div className="d-flex justify-content-between">
          <div className="col-md-5">
            <Controller
              control={control}
              name="first_name"
              render={({ field }) => (
                <Form.Group className="mb-3">
                  <FormLabel htmlFor="first_name">First name</FormLabel>
                  <input
                    {...field}
                    type="text"
                    aria-label="First name"
                    aria-describedby="first_name"
                    className={
                      errors.first_name
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
                  {errors.first_name && (
                    <div className="invalid-feedback text-danger">
                      {errors.first_name.message}
                    </div>
                  )}
                </Form.Group>
              )}
            />
          </div>
          <div className="col-md-5">
            <Controller
              control={control}
              name="last_name"
              render={({ field }) => (
                <Form.Group className="mb-3">
                  <FormLabel htmlFor="last_name">Last name</FormLabel>
                  <input
                    {...field}
                    type="text"
                    aria-label="Last name"
                    aria-describedby="last_name"
                    className={
                      errors.last_name
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
                  {errors.last_name && (
                    <div className="invalid-feedback text-danger">
                      {errors.last_name.message}
                    </div>
                  )}
                </Form.Group>
              )}
            />
          </div>
        </div>
        <Button className="w-100 btnBlue mb-3" href={routes.USERPASSWORDEDIT}>
          Change password
        </Button>
        <Link to={routes.USERAVATAREDIT} state={{ data: userAvatar }}>
          <Button
            className="w-100 mb-3"
            style={{ color: '#fff' }}
            onPointerMove={() => {
              setUserAvatar(defaultValues!)
            }}
          >
            Change profile picture
          </Button>
        </Link>
        <div className="d-flex align-items-center justify-content-between">
          <Button className="btnRegister col-md-3" type="submit">
            Submit
          </Button>
          <a
            className="text-decoration-none col-md-3"
            style={{ color: '#000000' }}
            href={routes.USERINFO}
          >
            Cancel
          </a>
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

export default observer(UpdateUserForm)
