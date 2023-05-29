import {
  GoogleMap,
  LoadScriptProps,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api'
import { FC } from 'react'

const libraries: LoadScriptProps['libraries'] = ['geometry']

interface Props {
  currentPosition: {lat:number, lng: number}
  compareDistance: (e: any) => void
}

const MapG: FC<Props> = ({currentPosition, compareDistance}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries,
  })
  const mapStyles = {
    height: '50vh',
    width: '100%',
  }
  return (
    <div className="mb-3">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}
          onClick={(e) => compareDistance(e)}
        >
          <MarkerF position={currentPosition} />
        </GoogleMap>
      )}
    </div>
  )
}

export default MapG
