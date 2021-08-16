import React, { useState, useContext } from 'react';
import './Item.css';
import { getSummedRating, getAverageRating, getStreetViewPhotoURL } from '../../../lib/helpers';
import RestaurantContext from '../../../contexts/restaurant';
import routes from '../../../lib/routes';

/**
 * List Item Component for Restaurants
 *
 * @component
 * @param {object} props - Props for the Component
 * @param {any} props.id - Unique ID for the restaurant.
 * @param {number} props.lat - Latitude for the restaurant.
 * @param {number} props.lng - Longitude for the restaurant.
 * @param {string} props.restaurantName - The restaurant's name.
 * @param {?string} props.address - Address for the restaurant, if any.
 * @param {Array} props.ratings - User reviews and ratins for the restaurant.
 * @param {string} props.apiKey - API Key to use for Google Street View Photo.
 * @returns {React.Component} Restaurant Item Component
 */
const Item = (props) => {
  const { navigateTo } = useContext(RestaurantContext);

  const [itemExpanded, setItemExpanded] = useState(false);

  const {id, lat, lng, restaurantName, address, ratings} = props.data;
  const averageRating = getAverageRating(getSummedRating(ratings), ratings.length);
  const streetViewPhotoURL = getStreetViewPhotoURL(lat, lng, props.apiKey);

  /**
   * Show a dialog box to allow the user to add their review.
   *
   * @param {Event} e
   * @private
   * @function
   */
  const _onClickAddReview = (e) => {
    e.preventDefault();

    navigateTo([
      routes.index,
      routes.restaurants.index,
      `${id}/`,
      routes.restaurants.reviews.index,
      routes.restaurants.reviews.new
    ]);
  };

  /**
   * Toggle the street view photo and reviews of this restaurant.
   *
   * @param {Event} e
   * @private
   * @function
   */
  const _onClick = (e) => {
    // Don't toggle the expanded view if the user tries to add a review
    // for the restaurant.
    e.target.tagName !== 'A' && setItemExpanded(!itemExpanded);
  };

  const reviews = ratings.map((review, index) => {
    return (
      <div key={index} className="review">
        <p>
          <span>{`${review.stars}`}</span>
          {review.comment}
        </p>
      </div>
    );
  });

  const expandedView = <>
    <img className="street-view" alt="Street View" src={streetViewPhotoURL} />

    <h3>Reviews</h3>
    <a href="#addreview" onClick={_onClickAddReview}>Add Review</a>
    {reviews}
  </>;

  // If there is no rating information available from our restaurants data
  // or from the Google Places API. Then fall back to 0.
  let rating = 0;
  if (props.data.googleRating) { rating = props.data.googleRating; }
  if (rating === 0 || rating === undefined) { rating = averageRating.toPrecision(2); }
  if (isNaN(rating)) { rating = 0; }

  return (
    <li className="list-item" onClick={_onClick}>
      <strong>{restaurantName}</strong>
      <p>{address}</p>
      <div className="rating">{Number(rating)}</div>
      {itemExpanded && expandedView}
    </li>
  );
};

export default Item;
