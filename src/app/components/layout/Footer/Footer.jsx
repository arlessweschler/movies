import './Footer.scss';

import React from 'react';
import b_ from 'b_';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import tmdbLogo from 'app_assets/img/tmdb_logo.svg';

const Footer = () => {
  const b = b_.B({ modSeparator: '--' }).with('footer');

  return (
    <footer className={cn(b(), 'font-small')}>
      <div className="text-center py-3">
        <div className={cn(b('link-wrapper'), 'mr-2')}>
          <span>© 2020,</span>
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
          <a
            className={b('link')}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            API powered by
            {' '}
            <img
              className="ml-1"
              src={tmdbLogo}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;