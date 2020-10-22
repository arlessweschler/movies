import './NavigationFixed.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

import NavToggle from './NavToggle';
import SearchForm from './SearchForm';

const NavigationFixed = (props) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark fixed-top">
      <div className="container">

        <Link to='/' className="link-home">
          <FontAwesomeIcon className="mr-1" 
          icon={faFilm} />
          Movies
        </Link>
        <NavToggle>
          <SearchForm />
        </NavToggle>
      </div>
    </nav>
  );
}

export default NavigationFixed;