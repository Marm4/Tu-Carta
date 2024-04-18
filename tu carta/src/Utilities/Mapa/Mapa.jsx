import React, { useEffect } from 'react';

// Definir initMap y placeMarker en el ámbito global
window.initMap = () => {
  const mapa = new window.google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.603722, lng: -58.381592 },
    zoom: 12
  });

  mapa.addListener('click', (event) => {
    placeMarker(event.latLng, mapa);
  });
};

const placeMarker = (location, mapa) => {
  const marker = new window.google.maps.Marker({
    position: location,
    map: mapa
  });

  console.log("Latitud: " + location.lat());
  console.log("Longitud: " + location.lng());
};

function Mapa() {
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

  return <div id="map" style={{ height: '350px', width: '100%' }}></div>;
}

export default Mapa;