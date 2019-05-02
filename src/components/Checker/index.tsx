import * as React from 'react'
import { StyledChecker } from './styles'

export interface CheckerProps {
  size?: string
  type: PlayerType
}

export enum PlayerType {
  'PLAYER' = 'player',
  'OPPONENT' = 'opponent'
}

export const Checker: React.FC<CheckerProps> = ({size = '50px', type}) => (
  <StyledChecker size={size} type={type} />
)
