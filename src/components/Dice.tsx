import { useDimensions, useGameState } from "../providers";
import { PlayerType } from "../types";
import { Die } from "./Die";

export const Dice = () => {
  const { dieWidth, borderWidth } = useDimensions();
  const { dice } = useGameState();

  if (dice?.length === 0) {
    return null;
  }

  return (
    <>
      {dice?.[0] && <Die value={dice[0]} colorSchema={PlayerType.PLAYER} />}
      {dice?.[1] && (
        <g transform={`translate(${dieWidth + borderWidth / 2}, 0)`}>
          <Die value={dice[1]} colorSchema={PlayerType.OPPONENT} />
        </g>
      )}
    </>
  );
};
