import styled from 'styled-components'
import {CheckerProps} from './index'
import { PlayerType } from '../../types/index';


export const StyledChecker = styled.div<CheckerProps>`
    width: ${props => props.size};
    height: ${props => props.size};
    border-radius: 100%;
    background-color: ${props => props.type === PlayerType.PLAYER ? 'black' : 'white'} ;
    border: 1px solid transparent;
    border-color: ${props => props.type === PlayerType.PLAYER ? 'white' : 'black'};
    margin-top: -1px; 
`