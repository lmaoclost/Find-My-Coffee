import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  useEffect(() => {
    setCurrentLocation();
  }, []);

  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        alert('Habilite a localização para usar esse APP');
      }
    );
  }

  return (
    <>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          zoom={15}
          center={{ lat: latitude, lng: longitude }}
        ></GoogleMap>
      </LoadScript>
    </>
  );
}

export default App;
