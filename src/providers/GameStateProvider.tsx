import React, { createContext, useContext } from "react";
import { BoardStateState, PlayerType } from "../types";

// TODO: validate game state positions:
// - each position value has to be unique
// - opponent cannot be on 0, player cannot be on 25

const initialState: BoardStateState = {
  positions: [
    { playerType: PlayerType.PLAYER, position: 24, numberOfCheckers: 2 },
    { playerType: PlayerType.PLAYER, position: 13, numberOfCheckers: 5 },
    { playerType: PlayerType.PLAYER, position: 8, numberOfCheckers: 3 },
    { playerType: PlayerType.PLAYER, position: 6, numberOfCheckers: 5 },

    { playerType: PlayerType.OPPONENT, position: 1, numberOfCheckers: 2 },
    { playerType: PlayerType.OPPONENT, position: 12, numberOfCheckers: 5 },
    { playerType: PlayerType.OPPONENT, position: 17, numberOfCheckers: 3 },
    { playerType: PlayerType.OPPONENT, position: 19, numberOfCheckers: 5 },
  ],
};

const GameStateContext = createContext<BoardStateState>(initialState);

export const useGameState = () => useContext(GameStateContext);

type GameStateProviderProps = {
  children: React.ReactNode;
  gameState?: BoardStateState;
};

export const GameStateProvider: React.FC<GameStateProviderProps> = ({
  children,
  gameState,
}) => {
  return (
    <GameStateContext.Provider value={gameState ?? initialState}>
      {children}
    </GameStateContext.Provider>
  );
};
