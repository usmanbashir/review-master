import React, { useContext } from 'react';
import './Container.css'
import Item from './Item';
import { getSortedDataByAverageRating } from '../../../lib/helpers';
import RestaurantContext from '../../../contexts/restaurant';
import routes from '../../../lib/routes';

const ListContainer = (props) => {
  const { navigateTo } = useContext(RestaurantContext);

  let listContent = null;

  if (props.data && props.data.length > 0) {
    const data = getSortedDataByAverageRating(props.data);
    listContent = <ul className="list-container">
                    {data.map((item, index) => <Item key={index} data={item} apiKey={props.apiKey} />)}
                  </ul>;
  } else {
    listContent = <div className="list-empty">
                    <h3>Sorry, no results found nearby!</h3>
                    <p>Try zooming out to search a bigger area or pan over to another area.</p>
                  </div>;
  }

  const _onClick = (e) => {
    navigateTo([
      routes.index,
      routes.restaurants.index,
      routes.restaurants.new
    ]);
  };

  return (
    <>
      <button className="add" onClick={_onClick}>
        Add New Restaurant
      </button>

      {listContent}
    </>
  );
};

export default ListContainer;
