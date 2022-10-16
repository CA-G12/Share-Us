import React, { useEffect } from 'react'
import ApiService from './services/ApiService'

const App : React.FC = () => {
  useEffect(() => {
    ApiService.init()
    ApiService.setHeader()
  }, [])
  return (

    <div className="App" />

  )
}

export default App
