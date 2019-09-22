import React from 'react';
import './Map.css';
import GoogleMapReact from 'google-map-react';
import Marker from '../common/marker/Marker';

const Map = (props) => {
  /**
   * Called by Google Map every time the map area is changed. Which can be
   * used to get the current map area and update our search location.
   *
   * @param {object} data - Contains the maps center coordinates, zoom level, bounds, and size information.
   * @function
   */
  const _onChange = (data) => {
    let oldLat = props.location.lat, newLat = data.center.lat;
    let oldLng = props.location.lng, newLng = data.center.lng;

    // Reduce the precision of the `lat` and `lng` returned by Google Map
    // to the same precision as the user's original current location retrieved
    // via the browser. So we can accurately check if the user has moved the
    // map area from the initial location.
    newLat = matchPrecision(newLat, oldLat);
    newLng = matchPrecision(newLng, oldLng);

    if (newLat !== oldLat && newLat !== oldLat) {
      props.changeLocation({ lat: newLat, lng: newLng });
    }
  }

  const markers = props.restaurants.map((restaurant, index) => (
    <Marker key={index} lat={restaurant.lat} lng={restaurant.lng} name={restaurant.restaurantName} />
  ));

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: props.apiKey }}
      defaultCenter={props.userLocation}
      defaultZoom={18}
      onChange={_onChange}
    >
      {markers}
      <Marker
        lat={props.userLocation.lat}
        lng={props.userLocation.lng}
        isUser={true} />
    </GoogleMapReact>
  );
}

/**
 * Makes the source number match the precision of the target number.
 *
 * @param {number} fromNumber - The source number that needs to be converted.
 * @param {number} toNumber - The target number who's precision should be matched during conversion.
 * @returns {number}
 */
const matchPrecision = (fromNumber, toNumber) => {
  return Number(fromNumber.toPrecision(toNumber.toString().length - 1));
};

export default Map;