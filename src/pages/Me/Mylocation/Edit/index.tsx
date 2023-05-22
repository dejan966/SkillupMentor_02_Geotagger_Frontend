import UpdateLocationForm from 'components/location/UpdateLocationForm'
import Layout from 'components/ui/Layout'
import Unauthorized401 from 'pages/Unauthorized401'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const LocationsEdit: FC = () => {
  const location = useLocation()
  return (
    <>
      {location.state ? (
        <UpdateLocationForm defaultValues={location.state.data} />
      ) : (
        <Unauthorized401 />
      )}
    </>
  )
}

export default LocationsEdit
