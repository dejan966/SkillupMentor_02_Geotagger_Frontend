import Layout from 'components/ui/Layout'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { Button, Toast, ToastContainer } from 'react-bootstrap'
import authStore from 'stores/auth.store'
import { StatusCode } from 'constants/errorConstants'
import { useNavigate } from 'react-router-dom'

const MyLocationsInfo: FC = () => {
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [otherUserId, setOtherUserId] = useState(1)
  const navigate = useNavigate()
  
  const userId = (authStore.user?.id) as number

  return (
    <Layout>
      <div>
        <div className='quoteRow mb-5'>
          <div>
            <h2 className='red'>Most liked quotes</h2>

          </div>
          <div>
            <h2 className='text'>Most recent</h2>

          </div>
          <div>
            <h2 className='text'>Liked</h2>

          </div>
        </div>
        <div className='text-center'>
          <Button className="btnLogin">Load more</Button>
        </div>
      </div>
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
    </Layout>
  )
}

export default MyLocationsInfo
