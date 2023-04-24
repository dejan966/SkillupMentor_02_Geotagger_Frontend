import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { FC, useState } from 'react'

const MapContainer: FC = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0.0, lng: 0.0 })
  const mapStyles = {
    height: '100',
    width: '100',
  }
  const onMarkerDragEnd = (e: any) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    currentPosition.lat = lat
    currentPosition.lng = lng
    setCurrentPosition(currentPosition)
  }
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={currentPosition}
      >
        {currentPosition.lat ? (
          <Marker
            position={currentPosition}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={true}
          />
        ) : null}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer
