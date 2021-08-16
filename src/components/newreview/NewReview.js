import React, { useState, useContext } from 'react';
import RestaurantContext from '../../contexts/restaurant';
import routes from '../../lib/routes';
import './NewReview.css';

/**
 * @component
 * @returns {React.Component}
 */
const NewReview = (props) => {
  const { navigateTo, addRatingToRestaurant } = useContext(RestaurantContext);


  const [fields, setFields] = useState({
    stars: '',
    comment: ''
  });


  const onChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const review = {
      stars: Number(fields.stars),
      comment: fields.comment
    };

    addRatingToRestaurant(props.restaurantID, review);
  };

  const onClick = (e) => {
    navigateTo([
      routes.index
    ]);
  };


  return (
    <div className="new-review">
      <h1>Add New Review</h1>
      <form onChange={onChange} onSubmit={onSubmit}>
        <input name="stars"
          placeholder="Number of Stars from 1 to 5"
          value={fields.stars} />

        <input name="comment"
          placeholder="Review"
          value={fields.comment} />
        
        <button className="submit">
          Add
        </button>

        <button className="cancel" onClick={onClick}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewReview;
