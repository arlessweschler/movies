import './ToggleBlock.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import cn from 'classnames';

import { withTranslation } from 'react-i18next';

function ToggleBlock({ t, cls, handleToggle }) {
  return (
    <Fragment>
      <div className={cn(cls, 'custom-control custom-switch my-auto')}>
        <input
          id="ActorsToggle"
          type="checkbox"
          className="custom-control-input"
          onChange={handleToggle}
        />
        <label
          className="custom-control-label"
          htmlFor="ActorsToggle"
        >
          {t('movie_details.actors.toggle_label')}
        </label>
      </div>
    </Fragment>
  );
};

ToggleBlock.propTypes = {
  t: PT.func.isRequired,
  cls_base: PT.string,

  handleToggle: PT.func.isRequired
};

export default withTranslation()(ToggleBlock);