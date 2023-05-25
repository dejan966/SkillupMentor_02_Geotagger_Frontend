import Layout from 'components/ui/Layout'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import { StatusCode } from 'constants/errorConstants'
import * as API from 'api/Api'
import { Button, FormLabel } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { routes } from 'constants/routesConstants'
import Avatar from 'react-avatar'
import authStore from 'stores/auth.store'
import { Link, useNavigate } from 'react-router-dom'
import SuccessPopup from 'pages/Success'

const UserInfo: FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const [userData, setUserData] = useState({
    id: 1,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  })

  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const signout = async () => {
    const response = await API.signout()
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
    } else {
      handleDeleteAcc(user.data.data.id)
      authStore.signout()
      navigate(routes.HOME)
    }
  }

  const handleDeleteAcc = async (id: number) => {
    const response = await API.deleteUser(id)
    if (response.status === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
    } else if (response.status === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
    }
  }

  const user = useQuery(['currUser'], () => API.fetchCurrUser(), {
    onSuccess: () => setLoading(false),
    refetchOnWindowFocus: false,
  })

  return (
    <Layout>
      {loading ? (
        <div className="text-center">Loading data...</div>
      ) : (
        <>
          {user.data ? (
            <div className="forms">
              <h1 className="display-5 text-center">Your info</h1>
              <Form.Group className="d-flex flex-column justify-content-center align-items-center">
                <FormLabel htmlFor="avatar" id="avatar-p">
                  <Avatar
                    round
                    src={`${process.env.REACT_APP_API_URL}/uploads/avatars/${user.data.data.avatar}`}
                    alt="Avatar"
                  />
                </FormLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FormLabel htmlFor="email">Email</FormLabel>
                <input
                  type="email"
                  value={user.data.data.email}
                  aria-label="Email"
                  aria-describedby="email"
                  className="form-control"
                  style={{border:'1px solid #0000006b', borderRadius:0, borderTop:'none', borderLeft:'none', borderRight:'none'}}
                  readOnly
                />
              </Form.Group>
              <div className="d-flex justify-content-between mb-3">
                <div className="col-md-5">
                  <Form.Group className="mb-3">
                    <FormLabel htmlFor="first_name">First name</FormLabel>
                    <input
                      type="text"
                      value={user.data.data.first_name}
                      aria-label="First name"
                      aria-describedby="first_name"
                      className="form-control"
                      style={{border:'1px solid #0000006b', borderRadius:0, borderTop:'none', borderLeft:'none', borderRight:'none'}}
                      readOnly
                    />
                  </Form.Group>
                </div>
                <div className="col-md-5">
                  <Form.Group className="mb-3">
                    <FormLabel htmlFor="last_name">Last name</FormLabel>
                    <input
                      type="text"
                      value={user.data.data.last_name}
                      aria-label="Last name"
                      aria-describedby="last_name"
                      className="form-control"
                      style={{border:'1px solid #0000006b', borderRadius:0, borderTop:'none', borderLeft:'none', borderRight:'none'}}
                      readOnly
                    />
                  </Form.Group>
                </div>
              </div>
              <div
                className="d-flex justify-content-between mb-3"
                onPointerMove={() => {
                  setUserData(user.data.data)
                }}
              >
                <Link to={routes.USEREDIT} state={{ data: userData }}>
                  <Button className="btnRegister">Edit</Button>
                </Link>
                <p
                  className="text-decoration-none col-md-3"
                  style={{ color: '#000000', cursor: 'pointer' }}
                  onClick={togglePopup}
                >
                  Delete account
                </p>
              </div>
              {isOpen && (
                <SuccessPopup
                  content={
                    <>
                      <h1 className="text display-6 mb-4">Are you sure?</h1>
                      <p className="text">
                        Are you sure you want to{' '}
                        <span style={{ color: '#DE8667' }}>delete</span> your
                        account?
                      </p>
                      <div className="d-flex justify-content-start">
                        <Button
                          className="btnRegister col-md-3"
                          style={{ borderColor: '#DE8667' }}
                          onClick={signout}
                        >
                          Delete
                        </Button>
                        <p
                          className="col-md-3 mx-3"
                          style={{ color: '#000000' }}
                          onClick={togglePopup}
                        >
                          Cancel
                        </p>
                      </div>
                    </>
                  }
                />
              )}
            </div>
          ) : (
            <div className="text-center text">No info available</div>
          )}
        </>
      )}
    </Layout>
  )
}
export default UserInfo