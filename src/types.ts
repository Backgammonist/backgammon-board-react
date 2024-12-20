import { presets } from "./helpers/presets";

export enum PlayerType {
  PLAYER = "player",
  OPPONENT = "opponent",
}

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6;

type Position = {
  playerType: PlayerType;
  position:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25;
  numberOfCheckers:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15;
};

export type DoublingCube = {
  value: 2 | 4 | 8 | 16 | 32;
  owner?: null | PlayerType;
};

export type BoardStateState = {
  positions?: Position[];
  theme?: Theme;
  preset?: keyof typeof presets;
  options?: Record<string, unknown>;
  doublingCube?: DoublingCube;
  dice?: readonly [DieValue, DieValue] | [DieValue] | [];
};

export type Theme = {
  backgroundColor: string;
  borderColor: string;
  pointColor: string;
  pointNumberColor: string;
  altPointColor: string;
  playerCheckerColor: string;
  playerCheckerBorderColor: string;
  opponentCheckerColor: string;
  opponentCheckerBorderColor: string;
};
