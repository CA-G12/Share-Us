/* eslint-disable radix */
/* eslint-disable no-undef */
import {
  useRef, useEffect, FC, useState,
} from 'react'
import mapboxgl from 'mapbox-gl'
import './style.css'
import IMapProps from '../../interfaces/props/IMapProps'

mapboxgl.accessToken = `pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29ia
zA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA`

const Map:FC<IMapProps> = ({ longitude, latitude }):JSX.Element => {
  const mapContainerRef = useRef(null!)
  const [original, setOriginal] = useState(0)
  const [mapStyle, setMapStyle] = useState<string>('mapbox://styles/mapbox/streets-v11')
  const latitudeNumber = parseFloat(latitude.replace(/,/g, '.'))
  const longitudeNumber = parseFloat(longitude.replace(/,/g, '.'))
  // mapbox://styles/mapbox/dark-v10
  // mapbox://styles/mapbox/outdoors-v11
  // mapbox://styles/mapbox/streets-v11
  // Initialize map when component mounts
  const myMap:any = useRef()
  useEffect(() => {
    myMap.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [longitudeNumber, latitudeNumber],
      zoom: 10,
    })
    // Create default markers
    const popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setHTML(
        `<h3>${'test'}</h3><p>${'test description'}</p>`,
      )
    new mapboxgl.Marker().setPopup(popup)
      .setLngLat([longitudeNumber, latitudeNumber]).addTo(myMap.current)
    // Add navigation control (the +/- zoom buttons)
    myMap.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
    myMap.current.addControl(new mapboxgl.FullscreenControl(), 'top-right')

    // Clean up on unmount
    return () => myMap.current.remove()
  }, [mapStyle])

  const fitBtn = ():void => {
    myMap.current.flyTo({ center: [longitudeNumber, latitudeNumber] })
    setOriginal(original + 1)
  }

  const handleMapStyle = (e:any): void => {
    setMapStyle(e.target.value)
  }

  return (
    <div>
      <button className="fit-btn" onClick={fitBtn} type="button">Fit to Event Location</button>
      <div className="map-style-btn-container">
        <button
          value="mapbox://styles/mapbox/dark-v10"
          className="map-style-btn"
          onClick={handleMapStyle}
          type="button"
        >
          dark

        </button>
        <button
          value="mapbox://styles/mapbox/light-v10"
          className="map-style-btn"
          onClick={handleMapStyle}
          type="button"
        >
          light

        </button>
        <button
          value="mapbox://styles/mapbox/streets-v11"
          className="map-style-btn"
          onClick={handleMapStyle}
          type="button"
        >
          streets

        </button>
      </div>

      <div className="map" ref={mapContainerRef} />
    </div>

  )
}

export default Map
