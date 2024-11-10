import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { Board } from './src'

import React from 'react';

class Dimensions {
    private _width: number;
    private _height: number;
    private _pointWidth: number;
    private _barWidth: number;
    private _borderWidth: number;

    constructor(width: number, height: number, pointWidth: number, barWidth: number, borderWidth = 20) {
        this._width = width;
        this._height = height;
        this._pointWidth = pointWidth;
        this._barWidth = barWidth;
        this._borderWidth = borderWidth;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get pointWidth() {
        return this._pointWidth;
    }

    get barWidth() {
        return this._barWidth;
    }

    get borderWidth() {
        return this._borderWidth;
    }

    getPanelWidth() {
        return (this._width - this._barWidth / 2 - this._borderWidth) / 2;
    }

    getPointWidth() {
        return this.getInnerPanelWidth() / 6;
    }

    getPointHeight() {
        return (this._height / 2 - this._borderWidth) * 0.8;
    }

    getInnerPanelWidth() {
        return (this._width - this._barWidth - this._borderWidth * 2) / 2;
    }
}

const dimensions = new Dimensions(640, 480, 40, 20, 20);

const Point = ({ x, y, color }) => {
    const width = dimensions.getPointWidth();
    const height = dimensions.getPointHeight();
    return <g>
        {dimensions.borderWidth !== 0 && <rect x={x} y={-dimensions.borderWidth} width={width} height={dimensions.borderWidth} fill="#fff" />}
        <polygon points={`${x},${y} ${x + width},${y} ${x + width / 2},${y + height}`} fill={color} />;
    </g>
};

const BackgammonBoard = () => {
    return (
        <svg width={dimensions.width + 100} height={dimensions.height} viewBox={`0 0 ${dimensions.width + 100} ${dimensions.height}`} xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <rect x="0" y="0" width={dimensions.width} height={dimensions.height} fill="#D9B88F" />

            {/* Middle bar */}
            <rect x={dimensions.getInnerPanelWidth() + dimensions.borderWidth} y={dimensions.borderWidth} width={dimensions.barWidth} height={dimensions.height - dimensions.borderWidth * 2} fill="#A85D00" />

            {/* Borders */}
            <rect x="0" y="0" width={dimensions.width} height={dimensions.borderWidth} fill="#fff" />
            <rect x="0" y="0" width={dimensions.borderWidth} height={dimensions.height} fill="#fff" />
            <rect x={dimensions.width - dimensions.borderWidth} y="0" width={dimensions.borderWidth} height={dimensions.height} fill="#fff" />
            <rect x="0" y={dimensions.height - dimensions.borderWidth} width={dimensions.width} height={dimensions.borderWidth} fill="#fff" />

            {/* Points - Left Side */}
            <g id="left-side" transform={`translate(${dimensions.borderWidth}, ${dimensions.borderWidth})`}>
                {/* Top points */}
                {[...new Array(6)].map((_, i) => <Point key={`left-top-${i}`} x={i * dimensions.getPointWidth()} y="0" color={i % 2 === 0 ? 'white' : 'red'} />)}

                {/* Bottom points */}
                <g transform={`scale(1 -1) translate(0, -${dimensions.height - dimensions.borderWidth * 2})`}>
                    {[...new Array(6)].map((_, i) => <Point key={`left-top-${i}`} x={i * dimensions.getPointWidth()} y="0" color={i % 2 === 0 ? 'red' : 'white'} />)}
                </g>
            </g>

            {/* Points - Right Side */}
            <g id="right-side" transform={`translate(${(dimensions.width + dimensions.barWidth) / 2}, ${dimensions.borderWidth})`}>
                {/* Top points */}
                {[...new Array(6)].map((_, i) => <Point key={`right-top-${i}`} x={i * dimensions.getPointWidth()} y={0} color={i % 2 === 0 ? 'white' : 'red'} />)}

                {/* Bottom points */}
                <g transform={`scale(1 -1) translate(0, -${dimensions.height - dimensions.borderWidth * 2})`}>
                {[...new Array(6)].map((_, i) => <Point key={`right-top-${i}`} x={i * dimensions.getPointWidth()} y={0} color={i % 2 === 0 ? 'white' : 'red'} />)}
                </g>
            </g>

            {/* Additional rectangle to the right of the board */}
            <g>
                <rect x={dimensions.width} y="0" width={dimensions.pointWidth * 1.4} height={dimensions.height} fill="#00FF00" />
                {[...new Array(15)].map((_, i) => (<rect x={dimensions.width + dimensions.pointWidth * 0.2} y={i * dimensions.pointWidth * 0.3 + dimensions.borderWidth} width={dimensions.pointWidth} height={dimensions.pointWidth / 4} fill='#000000' />))}
                <g transform={`scale(1 -1) translate(0, -${dimensions.height})`}>
                    {[...new Array(15)].map((_, i) => (<rect x={dimensions.width + dimensions.pointWidth * 0.2} y={i * dimensions.pointWidth * 0.3 + dimensions.borderWidth} width={dimensions.pointWidth} height={dimensions.pointWidth / 4} fill='#fff' />))}
                </g>
            </g>

            {/* Checker placeholders (optional) */}
            <circle cx="100" cy="50" r={dimensions.pointWidth / 2} fill="#000000" />
            <circle cx="100" cy="350" r={dimensions.pointWidth / 2} fill="#FFFFFF" />

        </svg>
    );
};



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BackgammonBoard />
    </StrictMode>,
)