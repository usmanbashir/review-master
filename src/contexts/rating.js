import React from 'react';

// Provide a skeleton structure for the context.
const RatingContext = React.createContext({
  ratingRange: {from: 0, to: 0},
  setRatingRange: () => {}
});

export default RatingContext;
