import { useDimensions, useGameState, useTheme } from "../providers";
import { PlayerType } from "../types";
import { DoublingCube } from "./DoublingCube";

export const Sidebar: React.FC = () => {
  const { borderColor, playerCheckerColor, opponentCheckerColor } = useTheme();
  const {
    boardWidth,
    borderWidth,
    sidebarWidth,
    pointWidth,
    checkerWidth,
    boardHeight,
    checkerStroke,
    cubeWidth,
  } = useDimensions();
  const { positions, doublingCube } = useGameState();

  const playerOut =
    positions
      ?.filter(
        ({ position, playerType }) =>
          playerType === PlayerType.PLAYER && position === 0,
      )
      .reduce((acc, current) => acc + current.numberOfCheckers, 0) ?? 0;
  const opponentOut =
    positions
      ?.filter(
        ({ position, playerType }) =>
          playerType === PlayerType.OPPONENT && position === 25,
      )
      .reduce((acc, current) => acc + current.numberOfCheckers, 0) ?? 0;

  const xPos = (sidebarWidth - checkerWidth - 2 * checkerStroke) / 2;
  const width = checkerWidth + 2 * checkerStroke;
  const height = pointWidth / 8;
  const gap = pointWidth * 0.18;

  return (
    <svg
      key="sidebar"
      width={(sidebarWidth * (boardWidth - sidebarWidth)) / boardWidth}
      height={(boardHeight * (boardWidth - sidebarWidth)) / boardWidth}
      viewBox={`0 0 ${sidebarWidth} ${boardHeight}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        key="sidebar-background"
        x="0"
        y="0"
        width={sidebarWidth}
        height={boardHeight}
        fill={borderColor}
      />

      {doublingCube?.value && (
        <DoublingCube
          value={doublingCube?.value ?? 2}
          owner={doublingCube?.owner ?? null}
        />
      )}

      {[...new Array(opponentOut)].map((_, i) => (
        <rect
          key={`opponent-out-${i}`}
          x={xPos}
          y={i * gap + borderWidth + cubeWidth}
          width={width}
          height={height}
          rx={3}
          ry={3}
          fill={opponentCheckerColor}
        />
      ))}
      <g transform={`scale(1 -1) translate(0, -${boardHeight})`}>
        {[...new Array(playerOut)].map((_, i) => (
          <rect
            key={`player-out-${i}`}
            x={xPos}
            y={i * gap + borderWidth + cubeWidth}
            width={width}
            height={height}
            rx={3}
            ry={3}
            fill={playerCheckerColor}
          />
        ))}
      </g>
    </svg>
  );
};
