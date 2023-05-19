import { FC, useState } from 'react'
import * as API from 'api/Api'
import { useQuery } from 'react-query'
import Layout from 'components/ui/Layout'
import LocationList from 'components/location/LocationList'
import { useLocation } from 'react-router-dom'

const LocationsDisplay: FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { data: allLocations, status: locationStatus } = useQuery(
    ['allLocations', pageNumber],
    () => API.fetchLocations(pageNumber),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )
  return (
    <Layout>
      <div className="mb-3">
        <LocationList
          title="New locations"
          desc="New uploads from users. Try to guess all the locations by
              pressing on a picture."
          locationData={allLocations}
          status={locationStatus}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          multiplePages
        /> 
      </div>
    </Layout>
  )
}

export default LocationsDisplay
