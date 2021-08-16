import React from 'react';

/**
 * Simple DropDown Component with pluggable data.
 * @component
 * @param {object} props - Props for the Component 
 * @param {object} props.data - The data to be shown in the dropdown list.
 * @param {string} props.data.text - The text to be shown in the dropdown list.
 * @param {number} props.data.value - The value of the dropdown list items.
 * @param {function} props.onChange - The function to call when the user changes the selected list item.
 * @param {?number} props.startingFrom - The starting cutoff point for the list items in the dropdown.
 * @param {?number} props.endingOn - The ending cutoff point for the list items in the dropdown.
 * @returns {React.Component} Drop Down Component
 */
const DropDown = (props) => {
  let filteredData = props.data;

  // Only filter if `startingFrom` value is not null, '', or undefined.
  if (Number(props.startingFrom) > 0 || props.startingFrom !== undefined) {
    filteredData = filteredData.filter(item => item.value === '' || item.value >= props.startingFrom);
  }

  const list = filteredData.map((item, index) => {
    // Have the first option be selected by default.
    // Unless the user has already selected an item
    // before based on its value.
    const isSelected = props.endingOn !== null ? item.value === parseInt(props.endingOn) : index === 0;

    return (
      <option key={index}
              value={item.value}
              selected={isSelected}>
        {item.text}
      </option>
    );
  });

  const onChange = (e) => {
    props.onChange(e.target.value);
  }

  return (
    <select onChange={onChange}>
      {list}
    </select>
  );

};

export default DropDown;
