/* eslint-disable max-len */
import {
  useRef,
  useEffect,
  FC,
} from 'react'
import {
  MapContainer, TileLayer, useMap,
} from 'react-leaflet'
import { OpenStreetMapProvider, SearchControl } from 'leaflet-geosearch'
import 'leaflet-geosearch/dist/geosearch.css'
import './style.css'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const SearchField:FC<any> = ({ setLon, setLat, setPlaceName }) => {
  const searchControl = SearchControl({
    notFoundMessage: 'Sorry, that address could not be found.',
    provider: new OpenStreetMapProvider(),
    style: 'bar',
  })
  const map = useMap()
  useEffect(():any => {
    map.addControl(searchControl)
    return () => map.removeControl(searchControl)
  }, [])

  const handleSearch = (result:any):void => {
    setLon(result.location.y)
    setLat(result.location.x)
    setPlaceName(result.location.label)
  }

  map.on('geosearch/showlocation', handleSearch)

  return null
}

interface mapProps{
  setLat: Function;
  setLon: Function;
  setPlaceName: Function;
}
const MapCont: FC <mapProps> = ({ setLon, setLat, setPlaceName }) => {
  const mapRef = useRef<any>()

  return (
    <MapContainer
      ref={mapRef}
      className="add-event-map"
      center={[31.5476266, 34.4584717]}
      zoom={10}
      scrollWheelZoom
    >
      <SearchField setLon={setLon} setLat={setLat} setPlaceName={setPlaceName} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>

  )
}
export default MapCont
