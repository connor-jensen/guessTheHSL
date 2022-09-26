import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const ColorDisplay = ({
  currentHSL,
  targetHSL,
  showAnswer
}: {
  currentHSL: HSL;
  targetHSL: HSL;
  showAnswer: boolean;
}) => {
  return (
    <Wrapper>
      <ShadowWrapper>
        <ColorWrapper>
          <ColorSquare
            style={{
              '--hue': currentHSL.hue + 'deg',
              '--saturation': currentHSL.saturation + '%',
              '--lightness': currentHSL.lightness + '%',
            }}
          >
            {showAnswer && <FormattedResult>
              <div>Hue: {currentHSL.hue}</div>
              <div>Saturation: {currentHSL.saturation}</div>
              <div>Lightness: {currentHSL.lightness}</div>
            </FormattedResult>}
          </ColorSquare>
          <div style={{ color: COLORS.white, marginTop: '8px' }}>
            your color
          </div>
        </ColorWrapper>
        <ColorWrapper>
          <ColorSquare
            style={{
              '--hue': targetHSL.hue + 'deg',
              '--saturation': targetHSL.saturation + '%',
              '--lightness': targetHSL.lightness + '%',
            }}
          >
            {showAnswer&& <FormattedResult>
              <div>Hue: {targetHSL.hue}</div>
              <div>Saturation: {targetHSL.saturation}</div>
              <div>Lightness: {targetHSL.lightness}</div>
            </FormattedResult>}
          </ColorSquare>
          <div style={{ color: COLORS.white, marginTop: '8px' }}>
            target color
          </div>
        </ColorWrapper>
      </ShadowWrapper>
    </Wrapper>
  );
};

const FormattedResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  margin: auto;
  width: fit-content;
  padding: 8px 16px;
  background-color: hsla(0, 0%, 100%, 50%);
  border-radius: 8px;
  color: ${COLORS.gray[900]}
`

const ShadowWrapper = styled.div`
  filter: drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.5));
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 16px 16px 8px 16px;
  background-color: ${COLORS.gray[900]};
`;

const ColorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const ColorSquare = styled.div`
  height: 156px;
  background-color: hsl(var(--hue), var(--saturation), var(--lightness));
  align-self: stretch;
  display: grid;
  place-content: center;
`;

const ColorSquareTwo = styled.div`
  height: 156px;
  background-color: teal;
  align-self: stretch;
`;

export default ColorDisplay;
