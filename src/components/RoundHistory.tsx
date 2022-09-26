import React from 'react';
import styled from 'styled-components';

const RoundHistory = ({ historyColors }: { historyColors: HSL[] }) => {
  if (historyColors.length < 5) {
    // append empty orbs
    for (let i = historyColors.length; i < 5; i++) {
      historyColors.push({ hue: 0, saturation: 0, lightness: 100 });
    }
  }

  return (
    <Wrapper>
      {historyColors.map((color) => {
        return (
          <Orb
            style={{
              '--hue': color.hue + 'deg',
              '--saturation': color.saturation + '%',
              '--lightness': color.lightness + '%',
            }}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Orb = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: hsl(var(--hue), var(--saturation), var(--lightness));
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border: 1px solid hsl(var(--hue), var(--saturation), calc(var(--lightness) - 20%));
`;

export default RoundHistory;
