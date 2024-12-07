import {Cell, Legend, Pie, PieChart} from 'recharts';

import {needle, renderCustomizedLabel} from "@/components/dashboard/PieChartWithNeedle.tsx";

const cx = 100;
const cy = 100;
const iR = 30;
const oR = 100;
const value = 50;
const Statistics = () => {
    const data = [
        { name: 'Goo', value: 80, color: '#00ff00' },
        { name: 'Standard', value: 45, color: 'rgba(248,124,2,0.93)' },
        { name: 'Bad', value: 25, color: '#ff0000' },
    ];

    return (
        <div className="bg-gray-100 h-screen w-full">
            <div className="grid grid-cols-6 gap-4 p-6">
                <div className="bg-white shadow-md rounded-md p-6">
                    <h2 className="text-lg font-bold mb-4">Total clients</h2>
                    <p className="text-4xl font-bold mb-2">124,291</p>
                    <p className="text-gray-500 text-sm">21% vs last month</p>
                </div>
                <div className="bg-white shadow-md rounded-md p-6">
                    <h2 className="text-lg font-bold mb-4">Good</h2>
                    <p className="text-4xl font-bold mb-2">62,254</p>
                    <p className="text-gray-500 text-sm">3% vs last month</p>
                </div>
                <div className="bg-white shadow-md rounded-md p-6">
                    <h2 className="text-lg font-bold mb-4">Standard</h2>
                    <p className="text-4xl font-bold mb-2">45,699</p>
                    <p className="text-gray-500 text-sm">11% vs last month</p>
                </div>
                <div className="bg-white shadow-md rounded-md p-6">
                    <h2 className="text-lg font-bold mb-4">Bad</h2>
                    <p className="text-4xl font-bold mb-2">16,338</p>
                    <p className="text-gray-500 text-sm">2% vs last month</p>
                </div>
                <div className="col-span-2 bg-white shadow-md rounded-md p-6 flex">
                    <PieChart width={400} height={100}>
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            cx={cx}
                            cy={cy}
                            innerRadius={iR}
                            outerRadius={oR}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            fill="#8884d8"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color}/>
                            ))}
                        </Pie>
                        {needle(value, data, cx, cy, iR, oR, '#d0d000')}
                        <Legend/>
                    </PieChart>
                    <div className="ml-6 relative flex flex-col justify-center">

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Statistics;