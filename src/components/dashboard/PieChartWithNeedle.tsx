// eslint-disable-next-line react-refresh/only-export-components
const RADIAN = Math.PI / 180;

// Define types for the parameters
interface LabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
    value: number;
}

interface NeedleProps {
    value: number;
    data: { value: number }[];
    cx: number;
    cy: number;
    iR: number;
    oR: number;
    color: string;
}


export const renderCustomizedLabel = ({
                                          cx,
                                          cy,
                                          midAngle,
                                          innerRadius,
                                          outerRadius,
                                          percent,
                                      }: LabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x < cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
export const needle = (
    value: NeedleProps["value"],
    data: NeedleProps["data"],
    cx: NeedleProps["cx"],
    cy: NeedleProps["cy"],
    iR: NeedleProps["iR"],
    oR: NeedleProps["oR"],
    color: NeedleProps["color"]
) => {
    let total = 0;
    data.forEach((v) => {
        total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
        <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key="circle" />,
        <path
            d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
            stroke="none"
            fill={color}
            key="path"
        />,
    ];
};
