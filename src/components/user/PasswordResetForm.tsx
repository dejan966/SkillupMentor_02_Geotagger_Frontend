import {
  UpdateUserFields,
  useUpdateUserForm,
} from 'hooks/react-hook-form/useUpdateUser'
import { useNavigate } from 'react-router-dom'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import { useState } from 'react'
import { Form, ToastContainer, Toast, FormLabel, Button } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import SuccessPopup from 'pages/Success'
import { routes } from 'constants/routesConstants'

const PasswordResetForm = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useUpdateUserForm({})

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const onSubmit = handleSubmit(async (data: UpdateUserFields) => {
    handleChange(data as UpdateUserFields)
  })

  const handleChange = async (data: UpdateUserFields) => {
    const response = await API.passwordResetEmail(data)
    if (response.status === StatusCode.BAD_REQUEST) {
      console.log(data)
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      togglePopup()
    }
  }

  return (
    <div className="forms verticalCenter">
      <div className="text-start">
        <h1>
          Reset your <span className="green">password</span>
        </h1>
        <div className="mb-3">
          Enter your email address and we will send you a password reset link.
        </div>
      </div>
      <Form onSubmit={onSubmit}>
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
        <Button className="btnRegister w-100" type="submit">
          Send password reset email
        </Button>
        {isOpen && (
          <SuccessPopup
            content={
              <>
                <p>
                  The password reset link was successfully sent to your{' '}
                  <span className="green">email</span>.
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
    </div>
  )
}

export default PasswordResetForm
