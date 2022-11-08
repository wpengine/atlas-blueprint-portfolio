import appConfig from 'app.config';
import { useRef, useEffect, useState } from 'react';

/**
 * The `useFocusFirstNewResult` hook provides the ability to set the focus
 * on the first new post result in order to improve accessibility.
 *
 * @param {array} posts An array of posts.
 * @returns {{firstNewResultRef: HTMLDivElement, firstNewResultIndex: number}} Result object
 */
export default function useFocusFirstNewResult(posts) {
  const firstNewResultRef = useRef();
  const [firstNewResultIndex, setFirstnewResultIndex] = useState(0);

  useEffect(() => {
    const isPaginated = posts && posts.length > appConfig.postsPerPage;

    if (isPaginated) {
      firstNewResultRef.current?.focus();

      setFirstnewResultIndex(() => {
        const partialSetLength = posts.length % appConfig.postsPerPage;
        const delta =
          partialSetLength === 0 ? appConfig.postsPerPage : partialSetLength;
        const focusIndex = posts.length - delta;

        return focusIndex;
      });
    }
  }, [posts, firstNewResultIndex]);

  return { firstNewResultRef, firstNewResultIndex };
}
