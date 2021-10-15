import { useCallback, useEffect, useRef, useState } from "react";

export const useUnmountRef = () => {
  const unmountRef = useRef(false);

  useEffect(() => {
    unmountRef.current = true;
  }, []);

  return unmountRef;
};

export const useSafeState = (unmountRef: any, defaultValue: any) => {
  const [state, changeState] = useState(defaultValue);
  const wrapChangeState = useCallback(
    (v: any) => {
      if (!unmountRef.current) {
        changeState(v);
      }
    },
    [changeState, unmountRef]
  );

  return [state, wrapChangeState];
};
