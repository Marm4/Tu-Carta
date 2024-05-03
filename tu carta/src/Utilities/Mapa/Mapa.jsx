import React, { useState, useEffect } from 'react';

const Mapa = ({ onMapSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA-K5d6lI_KIjgS4LABdHqpXRvoYuJQvOs&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    loadScript();

  }, []);

  window.initMap = () => {
    const mapa = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.603722, lng: -58.381592 },
      zoom: 12
    });

    setMap(mapa);
  };

  const placeMarker = (location, mapa) => {
    setSelectedLocation(location);
    onMapSelect(location);

    // Eliminar el marcador anterior si existe
    if (marker) {
      marker.setMap(null);
    }

    // Crear un nuevo marcador y establecerlo como el marcador actual
    const newMarker = new window.google.maps.Marker({
      position: location,
      map: mapa
    });
    setMarker(newMarker);
  };

  const handleSearch = () => {
    if (!searchLocation || !map) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchLocation }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        map.setCenter(location);

        // Llamar a placeMarker para colocar el marcador en la nueva ubicación
        placeMarker(location, map);
      } else {
        console.log('Geocode was not successful for the following reason:', status);
      }
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Ingrese una ubicación" 
        value={searchLocation} 
        onChange={(e) => setSearchLocation(e.target.value)}
        onKeyPress={handleKeyPress} 
      />
      <div id="map" style={{ height: '350px', width: '100%' }}></div>
    </div>
  );
}

export default Mapa;