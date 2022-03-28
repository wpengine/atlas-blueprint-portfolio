import { selectFields } from 'gqty';
import { client } from 'client';

/**
 * Checks if a post is available given a custom post type.
 * Temporary until Faust's is404() is adjusted to account for custom post types.
 * @param {string} slug The slug of the custom post type.
 * @param {string} customPostType The WordPress custom post type.
 * @returns {bool}
 */
export default async function is404Cpt(slug, customPostType) {
  const customPostTypePost = await client.client.resolved(() => {
    const node = client.client.query[customPostType]({
      id: slug,
      idType: 'SLUG',
    });

    return selectFields(node, ['id']);
  });

  return customPostTypePost === null;
}
