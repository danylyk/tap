import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function when<T extends readonly unknown[]>(
  values: readonly [...T],
) {
  const [, ...result] = await Promise.allSettled([wait(300), ...values]);

  for (const item of result) {
    if (item.status === "rejected") {
      throw item.reason;
    }
  }

  return result.map((item) => {
    return (item as PromiseFulfilledResult<unknown>).value;
  }) as {
    [K in keyof T]: Awaited<T[K]>;
  };
}
