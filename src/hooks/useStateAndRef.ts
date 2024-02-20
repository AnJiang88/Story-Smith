import { useCallback, useRef, useState } from "react";

function useStateAndRef<T>(initialValue: T) {
  const [value, _setValue] = useState(initialValue);
  const valueRef = useRef(value);

  const setValue = useCallback((newValue: T) => {
    valueRef.current = newValue;
    _setValue(newValue);
  }, []);
  
  return [value, setValue, valueRef] as const;
}

export default useStateAndRef;
