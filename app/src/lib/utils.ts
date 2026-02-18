export function mapWith<T1, T2, T3>(
  array: T2[],
  mapper: (helper: T1, value: T2, index: number, array: T2[]) => T3 | undefined,
  helper: T1,
) {
  return array
    .map((value, index, array) => {
      return mapper(helper, value, index, array);
    })
    .filter((value) => {
      return value !== undefined;
    });
}

export function groupOf<T1 extends PropertyKey, T2>(array: [T1, T2][]) {
  return array.reduce(
    (entries, entry) => {
      if (!entry) {
        return entries;
      }

      const [key, value] = entry;

      if (key === null || key === undefined) {
        return entries;
      }

      if (!entries[key]) {
        entries[key] = [];
      }

      entries[key].push(value);

      return entries;
    },
    {} as Record<T1, T2[]>,
  );
}

export function forWith<T1, T2>(
  array: T2[],
  callback: (helper: T1, value: T2, index: number, array: T2[]) => void,
  helper: T1,
) {
  return array.forEach((value, index) => {
    return callback(helper, value, index, array);
  });
}
