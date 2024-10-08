// import { RefObject } from "react";

import { useCallback, useLayoutEffect, useRef } from "react";

export type NextAnimationFrameHandlerType = ({
  timeFraction,
  firstFrameTime,
  now,
}: {
  timeFraction: number;
  firstFrameTime: React.MutableRefObject<number>;
  now: number;
}) => void;

interface UseAnimationFramePropsType {
  nextAnimationFrameHandler: NextAnimationFrameHandlerType;
  duration: number;
  shouldAnimate: boolean;
}

export const useAnimationFrame = ({
  nextAnimationFrameHandler,
  // we still want to have "infinite" animations in some cases
  duration = Number.POSITIVE_INFINITY,
  shouldAnimate = true,
}: UseAnimationFramePropsType) => {
  const frame = useRef(0);
  // keep track of when animation is started
  const firstFrameTime = useRef(performance.now());

  const animate = useCallback(
    (now) => {
      // calculate at what time fraction we are currently of whole time of animation
      let timeFraction = (now - firstFrameTime.current) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }

      if (timeFraction <= 1) {
        nextAnimationFrameHandler({ timeFraction, firstFrameTime, now });

        // request next frame only in cases when we not reached 100% of duration
        if (timeFraction !== 1) frame.current = requestAnimationFrame(animate);
      }
    },
    [duration, nextAnimationFrameHandler]
  );

  useLayoutEffect(() => {
    if (shouldAnimate) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame.current);
    }

    return () => cancelAnimationFrame(frame.current);
  }, [animate, shouldAnimate]);
};
