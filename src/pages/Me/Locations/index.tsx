import Layout from 'components/ui/Layout'
import { FC, useState } from 'react'
import * as API from 'api/Api'
import { useQuery } from 'react-query'
import LocationList from 'components/location/LocationList'

const MeLocations: FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { data: currUserAllLocations, status: currUserAllLocationsStatus } =
    useQuery(
      ['currUserAllLocations', pageNumber],
      () => API.currUserLocations(pageNumber),
      {
        refetchOnWindowFocus: false,
      },
    )

  return (
    <Layout>
      <div className="mb-3">
        <div>
          <div className="mb-3">
            {currUserAllLocations && (
              <LocationList
                title="My uploads"
                desc="All your uploads appear here"
                status={currUserAllLocationsStatus}
                locationData={currUserAllLocations}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MeLocations
