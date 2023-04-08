import Layout from 'components/ui/Layout'
import { FC, useState } from 'react'
import { Button, Toast, ToastContainer } from 'react-bootstrap'
import { routes } from 'constants/routesConstants'
import authStore from 'stores/auth.store'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { Link, useNavigate } from 'react-router-dom'
import { StatusCode } from 'constants/errorConstants'

const Home: FC = () => {
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  
  const [userId, setUserId] = useState(1)
  const [quoteData, setQuoteData] = useState({ id: 1, quote:''}) 
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [successDelete, setSuccessDelete] = useState(false)
 
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  
  const toggleSuccess = () => {
    setSuccessDelete(!successDelete)
  }

  return (
    <Layout>
      {authStore.user ? (
        <>
          <div className='mb-5'>
            <div className='text-center'>
              <h2 className='red'>Personal best guesses</h2>
              <p className='quoteText'>Your personal best guesses appear here. Go on and try to beat your personal records or set a new one!</p>
            </div>
            <div className='mb-5 text-center mx-auto'>
              <Button href={'/'} className='btnLogin'>Load more</Button>
            </div>
          </div>
          <div className='mb-5'>
            <div className='text-center mx-auto' style={{width:420}}>
              <h2 className='red'>New locations</h2>
              <p className='quoteText'>Most upvoted quotes on the platform. Give a like to the ones you like to keep them saved in your profile.</p>
            </div>
            
            <div className='text-center'>
              <Button href={'/'} className='btnLogin'>Load more</Button>
            </div>
          </div>
          
        </>
      ):(
        <>
          <div className="py-4 grid mb-5 text-center">
            <div className="text-start">
              <div className="text">
                <h1 className="display-1">Welcome to <span style={{color:'#DE8667'}}>Quotastic</span></h1>
                <p className="col-md-8 fs-4">
                  Quotastic is a free online tool for you to explore the quips, quotes and proverbs.
                  Sign up and express yourself. 
                </p>
                <p className="fs-4">
                  <Button className="btnRegister" href={routes.SIGNUP}>
                    Sign up
                  </Button>
                </p>
              </div>
            </div>
            <div><img src="example_quote.png" width={456} alt="example quote" /></div>
          </div>
          <div className='text-center mx-auto mb-5' style={{width:400}}>
            <h1 className='display-6'>Explore the world of <span style={{color:'#DE8667'}}>fantastic quotes</span></h1>
          </div>
          <div className='mb-5'>
            <div className='text-center mx-auto' style={{width:420}}>
              <h2 className='red'>Most upvoted quotes</h2>
              <p className='quoteText'>Most upvoted quotes on the platform. Sign up or login to like the quotes and keep them saved in your profile.</p>
            </div>
            
            <div className='mb-5 text-center mx-auto text'>
              <a href={routes.LOGIN}>
                <Button className='btnSeeMore'>Sign up to see more</Button>
              </a>
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
        </>
      )}
    </Layout>
  )
}

export default Home
