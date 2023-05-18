import { routes } from 'constants/routesConstants'
import { GuessType } from 'models/guess'
import { FC } from 'react'
import { Button } from 'react-bootstrap'
import LocationBlock from './LocationBlock'

interface Props {
  title: string
  desc: string
  status: string
  data: any
  loadmore?: string
}

const LocationList: FC<Props> = ({ title, desc, status, data, loadmore }) => {
  return (
    <>
      <div className="text-start">
        <h3 className="green">{title}</h3>
        <p>{desc}</p>
        <div>
          {status === 'error' && <p>Error fetching data</p>}
          {status === 'loading' && <p>Loading data...</p>}
          {data && data.data.data.length > 0 && status === 'success' ? (
            <div className="locationRow">
              {data?.data.data
                .slice(0, 3)
                .map((item: GuessType, index: number) => (
                  <LocationBlock locationGuess={item} key={index} />
                ))}
            </div>
          ) : (
            <div className="mb-3">You havent made any guesses yet.</div>
          )}
        </div>
      </div>
      <div className="mb-3 text-center mx-auto">
        {loadmore ? (
          <Button href={routes.ALLGUESSES} className="btnLoadMore">
            Load more
          </Button>
        ) : (
          <Button className="btnRegister" href={routes.SIGNUP}>
            Sign up
          </Button>
        )}
      </div>
    </>
  )
}

export default LocationList
