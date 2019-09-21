import React from 'react';
import './Map.css';
import GoogleMapReact from 'google-map-react';
import Marker from '../common/marker/Marker';

const Map = (props) => {
  const markers = props.restaurants.map((restaurant, index) => (
    <Marker key={index} lat={restaurant.lat} lng={restaurant.lng} name={restaurant.restaurantName} />
  ));

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: props.apiKey }}
      defaultCenter={props.location}
      defaultZoom={18}
    >
      {markers}
      <Marker
        lat={props.location.lat}
        lng={props.location.lng}
        isUser={true} />
    </GoogleMapReact>
  );
}

export default Map;