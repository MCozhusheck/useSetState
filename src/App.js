import React, { useLayoutEffect, useState, useCallback, useRef } from "react";
import "./App.css";

function App() {
  let [state, setState] = useSetState({ counter: 0 });
  return (
    <div className="App">
      <button
        onClick={() => {
          setState(
            (prevState) => ({
              counter: prevState.counter + 1,
            }),
            () => console.log("inc")
          );
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          setState(
            (prevState) => ({
              counter: prevState.counter - 1,
            }),
            () => {
              console.log("dec");
            }
          );
        }}
      >
        Decrement
      </button>
      <button
        onClick={() =>
          setState({ counter: 100 }, () => console.log("set to 100"))
        }
      >
        set to 100
      </button>
      <p>{state.counter}</p>
    </div>
  );
}

const useSetState = (initialState = {}) => {
  const [state, set] = useState(initialState);
  const updateState = useCallback(
    (patch) => {
      set((prevState) => {
        if (patch instanceof Function) {
          return Object.assign({}, prevState, patch(prevState));
        } else {
          return Object.assign(
            {},
            prevState,
            patch instanceof Function ? patch(prevState) : patch
          );
        }
      });
    },
    [set]
  );
  let pendingCallbacks = useRef();
  useLayoutEffect(() => {
    if (pendingCallbacks.current instanceof Function) {
      pendingCallbacks.current();
      pendingCallbacks.current = {};
    }
  });
  const setState = function (patch, cb) {
    updateState(patch);
    if (cb instanceof Function) {
      pendingCallbacks.current = cb;
    }
  };
  return [state, setState];
};

export default App;
