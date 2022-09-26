import React from 'react';
import styled from 'styled-components';

const DownTriangle = ({
  currentHSL,
  type,
  onClick,
}: {
  currentHSL: HSL;
  type: 'hue' | 'saturation' | 'lightness';
  onClick: () => void;
}) => {
  return (
    <svg
      width="58"
      height="40"
      viewBox="0 0 58 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => onClick()}
    >
      <path
        d="M27.019 37.6069L1.93742 5.02497C0.671924 3.38105 1.84383 0.999994 3.91843 0.999995L54.0816 0.999999C56.1562 0.999999 57.3281 3.38106 56.0626 5.02499L30.981 37.6069C29.9803 38.9069 28.0197 38.9069 27.019 37.6069Z"
        fill={`url(#linear-${type}-down)`}
        stroke="#303030"
      />
      <defs>
        <linearGradient
          id={`linear-${type}-down`}
          x1="27.5"
          y1="-2"
          x2="27.5"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          {type === 'hue' && (
            <>
              <stop
                stop-color={`hsl(${currentHSL.hue}deg, ${currentHSL.saturation}%, ${currentHSL.lightness}%)`}
              />
              <stop
                offset="0.6"
                stop-color={`hsl(${(currentHSL.hue - 20) % 360}deg, ${
                  currentHSL.saturation
                }%, ${currentHSL.lightness}%)`}
              />
            </>
          )}
          {type === 'saturation' && (
            <>
              <stop
                stop-color={`hsl(${currentHSL.hue}deg, ${currentHSL.saturation}%, ${currentHSL.lightness}%)`}
              />
              <stop
                offset="0.6"
                stop-color={`hsl(${currentHSL.hue}deg, ${
                  currentHSL.saturation - 20
                }%, ${currentHSL.lightness}%)`}
              />
            </>
          )}
          {type === 'lightness' && (
            <>
              <stop
                stop-color={`hsl(${currentHSL.hue}deg, ${currentHSL.saturation}%, ${currentHSL.lightness}%)`}
              />
              <stop
                offset="0.6"
                stop-color={`hsl(${currentHSL.hue}deg, ${
                  currentHSL.saturation
                }%, ${currentHSL.lightness - 20}%)`}
              />
            </>
          )}
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DownTriangle;
