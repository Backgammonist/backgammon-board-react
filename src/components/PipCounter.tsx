import { useDimensions, useGameState, useTheme } from "../providers";
import { PlayerType } from "../types";

type PipCountProps = {
    playerType: PlayerType;
};

export const PipCounter: React.FC<PipCountProps> = ({ playerType }) => {
    const { pointNumberColor } = useTheme();
    const { panelWidth, barWidth, borderWidth, boardHeight } = useDimensions();
    const { positions } = useGameState();

    const pip = positions?.reduce((acc, current) => {
        const isPlayer = current.playerType === playerType;
        const normalisedPosition = current.playerType === PlayerType.PLAYER ? current.position : 25 - current.position;
        return isPlayer ? acc + current.numberOfCheckers * normalisedPosition : acc;
    }, 0);

    return <text x={panelWidth + borderWidth + barWidth / 2} y={playerType === PlayerType.PLAYER ? (boardHeight - 2 * borderWidth) : (2 * borderWidth)} textAnchor="middle" alignmentBaseline="middle" fill={pointNumberColor} fontSize="1em">{pip}</text>
};