import React from 'react';

// Provide a skeleton structure for the context.
const RestaurantContext = React.createContext({
  addNewRestaurant: (restaurant) => {},
  addRatingToRestaurant: (restaurantID, review) => {},
  navigateTo: (route) => {}
});

export default RestaurantContext;
