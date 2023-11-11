/* eslint-disable*/
import React, { useState, useEffect } from 'react'
import './App.css'
// import { MainPage } from "./pages/mainPage";
import { MapContainer, Marker, Popup, TileLayer, CircleMarker, Tooltip, Polyline } from 'react-leaflet';
import ApiService from './ApiService.js';

function App() {
  const apiService = new ApiService("http://localhost:5000/api");
    const routeCoordinates = [
        [59.57, 30.19],
        [51.51, -0.1],
        // Добавьте дополнительные координаты для вашего маршрута
    ];


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
    <MapContainer center={[59.57, 30.19]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh", width: "100vw"}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
      {stations && stations.map(([station_id, lon, lat]) =>
        <CircleMarker // - железнодорожные станции
          center={[lon, lat]}
          pathOptions={{ color: '#FFF' }}
          radius={6}>
          <Tooltip>{station_id}</Tooltip>
        </CircleMarker>
      )}
      {vagnums && vagnums.map(({ station, wagnum }) => (
        <Marker position={[station["LATITUDE"],station["LONGITUDE"]] icon={markerIcon}}>
          <Popup>
              <div>
                  <p className="dictionaryWagon">
                      Номер вагона: {wagnum.WAGNUM}
                  </p>
                  <p className="dictionaryWagon">
                      Дата обновления: {wagnum.OPERDATE}
                  </p>
                  <p className="dictionaryWagon">
                      Номер станции прибытия: {wagnum.ST_ID_DEST}
                  </p>
                  <p className="dictionaryWagon">
                      Номер станции отправления: {wagnum.ST_ID_DISL}
                  </p>
                  <p className="dictionaryWagon">
                      Номер поезда: {wagnum.TRAIN_INDEX}
                  </p>
              </div>
          </Popup>
        </Marker>
      )
      )}
        <Polyline positions={routeCoordinates} color="#EB5525" />
    </MapContainer>
  )
}

export default App
