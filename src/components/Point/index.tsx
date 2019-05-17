import * as React from 'react';
import { Checker } from '../Checker';
import { PlayerType } from '../../types/index';
import { StyledPoint } from './styles'


export interface PointProps {
  ordinal: number
  playerType?: string
  numberOfCheckers?: number
}

const createCheckersRenderer = (numberOfCheckers: number, playerType: PlayerType): React.ReactNode => (
  <div>
    {
      [...new Array(numberOfCheckers)].map((n, i) => <Checker key={i} type={playerType} />)
    }
  </div>
)

export const Point: React.FC<PointProps> = ({ ordinal, playerType, numberOfCheckers }) => {
  const typedPlayerType = playerType === 'player' ? PlayerType.PLAYER : PlayerType.OPPONENT
  return (
    <StyledPoint ordinal={ordinal}>
      <div className="field-ordinal">
        <span>{ordinal}</span>
      </div>
      <div className="checkers-wrapper">
        {numberOfCheckers && createCheckersRenderer(numberOfCheckers, typedPlayerType)}
      </div>
    </StyledPoint>
  );
}
