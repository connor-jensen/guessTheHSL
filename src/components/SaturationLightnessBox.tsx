import * as React from "react";
import { CSSProperties } from "react";
import styled from "styled-components";
import { HSLContext } from "../HSLContext";

export const SaturationLightnessBox = ({size}: {size: number}) => {
  const [mouseDown, setMouseDown] = React.useState(false);
  const { hue, saturation, lightness, setHSL } = React.useContext(HSLContext);

  const setSaturationLightnessFromMouse = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    // if mouse is outside of the box, return early
    if (clientX < left || clientX > left + width || clientY < top || clientY > top + height) {
      return;
    }
    const x = clientX - left;
    const y = clientY - top;
    const s = x / width;
    const l = 1 - y / height;
    setHSL(null, Math.round(s * 100), Math.round(l * 100));
  };

  const setSaturationLightnessFromTouch = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    const { clientX, clientY } = event.touches[0];
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    // if mouse is outside of the box, return early
    if (clientX < left || clientX > left + width || clientY < top || clientY > top + height) {
      return;
    }
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
      event.preventDefault();
      setSaturationLightnessFromMouse(event);
    }
  };

  const touchStartEvent = (event: React.TouchEvent<HTMLDivElement>) => {
    setMouseDown(true);
    console.log("touch start");
    setSaturationLightnessFromTouch(event);
  };

  const touchMoveEvent = (event: React.TouchEvent<HTMLDivElement>) => {
    if (mouseDown) {
      console.log("touch move");
      setSaturationLightnessFromTouch(event);
    }
  };

  const touchEndEvent = (event: React.TouchEvent<HTMLDivElement>) => {
    setMouseDown(false);
    console.log("touch end");
  };

  return (
    <BoxWrapper
      onMouseDown={mouseDownEvent}
      onTouchStart={touchStartEvent}
      onMouseUp={mouseUpEvent}
      onTouchEnd={touchEndEvent}
      onMouseMove={mouseMoveEvent}
      onTouchMove={touchMoveEvent}
      style={{"--size": size + 'px'}}
    >
      <SaturationLightnessIndicator  style={{ "--hue": hue + "deg", "--saturation": saturation + "%", "--lightness": lightness + "%" }}/>
      <SaturationFilter />
      <LightnessFilter style={{ "--hue": hue + "deg" }} />
    </BoxWrapper>
  );
};

const SaturationLightnessIndicator = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid black;
  background-color: hsl(var(--hue), var(--saturation), var(--lightness));
  z-index: 1;
  transform: translate(-15px, 15px);
  bottom: var(--lightness);
  left: var(--saturation);
  box-shadow: white 0px 0px 0px 2px inset;
`

const BoxWrapper = styled.div`
  width: var(--size);
  height: var(--size);
  position: relative;
  border: 2px solid black;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
  touch-action: none;
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
