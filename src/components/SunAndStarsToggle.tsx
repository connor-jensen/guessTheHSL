import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as CloudsSVG } from "../svg/CloudsSVG.svg";
import { ReactComponent as StarsSVG } from "../svg/StarsSVG.svg"

const SunAndStarsToggle = () => {
  const [toggle, setToggle] = useState(true);


  return (
    <TempWrapper>
        <ToggleContainer onClick={() => setToggle(!toggle)} style={{'--toggleBGColor': toggle ? 'hsl(205deg, 52%, 49%)' : 'rgb(30, 34, 50)'}}>
          <SunAndRaysContainer style={{'--translateXAmount': toggle ? '0px' : '108px'}}>
            <Sun />
            <Moon style={{'--moonOpacity': toggle ? '0%' : '100%'}}>
              <Crater style={{ "--size": "18px", '--x': '-10px', '--y': '4px' }}/>
              <Crater style={{ "--size": "13px", '--x': '10px', '--y': '12px' }}/>
              <Crater style={{ "--size": "10px", '--x': '5px', '--y': '-12px' }}/>
            </Moon>
            <Ray style={{ "--width": "100px", "--height": "100px" }} />
            <Ray style={{ "--width": "140px", "--height": "140px" }} />
            <Ray style={{ "--width": "180px", "--height": "180px" }} />
          </SunAndRaysContainer>
          <CloudsWrapper style={{'--translateYAmount': toggle ? '0px' : '108px'}}>
            <CloudsSVG width={150} height={150} />
          </CloudsWrapper>
          <StarsWrapper style={{'--translateYAmount': toggle ? '-108px' : '0px'}}>
            <StarsSVG width={110} height={70} />
          </StarsWrapper>
        </ToggleContainer>
      {/* </InsetShadow> */}
    </TempWrapper>
  );
};

const SunAndRaysContainer = styled.div`
  position: absolute;
  isolation: isolate;
  height: 100%;
  width: 180px;
  left: -52px;
  transform: translateX(var(--translateXAmount));
  transition: 450ms;
  
`;

const Sun = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: rgb(242, 204, 45);
  box-shadow: inset 0px -2px 2px 0px rgba(33, 28, 6, 0.25),
    inset 1px 2px 2px 0px rgba(255, 252, 240, 0.61),
    2px 3px 8px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: auto;
  z-index: 2;
`;

const Moon = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: rgb(202,207, 215);
  box-shadow: inset 0px -2px 2px 0px rgba(0, 0, 0, 0.25),
    inset 1px 2px 2px 0px rgba(255, 255, 255, 0.61),
    2px 3px 8px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: auto;
  z-index: 2;
  opacity: var(--moonOpacity);
  transition-property: opacity;
  transition-duration: 450ms;
`;

const Crater = styled.div`
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: rgb(158,167, 187);
  box-shadow: inset 0px 1px 4px 0px rgba(0,0,0,0.25);
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: auto;
  transform: translateX(var(--x)) translateY(var(--y));
`

const Ray = styled.div`
  background-color: hsla(0deg, 0%, 100%, 8%);
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: auto;
  height: var(--height);
  width: var(--width);
  border-radius: 50%;
  z-index: 1;
`;

const ToggleContainer = styled.div`
  width: 184px;
  height: 72px;
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  background-color: var(--toggleBGColor);
  transition-property: background-color;
  transition-duration: 450ms;
  /* background-color: hsl(205deg, 52%, 49%); */
  box-shadow: -1px -2px 4px rgba(0, 0, 0, 0.25),
    1px 2px 4px rgba(255, 255, 255, 0.85),
    inset 0px -2px 13px rgba(0, 0, 0, 0.25),
    inset 0px 3px 8px rgba(0, 0, 0, 0.25);
`;

const TempWrapper = styled.div`
  padding: 32px;
  outline: 2px solid black;
  background-color: wheat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloudsWrapper = styled.div`
  position: absolute;
  right: -25px;
  top: -25px;
  transform: translateY(var(--translateYAmount));
  transition: 450ms;
`;

const StarsWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 0px;
  transform: translateY(var(--translateYAmount));
  transition: 450ms;
`;

export default SunAndStarsToggle;
