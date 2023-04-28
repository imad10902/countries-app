import React from 'react';
import { Link } from 'react-router-dom';
import './Logo/Logo.css';

export const Header = () => {
  return (
    <>
      <header style={{ position: 'sticky', top: '0' }}>
        <nav style={{backgroundColor:"#202020"}}>
          <Link to="/">
          <div className="logo-container">
              <img src={require("./Logo/SearchGlobe.png")} alt="My Logo" />
          </div>
          </Link>
        </nav>
      </header>
    </>
  );
};
