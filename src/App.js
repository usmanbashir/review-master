import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userLocation, setUserLocation] = useState({latitude: null, longitude: null});

  // Get the users Geolocation when the app loads for the first time.
  useEffect(() => {
    // Only search for the location if the user's browser supports it.
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    } else {
      alert('Sorry, but your browser does not supports getting your Geolocation.')
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Review Master</h1>
        <p>
          An easy-to-use, simple service that offers reviews of restaurants around you.
        </p>
        {/* Show a message while waiting for the user to allow access to their location. */}
        {userLocation.latitude === null &&
          <strong>Waiting for your location...</strong>
        }
      </header>
    </div>
  );
}

export default App;
