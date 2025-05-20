
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProgressDataPoint {
  name: string;
  date: Date;
  points: number;
}

interface UserProgressChartProps {
  data: ProgressDataPoint[];
}

export function UserProgressChart({ data }: UserProgressChartProps) {
  const isMobile = useIsMobile();
  
  // Format data for chart
  const chartData = data.map(item => ({
    name: item.name,
    displayName: isMobile ? item.name.split(' ')[0] : item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name,
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
          right: isMobile ? 5 : 30,
          left: isMobile ? 5 : 20,
          bottom: isMobile ? 60 : 40,
        }}
        barSize={isMobile ? 15 : 30}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="displayName" 
          tickLine={false}
          angle={isMobile ? -45 : -30}
          textAnchor="end"
          height={isMobile ? 70 : 60}
          interval={0}
          tick={{ fontSize: isMobile ? 10 : 12 }}
        />
        <YAxis 
          tickLine={false}
          axisLine={false}
          label={{ 
            value: 'Points', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle' },
            fontSize: isMobile ? 10 : 12,
            offset: isMobile ? -10 : 0
          }}
          tick={{ fontSize: isMobile ? 10 : 12 }}
          width={isMobile ? 30 : 40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="points" 
          fill="#8884d8" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
