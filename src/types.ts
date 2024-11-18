import { presets } from "./helpers/presets";

export enum PlayerType {
    PLAYER = 'player',
    OPPONENT = 'opponent',
}

type Position = {
    playerType: PlayerType;
    position: number;
    numberOfCheckers: number;
};

export type BoardStateState = {
    positions?: Position[];
    theme?: Theme;
    preset?: keyof typeof presets;
    options?: Record<string, any>;
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