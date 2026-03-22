import React from "react";
import { useDimensions, useGameState, useTheme } from "../providers";
import { Checker } from "./Checker";
import { Point } from "./Point";
import { Sidebar } from "./Sidebar";
import { Dice } from "./Dice";
import { Bar } from "./Bar";

export const Board: React.FC = () => {
  const dimensions = useDimensions();
  const gameState = useGameState();
  const colours = useTheme();
  const { positions } = gameState ?? {};

  const {
    boardWidth,
    barWidth,
    borderWidth,
    pointWidth,
    boardHeight,
    sidebarWidth,
    sidebarRationModifier,
  } = dimensions;

  const direction = gameState?.direction ?? "clockwise";
  const isClockwise = direction === "clockwise";

  const sidebarRenderedWidth = sidebarWidth * sidebarRationModifier;
  const mainBoardX = isClockwise ? 0 : sidebarRenderedWidth - borderWidth;
  const sidebarX = isClockwise
    ? boardWidth - sidebarRenderedWidth - borderWidth
    : 0;

  return (
    <svg
      key="board"
      width="100%"
      height="100%"
      viewBox={`0 0 ${boardWidth - borderWidth} ${boardHeight * sidebarRationModifier}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <svg
        key="main-board"
        x={mainBoardX}
        width={boardWidth - sidebarWidth * sidebarRationModifier}
        height={boardHeight * sidebarRationModifier}
        viewBox={`0 0 ${boardWidth} ${boardHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect
          key="background"
          x="0"
          y="0"
          width={boardWidth}
          height={boardHeight}
          fill={colours.backgroundColor}
        />

        {/* Borders */}
        <rect
          key="border-top"
          x="0"
          y="0"
          width={boardWidth}
          height={borderWidth}
          fill={colours.borderColor}
        />
        <rect
          key="border-right"
          x="0"
          y="0"
          width={borderWidth}
          height={boardHeight}
          fill={colours.borderColor}
        />
        <rect
          key="border-bottom"
          x={boardWidth - borderWidth}
          y="0"
          width={borderWidth}
          height={boardHeight}
          fill={colours.borderColor}
        />
        <rect
          key="border-left"
          x="0"
          y={boardHeight - borderWidth}
          width={boardWidth}
          height={borderWidth}
          fill={colours.borderColor}
        />

        {/* Points - Left Side */}
        <g
          key="left-points"
          id="left-side"
          transform={`translate(${borderWidth}, ${borderWidth})`}
        >
          {/* Top points */}
          {[...new Array(6)].map((_, i) => (
            <Point
              key={`left-top-${i}`}
              x={i * pointWidth}
              y={0}
              odd={i % 2 === 0}
              ordinal={isClockwise ? 13 + i : 24 - i}
            />
          ))}

          {/* Bottom points */}
          <g
            key="bottom-points"
            transform={`scale(1 -1) translate(0, -${boardHeight - borderWidth * 2})`}
          >
            {[...new Array(6)].map((_, i) => (
              <Point
                bottom
                key={`left-top-${i}`}
                x={i * pointWidth}
                y={0}
                odd={i % 2 === 1}
                ordinal={isClockwise ? 12 - i : i + 1}
              />
            ))}
          </g>
        </g>
        <Dice />
        {/* Points - Right Side */}
        <g
          key="right-side"
          transform={`translate(${(boardWidth + barWidth) / 2}, ${borderWidth})`}
        >
          {/* Top points */}
          {[...new Array(6)].map((_, i) => (
            <Point
              key={`right-top-${i}`}
              x={i * pointWidth}
              y={0}
              odd={i % 2 === 0}
              ordinal={isClockwise ? 19 + i : 18 - i}
            />
          ))}

          {/* Bottom points */}
          <g
            key="bottom-points"
            transform={`scale(1 -1) translate(0, -${boardHeight - borderWidth * 2})`}
          >
            {[...new Array(6)].map((_, i) => (
              <Point
                bottom
                key={`right-top-${i}`}
                x={i * pointWidth}
                y={0}
                odd={i % 2 === 1}
                ordinal={isClockwise ? 6 - i : i + 7}
              />
            ))}
          </g>
        </g>
        {positions &&
          positions.map(({ position, numberOfCheckers = 1, playerType }) => {
            const checkers = [...new Array(numberOfCheckers)].map((_, i) => {
              if (position === 0 || position === 25 || position === "bar")
                return null;
              return (
                <Checker
                  key={`${playerType}-${position}-${i}`}
                  x={position}
                  y={i + 1}
                  playerType={playerType}
                  totalOnPoint={numberOfCheckers}
                />
              );
            });
            return (
              <React.Fragment key={`checkers-${playerType}-${position}`}>
                {checkers}
              </React.Fragment>
            );
          })}
        {/* Middle bar */}
        <Bar />
      </svg>
      <Sidebar key="sidebar" x={sidebarX} />
    </svg>
  );
};
