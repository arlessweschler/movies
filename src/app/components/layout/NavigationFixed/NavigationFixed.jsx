import './NavigationFixed.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

import NavToggle from './NavToggle';
import SearchForm from './SearchForm';

const NavigationFixed = (props) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <div className="container">

        <Link to='/'>
          <FontAwesomeIcon color="white" icon={faFilm} />
        </Link>
        <NavToggle>
          <SearchForm />
        </NavToggle>
      </div>
    </nav>
  );
}

export default NavigationFixed;