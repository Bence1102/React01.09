import { useEffect, useRef, useCallback } from "react";

export function usePolling(callback, interval = 30000) {
  const savedCallback = useRef(callback);
  const intervalIdRef = useRef(null);

  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const startPolling = useCallback(() => {
    if (intervalIdRef.current) return; 

   
    savedCallback.current();

    intervalIdRef.current = setInterval(() => {
      savedCallback.current();
    }, interval);
  }, [interval]);

  const stopPolling = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  
  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  return { startPolling, stopPolling };
}