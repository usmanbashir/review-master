import React from 'react';
import './Header.css';
import Filter from '../filter/Filter';

/**
 * @component
 * @returns {React.Component}
 */
function Header() {
  return (
    <header className="app-header">
      <div className="heading">
        <h1>Review Master</h1>
        <p className="sub">
          An easy-to-use, simple service that offers reviews of restaurants around you.
        </p>
      </div>
      <Filter />
    </header>
  )
}

export default Header;
