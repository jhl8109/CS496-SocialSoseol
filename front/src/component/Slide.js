import React from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";

function Slide({
  content,
  color,
  offsetRadius,
  index,
  animationConfig,
  moveSlide,
  delta,
  down,
  absoluteIndex,
  totalSlides
}) {
  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 1));

  const translateYoffset =
    50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
      translateY = -100;
    }
  }

  if (offsetFromMiddle === 0 && down) {
    translateY += delta[1] / (offsetRadius + 1);
    if (translateY > -40) {
      moveSlide(-1);
    }
    if (translateY < -100) {
      moveSlide(1);
    }
  }
  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }

  const [props, set] = useSpring(() => ({
    to: {
      transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
      top: `${
        offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 50) / offsetRadius
      }%`,
      opacity: distanceFactor * distanceFactor
    },
    config: { animationConfig }
  }));

  const clamp = (val, min, max) => {
    return val > max ? max : val < min ? min : val;
  };

  const refresh = () => {
    if (absoluteIndex === 0) {
      translateY = clamp(translateY, Math.INFINITY, -50);
    }
    if (absoluteIndex === totalSlides - 1) {
      translateY = clamp(translateY, -50, -Math.INFINITY);
    }
    set({
      to: {
        transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
        top: `${
          offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 50) / offsetRadius
        }%`,
        opacity: distanceFactor * distanceFactor
      },
      config: { animationConfig }
    });
  };

  const bind = useGesture({
    onDrag: ({ down, delta }) => {
      if (offsetFromMiddle === 0 && down) {
        if (absoluteIndex === 0 && delta[1] > 0) {
          delta[1] = 0;
        }
        translateY += delta[1] / (offsetRadius + 1);
        if (translateY > -40) {
          moveSlide(-1);
        }
        if (translateY < -100) {
          moveSlide(1);
        }
      }
      refresh();
    },
    onWheel: ({ wheeling, delta }) => {
      translateY = clamp(translateY, -110, -30);
      if (offsetFromMiddle === 0 && wheeling) {
        translateY += -delta[1] / (offsetRadius + 1);
        if (translateY > -40) {
          moveSlide(-1);
        }
        if (translateY < -100) {
          moveSlide(1);
        }
      }
      refresh();
    }
  });

  refresh();

  return (
    <animated.div
      {...bind()}
      style={{
        ...props,
        zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2),
        position: "absolute",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        onClick={() => moveSlide(offsetFromMiddle)}
        style={{
          backgroundColor: color,
          position: "relative",
          width: "90vw",
          height: "80%",
          fontSize: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformOrigin: "50% 50%",
          borderRadius: "8px"
        }}
      >
        {content}
      </div>
    </animated.div>
  );
}

export default Slide;
