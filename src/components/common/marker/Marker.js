import React from 'react';
import './Marker.css';

/**
 * A Marker Component to be used with Google Map
 *
 * @component
 * @param {object} props - Props for the Component
 * @param {string} props.name - The restaurant's name.
 * @param {boolean} props.isUser - In case the marker represents the user on the map.
 * @param {?string} props.$hover - Mouse hover indicator provided by Google Maps 
 * Component.
 * @returns {React.Component} Map Marker Component
 */
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
