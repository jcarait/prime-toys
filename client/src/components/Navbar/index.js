import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import { authActions } from '../../slices/auth';
import './navbar.scss';

const Navbar = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  const logOut = async () => {
    closeMenu();
    Auth.logout();
    dispatch(authActions.logout());
  };

  if (isLoggedIn) {
    //returning specific navbar links based on the current state of the user
    return (
      <nav>
        <div className="navbar">
          <div
            className="title-container"
            onClick={() => navigate('/', { replace: true })}
          >
            <h2 className="header-title">Prime Toys</h2>
          </div>
          <button className="btn" onClick={handleToggle}>
            {navbarOpen ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </button>
          <ul className={navbarOpen ? 'nav-items showMenu' : 'nav-items '}>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={closeMenu}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/listings" onClick={closeMenu}>
                Listings
              </NavLink>
            </li>
            <li>
              <NavLink onClick={logOut} to="/">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav>
        <div className="navbar">
          <div
            className="title-container"
            onClick={() => navigate('/', { replace: true })}
          >
            <h2 className="header-title">Prime Toys</h2>
          </div>
          <button className="btn" onClick={handleToggle}>
            {navbarOpen ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </button>
          <ul className={navbarOpen ? 'nav-items showMenu' : 'nav-items '}>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/listings" onClick={closeMenu}>
                Listings
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" onClick={closeMenu}>
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Navbar;
