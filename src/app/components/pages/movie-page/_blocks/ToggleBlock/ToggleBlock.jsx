import './ToggleBlock.scss';

import React from 'react';
import PT from 'prop-types';

import { withTranslation } from 'react-i18next';

function ToggleBlock({ t, handleToggle }) {
  return (
    <div className="toggle-block custom-control custom-switch my-auto">
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
  );
}

ToggleBlock.propTypes = {
  t: PT.func.isRequired,
  handleToggle: PT.func.isRequired
};

export default withTranslation()(ToggleBlock);