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
