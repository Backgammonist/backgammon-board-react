import { useDimensions, useGameState, useTheme } from "../providers";
import { PlayerType } from "../types";

export const Sidebar: React.FC = () => {
    const { borderColor, playerCheckerColor, opponentCheckerColor } = useTheme();
    const { boardWidth, borderWidth, sidebarWidth, pointWidth, checkerWidth, boardHeight } = useDimensions();
    const { positions } = useGameState();

    const playerOut = positions?.filter(({ position, playerType }) => playerType === PlayerType.PLAYER && position === 0).reduce((acc, current) => acc + current.numberOfCheckers, 0) ?? 0;
    const opponentOut = positions?.filter(({ position, playerType }) => playerType === PlayerType.OPPONENT && position === 25).reduce((acc, current) => acc + current.numberOfCheckers, 0) ?? 0;

    return (<svg key="sidebar" width={sidebarWidth * (boardWidth - sidebarWidth) / boardWidth} height={boardHeight * (boardWidth - sidebarWidth) / boardWidth} viewBox={`0 0 ${sidebarWidth} ${boardHeight}`} xmlns="http://www.w3.org/2000/svg">
        <rect key="sidebar-background" x="0" y="0" width={sidebarWidth} height={boardHeight} fill={borderColor} />
        {[...new Array(opponentOut)].map((_, i) => (<rect key={`opponent-out-${i}`} x={(sidebarWidth - checkerWidth) / 2} y={i * pointWidth * 0.25 + borderWidth} width={checkerWidth} height={pointWidth / 5} rx={3} ry={3} fill={opponentCheckerColor} />))}
        <g transform={`scale(1 -1) translate(0, -${boardHeight})`}>
            {[...new Array(playerOut)].map((_, i) => (<rect key={`player-out-${i}`} x={(sidebarWidth - checkerWidth) / 2} y={i * pointWidth * 0.25 + borderWidth} width={checkerWidth} height={pointWidth / 5} rx={3} ry={3} fill={playerCheckerColor} />))}
        </g>
    </svg>);
};