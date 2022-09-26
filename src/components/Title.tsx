import * as React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

export const Title = ({}: {}) => {
  return (
    <TitleWrapper>
      <h2>Guess the</h2>
      <h1 style={{lineHeight: 1}}>HSL</h1>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  color: ${COLORS.gray[900]};
  line-height: 1;
`;
