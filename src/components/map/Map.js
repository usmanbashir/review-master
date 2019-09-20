import React from 'react';
import './Map.css';
import GoogleMapReact from 'google-map-react';

const Map = (props) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: props.apiKey }}
      defaultCenter={props.location}
      defaultZoom={18}
    >
    </GoogleMapReact>
  );
}

export default Map;