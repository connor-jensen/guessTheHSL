import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { HSLContext } from './HSLContext';
import { HueWheel } from './components/HueWheel';
import { SaturationLightnessBox } from './components/SaturationLightnessBox';
import useEffectOnce from './hooks/useEffectOnce';
import { Title } from './components/Title';
import ScoreInfo from './components/ScoreInfo';
import Header from './components/Header';
import Timer from './components/Timer';
import ColorDisplay from './components/ColorDisplay';
import RoundHistory from './components/RoundHistory';
import NumberControls from './components/NumberControls';
import useInterval from './hooks/useInterval';
import FinalScore from './components/FinalScore';
import SunAndStarsToggle from './components/SunAndStarsToggle';

const getRandomHSL = () => {
  const hue = Math.floor(Math.random() * 360); // 0-360deg
  const saturation = Math.floor(Math.random() * 90 + 10); // 10-100%
  const lightness = Math.floor(Math.random() * 80 + 10); // 10-90%
  return { hue, saturation, lightness };
};

const calculateScore = (
  hue: number,
  saturation: number,
  lightness: number,
  targetHSL: HSL
) => {
  // max points 10, get 1 point off for every percent or degree off hsl
  const hueDifference = Math.abs(hue - targetHSL.hue);
  const saturationDifference = Math.abs(saturation - targetHSL.saturation);
  const lightnessDifference = Math.abs(lightness - targetHSL.lightness);
  const score = Math.max(
    0,
    10 - (hueDifference + saturationDifference + lightnessDifference)
  );
  return score;
};

const totalRounds = 5;

function App({}) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [targetHSL, setTargetHSL] = useState(getRandomHSL);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [historyHSL, setHistoryHSL] = useState<HSL[]>([]);
  const [showModal, setShowModal] = useState(false);

  // lock the values of hsl
  const [hueLocked, setHueLocked] = useState(false);
  const [saturationLocked, setSaturationLocked] = useState(false);
  const [lightnessLocked, setLightnessLocked] = useState(false);

  // index of range 0-2 for hue, saturation, lightness, initailized randomly
  const [shownAnswerIndex, setShownAnswerIndex] = useState(4);

  const setHSL = (
    hue: number | null,
    saturation: number | null,
    lightness: number | null
  ) => {
    if (hue && !hueLocked) setHue(hue);
    if (saturation && !saturationLocked) setSaturation(saturation);
    if (lightness && !lightnessLocked) setLightness(lightness);
  };

  const contextValue = useMemo(
    () => ({ hue, saturation, lightness, setHSL }),
    [
      hue,
      saturation,
      lightness,
      hueLocked,
      saturationLocked,
      lightnessLocked,
      setHSL,
    ]
  );

  const resetGame = () => {
    setRound(0);
    resetRound()
    setShowModal(false);
  }

  const resetRound = () => {
    const tempTargetHSL = getRandomHSL();
    const hslIndex = Math.floor(Math.random() * 3);

    let tempHueLocked = false;
    let tempSaturationLocked = false;
    let tempLightnessLocked = false;

    switch (hslIndex) {
      case 0:
        setHue(tempTargetHSL.hue);
        setSaturation(100);
        setLightness(50);
        setHueLocked(true);
        setSaturationLocked(false);
        setLightnessLocked(false);
        break;
      case 1:
        setSaturation(tempTargetHSL.saturation);
        setHue(0);
        setLightness(50);
        setHueLocked(false);
        setSaturationLocked(true);
        setLightnessLocked(false);
        break;
      case 2:
        setLightness(tempTargetHSL.lightness);
        setSaturation(100);
        setHue(0);
        setHueLocked(false);
        setSaturationLocked(false);
        setLightnessLocked(true);
        break;
      default:
        break;
    }
    setTargetHSL(tempTargetHSL);
    setAnswerRevealed(false);
    setShownAnswerIndex(hslIndex);
  };

  const endRound = () => {
    if (round === totalRounds) {
      setShowModal(true)
    }
    else {
      setRound(round => round + 1);
      resetRound();
    }
  }

  useEffectOnce(() => {
    resetRound();
  });

  useInterval(() => {}, 30 * 1000);

  return (
    <HSLContext.Provider value={contextValue}>
      <BackgroundColor style={{ '--backgroundHue': targetHSL.hue + 'deg' }}>
        <MainContainer>
          <SunAndStarsToggle />
          <Header
            currentRound={round}
            totalRounds={totalRounds}
            currentScore={score}
            bestScore={maxScore}
          />
          {/* <Timer totalTime={30} timeRemaining={20} /> */}
          <ColorDisplay
            currentHSL={{
              hue: hue,
              saturation: saturation,
              lightness: lightness,
            }}
            targetHSL={targetHSL}
            showAnswer={answerRevealed}
          />
          {/* <RoundHistory historyColors={historyHSL} /> */}
          <NumberControls
            currentHSL={{
              hue: hue,
              saturation: saturation,
              lightness: lightness,
            }}
          />
          <HSLSelectorWrapper>
            <HueWheel size={150} />
            <SaturationLightnessBox size={150} />
          </HSLSelectorWrapper>
          {!answerRevealed && (
            <SubmitButton
              onClick={() => {
                setAnswerRevealed((current) => !current);
                setScore(
                  score + calculateScore(hue, saturation, lightness, targetHSL)
                );
              }}
            >
              Submit {'>'}
            </SubmitButton>
          )}
          {answerRevealed && (
            <NextButton
              onClick={() => {
                endRound();
              }}
            >
              Next {'>'}
            </NextButton>
          )}
        </MainContainer>
      </BackgroundColor>
      {showModal && <FinalScore finalScore={score} resetGame={resetGame}/>}
    </HSLContext.Provider>
  );
}

const SubmitButton = styled.button`
  background-color: hsl(27, 85%, 46%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 48px;
  padding: 8px 16px;
  border-radius: 8px;
  margin: auto;
  margin-top: 16px;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.18);
  border: none;

  &:hover {
    background-color: hsl(27, 85%, 48%);
  }
`;

const NextButton = styled.button`
  background-color: hsl(27, 85%, 46%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 48px;
  padding: 8px 16px;
  border-radius: 8px;
  margin: auto;
  margin-top: 16px;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.18);
  border: none;

  &:hover {
    background-color: hsl(27, 85%, 48%);
  }
`;

const MainContainer = styled.main`
  max-width: 550px;
  margin: 0 auto;
`;

const BackgroundColor = styled.div`
  height: 100%;
  background-color: hsl(var(--backgroundHue), 98%, 98%);
`;

const HSLSelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-direction: row;
  margin-top: 16px;
`;

export default App;
