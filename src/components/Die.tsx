import { useDimensions, useTheme } from "../providers";
import { DieValue, PlayerType } from "../types";

type DieProps = {
    value: DieValue;
    colorSchema: PlayerType
};

export const Die: React.FC<DieProps> = ({ value = 2, colorSchema }) => {
    const { playerCheckerColor, playerCheckerBorderColor, opponentCheckerColor, opponentCheckerBorderColor } = useTheme();
    const { boardHeight, dieWidth, dieDotSize, panelWidth, barWidth } = useDimensions();
    const dieBackgroundColor = colorSchema === PlayerType.PLAYER ? playerCheckerColor : opponentCheckerColor;
    const dotFillColor = colorSchema === PlayerType.PLAYER ? playerCheckerBorderColor : opponentCheckerBorderColor;

    let dots;
    switch (value) {
        case 6:
            dots = <>
                <circle cx={dieWidth / 4} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4} cy={dieWidth / 4 * 3} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4 * 3} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4 * 3} cy={dieWidth / 4 * 3} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4} cy={dieWidth / 2} r={dieDotSize} fill={dotFillColor} />;
                <circle cx={dieWidth / 4 * 3} cy={dieWidth / 2} r={dieDotSize} fill={dotFillColor} />;
            </>;
            break;
        case 5:
            dots = <>
                <circle cx={dieWidth / 4} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4} cy={dieWidth / 4 * 3} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4 * 3} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4 * 3} cy={dieWidth / 4 * 3} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 2} cy={dieWidth / 2} r={dieDotSize} fill={dotFillColor} />;
            </>;
            break;
        case 4:
            dots = <>
                <circle cx={dieWidth / 4} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4} cy={dieWidth / 4 * 3} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4 * 3} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4 * 3} cy={dieWidth / 4 * 3} r={dieDotSize} fill={dotFillColor} />
            </>;
            break;
        case 3:
            dots = <>
                <circle cx={dieWidth / 4} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4 * 3} cy={dieWidth / 4 * 3} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 2} cy={dieWidth / 2} r={dieDotSize} fill={dotFillColor} />;
            </>;
            break;
        case 2:
            dots = <>
                <circle cx={dieWidth / 4} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
                <circle cx={dieWidth / 4 * 3} cy={dieWidth / 4 * 3} r={dieDotSize} fill={dotFillColor} />
            </>;
            break;
        case 1:
            dots = <circle cx={dieWidth / 2} cy={dieWidth / 2} r={dieDotSize} fill={dotFillColor} />;
            break;
    }
    console.log(value)
    return (
        <g transform={`translate(${panelWidth + barWidth + panelWidth / 2 - dieWidth / 2}, ${boardHeight / 2 - dieWidth / 2})`}>
            <svg width={dieWidth} height={dieWidth} viewBox={`0 0 ${dieWidth} ${dieWidth}`}>
                <rect width={dieWidth} height={dieWidth} rx={5} ry={5} fill={dieBackgroundColor} />
                {dots}
                {/* <circle cx={dieWidth / 4} cy={dieWidth / 2} r={dieDotSize} fill={dotFillColor} />
            <circle cx={dieWidth / 4 * 3} cy={dieWidth / 2} r={dieDotSize} fill={dotFillColor} />
            <circle cx={dieWidth / 4} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
            <circle cx={dieWidth / 4} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
            <circle cx={dieWidth / 4} cy={dieWidth / 4 * 3} r={dieDotSize} fill={dotFillColor} />
            <circle cx={dieWidth / 4 * 3} cy={dieWidth / 4} r={dieDotSize} fill={dotFillColor} />
            <circle cx={dieWidth / 4 * 3} cy={dieWidth / 4 * 3} r={dieDotSize} fill={dotFillColor} /> */}
            </svg>
        </g>
    );
}