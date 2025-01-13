"use client";
import {
  DimensionProvider,
  GameStateProvider,
  PositionProvider,
  ThemeProvider,
} from "../providers";
import { BoardStateState } from "../types";
import { Board } from "./Board";

export const Backgammon: React.FC<BoardStateState> = ({
  theme,
  positions,
  preset,
  doublingCube,
  dice,
}) => {
  const gameState = {
    ...(positions && { positions }),
    ...(doublingCube && { doublingCube }),
    ...(dice && { dice }),
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
