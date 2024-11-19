import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Backgammon } from './src/components/Backgammon';
import { PlayerType } from './src/types';

const randomPositions = () => {
    const takenByPlayer = new Map();
    let playerCheckers = 0;
    const takenByOpponent = new Map();
    let opponenetCheckers = 0;

    const getPosition = (isPlayer) => {
        const pos = Math.floor(Math.random() * 25) + 1;
        return (isPlayer && pos === 25) ? 0 : pos;
    };

    const placeChecker = (isPlayer) => {
        const position = getPosition(isPlayer);

        if (isPlayer) {
            if (playerCheckers >= 15) {
                placeChecker(false);
            } else if (takenByOpponent.has(position)) {
                placeChecker(true);
            }
            else if (takenByPlayer.has(position)) {
                takenByPlayer.set(position, takenByPlayer.get(position) + 1);
                playerCheckers++;
            } else {
                takenByPlayer.set(position, 1);
                playerCheckers++;
            }

        } else {
            if (playerCheckers >= 15) {
                placeChecker(true);
            } else if (takenByPlayer.has(position)) {
                placeChecker(false);
            } else if (takenByOpponent.has(position)) {
                takenByPlayer.set(position, takenByOpponent.get(position) + 1);
                opponenetCheckers++;
            } else {
                takenByOpponent.set(position, 1);
                opponenetCheckers++;
            }

        }
    };

    Array.from({ length: 30 }).forEach((_, i) => placeChecker(i % 2));
    debugger
    return takenByOpponent;
};

const positions = randomPositions();
// console.log(positions);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* <Backgammon positions={[
            { position: 25, playerType: PlayerType.OPPONENT, numberOfCheckers: 3 },
            { position: 0, playerType: PlayerType.PLAYER, numberOfCheckers: 3 },
            { position: 1, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
            { position: 2, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
            { position: 3, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
            { position: 4, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
            { position: 5, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
            { position: 7, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
            
        ]} /> */}
        <Backgammon positions={positions} />
    </StrictMode>,
)