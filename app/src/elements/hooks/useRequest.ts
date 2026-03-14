/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback, useState} from "react";

import {when} from "@/lib/utils";

export function useRequest<P extends readonly unknown[], T>(
  fetcher: (...args: P) => Promise<T>,
  loader: (status: boolean) => void = () => {},
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  return {
    data,
    loading,
    error,
    request: useCallback(async (...args: P): Promise<T> => {
      try {
        loader(true);
        setError(false);
        setLoading(true);

        const [result] = await when([fetcher(...args)]);

        setLoading(false);
        setData(result);
        loader(false);

        return result;
      } catch (e) {
        setLoading(false);
        setError(true);
        loader(false);

        throw e;
      }
    }, []),
  };
}
