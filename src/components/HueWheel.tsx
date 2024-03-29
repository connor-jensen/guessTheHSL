import * as React from 'react';
import styled from 'styled-components';
import { HSLContext } from '../HSLContext';

const setHueFromAngle = (
  event: React.MouseEvent<HTMLDivElement>,
  setHue: (hue: number) => void
) => {
  const div = event.currentTarget;
  const rect = div.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const  mouseX = event.clientX;
  const  mouseY = event.clientY;
  const dx = mouseX - centerX;
  const dy = centerY - mouseY;
  let angle = -((Math.atan2(dy, dx) * 180) / Math.PI) + 90;
  if (angle < 0) {
    angle += 360;
  }

  // round angle to nearest integer and set state
  setHue(Math.round(angle));
};

const setHueFromTouchAngle = (
  event: React.TouchEvent<HTMLDivElement>,
  setHue: (hue: number) => void
) => {
  const div = event.currentTarget;
  const rect = div.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const  mouseX = event.touches[0].clientX;
  const  mouseY = event.touches[0].clientY;;
  const dx = mouseX - centerX;
  const dy = centerY - mouseY;
  let angle = -((Math.atan2(dy, dx) * 180) / Math.PI) + 90;
  if (angle < 0) {
    angle += 360;
  }

  // round angle to nearest integer and set state
  setHue(Math.round(angle));
};

export const HueWheel = ({ size }: { size: number }) => {
  const [mouseDown, setMouseDown] = React.useState(false);
  const { hue, setHSL } = React.useContext(HSLContext);
  const setHue = (hue: number) => setHSL(hue, null, null);

  const mouseDownEvent = (event: React.MouseEvent<HTMLDivElement> ) => {
    setMouseDown(true);
    // console.log("mouse down");
    setHueFromAngle(event, setHue);
  };

  const mouseUpEvent = (event: React.MouseEvent<HTMLDivElement> ) => {
    setMouseDown(false);
    // console.log("mouse up");
  };

  const mouseMoveEvent = (event: React.MouseEvent<HTMLDivElement> ) => {
    if (mouseDown) {
      // console.log("mouse move");
      setHueFromAngle(event, setHue);
    }
  };

  const touchStartEvent = (event: React.TouchEvent<HTMLDivElement>) => {
    setMouseDown(true);
    // console.log("mouse down");
    setHueFromTouchAngle(event, setHue);
  };

  const touchEndEvent = (event: React.TouchEvent<HTMLDivElement>) => {
    setMouseDown(false);
    // console.log("mouse up");
  };

  const touchMoveEvent = (event: React.TouchEvent<HTMLDivElement>) => {
    if (mouseDown) {
      // console.log("mouse move");
      setHueFromTouchAngle(event, setHue);
    }
  };

  return (
    <HueWheelWrapper
      onMouseDown={mouseDownEvent}
      onMouseUp={mouseUpEvent}
      onMouseMove={mouseMoveEvent}
      onTouchStart={touchStartEvent}
      onTouchEnd={touchEndEvent}
      onTouchMove={touchMoveEvent}
      style={{ '--size': size + 'px' }}
    >
      <HueIndicator
        style={{
          '--degrees': hue - 90 + 'deg',
          '--hue': hue + 'deg',
          '--offset': size * 0.43 + 'px',
          size: size,
        }}
      />
      <HueWheelBlockerWrapper>
        <dt>Hue</dt>
        <dd>{hue} degrees</dd>
      </HueWheelBlockerWrapper>
    </HueWheelWrapper>
  );
};

const HueIndicator = styled.div`
  position: absolute;
  width: calc(0.18 * var(--size));
  height: calc(0.12 * var(--size));
  border: 4px solid black;
  background-color: hsl(var(--hue), 100%, 50%);
  // rotate by 90 degrees
  transform: rotate(var(--degrees)) translate(var(--offset), 0px);
  transform-origin: center;
  box-shadow: white 0px 0px 0px 2px inset;
`;

const HueWheelBlockerWrapper = styled.dl`
  height: calc(var(--size) - 0.25 * var(--size));
  width: calc(var(--size) - 0.25 * var(--size));
  border-radius: 50%;
  background-color: white;
  border: 2px solid black;
  display: grid;
  place-content: center;
  user-select: none;
  text-align: center;
`;

const HueWheelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
  touch-action: none;
  background: rgba(0, 0, 0, 0)
    conic-gradient(
      rgb(255, 0, 0),
      rgb(255, 4, 0),
      rgb(255, 9, 0),
      rgb(255, 13, 0),
      rgb(255, 17, 0),
      rgb(255, 21, 0),
      rgb(255, 26, 0),
      rgb(255, 30, 0),
      rgb(255, 34, 0),
      rgb(255, 38, 0),
      rgb(255, 43, 0),
      rgb(255, 47, 0),
      rgb(255, 51, 0),
      rgb(255, 55, 0),
      rgb(255, 60, 0),
      rgb(255, 64, 0),
      rgb(255, 68, 0),
      rgb(255, 72, 0),
      rgb(255, 77, 0),
      rgb(255, 81, 0),
      rgb(255, 85, 0),
      rgb(255, 89, 0),
      rgb(255, 94, 0),
      rgb(255, 98, 0),
      rgb(255, 102, 0),
      rgb(255, 106, 0),
      rgb(255, 111, 0),
      rgb(255, 115, 0),
      rgb(255, 119, 0),
      rgb(255, 123, 0),
      rgb(255, 128, 0),
      rgb(255, 132, 0),
      rgb(255, 136, 0),
      rgb(255, 140, 0),
      rgb(255, 145, 0),
      rgb(255, 149, 0),
      rgb(255, 153, 0),
      rgb(255, 157, 0),
      rgb(255, 162, 0),
      rgb(255, 166, 0),
      rgb(255, 170, 0),
      rgb(255, 174, 0),
      rgb(255, 179, 0),
      rgb(255, 183, 0),
      rgb(255, 187, 0),
      rgb(255, 191, 0),
      rgb(255, 196, 0),
      rgb(255, 200, 0),
      rgb(255, 204, 0),
      rgb(255, 208, 0),
      rgb(255, 213, 0),
      rgb(255, 217, 0),
      rgb(255, 221, 0),
      rgb(255, 225, 0),
      rgb(255, 230, 0),
      rgb(255, 234, 0),
      rgb(255, 238, 0),
      rgb(255, 242, 0),
      rgb(255, 247, 0),
      rgb(255, 251, 0),
      rgb(255, 255, 0),
      rgb(251, 255, 0),
      rgb(247, 255, 0),
      rgb(242, 255, 0),
      rgb(238, 255, 0),
      rgb(234, 255, 0),
      rgb(230, 255, 0),
      rgb(225, 255, 0),
      rgb(221, 255, 0),
      rgb(217, 255, 0),
      rgb(212, 255, 0),
      rgb(208, 255, 0),
      rgb(204, 255, 0),
      rgb(200, 255, 0),
      rgb(196, 255, 0),
      rgb(191, 255, 0),
      rgb(187, 255, 0),
      rgb(183, 255, 0),
      rgb(179, 255, 0),
      rgb(174, 255, 0),
      rgb(170, 255, 0),
      rgb(166, 255, 0),
      rgb(161, 255, 0),
      rgb(157, 255, 0),
      rgb(153, 255, 0),
      rgb(149, 255, 0),
      rgb(144, 255, 0),
      rgb(140, 255, 0),
      rgb(136, 255, 0),
      rgb(132, 255, 0),
      rgb(128, 255, 0),
      rgb(123, 255, 0),
      rgb(119, 255, 0),
      rgb(115, 255, 0),
      rgb(111, 255, 0),
      rgb(106, 255, 0),
      rgb(102, 255, 0),
      rgb(98, 255, 0),
      rgb(94, 255, 0),
      rgb(89, 255, 0),
      rgb(85, 255, 0),
      rgb(81, 255, 0),
      rgb(76, 255, 0),
      rgb(72, 255, 0),
      rgb(68, 255, 0),
      rgb(64, 255, 0),
      rgb(60, 255, 0),
      rgb(55, 255, 0),
      rgb(51, 255, 0),
      rgb(47, 255, 0),
      rgb(43, 255, 0),
      rgb(38, 255, 0),
      rgb(34, 255, 0),
      rgb(30, 255, 0),
      rgb(25, 255, 0),
      rgb(21, 255, 0),
      rgb(17, 255, 0),
      rgb(13, 255, 0),
      rgb(8, 255, 0),
      rgb(4, 255, 0),
      rgb(0, 255, 0),
      rgb(0, 255, 4),
      rgb(0, 255, 8),
      rgb(0, 255, 13),
      rgb(0, 255, 17),
      rgb(0, 255, 21),
      rgb(0, 255, 25),
      rgb(0, 255, 30),
      rgb(0, 255, 34),
      rgb(0, 255, 38),
      rgb(0, 255, 42),
      rgb(0, 255, 47),
      rgb(0, 255, 51),
      rgb(0, 255, 55),
      rgb(0, 255, 60),
      rgb(0, 255, 64),
      rgb(0, 255, 68),
      rgb(0, 255, 72),
      rgb(0, 255, 76),
      rgb(0, 255, 81),
      rgb(0, 255, 85),
      rgb(0, 255, 89),
      rgb(0, 255, 93),
      rgb(0, 255, 98),
      rgb(0, 255, 102),
      rgb(0, 255, 106),
      rgb(0, 255, 111),
      rgb(0, 255, 115),
      rgb(0, 255, 119),
      rgb(0, 255, 123),
      rgb(0, 255, 128),
      rgb(0, 255, 132),
      rgb(0, 255, 136),
      rgb(0, 255, 140),
      rgb(0, 255, 144),
      rgb(0, 255, 149),
      rgb(0, 255, 153),
      rgb(0, 255, 157),
      rgb(0, 255, 161),
      rgb(0, 255, 166),
      rgb(0, 255, 170),
      rgb(0, 255, 174),
      rgb(0, 255, 178),
      rgb(0, 255, 183),
      rgb(0, 255, 187),
      rgb(0, 255, 191),
      rgb(0, 255, 196),
      rgb(0, 255, 200),
      rgb(0, 255, 204),
      rgb(0, 255, 208),
      rgb(0, 255, 212),
      rgb(0, 255, 217),
      rgb(0, 255, 221),
      rgb(0, 255, 225),
      rgb(0, 255, 229),
      rgb(0, 255, 234),
      rgb(0, 255, 238),
      rgb(0, 255, 242),
      rgb(0, 255, 247),
      rgb(0, 255, 251),
      rgb(0, 255, 255),
      rgb(0, 251, 255),
      rgb(0, 247, 255),
      rgb(0, 242, 255),
      rgb(0, 238, 255),
      rgb(0, 234, 255),
      rgb(0, 230, 255),
      rgb(0, 225, 255),
      rgb(0, 221, 255),
      rgb(0, 217, 255),
      rgb(0, 212, 255),
      rgb(0, 208, 255),
      rgb(0, 204, 255),
      rgb(0, 200, 255),
      rgb(0, 196, 255),
      rgb(0, 191, 255),
      rgb(0, 187, 255),
      rgb(0, 183, 255),
      rgb(0, 178, 255),
      rgb(0, 174, 255),
      rgb(0, 170, 255),
      rgb(0, 166, 255),
      rgb(0, 162, 255),
      rgb(0, 157, 255),
      rgb(0, 153, 255),
      rgb(0, 149, 255),
      rgb(0, 144, 255),
      rgb(0, 140, 255),
      rgb(0, 136, 255),
      rgb(0, 132, 255),
      rgb(0, 128, 255),
      rgb(0, 123, 255),
      rgb(0, 119, 255),
      rgb(0, 115, 255),
      rgb(0, 111, 255),
      rgb(0, 106, 255),
      rgb(0, 102, 255),
      rgb(0, 98, 255),
      rgb(0, 94, 255),
      rgb(0, 89, 255),
      rgb(0, 85, 255),
      rgb(0, 81, 255),
      rgb(0, 76, 255),
      rgb(0, 72, 255),
      rgb(0, 68, 255),
      rgb(0, 64, 255),
      rgb(0, 60, 255),
      rgb(0, 55, 255),
      rgb(0, 51, 255),
      rgb(0, 47, 255),
      rgb(0, 42, 255),
      rgb(0, 38, 255),
      rgb(0, 34, 255),
      rgb(0, 30, 255),
      rgb(0, 26, 255),
      rgb(0, 21, 255),
      rgb(0, 17, 255),
      rgb(0, 13, 255),
      rgb(0, 8, 255),
      rgb(0, 4, 255),
      rgb(0, 0, 255),
      rgb(4, 0, 255),
      rgb(8, 0, 255),
      rgb(13, 0, 255),
      rgb(17, 0, 255),
      rgb(21, 0, 255),
      rgb(25, 0, 255),
      rgb(30, 0, 255),
      rgb(34, 0, 255),
      rgb(38, 0, 255),
      rgb(42, 0, 255),
      rgb(47, 0, 255),
      rgb(51, 0, 255),
      rgb(55, 0, 255),
      rgb(60, 0, 255),
      rgb(64, 0, 255),
      rgb(68, 0, 255),
      rgb(72, 0, 255),
      rgb(76, 0, 255),
      rgb(81, 0, 255),
      rgb(85, 0, 255),
      rgb(89, 0, 255),
      rgb(94, 0, 255),
      rgb(98, 0, 255),
      rgb(102, 0, 255),
      rgb(106, 0, 255),
      rgb(111, 0, 255),
      rgb(115, 0, 255),
      rgb(119, 0, 255),
      rgb(123, 0, 255),
      rgb(128, 0, 255),
      rgb(132, 0, 255),
      rgb(136, 0, 255),
      rgb(140, 0, 255),
      rgb(144, 0, 255),
      rgb(149, 0, 255),
      rgb(153, 0, 255),
      rgb(157, 0, 255),
      rgb(161, 0, 255),
      rgb(166, 0, 255),
      rgb(170, 0, 255),
      rgb(174, 0, 255),
      rgb(179, 0, 255),
      rgb(183, 0, 255),
      rgb(187, 0, 255),
      rgb(191, 0, 255),
      rgb(195, 0, 255),
      rgb(200, 0, 255),
      rgb(204, 0, 255),
      rgb(208, 0, 255),
      rgb(213, 0, 255),
      rgb(217, 0, 255),
      rgb(221, 0, 255),
      rgb(225, 0, 255),
      rgb(230, 0, 255),
      rgb(234, 0, 255),
      rgb(238, 0, 255),
      rgb(242, 0, 255),
      rgb(247, 0, 255),
      rgb(251, 0, 255),
      rgb(255, 0, 255),
      rgb(255, 0, 251),
      rgb(255, 0, 247),
      rgb(255, 0, 242),
      rgb(255, 0, 238),
      rgb(255, 0, 234),
      rgb(255, 0, 229),
      rgb(255, 0, 225),
      rgb(255, 0, 221),
      rgb(255, 0, 217),
      rgb(255, 0, 213),
      rgb(255, 0, 208),
      rgb(255, 0, 204),
      rgb(255, 0, 200),
      rgb(255, 0, 195),
      rgb(255, 0, 191),
      rgb(255, 0, 187),
      rgb(255, 0, 183),
      rgb(255, 0, 178),
      rgb(255, 0, 174),
      rgb(255, 0, 170),
      rgb(255, 0, 166),
      rgb(255, 0, 161),
      rgb(255, 0, 157),
      rgb(255, 0, 153),
      rgb(255, 0, 149),
      rgb(255, 0, 144),
      rgb(255, 0, 140),
      rgb(255, 0, 136),
      rgb(255, 0, 132),
      rgb(255, 0, 128),
      rgb(255, 0, 123),
      rgb(255, 0, 119),
      rgb(255, 0, 115),
      rgb(255, 0, 111),
      rgb(255, 0, 106),
      rgb(255, 0, 102),
      rgb(255, 0, 98),
      rgb(255, 0, 94),
      rgb(255, 0, 89),
      rgb(255, 0, 85),
      rgb(255, 0, 81),
      rgb(255, 0, 77),
      rgb(255, 0, 72),
      rgb(255, 0, 68),
      rgb(255, 0, 64),
      rgb(255, 0, 59),
      rgb(255, 0, 55),
      rgb(255, 0, 51),
      rgb(255, 0, 47),
      rgb(255, 0, 43),
      rgb(255, 0, 38),
      rgb(255, 0, 34),
      rgb(255, 0, 30),
      rgb(255, 0, 25),
      rgb(255, 0, 21),
      rgb(255, 0, 17),
      rgb(255, 0, 13),
      rgb(255, 0, 8),
      rgb(255, 0, 4)
    )
    repeat scroll 0% 0%;
`;
