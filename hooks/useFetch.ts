import { useState, useEffect } from "react";
import useSWR, { SWRConfiguration } from "swr";

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

//fetch helper
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFetch<T = unknown>(url: string, options?: SWRConfiguration): UseFetchResult<T> {
  const {data, error, isLoading} = useSWR(url, fetcher, options);
  const typeSafeData: T | null = data || null;

  return { data, loading: isLoading, error };
}