import { FC } from "react";

interface Props {
    location:number
    zoomLevel:number
}

const Map:FC<Props> = ({ location, zoomLevel }) => {
    return(<div>
        {/* <div className="map">
        <h2 className="map-h2">Come Visit Us At Our Campus</h2>

        <div className="google-map">
        <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={location}
            defaultZoom={zoomLevel}
        >
            <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
            />
        </GoogleMapReact>
        </div>
    </div> */}
    </div>)
    
}

export default Map
