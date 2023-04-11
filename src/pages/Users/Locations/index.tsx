import Layout from 'components/ui/Layout'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { Button } from 'react-bootstrap'

import { useNavigate, useParams } from 'react-router-dom'
import authStore from 'stores/auth.store'

const UserLocationsInfo: FC = () => {
  const [otherUserId, setOtherUserId] = useState(1)
  const navigate = useNavigate()
  const { id } = useParams()
  const userId:number = parseInt(id!)

  

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
    </Layout>
  )
}

export default UserLocationsInfo