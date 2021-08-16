import React from 'react';
import './Popup.css';

/**
 * Generic Popup Window Container for Dialog Boxes.
 *
 * @component
 * @param {object} props - Props for the Component
 * @param {object} props.children - Child Component to be Rendered
 * @returns {React.Component} Popup Window Container Component
 */
const Popup = (props) => {
  return (
    <div className="overlay">
      <div className="popup">
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
