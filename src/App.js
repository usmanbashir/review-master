import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import useUserLocation from './hooks/useUserLocation';
import * as APIKeys from './apiKeys';
import Map from './components/map/Map';
import * as data from './lib/dummy/restaurants';

function App() {
  const userLocation = useUserLocation();
  const [searchLocation, setSearchLocation] = useState({});
  const [restaurants, setRestaurants] = useState(null);

  // Set the search location to fetch the restaurants near the user's
  // current location. This effect only runs when the user first gives
  // permission for their location and on app load each time afterward.
  useEffect(() => {
    if (userLocation.found) {
      setSearchLocation({ lat: userLocation.lat, lng: userLocation.lng });
    }
  }, [userLocation]);

  // Fetch the list of restaurants based on the current area in focus
  // of the Google Map. This effect will run every time the search location
  // changes. Which could be because of getting the users current location
  // or the user changing the map area.
  useEffect(() => {
    setRestaurants(data.restaurants);
  }, [searchLocation]);

  return (
    <div className="App">
      <Header />

      {/* Show a message while waiting for the user to allow access to their location. */}
      {!userLocation.found &&
        <div className="notice">Waiting for your location...</div>
      }

      <div className="container">
        <div className="map">
          {searchLocation.lat &&
            <Map
              apiKey={APIKeys.google}
              userLocation={userLocation}
              location={searchLocation}
              changeLocation={setSearchLocation}
              restaurants={restaurants} />
          }
        </div>
        <div className="restaurants-list"></div>
      </div>
    </div>
  );
}

export default App;
