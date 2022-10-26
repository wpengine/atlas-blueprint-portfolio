import React from 'react';

/**
 * Heading allows components to pass a heading level via props.
 * @param {Props} props The props object.
 * @param {h1|h2|h3|h4|h5|h6} props.level An heading level type to render.
 * @param {string} props.className An optional className to be added to the component.
 * @param {React.ReactElement} props.children The children to be rendered.
 * @return {React.ReactElement} The Heading component.
 */
function Heading({ level = 'h1', children, className }) {
  const Tag = ({ ...props }) => React.createElement(level, props, children);

  return <Tag className={className}>{children}</Tag>;
}

export default Heading;
