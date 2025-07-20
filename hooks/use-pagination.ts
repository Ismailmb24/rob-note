import { NoteTypes } from "@/lib/services/note";
import { useState } from "react";

export function usePagination<T>(items: T[] = []) {
  const [index, setIndex] = useState(items?.length ? (items.length - 1) : 0);

  const next = () => setIndex(i => Math.min(i + 1, items.length - 1));
  const prev = () => setIndex(i => Math.max(i - 1, 0));
  const current = items?.length > 0 ? items[index] : null;

  return {
    current,
    index,
    next,
    prev,
    hasNext: index < items?.length - 1,
    hasPrev: index > 0,
  };
}