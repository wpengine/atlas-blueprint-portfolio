const PUBLISH_DATE_FORMAT = { year: 'numeric', month: 'long', day: 'numeric' };

/**
 * Formats a date as: March 2, 2022
 *
 * @param {string} date A date string.
 * @returns Formatted date or null if date is invalid.
 */
export default function FormatDate({ date }) {
  let formattedDate = new Date(date);

  if (isNaN(formattedDate.valueOf())) {
    return null;
  }

  return <>{formattedDate.toLocaleDateString('en-US', PUBLISH_DATE_FORMAT)}</>;
}
