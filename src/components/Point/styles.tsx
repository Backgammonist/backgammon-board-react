import styled, {css} from 'styled-components';
import { PointProps } from './index';

const fieldWidth = 36
const borderSize = 20;

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
    content: '';
    position: absolute;
    left: 0;
    z-index: 1;
    opacity: ${props => props.ordinal % 2 == 0 ? 1 : 0.5 };
    ${props => props.reverse ? css`
      border-width: 120px ${fieldWidth / 2}px 0 ${fieldWidth / 2}px;
      border-color: red transparent transparent transparent;
      top: ${fieldWidth / 2}px;
      ` : css`
      border-width: 0 ${fieldWidth / 2}px 120px ${fieldWidth / 2}px;
      border-color: transparent transparent red transparent;
      bottom: ${fieldWidth / 2}px;
    `}
  }
  
  .checkers-wrapper {
    position: relative;
    z-index: 2;
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
    height: ${borderSize}px;
  }
`