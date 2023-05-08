import Layout from 'components/ui/Layout'
import { FC } from 'react'
import GuessForm from 'components/guess/GuessForm'
import { useLocation } from 'react-router-dom'

const GuessLocation: FC = () => {
  return (
    <Layout>
      <GuessForm />
    </Layout>
  )
}

export default GuessLocation
