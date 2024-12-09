import {Cell, Legend, Pie, PieChart} from 'recharts';

import {needle, renderCustomizedLabel} from "@/components/dashboard/PieChartWithNeedle.tsx";
import DashboardCard from "@/components/dashboard/DashboardCard.tsx";
import {ChartLine} from "@mynaui/icons-react";
import React from "react";
import axios from 'axios';
import { set, ZodNumberCheck } from 'zod';

const cx = 100;
const cy = 100;
const iR = 30;
const oR = 100;
const value = 50;


interface StatisticsDataType {
    title: string,
    value: number;
    percentage: string;
    percentageColor: string;
    prevMonthValue: string;
}

// const statistics = [
//     {
//         title:"Total clients",
//         value:"5659",
//         percentage:"+2.56%",
//         percentageColor:"text-green-500",
//         prevMonthValue:"4,96",
//     },
//     {
//         title:"Good",
//         value:"5659.89",
//         percentage:"-2.56%",
//         percentageColor:"text-red-500",
//         prevMonthValue:"4,96",
//     },
//     {
//         title:"Standard",
//         value:"$5,658 USD",
//         percentage:"+2.56%",
//         percentageColor:"text-green-500",
//         prevMonthValue:"4,96",
//     },
//     {
//         title:"Bad",
//         value:"5659.89",
//         percentage:"-2.56%",
//         percentageColor:"text-red-500",
//         prevMonthValue:"4,96",
//     }
// ]
const data = [
    { name: 'Good', value: 80, color: 'rgba(0,255,0,0.68)' },
    { name: 'Standard', value: 45, color: 'rgba(248,124,2,0.78)' },
    { name: 'Bad', value: 25, color: 'rgba(255,0,0,0.75)' },
];


const Statistics = () => {

    const [statistics, setStatistics] = React.useState<StatisticsDataType[]>(
        [
            {
                title:"Total clients",
                value:5659,
                percentage:"+2.56%",
                percentageColor:"text-green-500",
                prevMonthValue:"4,96",
            },
            {
                title:"Good",
                value:5659,
                percentage:"-2.56%",
                percentageColor:"text-red-500",
                prevMonthValue:"4,96",
            },
            {
                title:"Standard",
                value:5658,
                percentage:"+2.56%",
                percentageColor:"text-green-500",
                prevMonthValue:"4,96",
            },
            {
                title:"Bad",
                value:5659,
                percentage:"-2.56%",
                percentageColor:"text-red-500",
                prevMonthValue:"4,96",
            }
        ]
    );

    const getNumberOfClients = async () =>{
        const numberOfClients = await axios.get(`${import.meta.env.VITE_API_URL + `clients/number`}`);
        setStatistics(prevStatistics => {
            console.log(prevStatistics);
            const updatedStatistics = [...prevStatistics];
            updatedStatistics[0].value = numberOfClients.data;
            return updatedStatistics;
          });
        console.log(numberOfClients.data);
    }

    const getGoodEligibilityCount = async () =>{
        const goodEligibilityCount = await axios.get(`${import.meta.env.VITE_API_URL + `eligibility/good-number`}`);
        setStatistics(prevStatistics => {
            console.log(prevStatistics);
            const updatedStatistics = [...prevStatistics];
            updatedStatistics[1].value = goodEligibilityCount.data;
            return updatedStatistics;
          });
        console.log(goodEligibilityCount.data);
    }

    const getStandardEligibilityCount = async () =>{
        const standardEligibilityCount = await axios.get(`${import.meta.env.VITE_API_URL + `eligibility/standard-number`}`);
        setStatistics(prevStatistics => {
            console.log(prevStatistics);
            const updatedStatistics = [...prevStatistics];
            updatedStatistics[2].value = standardEligibilityCount.data;
            return updatedStatistics;
          });
        console.log(standardEligibilityCount.data);
    }

    const getPoorEligibilityCount = async () =>{
        const poorEligibilityCount = await axios.get(`${import.meta.env.VITE_API_URL + `eligibility/poor-number`}`);
        setStatistics(prevStatistics => {
            console.log(prevStatistics);
            const updatedStatistics = [...prevStatistics];
            updatedStatistics[3].value = poorEligibilityCount.data;
            return updatedStatistics;
          });
        console.log(poorEligibilityCount.data);
    }

    React.useEffect(() => {
        getNumberOfClients();
        getGoodEligibilityCount();
        getStandardEligibilityCount();
        getPoorEligibilityCount();
    },[]);

    return (
        <div className="grid grid-cols-6 gap-4 p-6">
            {
                statistics.map(item => (
                    <div>
                        <DashboardCard
                            title={item.title}
                            value={item.value}
                            percentage={item.percentage}
                            percentageColor={item.percentageColor}
                            prevMonthValue={item.prevMonthValue}
                            icon={<ChartLine className="w-5 h-5 text-blue-300"/>}
                        />
                    </div>
                ))
            }
            <div className="col-span-2 bg-white shadow-md rounded-md py-6 px-3 flex">
                <PieChart width={500} height={90}>
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
                    <Legend verticalAlign={true}/>
                </PieChart>
            </div>
        </div>
    );
}
export default Statistics;