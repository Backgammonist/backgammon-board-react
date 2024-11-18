import { DimensionProvider, GameStateProvider, PositionProvider, ThemeProvider } from "../providers";
import { BoardStateState } from "../types";
import { Board } from "./Board";

export const Backgammon: React.FC<BoardStateState> = ({ theme, positions, preset }) => {
    return (
        <ThemeProvider {...(theme && { theme })} {...(preset && { preset })}>
            <GameStateProvider {...(positions && { gameState: {positions} })}>
                <DimensionProvider>
                    <PositionProvider>
                        <Board />
                    </PositionProvider>
                </DimensionProvider>
            </GameStateProvider>
        </ThemeProvider>
    );
}