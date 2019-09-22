import { useState, useEffect } from 'react';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState({lat: null, lng: null, found: false});

  // Get the users Geolocation when the app loads for the first time.
  useEffect(() => {
    // Only search for the location if the user's browser supports it.
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          found: true
        });
      });
    } else {
      alert('Sorry, but your browser does not supports getting your Geolocation.');
    }
  }, []);

  return userLocation;
}

export default useUserLocation;