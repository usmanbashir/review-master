import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import useUserLocation from './hooks/useUserLocation';

function App() {
  const userLocation = useUserLocation();

  return (
    <div className="App">
      <Header />
      {/* Show a message while waiting for the user to allow access to their location. */}
      {!userLocation.found &&
        <div className="notice">Waiting for your location...</div>
      }
    </div>
  );
}

export default App;
