import * as React from 'react';
import { Checker } from '../Checker';
import { PlayerType } from '../../types/index';
import { StyledPoint } from './styles'


export interface PointProps {
  ordinal: number
  playerType?: string
  numberOfCheckers?: number
  reverse?: boolean
}

const createCheckersRenderer = (numberOfCheckers: number, playerType: PlayerType): React.ReactNode => [...new Array(numberOfCheckers)].map((n, i) => <Checker key={i} type={playerType} />)

export const Point: React.FC<PointProps> = ({ ordinal, playerType, numberOfCheckers, reverse }) => {
  const typedPlayerType = playerType === 'player' ? PlayerType.PLAYER : PlayerType.OPPONENT
  return (
    <StyledPoint ordinal={ordinal} reverse={reverse}>
      <div className="field-ordinal">
        <span>{ordinal}</span>
      </div>
      <div className="checkers-wrapper">
        {numberOfCheckers && createCheckersRenderer(numberOfCheckers, typedPlayerType)}
      </div>
    </StyledPoint>
  );
}
