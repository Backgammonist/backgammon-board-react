import { useDimensions, usePosition, useTheme } from "../providers";
import { PlayerType } from "../types";

type CheckerProps = {
  x: number;
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
  const bottomModifier = x > 12 ? 1 : -1;
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
