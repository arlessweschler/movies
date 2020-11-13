import './Message.scss';

import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';

function Message({ cls = '', text, children=null }) {
  if (!text && !children) return null;

  return (
    <div className={cn('message', cls)}>
      {children
        ? children
        : text}
    </div>
  );
}

Message.propTypes = {
  cls: PT.string,
  children: PT.element,
  text: PT.string
};

export default Message;