import { useDimensions, useTheme } from "../providers";

type PointProps = {
  x: number;
  y: number;
  odd: boolean;
  ordinal: number;
  bottom?: boolean;
};

export const Point: React.FC<PointProps> = ({
  x,
  y,
  odd,
  ordinal,
  bottom = false,
}) => {
  const { pointWidth, pointHeight, borderWidth } = useDimensions();

  const { pointNumberColor, pointColor } = useTheme();

  const transform = bottom ? `scale(1 -1) translate(0, ${borderWidth})` : "";

  const width = pointWidth;
  const height = pointHeight;
  return (
    <g>
      <text
        transform={transform}
        x={x + width / 2}
        y={-borderWidth / 2}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={pointNumberColor}
        fontSize="12"
      >
        {ordinal}
      </text>
      <polygon
        points={`${x},${y} ${x + width},${y} ${x + width / 2},${y + height}`}
        fill={pointColor}
        fillOpacity={odd ? "1" : "0.4"}
      />
      ;
    </g>
  );
};
