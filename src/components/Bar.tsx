import { useDimensions, useTheme } from "../providers";
import { Checker } from "./Checker";
import { PipCounter } from "./PipCounter";

export const Bar = () => {
  const dimensions = useDimensions();
  const colours = useTheme();

  const { barWidth, panelWidth, borderWidth, boardHeight } = dimensions;

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
      <></>
      <Checker playerType="player" x="bar" y={2} totalOnPoint={2} />
      <PipCounter key="opponent-pip-counter" playerType="opponent" />
      <PipCounter key="player-pip-counter" playerType="player" />
    </>
  );
};
