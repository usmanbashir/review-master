import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import useUserLocation from './hooks/useUserLocation';
import * as APIKeys from './apiKeys';
import Map from './components/map/Map';
import * as data from './lib/dummy/restaurants';

function App() {
  const userLocation = useUserLocation();
  const [restaurants, setRestaurants] = useState(null);

  // Load initial restaurants data into state when app loads.
  useEffect(() => {
    setRestaurants(data.restaurants);
  }, []);

  return (
    <div className="App">
      <Header />

      {/* Show a message while waiting for the user to allow access to their location. */}
      {!userLocation.found &&
        <div className="notice">Waiting for your location...</div>
      }

      <div className="container">
        <div className="map">
          {userLocation.found &&
            <Map
              apiKey={APIKeys.google}
              location={userLocation}
              restaurants={restaurants} />
          }
        </div>
        <div className="restaurants-list"></div>
      </div>
    </div>
  );
}

export default App;
