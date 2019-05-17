import styled from 'styled-components';
import { PointProps } from './index';

// const borderSize = 20
const fieldWidth = 36
// $bar-width: $border-size * 1.5;


export const StyledPoint = styled.div<PointProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: ${fieldWidth}px;
  align-items: center;

  &:after {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 ${fieldWidth / 2}px 120px ${fieldWidth / 2}px;
    border-color: transparent transparent red transparent;
    content: '';
    position: absolute;
    bottom: ${fieldWidth / 2}px;
    left: 0;
    opacity: ${props => props.ordinal % 2 == 0 ? 1 : 0.5 };
  }
  .checkers-wrapper {
    position: relative;
  }

  .field-ordinal {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: $border-size;
    color: white;
    font-size: 12px;
    background-color: white;
    color: red;
  }
`