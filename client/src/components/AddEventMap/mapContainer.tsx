/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import {
  useRef,
  useEffect,
  FC,
} from 'react'

import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

// const accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN

mapboxgl.accessToken = `pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.
-g_vE53SD2WrJ6tFX7QHmA`
interface mapProps{
  setLat: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLon: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPlaceName: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const MapContainer: FC <mapProps> = ({ setLon, setLat, setPlaceName }):JSX.Element => {
  const mapContainerRef = useRef<any>(null!)
  const myMap:any = useRef()
  useEffect(() => {
    myMap.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [35.2, 31.88333],
      zoom: 12,
    })

    const geocoder = new MapboxGeocoder({
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2'
      + 'gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA',
      mapboxgl,
      mode: 'mapbox.places',
      placeholder: 'Search for places in Berkeley',

    })

    myMap.current.addControl(geocoder)

    myMap.current.on('load', () => {
      myMap.current.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      })

      myMap.current.on('click', (e:any) => {
        setLon(e.lngLat.lng)
        setLat(e.lngLat.lat)
        myMap.current.addControl(new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(myMap.current))
      })
      geocoder.on('result', (event) => {
        myMap.current.getSource('single-point').setData(event.result.geometry)
        setLon(event.result.center[0])
        setLat(event.result.center[1])
        setPlaceName(event.result.place_name)
      })
    })

    myMap.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
    myMap.current.addControl(new mapboxgl.FullscreenControl(), 'top-right')

    return () => myMap.current.remove()
  }, [])

  return (
    <div ref={mapContainerRef} className="map-container"> </div>)
}
export default MapContainer
