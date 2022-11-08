import { FormatDate } from 'components';
/**
 * PostInfo component renders post specific information.
 * @param {string} props.date The post publish date.
 * @param {string} props.author The post author's name.
 * @param {string} props.className An optional className to be added to the PostInfo.
 * @returns {React.ReactElement} The PostInfo component
 */
export default function PostInfo({ className, author, date }) {
  if (!date && !author) {
    return null;
  }

  return (
    <div className={className}>
      {date && (
        <time dateTime={date}>
          <FormatDate date={date} />
        </time>
      )}
      {date && author && <>&nbsp;</>}
      {author && <span>By {author}</span>}
    </div>
  );
}
