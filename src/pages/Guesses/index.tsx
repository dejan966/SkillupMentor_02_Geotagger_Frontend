import { FC, useState } from 'react'
import * as API from 'api/Api'
import { useQuery } from 'react-query'
import Layout from 'components/ui/Layout'
import LocationList from 'components/location/LocationList'

const GuessDisplay: FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { data: personalBest, status: personalBestStatus } = useQuery(
    ['personalBestAll', pageNumber],
    () => API.fetchPersonalBest(pageNumber),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  const changePage = (upDown: string) => {
    if (upDown === 'next') {
      setPageNumber((prev) => prev + 1)
    } else if (upDown === 'prev') {
      setPageNumber((prev) => prev - 1)
    }
    console.log(pageNumber)
    return pageNumber
  }

  return (
    <Layout>
      <div className="mb-3">
        <LocationList
          title="Personal best guesses"
          desc="Your personal best guesses appear here. Go on and try to beat
                your personal records or set a new one!"
          status={personalBestStatus}
          guessData={personalBest}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          multiplePages
        />
      </div>
    </Layout>
  )
}

export default GuessDisplay
