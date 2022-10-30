/* eslint-disable no-undef */
import {
  useState,
  FC,
} from 'react'
import {
  Box, Modal, Button,
} from '@mui/material'
import MapContainer from './mapContainer'
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

interface mapProps{
  setLat: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLon: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPlaceName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AddEventMap: FC<mapProps> = ({ setLon, setLat, setPlaceName }):JSX.Element => {
  const [mapOpen, setMapOpen] = useState(false)

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
          <MapContainer setLon={setLon} setLat={setLat} setPlaceName={setPlaceName} />
        </Box>

      </Modal>
    </div>
  )
}
export default AddEventMap
