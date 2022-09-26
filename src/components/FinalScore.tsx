import React from 'react';
import styled from 'styled-components';

const FinalScore = ({ finalScore, resetGame }: { finalScore: number, resetGame: () => void }) => {
  return (
    <Wrapper>
      <Modal>
        <div>Final Score: {finalScore}</div>
        <PlayAgainButton onClick={() => resetGame()}>Play Again!</PlayAgainButton>
      </Modal>
    </Wrapper>
  );
};

const PlayAgainButton = styled.button`
  border: 2px solid white;
  width: 100%;
  height: 48px;
  display: grid;
  place-content: center;
  color: white;
  background-color: black;
  border-radius: 8px;

  &:hover {
    background-color: hsl(0, 0%, 10%);
  }
`;

// display in front of whole screen:
const Wrapper = styled.div`
  position: absolute;
  width: clamp(300px, 60%, 500px);
  height: 300px;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: black;
  color: white;
  @keyframes appear {
    0% {
      opacity: 0;
      transform: translateY(48px);
    }
  }
  border-radius: 8px;
  padding: 16px;
  text-align: center;

  animation: appear 350ms ease-in 1;
`;

export default FinalScore;
