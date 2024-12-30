import {Cell, Legend, Pie, PieChart} from 'recharts';
import {needle, renderCustomizedLabel} from "@/components/dashboard/PieChartWithNeedle.tsx";
import DashboardCard from "@/components/dashboard/DashboardCard.tsx";
import {ChartLine} from "@mynaui/icons-react";
import React from "react";
import axiosInstance from "@/api/axiosInstance.ts";

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
    prevMonthValue: number;
    percentChart: number,
}

const Statistics = () => {
    const [statistics, setStatistics] = React.useState<StatisticsDataType[]>(
        [
            {
                title:"Total clients",
                value:0,
                percentage:"+2.56%",
                percentageColor:"text-green-500",
                prevMonthValue: 0,
                percentChart: 0,
            },
            {
                title:"Good",
                value:0,
                percentage:"-2.56%",
                percentageColor:"text-red-500",
                prevMonthValue:0,
                percentChart: 0,
            },
            {
                title:"Standard",
                value:0,
                percentage:"+2.56%",
                percentageColor:"text-green-500",
                prevMonthValue:0,
                percentChart: 0,
            },
            {
                title:"Poor",
                value: 0,
                percentage:"-2.56%",
                percentageColor:"text-red-500",
                prevMonthValue:0,
                percentChart: 0,
            }
        ]);

    const getClientsStatistics = async () =>{
        const numberOfClients = await axiosInstance.get(`${import.meta.env.VITE_API_URL}clients/number`);
        const numberOfClientsPrevMonth = await axiosInstance.get(`${import.meta.env.VITE_API_URL}clients/number-previous-month`);
        const differencePercentage : number = numberOfClientsPrevMonth.data == 0 ? 100 : (numberOfClients.data - numberOfClientsPrevMonth.data) / numberOfClientsPrevMonth.data * 100;


        setStatistics(prevStatistics => {
            const updatedStatistics = [...prevStatistics];
            updatedStatistics[0].value = numberOfClients.data;
            updatedStatistics[0].percentage = differencePercentage >= 0 ? `+${differencePercentage}%` : `${differencePercentage}%`;
            updatedStatistics[0].percentageColor = differencePercentage >= 0 ? "text-green-500" : "text-red-500";
            updatedStatistics[0].prevMonthValue = numberOfClientsPrevMonth.data;
            return updatedStatistics;
        });

      
      
      
    }

    const getGoodEligibilityStatistics = async () =>{
        const goodEligibilityCount = await axiosInstance.get(`${import.meta.env.VITE_API_URL}eligibility/good-number`);
        const goodEligibilityCountPrevMonth = await axiosInstance.get(`${import.meta.env.VITE_API_URL}eligibility/good-number-previous-month`);
        const differencePercentage : number = goodEligibilityCountPrevMonth.data == 0 ? 100 : (goodEligibilityCount.data - goodEligibilityCountPrevMonth.data) / goodEligibilityCountPrevMonth.data * 100;

        setStatistics(prevStatistics => {
            
            const updatedStatistics = [...prevStatistics];
            updatedStatistics[1].value = goodEligibilityCount.data;
            updatedStatistics[1].percentage = differencePercentage >= 0 ? `+${differencePercentage}%` : `${differencePercentage}%`;
            updatedStatistics[1].percentageColor = differencePercentage >= 0 ? "text-green-500" : "text-red-500";
            updatedStatistics[1].prevMonthValue = goodEligibilityCountPrevMonth.data;
            updatedStatistics[1].percentChart = goodEligibilityCount.data;
            return updatedStatistics;
        });
      
      
    }

    const getStandardEligibilityStatistics = async () =>{
        const standardEligibilityCount = await axiosInstance.get(`${import.meta.env.VITE_API_URL}eligibility/standard-number`);
        const standardEligibilityCountPrevMonth = await axiosInstance.get(`${import.meta.env.VITE_API_URL}eligibility/standard-number-previous-month`);
        const differencePercentage : number = standardEligibilityCountPrevMonth.data == 0 ? 100 :  (standardEligibilityCount.data - standardEligibilityCountPrevMonth.data) / standardEligibilityCountPrevMonth.data * 100;

        setStatistics(prevStatistics => {
          
            const updatedStatistics = [...prevStatistics];
            updatedStatistics[2].value = standardEligibilityCount.data;
            updatedStatistics[2].percentage = differencePercentage >= 0 ? `+${differencePercentage}%` : `${differencePercentage}%`;
            updatedStatistics[2].percentageColor = differencePercentage >= 0 ? "text-green-500" : "text-red-500";
            updatedStatistics[2].prevMonthValue = standardEligibilityCountPrevMonth.data;
            updatedStatistics[2].percentChart = standardEligibilityCount.data;
            return updatedStatistics;
        });
      
    }

    const getPoorEligibilityStatistics = async () =>{
        const poorEligibilityCount = await axiosInstance.get(`${import.meta.env.VITE_API_URL}eligibility/poor-number`);
        const poorEligibilityCountPrevMonth = await axiosInstance.get(`${import.meta.env.VITE_API_URL}eligibility/poor-number-previous-month`);
        const differencePercentage : number = poorEligibilityCountPrevMonth.data == 0 ? 100 :  (poorEligibilityCount.data - poorEligibilityCountPrevMonth.data) / poorEligibilityCountPrevMonth.data * 100;

        setStatistics(prevStatistics => {
          
            const updatedStatistics = [...prevStatistics];
            updatedStatistics[3].value = poorEligibilityCount.data;
            updatedStatistics[3].percentage = differencePercentage >= 0 ? `+${differencePercentage}%` : `${differencePercentage}%`;
            updatedStatistics[3].percentageColor = differencePercentage >= 0 ? "text-green-500" : "text-red-500";
            updatedStatistics[3].prevMonthValue = poorEligibilityCountPrevMonth.data;
            updatedStatistics[3].percentChart = poorEligibilityCount.data ;
            return updatedStatistics;
        });
      
    }



    const data = [
        { name: 'Good', value: statistics[1].percentChart, color: 'rgba(0,255,0,0.68)' },
        { name: 'Standard', value: statistics[2].percentChart, color: 'rgba(248,124,2,0.78)' },
        { name: 'Poor', value: statistics[3].percentChart, color: 'rgba(255,0,0,0.75)' },
    ];
    
    React.useEffect(() => {
        getClientsStatistics().then();
        getGoodEligibilityStatistics().then();
        getStandardEligibilityStatistics().then();
        getPoorEligibilityStatistics().then();
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
                    <Legend verticalAlign='top'/>
                </PieChart>
            </div>
        </div>
    );
}
export default Statistics;