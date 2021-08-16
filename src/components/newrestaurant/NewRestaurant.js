import React, { useState, useContext } from 'react';
import RestaurantContext from '../../contexts/restaurant';
import routes from '../../lib/routes';
import './NewRestaurant.css';

/**
 * @component
 * @returns {React.Component}
 */
const NewRestaurant = (props) => {
  const { navigateTo, addNewRestaurant } = useContext(RestaurantContext);


  const [fields, setFields] = useState({
    name: '',
    address: '',
    lat: isNaN(props.lat) ? '' : props.lat, // In case the provided information is not numeric.
    lng: isNaN(props.lng) ? '' : props.lng, // In case the provided information is not numeric.
  });


  const onChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const restaurant = {
      id: props.id,
      restaurantName: fields.name,
      address: fields.address,
      lat: Number(fields.lat),
      lng: Number(fields.lng),
      ratings: [],
    };

    addNewRestaurant(restaurant);
  };

  const onClick = (e) => {
    navigateTo([
      routes.index,
    ]);
  };


  return (
    <div className="new-restaurant">
      <h1>Add New Restaurant</h1>
      <form onChange={onChange} onSubmit={onSubmit}>
        <input name="name"
          placeholder="Restaurant Name"
          value={fields.name} />

        <input name="address"
          placeholder="Address"
          value={fields.address} />

        <input name="lat"
          placeholder="Latitude"
          value={fields.lat} />

        <input name="lng"
          placeholder="Longitude"
          value={fields.lng} />

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

export default NewRestaurant;
