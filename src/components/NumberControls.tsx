import React from 'react';
import styled from 'styled-components';
import DownTriangle from './DownTriangle';
import UpTriangle from './UpTriangle';
import { HSLContext } from '../HSLContext';
import { COLORS } from '../constants';

const NumberControls = ({ currentHSL }: { currentHSL: HSL }) => {
  const { hue, saturation, lightness, setHSL } = React.useContext(HSLContext);

  return (
    <Wrapper>
      <ControlWrapper>
        <Button
          onClick={() => {
            setHSL(hue + 1, null, null);
          }}
        >
          +
        </Button>
        <div>H: {hue}</div>
        <Button
          onClick={() => {
            setHSL(hue - 1, null, null);
          }}
        >
          -
        </Button>
      </ControlWrapper>
      <ControlWrapper>
      <Button
          onClick={() => {
            setHSL(null, saturation + 1, null);
          }}
        >
          +
        </Button>
        <div>S: {saturation}</div>
        <Button
          onClick={() => {
            setHSL(null, saturation - 1, null);
          }}
        >
          -
        </Button>
      </ControlWrapper>
      <ControlWrapper>
      <Button
          onClick={() => {
            setHSL(null, null, lightness + 1);
          }}
        >
          +
        </Button>
        <div>L: {lightness}</div>
        <Button
          onClick={() => {
            setHSL(null, null, lightness - 1);
          }}
        >
          -
        </Button>
      </ControlWrapper>
    </Wrapper>
  );
};

const Button = styled.button`
  background-color: ${COLORS.gray[900]};
  color: ${COLORS.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 22px;
  border-radius: 8px;
  border: none;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.18);
  width: 65px;

  &:hover {
    background-color: ${COLORS.gray[700]};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const Input = styled.input`
  width: 3.2rem;
  text-align: center;
`;

export default NumberControls;

/**
 * <ControlWrapper>
        <UpTriangle currentHSL={currentHSL} type="hue" />
        <div>H: {hue}</div>
        <Button
          onClick={() => {
            setHSL(hue - 1, null, null);
          }}
        >
          - 1
        </Button>
      </ControlWrapper>
      <ControlWrapper>
        <UpTriangle currentHSL={currentHSL} type="saturation" />
        <div>S: {saturation}</div>
       <DownTriangle currentHSL={currentHSL} type='saturation'/> 
        </ControlWrapper>
        <ControlWrapper>
          <UpTriangle currentHSL={currentHSL} type="lightness" />
          <div>L: {lightness}</div>
          <DownTriangle currentHSL={currentHSL} type='lightness'/>
        </ControlWrapper>
 */
