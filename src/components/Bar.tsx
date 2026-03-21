import { useDimensions, useGameState, useTheme } from "../providers";
import { Checker } from "./Checker";
import { PipCounter } from "./PipCounter";

export const Bar = () => {
  const dimensions = useDimensions();
  const colours = useTheme();
  const gameState = useGameState();

  const { barWidth, panelWidth, borderWidth, boardHeight } = dimensions;
  const barPositions = (gameState?.positions ?? []).filter(
    (p) => p.position === "bar",
  );

  return (
    <>
      <rect
        key="bar"
        x={panelWidth + borderWidth}
        y={borderWidth}
        width={barWidth}
        height={boardHeight - borderWidth * 2}
        fill={colours.borderColor}
      />
      {barPositions.map(({ playerType, numberOfCheckers = 1 }) =>
        [...new Array(numberOfCheckers)].map((_, i) => (
          <Checker
            key={`bar-${playerType}-${i}`}
            playerType={playerType}
            x="bar"
            y={i + 1}
            totalOnPoint={numberOfCheckers}
          />
        )),
      )}
      <PipCounter key="opponent-pip-counter" playerType="opponent" />
      <PipCounter key="player-pip-counter" playerType="player" />
    </>
  );
};
