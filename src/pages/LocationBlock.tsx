import { FC } from 'react'

interface Props {
  location_id: number
  image_url: string
  error_distance?: number
}

const LocationBlock: FC<Props> = ({
  location_id,
  image_url,
  error_distance,
}) => {
  return (
  <div>
    <div><img src={`${process.env.REACT_APP_API_URL}/uploads/locations/${image_url}`} alt="location_img" /*onCLick GuessForm -> pass location id */ /></div>
  </div>
  )
}

export default LocationBlock
