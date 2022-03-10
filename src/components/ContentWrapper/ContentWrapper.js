export default function ContentWrapper({ content, className, children }) {
  return (
    <article className={['content', className].join(' ')}>
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  );
}
