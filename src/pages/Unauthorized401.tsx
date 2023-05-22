import Layout from 'components/ui/Layout'
import { routes } from 'constants/routesConstants'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const Unauthorized401: FC = () => {
  return (
    <Layout>
      <div>
        <h1>
            401 - Unauthorized: Access is denied due to invalid <b>credentials</b>.
        </h1>
        <div>You do not have permission to view this page.</div>
        <Link to={routes.HOME}>Go home</Link>
      </div>
    </Layout>
  )
}

export default Unauthorized401
