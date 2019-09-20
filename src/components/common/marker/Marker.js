import React from 'react';
import './Marker.css';

const Marker = (props) => {
  const hovered = props.$hover ? 'hovered' : '';

  return (
    <div className={`map-marker ${hovered}`}>
      {props.name}
    </div>
  );
};

export default Marker;