import './Footer.scss';

import React from 'react';
import cn from 'classnames';
import b_ from 'b_';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import tmdbLogo from '@/assets/img/tmdb-logos/tmdb_logo.svg';

const Footer = () => {
  const b = b_.B({ modSeparator: '--' }).with('footer');

  return (
    <footer className={cn(b(), 'text-center p-3')}>
      <div className={cn(b('link-wrapper'), 'mr-2')}>
        <span>© 2021,</span>
        <a
          className={b('link', { 'github': true })}
          href="https://github.com/nk11dev"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            className="mx-1"
            icon={faGithub}
          />
          nk11dev
        </a>
        <span>;</span>
      </div>

      <div className={cn(b('link-wrapper'), 'tmdb-logo')}>
        <span>
          This product uses the TMDb API but is not endorsed or certified by TMDb
          {' '}
        </span>
        <a
          className={b('link')}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
        >
          <img className="ml-1" src={tmdbLogo} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;