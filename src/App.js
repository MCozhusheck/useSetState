import { useState, useCallback } from "react";

const useSetState = (initialState = {}) => {
  const [state, set] = useState(initialState);
  const setState = useCallback(
    (patch) => {
      set((prevState) => {
        return Object.assign(
          {},
          prevState,
          patch instanceof Function ? patch(prevState) : patch
        );
      });
    },
    [set]
  );
  return [state, setState];
};

export default useSetState;
