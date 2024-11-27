import { useDimensions, useTheme } from "../providers";
import type { DoublingCube as DoublingCubeType } from "../types";
import { PlayerType } from "../types";

export const DoublingCube: React.FC<DoublingCubeType> = ({ owner, value }) => {
    const { doublingCubeColor } = useTheme();
    const { boardHeight, sidebarWidth, cubeWidth, borderWidth } = useDimensions();

    const xPos = (sidebarWidth - cubeWidth) / 2;
    // const yPos = (boardHeight - cubeWidth) / 2 + (owner === PlayerType.PLAYER ? cubeWidth / 2 : -(cubeWidth / 2));
    const yPos = owner === null ? boardHeight / 2 - cubeWidth / 2 : owner === PlayerType.PLAYER ? boardHeight - cubeWidth - borderWidth / 2 : borderWidth / 2;

    return (<g>
        <rect fill={doublingCubeColor} x={xPos} y={yPos} rx={3} width={cubeWidth} height={cubeWidth} />
        <text x={xPos + cubeWidth / 2} y={yPos + cubeWidth / 2 + 2} textAnchor="middle" alignmentBaseline="middle" fill="#000" fontSize="1.5em">{value}</text>
    </g>)
};