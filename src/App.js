import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import useUserLocation from './hooks/useUserLocation';
import * as APIKeys from './apiKeys';
import Map from './components/map/Map';
import * as data from './lib/dummy/restaurants';
import ListContainer from './components/common/list/Container';
import { getSummedRating, getAverageRating } from './lib/helpers';
import RatingContext from './contexts/rating';
import RestaurantContext from './contexts/restaurant';
import routes from './lib/routes';
import Popup from './components/popup/Popup';
import NewRestaurant from './components/newrestaurant/NewRestaurant';
import NewReview from './components/newreview/NewReview';

/**
 * @component
 * @returns {React.Component}
 */
const App = () => {
  // Users current GEO location retrieved via their browser.
  const userLocation = useUserLocation();

  // The location to search for restaurants based on the map area selected by the user.
  const [searchLocation, setSearchLocation] = useState({});

  // Restaurants data retrieved from our mock API, augmented by user generated content.
  const [restaurantsData, setRestaurantsData] = useState(data.restaurants);

  // List of restaurants for a given location filtered by the rating range.
  const [restaurants, setRestaurants] = useState(null);

  // A list of restaurants that are currently visible on the map.
  const [visibleRestaurants, setVisibleRestaurants] = useState(null);

  // The rating range requested by the user for the restaurants.
  const [ratingRange, setRatingRange] = useState({from: 0, to: 0});

  /*
   * Routes:
   *
   * /                            : ROOT
   * /restaurants/new             : Add New Restaurant
   * /restaurants/:id/reviews/new : Add New Review
   *
  */
  const [route, setRoute] = useState(routes.index);

  // Google Places Service API retrieved through GoogleMapReact package.
  const [googlePlacesService, setGooglePlacesService] = useState(null);


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
    // Helper method to Filter the merged restaurants data-source based
    // on the user’s filter selection.
    const _getFilteredRestaurants = (source, from, to) => {
      let filteredData = source;

      if (from > 0 && to > 0) {
        filteredData = filteredData.filter(item => {
          const rating = item.source === 'google' ? item.googleRating : getAverageRating(getSummedRating(item.ratings), item.ratings.length);

          return rating >= ratingRange.from && rating <= ratingRange.to;
        });
      }

      return filteredData;
    }

    // Copy the data to make sure we don't end up mutating the original data.
    let filteredData = [...restaurantsData];

    // Only search for restaurants using Google Places Service when it's been loaded. 
    if (googlePlacesService !== null) {
      const service = new window.google.maps.places.PlacesService(googlePlacesService.map);
      const searchZone = new googlePlacesService.maps.LatLng(searchLocation.lat, searchLocation.lng);
      const request = {
        location: searchZone,
        radius: '500',
        type: ['restaurant'],
      };
  
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const restaurantsFromGoogle = results.map((restaurant) => {
            return {
              id: restaurant.place_id,
              restaurantName: restaurant.name,
              lat: restaurant.geometry.location.lat(),
              lng: restaurant.geometry.location.lng(),
              ratings: [],
              googleRating: restaurant.rating ? restaurant.rating : 0,
              source: 'google',
            };
          });

          // Add the Restaurants from Google to restaurants list.
          restaurantsFromGoogle.forEach(restaurant => filteredData.push(restaurant));

          setRestaurants(_getFilteredRestaurants(filteredData, ratingRange.from, ratingRange.to));
        } else {
          console.error("Google Places Service Error Status:", status);
        }
      });
    } else {
      setRestaurants(_getFilteredRestaurants(filteredData, ratingRange.from, ratingRange.to));
    }
  }, [
    searchLocation,
    restaurantsData,
    googlePlacesService,
    ratingRange,
  ]);

  // Show different sections of the UI depending on the requested
  // route by the user.
  //
  // TODO: Update browser URL history based on route change.
  useEffect(() => {
    console.log('Navigating To => ', route);
  }, [route]);


  /**
   * Navigation helper to change the route for the App.
   *
   * @param {Array}
   */
  const navigateTo = (route) => {
    setRoute(route.join(''));
  };

  /**
   * Helper method to add a new restaurant into the restaurants data-source.
   *
   * @param {object} restaurant
   */
  const addNewRestaurant = (restaurant) => {
    setRestaurantsData([...restaurantsData, restaurant]);
    navigateTo([routes.index]);
  };

  /**
   * Helper method to add a new rating for a given restaurant into the restaurants 
   * data-source.
   *
   * @param {number} restaurantID
   * @param {object} review
   */
  const addRatingToRestaurant = (restaurantID, review) => {
    // Let's copy the old restaurants list so we don't mutate the original.
    const newRestaurants = [...restaurantsData];

    // Add a new review to the restaurant's ratings Array using the
    // restaurant id to find the restaurant in question.
    //
    // Let's make sure we don't change the original restaurant object.
    const restaurant = Object.assign({}, getRestaurantByID(restaurantID));

    restaurant.ratings.push(review);

    newRestaurants.splice(getRestaurantIndexByID(restaurantID), 1);

    newRestaurants.push(restaurant);

    // Update the state for restaurants data.
    setRestaurantsData(newRestaurants);

    // Navigate to the home page.
    navigateTo([routes.index]);
  };

  /**
   * Helper method to find a restaurant by its ID.
   * 
   * @param {number} id 
   * @returns {object}
   */
  const getRestaurantByID = (id) => {
    return restaurantsData.find(restaurant => restaurant.id === id);
  };

  /**
   * Helper method to find a restaurant’s index in the data-source by its ID.
   * 
   * @param {number} id 
   * @returns {number}
   */
  const getRestaurantIndexByID = (id) => {
    return restaurantsData.findIndex(restaurant => restaurant.id === id);
  };

  /**
   * Provide a Component depending upon the requested route.
   *
   * @param {Array} route
   * @returns {React.Component} Component to be Rendered
   */
  const getScreen = (route) => {
    const recordID = parseInt(route.replace(/[^0-9\.]/g, ''), 10);

    /**
     * Action:      NEW
     * URI:         /restaurants/new/?lat=42&lng=42
     * Description: Allow the User to Add a New Restaurant, optionally providing Location coordinates.
     */
    if (route.includes([
      routes.index,
      routes.restaurants.index,
      routes.restaurants.new,
    ].join(''))) {
      const lat = route.slice(route.indexOf('lat') + 4, route.indexOf('&'));
      const lng = route.slice(route.indexOf('lng') + 4);

      return <Popup children={
        <NewRestaurant id={Date.now()} lat={lat} lng={lng} />
      } />;
    }

    /**
     * Action:      NEW
     * URI:         /restaurants/42/reviews/new
     * Description: Allow the User to Add a New Review to an Existing Restaurant
     */
    if (route === [
      routes.index,
      routes.restaurants.index,
      `${recordID}/`,
      routes.restaurants.reviews.index,
      routes.restaurants.reviews.new,
    ].join('')) {
      return <Popup children={
        <NewReview restaurantID={recordID} />
      } />;
    }

    return null;
  }

  const popupScreen = getScreen(route);

  return (
    <div className="App">
      <RatingContext.Provider value={{ratingRange, setRatingRange}}>
        <Header />
      </RatingContext.Provider>

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
              restaurants={restaurants}
              changeVisibleRestaurants={setVisibleRestaurants}
              setGooglePlacesService={setGooglePlacesService}
              navigateTo={navigateTo} />
          }
        </div>
        <div className="restaurants-list">
          <RestaurantContext.Provider value={{addNewRestaurant, addRatingToRestaurant, navigateTo}}>
            <ListContainer data={visibleRestaurants} apiKey={APIKeys.google} />
          </RestaurantContext.Provider>
        </div>
      </div>

      <RestaurantContext.Provider value={{addNewRestaurant, addRatingToRestaurant, navigateTo}}>
        {popupScreen}
      </RestaurantContext.Provider>
    </div>
  );
}

export default App;
