import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import EstabilishmentService from './services/google_list_of_establishments';

import coffeePin from './images/coffee-pin.png';
import myLocation from './images/my-location-pin.png';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);

  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  useEffect(() => {
    setCurrentLocation();
  }, []);

  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        loadCoffeeShops();
      },
      (error) => {
        alert('Habilite a localização para usar esse APP');
      }
    );
  }

  async function loadCoffeeShops() {
    const response = await EstabilishmentService.index(latitude, longitude);
    setLocations(response.data.results);
  }

  return (
    <>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          zoom={15}
          center={{ lat: latitude, lng: longitude }}
        >
          {locations.map((item, index) => {
            return (
              <Marker
                key={index}
                icon={coffeePin}
                title={item.name}
                animation="4"
                position={{
                  lat: item.geometry.location.lat,
                  lng: item.geometry.location.lng,
                }}
              />
            );
          })}
          <Marker
            key="my_location"
            icon={myLocation}
            title="Seu local"
            animation="4"
            position={{ lat: latitude, lng: longitude }}
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default App;
