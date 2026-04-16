"use client";

import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, fallback: T) {
  const [state, setState] = useState<T>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      setState(raw ? (JSON.parse(raw) as T) : fallback);
    } catch {
      setState(fallback);
    } finally {
      setReady(true);
    }
  }, [fallback, key]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, ready, state]);

  return { state, setState, ready };
}
