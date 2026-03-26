import { Direction } from "../types";

import { Dimensions } from "./dimensions";

export const calculateBasePoints = (
  dimensions: Dimensions,
  direction: Direction = "clockwise",
) => {
  const {
    barWidth,
    borderWidth,
    pointWidth,
    checkerWidth,
    boardHeight,
    checkerStroke,
    boardWidth,
  } = dimensions;

  const topY = borderWidth + checkerWidth / 2 + checkerStroke;
  const bottomY = boardHeight - borderWidth - checkerWidth / 2 - checkerStroke;
  const xLeft = (i: number) => borderWidth + pointWidth / 2 + pointWidth * i;
  const xRight = (i: number) =>
    borderWidth + barWidth + pointWidth / 2 + pointWidth * (6 + i);

  const bar = { x: boardWidth / 2, y: boardHeight / 2 };

  if (direction === "anticlockwise") {
    return {
      bar,
      // Top-left: 24, 23, 22, 21, 20, 19
      24: { x: xLeft(0), y: topY },
      23: { x: xLeft(1), y: topY },
      22: { x: xLeft(2), y: topY },
      21: { x: xLeft(3), y: topY },
      20: { x: xLeft(4), y: topY },
      19: { x: xLeft(5), y: topY },
      // Top-right: 18, 17, 16, 15, 14, 13
      18: { x: xRight(0), y: topY },
      17: { x: xRight(1), y: topY },
      16: { x: xRight(2), y: topY },
      15: { x: xRight(3), y: topY },
      14: { x: xRight(4), y: topY },
      13: { x: xRight(5), y: topY },
      // Bottom-left: 1, 2, 3, 4, 5, 6
      1: { x: xLeft(0), y: bottomY },
      2: { x: xLeft(1), y: bottomY },
      3: { x: xLeft(2), y: bottomY },
      4: { x: xLeft(3), y: bottomY },
      5: { x: xLeft(4), y: bottomY },
      6: { x: xLeft(5), y: bottomY },
      // Bottom-right: 7, 8, 9, 10, 11, 12
      7: { x: xRight(0), y: bottomY },
      8: { x: xRight(1), y: bottomY },
      9: { x: xRight(2), y: bottomY },
      10: { x: xRight(3), y: bottomY },
      11: { x: xRight(4), y: bottomY },
      12: { x: xRight(5), y: bottomY },
    };
  }

  // Clockwise layout (default)
  return {
    bar,
    // Top-left: 13, 14, 15, 16, 17, 18
    13: { x: xLeft(0), y: topY },
    14: { x: xLeft(1), y: topY },
    15: { x: xLeft(2), y: topY },
    16: { x: xLeft(3), y: topY },
    17: { x: xLeft(4), y: topY },
    18: { x: xLeft(5), y: topY },
    // Top-right: 19, 20, 21, 22, 23, 24
    19: { x: xRight(0), y: topY },
    20: { x: xRight(1), y: topY },
    21: { x: xRight(2), y: topY },
    22: { x: xRight(3), y: topY },
    23: { x: xRight(4), y: topY },
    24: { x: xRight(5), y: topY },
    // Bottom-left: 12, 11, 10, 9, 8, 7
    12: { x: xLeft(0), y: bottomY },
    11: { x: xLeft(1), y: bottomY },
    10: { x: xLeft(2), y: bottomY },
    9: { x: xLeft(3), y: bottomY },
    8: { x: xLeft(4), y: bottomY },
    7: { x: xLeft(5), y: bottomY },
    // Bottom-right: 6, 5, 4, 3, 2, 1
    6: { x: xRight(0), y: bottomY },
    5: { x: xRight(1), y: bottomY },
    4: { x: xRight(2), y: bottomY },
    3: { x: xRight(3), y: bottomY },
    2: { x: xRight(4), y: bottomY },
    1: { x: xRight(5), y: bottomY },
  };
};
