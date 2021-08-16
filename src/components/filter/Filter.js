import React, { useState, useEffect, useContext } from 'react';
import './Filter.css';
import DropDown from '../common/dropdown/DropDown';
import RatingContext from '../../contexts/rating';

/**
 * @component
 * @returns {React.Component}
 */
const Filter = (props) => {
  const [rangeStartingValue, setRangeStartingValue] = useState(null);
  const [rangeEndingValue, setRangeEndingValue] = useState(null);

  // 
  const { setRatingRange } = useContext(RatingContext);

  useEffect(() => {
    setRatingRange({from: rangeStartingValue, to: rangeEndingValue});
  }, [rangeStartingValue, rangeEndingValue, setRatingRange]);

  const filterListData = [
    {text: 'None', value: ''},
    {text: '1 Star', value: 1},
    {text: '2 Stars', value: 2},
    {text: '3 Stars', value: 3},
    {text: '4 Stars', value: 4},
    {text: '5 Stars', value: 5}
  ];

  return (
    <div className="filter">
      <h4>Filter by Ratings:</h4>

      <span>From:</span>
      <DropDown data={filterListData} onChange={setRangeStartingValue} />

      <span>To:</span>
      <DropDown data={filterListData} 
                startingFrom={rangeStartingValue}
                endingOn={rangeEndingValue}
                onChange={setRangeEndingValue} />
    </div>
  );
};

export default Filter;
