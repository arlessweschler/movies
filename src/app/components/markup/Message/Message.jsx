import styles from './Message.module.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { withTranslation } from 'react-i18next';

function Message({
  t,
  cls = '',
  text,
  showAccessNote = false,
  children = null,
}) {
  if (!text && !children && !showAccessNote) return null;

  return (
    <div className={cn(styles.message, cls)}>
      {children || text}

      {showAccessNote && (
        <div className={styles.accessNote}>
          {t('access_note')}
        </div>
      )}
    </div>
  );
}

Message.propTypes = {
  t: PT.func.isRequired,
  cls: PT.string,
  text: PT.string,
  showAccessNote: PT.bool,
  children: PT.element
};

export default withTranslation()(Message);