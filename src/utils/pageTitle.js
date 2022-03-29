/**
 * Returns a title for the current page
 * @param {GeneralSettings} generalSettings The  general settings node.
 * @param {string} titleOverride An optional title to be used instead of the general settings Title.
 * @param {string} descriptionOverride An optional description to be used instead of the general settings Description.
 * @returns {string} The page Title.
 */
function pageTitle(
  generalSettings,
  titleOverride = null,
  descriptionOverride = null
) {
  const title = titleOverride ? titleOverride : generalSettings?.title;
  const description = descriptionOverride
    ? descriptionOverride
    : generalSettings?.description;

  if (!title && !description) {
    return '';
  }
  if (title && description) {
    return `${title} - ${description}`;
  }
  return [title, description].join('').trim();
}

export default pageTitle;
