import React from 'react';

// Heading allows components to pass a heading level via props.
function Heading({ level = 'h1', children, className }) {
  const Tag = ({ ...props }) => React.createElement(level, props, children);

  return <Tag className={className}>{children}</Tag>;
}

export default Heading;
