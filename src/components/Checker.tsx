import { useDimensions, usePosition, useTheme } from "../providers";
import { PlayerType } from "../types";

type CheckerProps = {
  x:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | "bar";
  y: number;
  playerType: PlayerType;
  totalOnPoint: number;
};

export const Checker: React.FC<CheckerProps> = ({
  x,
  y,
  playerType,
  totalOnPoint,
}) => {
  const {
    playerCheckerColor,
    playerCheckerBorderColor,
    opponentCheckerColor,
    opponentCheckerBorderColor,
  } = useTheme();
  const fill =
    playerType === "player" ? playerCheckerColor : opponentCheckerColor;
  const stroke =
    playerType === "player"
      ? playerCheckerBorderColor
      : opponentCheckerBorderColor;
  const pos = usePosition();
  const { checkerWidth, checkerStroke } = useDimensions();
  if (x === "bar") {
    ["player", "opponent"].map((playerType, i) => {
      return (
        <circle
          key={`bar-${playerType}-${i}`}
          cx={pos["bar"].x}
          cy={pos["bar"].y + (i === 0 ? -checkerWidth : checkerWidth)}
          r={checkerWidth / 2}
          stroke={stroke}
          strokeWidth={checkerStroke}
          strokeOpacity={1}
          fill={fill}
        />
      );
    });
  }

  const bottomModifier = x! === "bar" && parseInt(x) > 12 ? 1 : -1;
  const baseYOffset = checkerWidth * bottomModifier;

  const yOffset =
    (y - 1) * baseYOffset * (totalOnPoint > 5 ? 4 / (totalOnPoint - 1) : 1);
  return (
    <circle
      cx={pos[x].x}
      cy={pos[x].y + yOffset}
      r={checkerWidth / 2}
      stroke={stroke}
      strokeWidth={checkerStroke}
      strokeOpacity={1}
      fill={fill}
    />
  );
};
