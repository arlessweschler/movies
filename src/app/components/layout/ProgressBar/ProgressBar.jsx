import styles from './ProgressBar.module.scss';

import React from 'react';
import cn from 'classnames';

export default function ProgressBar() {
  return (
    <div className={cn(styles.progressWrapper, 'progress')}>
      <div className={cn(styles.progressBar, 'progress-bar progress-bar-striped')} />
    </div>
  );
}