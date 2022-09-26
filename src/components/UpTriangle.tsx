import React from 'react';
import styled from 'styled-components';

const UpTriangle = ({
  currentHSL,
  type,
}: {
  currentHSL: HSL;
  type: 'hue' | 'saturation' | 'lightness';
}) => {
  return (
    <svg
      width="58"
      height="40"
      viewBox="0 0 58 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
         d="M30.981 2.39309L56.0626 34.975C57.3281 36.6189 56.1562 39 54.0816 39H3.91842C1.84383 39 0.671918 36.6189 1.93741 34.975L27.019 2.39309C28.0197 1.09307 29.9803 1.09307 30.981 2.39309Z"
        fill={`url(#linear-${type}-up)`}
        stroke="#303030"
      />
      <defs>
        <linearGradient
          id={`linear-${type}-up`}
          x1="27.5"
          y1="-2"
          x2="27.5"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          {type === 'hue' && (
            <>
              <stop
                stop-color={`hsl(${(currentHSL.hue + 20) % 360}deg, ${currentHSL.saturation}%, ${currentHSL.lightness}%)`}
              />
              <stop
                offset="0.6"
                stop-color={`hsl(${currentHSL.hue}deg, ${
                  currentHSL.saturation
                }%, ${currentHSL.lightness}%)`}
              />
            </>
          )}
          {type === 'saturation' && (
            <>
              <stop
                stop-color={`hsl(${currentHSL.hue}deg, ${currentHSL.saturation + 20}%, ${currentHSL.lightness}%)`}
              />
              <stop
                offset="0.6"
                stop-color={`hsl(${currentHSL.hue}deg, ${
                  currentHSL.saturation
                }%, ${currentHSL.lightness}%)`}
              />
            </>
          )}
          {type === 'lightness' && (
            <>
              <stop
                stop-color={`hsl(${currentHSL.hue}deg, ${currentHSL.saturation}%, ${currentHSL.lightness + 20}%)`}
              />
              <stop
                offset="0.6"
                stop-color={`hsl(${currentHSL.hue}deg, ${
                  currentHSL.saturation
                }%, ${currentHSL.lightness}%)`}
              />
            </>
          )}
        </linearGradient>
      </defs>
    </svg>
  );
};

export default UpTriangle;
