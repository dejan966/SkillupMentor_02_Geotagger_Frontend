import { observer } from 'mobx-react'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusCode } from 'constants/errorConstants'
import * as API from 'api/Api'
import {
  useUpdateUserForm,
  UpdateUserFields,
} from 'hooks/react-hook-form/useUpdateUser'
import { Button, FormLabel, Form, Toast, ToastContainer } from 'react-bootstrap'
import { routes } from 'constants/routesConstants'
import { Controller } from 'react-hook-form'
import SuccessPopup from 'pages/Success'

interface Props {
  token: string
}

const UpdatePasswordForm: FC<Props> = (token) => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useUpdateUserForm({})

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const onSubmit = handleSubmit(async (data: UpdateUserFields) => {
    handleUpdate(data as UpdateUserFields)
  })

  const handleUpdate = async (data: UpdateUserFields) => {
    const response = await API.updateUserPass(data)
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      const responseToken = await API.deleteToken(token.token)
      if (responseToken.status === StatusCode.BAD_REQUEST) {
        setApiError(responseToken.message)
        setShowError(true)
      } else if (responseToken.status === StatusCode.INTERNAL_SERVER_ERROR) {
        setApiError(responseToken.message)
        setShowError(true)
      } else {
        togglePopup()
      }
    }
  }

  return (
    <div className="text-start forms">
      <h1>
        Profile <span className="green">settings</span>
      </h1>
      <div className="mb-3">Change your password</div>
      <Form className="form-group" onSubmit={onSubmit}>
        <Controller
          control={control}
          name="current_password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="oldPassword">Current password</FormLabel>
              <input
                {...field}
                type="password"
                placeholder="******"
                aria-label="old_password"
                aria-describedby="old_password"
                className={
                  errors.current_password
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
              {errors.password && (
                <div className="invalid-feedback text-danger">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="newPassword">New password</FormLabel>
              <input
                {...field}
                type="password"
                placeholder="******"
                aria-label="newPassword"
                aria-describedby="newPassword"
                className={
                  errors.password ? 'form-control is-invalid' : 'form-control'
                }
                style={{
                  border: '1px solid #0000006b',
                  borderRadius: 0,
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              />
              {errors.password && (
                <div className="invalid-feedback text-danger">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="confirm_password"
          render={({ field }) => (
            <Form.Group className="mb-3">
              <FormLabel htmlFor="confirm_password">
                Confirm new password
              </FormLabel>
              <input
                {...field}
                type="password"
                aria-label="Confirm new password"
                aria-describedby="confirm_new_password"
                className={
                  errors.confirm_password
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
              {errors.confirm_password && (
                <div className="invalid-feedback text-danger">
                  {errors.confirm_password.message}
                </div>
              )}
            </Form.Group>
          )}
        />
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
      {isOpen && (
        <SuccessPopup
          content={
            <>
              <p>
                Your password was successfully{' '}
                <span className="green">changed</span>.
              </p>
              <Button
                className="btnRegister"
                href={routes.HOME}
                style={{ borderColor: '#DE8667' }}
              >
                Close
              </Button>
            </>
          }
        />
      )}
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
    </div>
  )
}

export default observer(UpdatePasswordForm)
