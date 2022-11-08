/**
 * Simple utility function for removing duplicate items from an array based on a key.
 * @param {any[]} arr The array of items to deduplicate
 * @param {(any) => any} pred The predicate to use for deriving the key
 * @returns The list with the duplicate items removed
 */
const uniqBy = (arr, pred) => {
  const cb = typeof pred === 'function' ? pred : (o) => o[pred];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
};

export default uniqBy;
