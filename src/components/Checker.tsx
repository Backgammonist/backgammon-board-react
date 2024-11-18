import { useDimensions, usePosition, useTheme } from "../providers";
import { PlayerType } from "../types";

type CheckerProps = {
    x: number;
    y: number;
    playerType: PlayerType;
}

export const Checker: React.FC<CheckerProps> = ({ x, y, playerType }) => {
    const { playerCheckerColor, playerCheckerBorderColor, opponentCheckerColor, opponentCheckerBorderColor } = useTheme();
    const fill = playerType === PlayerType.PLAYER ? playerCheckerColor : opponentCheckerColor;
    const stroke = playerType === PlayerType.PLAYER ? playerCheckerBorderColor : opponentCheckerBorderColor;
    const pos = usePosition();
    const { checkerWidth, checkerStroke } = useDimensions();
    const bottomModifier = x > 12 ? 1 : -1;
    const yPos = (y - 1) * checkerWidth * 0.8 * bottomModifier;
    return <circle cx={pos[x].x} cy={pos[x].y + yPos} r={checkerWidth / 2} stroke={stroke} strokeWidth={checkerStroke} strokeOpacity={1} fill={fill} />
}