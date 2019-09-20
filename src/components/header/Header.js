import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="heading">
        <h1>Review Master</h1>
        <p className="sub">
          An easy-to-use, simple service that offers reviews of restaurants around you.
        </p>
      </div>
      <div className="filter">
      </div>
    </header>
  )
}

export default Header;