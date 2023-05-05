import { FC, useState } from 'react'
import * as API from 'api/Api'
import { useQuery } from 'react-query'
import Layout from 'components/ui/Layout'
import { LocationType } from 'models/location'
import LocationBlock from 'pages/LocationBlock'
import { Button } from 'react-bootstrap'

const LocationsDisplay: FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { data: allLocations, status: locationStatus } = useQuery(
    ['allLocationsAll', pageNumber],
    () => API.fetchLocations(pageNumber),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )
  return (
    <Layout>
      <div className="mb-3">
        {locationStatus === 'error' && <p>Error fetching data</p>}
        {locationStatus === 'loading' && <p>Loading data...</p>}
        {locationStatus === 'success' && (
          <>
            <div className="locationRow">
              {allLocations.data.data
                .slice(0, 9)
                .map((item: LocationType, index: number) => (
                  <LocationBlock location={item} key={index} />
                ))}
            </div>
            {allLocations.data.meta.last_page > 1 && (
              <div className="d-flex justify-content-between">
                <Button
                  className="btnRegister me-2"
                  onClick={() => setPageNumber((prev) => prev - 1)}
                  disabled={pageNumber === 1}
                >
                  Prev page
                </Button>
                <Button
                  className="btnRegister"
                  onClick={() => setPageNumber((prev) => prev + 1)}
                  disabled={pageNumber === allLocations.data.meta.last_page}
                >
                  Next page
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}

export default LocationsDisplay