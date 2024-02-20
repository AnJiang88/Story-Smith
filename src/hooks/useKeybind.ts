import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const useKeybind = (condition: (event: KeyboardEvent) => boolean, callback: () => void) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (condition(event)) {
      callbackRef.current();
    }
  }, [condition]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

export default useKeybind;
