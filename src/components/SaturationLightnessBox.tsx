import * as React from "react";
import { CSSProperties } from "react";
import styled from "styled-components";
import { HSLContext } from "../HSLContext";

export const SaturationLightnessBox = ({}: {}) => {
  const [mouseDown, setMouseDown] = React.useState(false);
  const { hue, saturation, lightness, setHSL } = React.useContext(HSLContext);

  const setSaturationLightnessFromMouse = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    const s = x / width;
    const l = 1 - y / height;
    setHSL(null, Math.round(s * 100), Math.round(l * 100));
  };

  const mouseDownEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    console.log("mouse down");
    setSaturationLightnessFromMouse(event);
  };

  const mouseUpEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(false);
    console.log("mouse up");
  };

  const mouseMoveEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDown) {
      console.log("mouse move");
      setSaturationLightnessFromMouse(event);
    }
  };

  return (
    <BoxWrapper
      onMouseDown={mouseDownEvent}
      onMouseUp={mouseUpEvent}
      onMouseMove={mouseMoveEvent}
    >
      <SaturationFilter />
      <LightnessFilter style={{ "--hue": hue + "deg" } as CSSProperties} />
    </BoxWrapper>
  );
};

const BoxWrapper = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
`;

const SaturationFilter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgb(0, 0, 0), rgb(255, 255, 255));
`;

const LightnessFilter = styled.div`
  position: absolute;
  mix-blend-mode: overlay;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    hsl(var(--hue) 100% 50% / 0),
    hsl(var(--hue) 100% 50% / 1)
  );
`;
