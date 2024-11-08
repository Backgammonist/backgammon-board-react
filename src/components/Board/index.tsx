import * as React from 'react';
import { StyledBoard, StyledBottomHalfBoard, StyledTopHalfBoard } from './styles';
import { Point } from '../Point';

type Positions = {
    [index: number]: string
}

interface BoardProps<T> {
    ['data']: { ['positions']: T }
}

const getCheckersforPoint = (pos: number, positions: Positions) => {
    const checkers = positions[pos];
    if (!checkers) {
        return
    }
    return {
        numberOfCheckers: checkers.length,
        playerType: checkers.charAt(1) === 'x' ? 'player' : 'opponent'
    }
}
export const Board: React.FC<BoardProps<Positions>> = ({ data }) => {
    const points = [...new Array(24)]

    return (<StyledBoard>
        <StyledBottomHalfBoard>
            {points.slice(0, points.length / 2).map((_, b) => <Point {...getCheckersforPoint(b, data.positions)} key={b} ordinal={b + 1} />)}
        </StyledBottomHalfBoard>
        <StyledTopHalfBoard>
            {points.slice(points.length / 2, points.length).map((_, b) => <Point {...getCheckersforPoint(b + 12, data.positions)} reverse key={b} ordinal={b + 13} />)}
        </StyledTopHalfBoard>

    </StyledBoard>)
}
