"use client";
import React from "react";
import {
  DimensionProvider,
  GameStateProvider,
  PositionProvider,
  ThemeProvider,
} from "../providers";
import { BoardState } from "../types";
import { Board } from "./Board";

export const Backgammon: React.FC<BoardState> = ({
  theme,
  positions,
  preset,
  doublingCube,
  dice,
  direction = "clockwise",
}) => {
  const gameState = {
    ...(positions && { positions }),
    ...(doublingCube && { doublingCube }),
    ...(dice && { dice }),
    direction,
  };
  return (
    <ThemeProvider {...(theme && { theme })} {...(preset && { preset })}>
      <GameStateProvider gameState={gameState}>
        <DimensionProvider>
          <PositionProvider>
            <Board />
          </PositionProvider>
        </DimensionProvider>
      </GameStateProvider>
    </ThemeProvider>
  );
};
