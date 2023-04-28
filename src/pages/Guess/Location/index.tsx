import Layout from 'components/ui/Layout'
import { FC } from 'react'
import GuessForm from 'components/guess/GuessForm'
import { useLocation } from 'react-router-dom'

const GuessLocation: FC = () => {
  const location = useLocation()
  return (
    <Layout>
      <GuessForm defaultValues={location.state.data}/>
    </Layout>
  )
}

export default GuessLocation
