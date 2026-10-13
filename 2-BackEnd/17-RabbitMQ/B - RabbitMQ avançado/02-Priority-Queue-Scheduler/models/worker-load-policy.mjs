export const createWorkerLoadPolicy = ({
  prefetch,
  highWatermark,
  queuePressure
}) => {
  const shouldPauseDispatch = queuePressure.overloaded;
  const nextPrefetch = shouldPauseDispatch ? Math.max(1, Math.floor(prefetch / 2)) : prefetch;

  return {
    prefetch,
    highWatermark,
    shouldPauseDispatch,
    nextPrefetch,
    reason: shouldPauseDispatch
      ? "Queue pressure crossed the configured high watermark."
      : "Queue pressure is inside the expected range."
  };
};
