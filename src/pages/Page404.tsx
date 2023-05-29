import { FC } from 'react'
import { Link } from 'react-router-dom'
import Layout from 'components/ui/Layout'
import { routes } from 'constants/routesConstants'

const Page404: FC = () => {
  return (
    <Layout>
      <div>
        <h1>
          Nothing found <b>404</b>!
        </h1>
        <Link to={routes.HOME}>Go home</Link>
      </div>
    </Layout>
  )
}

export default Page404
