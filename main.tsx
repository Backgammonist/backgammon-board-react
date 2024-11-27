import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Backgammon } from './src/components/Backgammon';
import { PlayerType } from './src/types';

const randomPositions = () => {
    const takenByPlayer = new Map();
    const takenByOpponent = new Map();

    const getPosition = (isPlayer) => {
        const pos = Math.floor(Math.random() * 25) + 1;
        return (isPlayer && pos === 25) ? 0 : pos;
    };

    const placeChecker = (isPlayer) => {
        const position = getPosition(isPlayer);

        if (isPlayer) {
            if (takenByOpponent.has(position)) {
                placeChecker(true);
            }
            else if (takenByPlayer.has(position)) {
                takenByPlayer.set(position, takenByPlayer.get(position) + 1);
            } else {
                takenByPlayer.set(position, 1);
            }

        } else {
            if (takenByPlayer.has(position)) {
                placeChecker(false);
            } else if (takenByOpponent.has(position)) {
                takenByOpponent.set(position, takenByOpponent.get(position) + 1);
            } else {
                takenByOpponent.set(position, 1);
            }
        }
    };

    Array.from({ length: 30 }).forEach((_, i) => placeChecker(i % 2 === 0));

    return [
        ...Array.from(takenByPlayer.entries()).map(([position, numberOfCheckers]) => ({ position, playerType: PlayerType.PLAYER, numberOfCheckers })),
        ...Array.from(takenByOpponent.entries()).map(([position, numberOfCheckers]) => ({ position, playerType: PlayerType.OPPONENT, numberOfCheckers })),
    ];
};

const positions = randomPositions();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* <Backgammon dice={[6, 6]} positions={[
            // { position: 24, playerType: PlayerType.OPPONENT, numberOfCheckers: 1 },
            // { position: 23, playerType: PlayerType.OPPONENT, numberOfCheckers: 2 },
            // { position: 22, playerType: PlayerType.OPPONENT, numberOfCheckers: 3 },
            // { position: 21, playerType: PlayerType.OPPONENT, numberOfCheckers: 3 },
            // { position: 20, playerType: PlayerType.OPPONENT, numberOfCheckers: 2 },
            // { position: 19, playerType: PlayerType.OPPONENT, numberOfCheckers: 2 },
            // { position: 9, playerType: PlayerType.OPPONENT, numberOfCheckers: 2 },
            // { position: 2, playerType: PlayerType.PLAYER, numberOfCheckers: 4 },
            // { position: 3, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
            // { position: 4, playerType: PlayerType.PLAYER, numberOfCheckers: 3 },
            // { position: 6, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
            // { position: 7, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
            // { position: 13, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
            { position: 0, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
            { position: 25, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
            { position: 1, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
            { position: 2, playerType: PlayerType.PLAYER, numberOfCheckers: 13 },
            { position: 3, playerType: PlayerType.PLAYER, numberOfCheckers: 12 },
            { position: 4, playerType: PlayerType.PLAYER, numberOfCheckers: 11 },
            { position: 5, playerType: PlayerType.PLAYER, numberOfCheckers: 9 },
            { position: 6, playerType: PlayerType.PLAYER, numberOfCheckers: 8 },
            { position: 7, playerType: PlayerType.PLAYER, numberOfCheckers: 6 },
            { position: 8, playerType: PlayerType.PLAYER, numberOfCheckers: 5 },
            { position: 9, playerType: PlayerType.PLAYER, numberOfCheckers: 10 },
        ]} /> */}
        {/* <Backgammon positions={positions} doublingCube={{ value: 4, owner: PlayerType.PLAYER }} dice={[6, 1]} /> */}
        {/* <Backgammon positions={[{ position: 25, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 }, { position: 0, playerType: PlayerType.PLAYER, numberOfCheckers: 15 }]} doublingCube={{ value: 2 }} /> */}
        <Backgammon dice={[1, 5]} doublingCube={{ value: 2, owner: PlayerType.OPPONENT }} positions={[
            { playerType: PlayerType.PLAYER, position: 0, numberOfCheckers: 3 },
            { playerType: PlayerType.PLAYER, position: 1, numberOfCheckers: 2 },
            { playerType: PlayerType.PLAYER, position: 2, numberOfCheckers: 2 },
            { playerType: PlayerType.PLAYER, position: 3, numberOfCheckers: 3 },
            { playerType: PlayerType.PLAYER, position: 4, numberOfCheckers: 3 },
            { playerType: PlayerType.PLAYER, position: 5, numberOfCheckers: 2 },

            { playerType: PlayerType.OPPONENT, position: 25, numberOfCheckers: 10 },
            { playerType: PlayerType.OPPONENT, position: 24, numberOfCheckers: 2 },
            { playerType: PlayerType.OPPONENT, position: 23, numberOfCheckers: 3 }
        ]} />
    </StrictMode>,
)