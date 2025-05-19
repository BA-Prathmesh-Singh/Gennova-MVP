
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { format } from 'date-fns';

interface ProgressDataPoint {
  name: string;
  date: Date;
  points: number;
}

interface UserProgressChartProps {
  data: ProgressDataPoint[];
}

export function UserProgressChart({ data }: UserProgressChartProps) {
  // Format data for chart
  const chartData = data.map(item => ({
    name: item.name,
    displayName: item.name.split(' ')[0],
    points: item.points,
    date: format(item.date, 'MMM d')
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600">{`Date: ${payload[0].payload.date}`}</p>
          <p className="text-sm font-medium">{`Points: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="displayName" 
          tickLine={false}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis 
          tickLine={false}
          axisLine={false}
          label={{ 
            value: 'Points', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle' }
          }} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="points" 
          fill="#8884d8" 
          radius={[4, 4, 0, 0]}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
