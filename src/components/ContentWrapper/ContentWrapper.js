import styles from './ContentWrapper.module.scss';
/**
 * A basic Container Wrapper component
 * @param {Props} props The props object.
 * @param {string} props.content The content as string.
 * @param {string} props.className An optional className to be added to the container.
 * @param {React.ReactElement} props.children The children to be rendered.
 * @return {React.ReactElement} The ContentWrapper component.
 */
export default function ContentWrapper({ content, className, children }) {
  return (
    <article className={[styles.content, className].join(' ')}>
      <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      {children}
    </article>
  );
}
