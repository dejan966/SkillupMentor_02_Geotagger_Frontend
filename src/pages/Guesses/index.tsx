import { FC, useState } from 'react'
import * as API from 'api/Api'
import { useQuery } from 'react-query'
import Layout from 'components/ui/Layout'
import LocationBlock from 'pages/LocationBlock'
import { GuessType } from 'models/guess'
import { Button } from 'react-bootstrap'

const Guess: FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { data: personalBest, status: personalBestStatus } = useQuery(
    ['personalBestAll', pageNumber],
    () => API.fetchPersonalBest(pageNumber),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  return (
    <Layout>
      <div className="mb-3">
        {personalBestStatus === 'error' && <p>Error fetching data</p>}
        {personalBestStatus === 'loading' && <p>Loading data...</p>}
        {personalBestStatus === 'success' &&
          personalBest?.data.data.length > 0 && (
            <>
              <div className="locationRow">
                {personalBest.data.data.map(
                  (item: GuessType, index: number) => (
                    <LocationBlock locationGuess={item} key={index} />
                  ),
                )}
              </div>
              {personalBest.data.meta.last_page > 1 && (
                <div>
                  <Button
                    className="me-2"
                    onClick={() => setPageNumber((prev) => prev - 1)}
                    disabled={pageNumber === 1}
                  >
                    Prev page
                  </Button>
                  <Button
                    onClick={() => setPageNumber((prev) => prev + 1)}
                    disabled={pageNumber === personalBest.data.meta.last_page}
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

export default Guess
