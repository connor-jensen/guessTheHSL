import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const Timer = ({totalTime, timeRemaining}: {totalTime: number, timeRemaining: number}) => {
  return (
    <TimerWrapper>
      <div>{timeRemaining} seconds remaining</div>
      <BarWrapper >
        <BarCover style={{'--width': 100 * (totalTime - timeRemaining) / totalTime + '%'}}/>
      </BarWrapper>
    </TimerWrapper>
  );
}

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${COLORS.gray[900]};
  margin-top: -16px;
`;

const BarWrapper = styled.div`
  width: calc(100% - 2px);
  height: 16px;
  background: linear-gradient(
        90deg,
        hsl(0, 100%, 50%) 0%,
        hsl(60, 100%, 50%) 17%,
        hsl(120, 100%, 50%) 33%,
        hsl(180, 100%, 50%) 50%,
        hsl(240, 100%, 50%) 67%,
        hsl(300, 100%, 50%) 83%,
        hsl(330, 100%, 50%) 100%
    );
  position: relative;
  outline: 1px solid ${COLORS.gray[900]};
  margin-top: 4px;
`;

const BarCover = styled.div`
  width: var(--width);
  height: 16px;
  background: white;
  position: absolute;
  top: 0;
  right: 0;
`;

export default Timer;