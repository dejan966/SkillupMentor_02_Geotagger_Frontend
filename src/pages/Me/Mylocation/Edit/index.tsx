import UpdateLocationForm from 'components/location/UpdateLocationForm'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const LocationsEdit: FC = () => {
  const location = useLocation()
  return (
    <Layout>
      <UpdateLocationForm defaultValues={location.state.data}/>
    </Layout>
  )
}

export default LocationsEdit
