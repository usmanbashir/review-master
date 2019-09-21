import React from 'react';
import './Marker.css';

const Marker = (props) => {
  const hovered = props.$hover ? 'hovered' : '';
  const isUser = props.isUser ? 'user' : '';

  return (
    <div className={`map-marker ${hovered} ${isUser}`}>
      {!props.isUser && props.name}
    </div>
  );
};

export default Marker;