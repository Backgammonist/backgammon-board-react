import { presets } from "./helpers/presets";

export type PlayerType = "player" | "opponent";

export type NumberRange<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : NumberRange<N, [...Acc, Acc["length"]]>;

export type DieValue = Exclude<NumberRange<7>, 0>;

export type Position = {
  playerType: PlayerType;
  position: NumberRange<26> | "bar";
  numberOfCheckers: Exclude<NumberRange<16>, 0>;
};

export type DoublingCube = {
  value: 2 | 4 | 8 | 16 | 32 | 64;
  owner?: null | PlayerType;
};

export type Direction = "clockwise" | "anticlockwise";

export type BoardState = {
  positions?: Position[];
  theme?: Theme;
  preset?: keyof typeof presets;
  doublingCube?: DoublingCube;
  dice?: readonly [DieValue, DieValue] | readonly [DieValue] | [];
  direction?: Direction;
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
  doublingCubeColor: string;
};
