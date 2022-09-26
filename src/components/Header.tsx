import React from 'react';
import styled from 'styled-components';
import { Title } from './Title';
import ScoreInfo from './ScoreInfo';

const Header = ({
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
    <HeaderWrapper>
      <Title />
      <ScoreInfo
        currentScore={currentScore}
        bestScore={bestScore}
        currentRound={currentRound}
        totalRounds={totalRounds}
      />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

export default Header;
