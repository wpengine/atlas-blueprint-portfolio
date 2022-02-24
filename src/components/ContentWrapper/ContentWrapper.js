import { Heading, FeaturedImage } from 'components';

export default function ContentWrapper({title, featuredImage, content, className, children}) {
  return (
    <article className={['content', className].join(' ')}>
      <Heading className="text-center" level="h2">{title}</Heading>
      <FeaturedImage image={featuredImage?.sourceUrl()} alt={featuredImage?.altText} />
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  )
}