import * as React from 'react'
import { StyledChecker } from './styles'
import { PlayerType } from '../../types/index';

export interface CheckerProps {
  size?: string
  type: PlayerType
}

export const Checker: React.FC<CheckerProps> = ({size = '30px', type}) => (
  <StyledChecker size={size} type={type} />
)
