import { useEffect } from "react";

const useEffectAsync = (effect, inputs) => {
  useEffect(() => {
    effect();
  }, inputs);
};

export default useEffectAsync;
