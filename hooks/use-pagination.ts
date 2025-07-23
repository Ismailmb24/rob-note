import { NoteTypes } from "@/lib/services/note";
import { useEffect, useState } from "react";

export function usePagination<T>(items: T[] = []) {
  const [index, setIndex] = useState(items.length > 0 ? items.length - 1 : 0);

  // Reset index when items change
  useEffect(() => {
    setIndex(items.length > 0 ? items.length - 1 : 0);
  }, [items]);

  const next = () => setIndex(i => Math.min(i + 1, items.length - 1));
  const prev = () => setIndex(i => Math.max(i - 1, 0));
  const current = items[index];

  return {
    current,
    index,
    next,
    prev,
    hasNext: index < items?.length - 1,
    hasPrev: index > 0,
  };
}