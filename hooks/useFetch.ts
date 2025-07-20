import { useState, useEffect } from "react";

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T = unknown>(url: string, options?: RequestInit): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    fetch(url, options)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, loading, error };
}