import { gql } from '@apollo/client';
import React from 'react';

export default function CoreParagraph(props) {
  const attributes = props.attributes;
  return (
    <p
      className={attributes?.cssClassName}
      dangerouslySetInnerHTML={{ __html: attributes.content }}></p>
  );
}

CoreParagraph.fragments = {
  entry: gql`
    fragment CoreParagraphFragment on CoreParagraph {
      attributes {
        content
        fontSize
        textColor
        backgroundColor
        cssClassName
      }
    }
  `,
  key: `CoreParagraphFragment`,
};