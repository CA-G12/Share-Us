/* eslint-disable max-len */
import {
  useRef, FC,
} from 'react'
import {
  MapContainer, TileLayer, Popup, Marker,
} from 'react-leaflet'
import 'leaflet-geosearch/dist/geosearch.css'

import './style.css'
import IMapProps from '../../interfaces/props/IMapProps'

const Map:FC<IMapProps> = ({ longitude, latitude, placeName }) => {
  const latitudeNumber = parseFloat(latitude.replace(/,/g, '.'))
  const longitudeNumber = parseFloat(longitude.replace(/,/g, '.'))

  const mapRef = useRef<any>()

  const handleOnFlyTo = ():void => {
    mapRef.current.flyTo([longitudeNumber, latitudeNumber], 18, {
      duration: 5,
    })
  }

  return (
    <>
      <button type="button" className="fit-btn" onClick={handleOnFlyTo}>
        Fit to Event Location
      </button>
      <MapContainer
        ref={mapRef}
        className="event-details-map"
        center={[longitudeNumber, latitudeNumber]}
        zoom={10}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[longitudeNumber, latitudeNumber]}>
          <Popup>
            {placeName}
          </Popup>
        </Marker>
      </MapContainer>
    </>

  )
}

export default Map
