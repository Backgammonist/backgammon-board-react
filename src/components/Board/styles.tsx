import styled from 'styled-components';

import {StyledPoint} from '../Point/styles'

const borderSize = 20;
const fieldWidth = 36;
const barWidth = borderSize * 1.5
const maxHeight = 400

export const StyledBoard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
    width: ${12 * fieldWidth + barWidth}px;
    height: ${maxHeight}px;
    border-left: ${borderSize*2}px solid white;
    border-right: ${borderSize}px solid white;
    overflow: hidden;

    &--half {
        

        &__lower .field-wrapper {
            flex-direction: column-reverse;
        }

        &__upper {
            flex-direction: row-reverse;
            justify-content: flex-end;
        }
    }

    &-bar {
        position: absolute;
        width: ${barWidth}px;
        height: ${maxHeight}px;
        top: 0;
        left: calc(50% - ${barWidth}px/2);
        background: white;
    }
`

const StyledHalfBoard = styled.div`
    display: flex;
    min-height: 50%;
`

export const StyledBottomHalfBoard = styled(StyledHalfBoard)`
    > ${StyledPoint} {
        flex-direction: column-reverse;

        &:nth-child(6) {
            margin-right: ${barWidth}px;
        }
    }
`

export const StyledTopHalfBoard = styled(StyledHalfBoard)`
    flex-direction: row-reverse;

    > ${StyledPoint} {
        &:nth-child(6) {
            margin-left: ${barWidth}px;
        }
    }
`
