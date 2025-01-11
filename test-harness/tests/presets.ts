import { BoardStateState, PlayerType } from "../../src/types";

const randomPositions = () => {
  const takenByPlayer = new Map();
  const takenByOpponent = new Map();

  const getPosition = (isPlayer) => {
    const pos = Math.floor(Math.random() * 25) + 1;
    return isPlayer && pos === 25 ? 0 : pos;
  };

  const placeChecker = (isPlayer) => {
    const position = getPosition(isPlayer);

    if (isPlayer) {
      if (takenByOpponent.has(position)) {
        placeChecker(true);
      } else if (takenByPlayer.has(position)) {
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
    ...Array.from(takenByPlayer.entries()).map(
      ([position, numberOfCheckers]) => ({
        position,
        playerType: PlayerType.PLAYER,
        numberOfCheckers,
      }),
    ),
    ...Array.from(takenByOpponent.entries()).map(
      ([position, numberOfCheckers]) => ({
        position,
        playerType: PlayerType.OPPONENT,
        numberOfCheckers,
      }),
    ),
  ];
};

export const presets: Record<string, BoardStateState["positions"]> = {
  default: [
    { position: 1, playerType: PlayerType.OPPONENT, numberOfCheckers: 2 },
    { position: 6, playerType: PlayerType.PLAYER, numberOfCheckers: 5 },
    { position: 8, playerType: PlayerType.PLAYER, numberOfCheckers: 3 },
    { position: 12, playerType: PlayerType.OPPONENT, numberOfCheckers: 5 },
    { position: 13, playerType: PlayerType.PLAYER, numberOfCheckers: 5 },
    { position: 17, playerType: PlayerType.OPPONENT, numberOfCheckers: 3 },
    { position: 19, playerType: PlayerType.OPPONENT, numberOfCheckers: 5 },
    { position: 24, playerType: PlayerType.PLAYER, numberOfCheckers: 2 },
  ],
  overload: [
    { position: 0, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 1, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 2, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 3, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 4, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 5, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 6, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 7, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 8, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 9, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 10, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 11, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 12, playerType: PlayerType.PLAYER, numberOfCheckers: 15 },
    { position: 13, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 14, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 15, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 16, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 17, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 18, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 19, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 20, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 21, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 22, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 23, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 24, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
    { position: 25, playerType: PlayerType.OPPONENT, numberOfCheckers: 15 },
  ],
  random: randomPositions(),
};
