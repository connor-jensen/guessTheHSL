import { useMemo, useState } from "react";
import styled from "styled-components";
import { HSLContext } from "./HSLContext";
import { HueWheel } from "./components/HueWheel";
import { SaturationLightnessBox } from "./components/SaturationLightnessBox";
// import {} from 'styled-components/cssprop'

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
  const score = Math.max(0, 10 - (hueDifference + saturationDifference + lightnessDifference));
  return score;
};

// 0.9 = (360 - 36) / 360

function App() {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [targetHSL, setTargetHSL] = useState(getRandomHSL());
  const [answerRevealed, setAnswerRevealed] = useState(false);
  // index of range 0-2 for hue, saturation, lightness, initailized randomly
  const [shownAnswerIndex, setShownAnswerIndex] = useState(
    Math.floor(Math.random() * 3)
  );

  const setHSL = (
    hue: number | null,
    saturation: number | null,
    lightness: number | null
  ) => {
    if (hue) setHue(hue);
    if (saturation) setSaturation(saturation);
    if (lightness) setLightness(lightness);
  };

  const contextValue = useMemo(
    () => ({ hue, saturation, lightness, setHSL }),
    [hue, saturation, lightness, setHSL]
  );

  return (
    <HSLContext.Provider value={contextValue}>
      <Column>
        <Row>
          <HueWheel size={300} />
          <SaturationLightnessBox />
        </Row>
        <Row>
          <Column>
            <h2>
              Score: {score} / {maxScore}
            </h2>
            <Row>
              <Column>
                <h2>Your Color:</h2>
                <InfoWrapper>
                  <label htmlFor="hue">Hue</label>
                  <Input
                    id="hue"
                    type="number"
                    value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                    max="359"
                    min="0"
                  />
                </InfoWrapper>
                <InfoWrapper>
                  <label htmlFor="saturation">Saturation</label>
                  <Input
                    id="saturation"
                    type="number"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    max="100"
                    min="0"
                  />
                </InfoWrapper>
                <InfoWrapper>
                  <label htmlFor="lightness">Lightness</label>
                  <Input
                    id="lightness"
                    type="number"
                    value={lightness}
                    onChange={(e) => setLightness(Number(e.target.value))}
                    max="100"
                    min="0"
                  />
                </InfoWrapper>
              </Column>
              <Column>
                <h2>Target Color:</h2>
                <InfoWrapper>
                  <div>Hue:</div>
                  <div>
                    {answerRevealed || shownAnswerIndex === 0
                      ? targetHSL.hue
                      : "?"}
                  </div>
                </InfoWrapper>
                <InfoWrapper>
                  <div>Saturation:</div>
                  <div>
                    {answerRevealed || shownAnswerIndex === 1
                      ? targetHSL.saturation
                      : "?"}
                  </div>
                </InfoWrapper>
                <InfoWrapper>
                  <div>Lightness:</div>
                  <div>
                    {answerRevealed || shownAnswerIndex === 2
                      ? targetHSL.lightness
                      : "?"}
                  </div>
                </InfoWrapper>
              </Column>
            </Row>
          </Column>
        </Row>
        <Row>
          {answerRevealed ? (
            <button
              onClick={() => {
                setTargetHSL(getRandomHSL());
                setAnswerRevealed(false);
                setShownAnswerIndex(Math.floor(Math.random() * 3));
              }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                // add score to current score
                setScore(
                  score + calculateScore(hue, saturation, lightness, targetHSL)
                );
                setMaxScore(maxScore + 10);
                setAnswerRevealed(true);
              }}
            >
              Reveal Answer
            </button>
          )}
        </Row>
        <Row style={{ gap: "0px" }}>
          <ColoredBox
            style={{
              "--hue": hue + "deg",
              "--saturation": saturation + "%",
              "--lightness": lightness + "%",
            }}
          />
          <ColoredBox
            style={{
              "--hue": targetHSL.hue + "deg",
              "--saturation": targetHSL.saturation + "%",
              "--lightness": targetHSL.lightness + "%",
            }}
          />
        </Row>
      </Column>
    </HSLContext.Provider>
  );
}

const InfoWrapper = styled.div`
  width: 140px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 3.2rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

const ColoredBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: hsl(var(--hue), var(--saturation), var(--lightness));
`;

export default App;
