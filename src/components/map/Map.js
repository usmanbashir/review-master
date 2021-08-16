import React, { useState, useEffect } from 'react';
import './Map.css';
import GoogleMapReact from 'google-map-react';
import Marker from '../common/marker/Marker';
import routes from '../../lib/routes';
import { matchPrecision } from '../../lib/helpers';

/**
 * The Google Map Component that shows a list of markers for the given area selected by 
 * the user.
 *
 * @param {object} props - Props for the Component
 * @param {Array} props.restaurants
 * @param {function} props.changeVisibleRestaurants
 * @param {function} props.setGooglePlacesService
 * @param {function} props.changeZoom
 * @param {function} props.changeLocation
 * @param {function} props.navigateTo
 * @param {object} props.location
 * @param {object} props.userLocation
 * @param {string} props.apiKey - API Key to use for Google Map.
 * @component
 * @returns {React.Component}
 */
const Map = (props) => {
  const { restaurants, changeVisibleRestaurants, setGooglePlacesService } = props;

  const [mapAPI, setMapAPI] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);

  // When the user changes the map area in focus. Filter through all the restaurants we’ve 
  // and find only the ones that are located in the new map area selected by the user. But 
  // only if the Google Maps API has been loaded.
  useEffect(() => {
    if (mapAPI !== null && mapBounds !== null) {
      const latLngBounds = [
        {lat: mapBounds.sw.lat, lng: mapBounds.sw.lng},
        {lat: mapBounds.ne.lat, lng: mapBounds.ne.lng}
      ];

      const visibleRestaurants = restaurants.filter((restaurant) => {
        return new mapAPI.maps.LatLngBounds(
          latLngBounds[0], latLngBounds[1]
        ).contains({lat: restaurant.lat, lng: restaurant.lng});
      });

      changeVisibleRestaurants(visibleRestaurants);

      setGooglePlacesService(mapAPI);
    }
  }, [
    mapAPI,
    mapBounds, 
    restaurants,
    changeVisibleRestaurants,
    setGooglePlacesService
  ]);

  /**
   * Called by Google Map every time the map area is changed. Which can be
   * used to get the current map area and update our search location.
   *
   * @param {object} data - Contains the maps center coordinates, zoom level, bounds, and size information.
   * @private
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

    if (newLat !== oldLat || newLng !== oldLng) {
      setMapBounds({sw: data.bounds.sw, ne: data.bounds.ne});
      props.changeLocation({ lat: newLat, lng: newLng });
    }
  }

  const markers = restaurants.map((restaurant, index) => (
    <Marker key={index} lat={restaurant.lat} lng={restaurant.lng} name={restaurant.restaurantName} />
  ));

  /**
   * Show a dialog box to add a new restaurant at the point on the map clicked by the 
   * user.
   *
   * @private
   * @function
   */
  const _onClick = (event) => {
    props.navigateTo([
      routes.index,
      routes.restaurants.index,
      routes.restaurants.new,
      `?lat=${event.lat}&lng=${event.lng}`
    ]);
  }

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: props.apiKey }}
      defaultCenter={props.userLocation}
      defaultZoom={18}
      onChange={_onChange}
      onChildClick={(e) => console.log('Child Clicked!', e)}
      yesIWantToUseGoogleMapApiInternals={true}
      onGoogleApiLoaded={(api) => setMapAPI(api) }
      onClick={_onClick}
    >
      {markers}
      <Marker
        lat={props.userLocation.lat}
        lng={props.userLocation.lng}
        isUser={true} />
    </GoogleMapReact>
  );
}

export default Map;
