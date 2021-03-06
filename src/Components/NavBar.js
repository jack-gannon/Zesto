import React, { useState } from "react";
import { Link } from "@reach/router";
import Logo from "./Logo";

const NavBar = props => {
  const [isOpen, toggleOpen] = useState(false);

  const handleToggle = () => {
    toggleOpen(!isOpen);
  };

  let bookmarkLength = Object.keys(props.bookmarks).length;
  let shoppingListLength = Object.keys(props.listItems).length;

  return (
    <nav className="navbar">
      <Link to="/" onClick={() => props.setResults([])}>
        <Logo
          className={`navbar__logo ${
            location.pathname === "/" && !isOpen
              ? "navbar__logo--light"
              : "navbar__logo--dark"
          }`}
        />
      </Link>
      <div className="navbar__links--desktop">
        <ul>
          <li>
            <Link to="/bookmarks">
              <span className="navbar__menu-link">
                <svg viewBox="0 0 32 32">
                  <polygon points="5.5,3.5 27.5,3.5 27.5,28.5 16.5,21.5 5.5,28.5 " />
                </svg>
                <p>Saved</p>
                <p className="link__item-count">{bookmarkLength}</p>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/shoppinglist">
              <span className="navbar__menu-link">
                <svg viewBox="0 0 32 32">
                  <circle cx="6" cy="7" r="2.5" />
                  <circle cx="6" cy="16" r="2.5" />
                  <circle cx="6" cy="25" r="2.5" />
                  <line x1="11" y1="7.5" x2="27" y2="7.5" />
                  <line x1="11" y1="16.5" x2="27" y2="16.5" />
                  <line x1="11" y1="25.5" x2="27" y2="25.5" />
                </svg>
                <p>Shopping List</p>
                <p className="link__item-count">{shoppingListLength}</p>
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar__links--mobile">
        <button
          className="navbar__menu-toggle"
          aria-label="Open the Menu"
          onClick={handleToggle}
        >
          {isOpen ? (
            <span>&times;</span>
          ) : (
            <svg viewBox="0 0 32 32">
              <line x1="6" y1="9" x2="26" y2="9" />
              <line x1="6" y1="16" x2="26" y2="16" />
              <line x1="6" y1="23" x2="26" y2="23" />
            </svg>
          )}
        </button>
        <div className={`navbar__menu-links${isOpen ? "--show" : "--hide"}`}>
          <Logo
            className={`navbar__logo ${
              location.pathname === "/" && !isOpen
                ? "navbar__logo--light"
                : "navbar__logo--dark"
            }`}
          />
          <ul>
            <li>
              <Link to="/bookmarks" onClick={handleToggle}>
                <span className="navbar__menu-link">
                  <svg viewBox="0 0 32 32">
                    <polygon points="5.5,3.5 27.5,3.5 27.5,28.5 16.5,21.5 5.5,28.5 " />
                  </svg>
                  <p>Saved</p>
                  <p className="link__item-count">{bookmarkLength}</p>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/shoppinglist" onClick={handleToggle}>
                <span className="navbar__menu-link">
                  <svg viewBox="0 0 32 32">
                    <circle cx="6" cy="7" r="2.5" />
                    <circle cx="6" cy="16" r="2.5" />
                    <circle cx="6" cy="25" r="2.5" />
                    <line x1="11" y1="7.5" x2="27" y2="7.5" />
                    <line x1="11" y1="16.5" x2="27" y2="16.5" />
                    <line x1="11" y1="25.5" x2="27" y2="25.5" />
                  </svg>
                  <p>Shopping List</p>
                  <p className="link__item-count">{shoppingListLength}</p>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
