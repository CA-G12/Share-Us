import {
  useState,
  useRef,
  useEffect,
  FC,
} from 'react'

import {
  Box, Modal, Button,
} from '@mui/material'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import './style.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const AddEventMap: FC = () => {
  const [mapOpen, setMapOpen] = useState(false)
  const mapContainer = useRef(null!)
  const map:any = useRef()
  const [lng] = useState(-70.9)
  const [lat] = useState(42.35)
  const [zoom] = useState(9)
  // eslint-disable-next-line max-len
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    })
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
    })

    map.current.addControl(geocoder)
  })

  return (
    <div>
      <Button variant="outlined" onClick={() => setMapOpen(true)}>
        Map
      </Button>
      <Modal
        className="box"
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div ref={mapContainer} className="map-container" />
          </div>
        </Box>

      </Modal>
    </div>
  )
}
export default AddEventMap
