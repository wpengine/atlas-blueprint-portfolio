import {ReactNode} from 'react';

import { Heading, FeaturedImage } from 'components';

export type ContentWrapperProps = CommonProps & {
  title: string | undefined;
  featuredImage: string | undefined;
  content: string | undefined;
  children?: ReactNode;
}

export default function ContentWrapper({title, featuredImage, content, className, children}: ContentWrapperProps) {
  return (
    <article className={['content', className].join(' ')}>
      <Heading className="text-center" level="h2">{title}</Heading>
      <FeaturedImage image={featuredImage} />
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  )
}