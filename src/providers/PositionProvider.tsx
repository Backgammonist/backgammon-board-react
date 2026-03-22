import React, { createContext, useContext } from "react";
import { calculateBasePoints } from "../helpers/calculate-base-points";
import { useDimensions } from "./DimensionProvider";
import { useGameState } from "./GameStateProvider";

const PositionContext = createContext<
  Record<number | "bar", { x: number; y: number }>
>({ bar: { x: 0, y: 0 } });

export const usePosition = () => useContext(PositionContext);

type PositionProviderProps = {
  children: React.ReactNode;
};

export const PositionProvider: React.FC<PositionProviderProps> = ({
  children,
}) => {
  const dimensions = useDimensions();
  const gameState = useGameState();
  const positions = calculateBasePoints(
    dimensions,
    gameState?.direction ?? "clockwise",
  );
  return (
    <PositionContext.Provider value={positions}>
      {children}
    </PositionContext.Provider>
  );
};
