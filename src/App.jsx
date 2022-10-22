import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()

  useEffect(() => {
    //* Esta es la función que se ejecuta cuando llega la información de nuestra ubiación
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
    }

    //* Esto ahce el llamado a la Api del navegador para usar la ubicación actual
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  //*Petición del clima

  useEffect(() => {
    if (coords) {
      const APIKEY = 'cf22f74242fb64a7eff7cc43018f78b5'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      axios.get(URL)
        .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const farenheit = (celsius * 9 / 5 + 32).toFixed(1)
          setTemperature({ celsius, farenheit })
          setWeather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [coords])

  return (
    <div className="App">
      {
        weather
          ?
          <WeatherCard weather={weather} temperature={temperature} />
          :
          <Loading />
      }
    </div>
  )
}

export default App
