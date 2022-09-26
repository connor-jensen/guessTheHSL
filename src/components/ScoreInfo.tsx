import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const ScoreInfo = ({
  currentRound,
  totalRounds,
  currentScore,
  bestScore,
}: {
  currentRound: number;
  totalRounds: number;
  currentScore: number;
  bestScore: number;
}) => {
  return (
    <Wrapper>
      <h3>round: {currentRound} / {totalRounds}</h3>
      <h3>score: {currentScore}</h3>
      <h3>best: {bestScore}</h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 4px;
  color: ${COLORS.gray[900]};
`;

export default ScoreInfo;
