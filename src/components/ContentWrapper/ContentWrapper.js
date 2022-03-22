import styles from './ContentWrapper.module.scss';

export default function ContentWrapper({ content, className, children }) {
  return (
    <article className={[styles.content, className].join(' ')}>
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  );
}
