import React, { useState, useEffect } from 'react'
import './App.css'
// import { MainPage } from "./pages/mainPage";
import { MapContainer, Marker, Popup, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import ApiService from './ApiService.js';

function App() {
  const apiService = new ApiService("http://localhost:5000/api");


  const [stations, setStations] = useState([]);
  const [vagnums, setVagnums] = useState([]);


  const fetchStations = () => {
    apiService.getStations()
      .then(stations => {
        console.log(stations);
        setStations(stations);
      })
      .catch(({ message }) => {

      })
  }

  const fetchVagnums = () => {
    apiService.getWagnum()
      .then(wagnums => {
        console.log(wagnums);
        setVagnums(wagnums);
      })
      .catch(({ message }) => {

      })
  }


  useEffect(() => {
    fetchStations();
    fetchVagnums();
  }, []);


  return (
    <MapContainer center={[59.57, 30.19]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh", width: "100vw" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations && stations.map(([station_id, lon, lat]) =>
        <CircleMarker // - железнодорожные станции
          center={[lon, lat]}
          pathOptions={{ color: 'red' }}
          radius={6}>
          <Tooltip>{station_id}</Tooltip>
        </CircleMarker>
      )}
      {vagnums && vagnums.map(({ station, wagnum }) => (
        <Marker position={[station["LATITUDE"],station["LONGITUDE"]]}>
          <Popup>
            {JSON.stringify(wagnum, null, 2)}
          </Popup>
        </Marker>
      )
      )}

    </MapContainer>
  )
}

export default App
