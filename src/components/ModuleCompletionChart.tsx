
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  TooltipProps 
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface ModuleAnalytics {
  id: string;
  title: string;
  completionRate: number;
  averageAttempts: number;
  averageScore: number;
}

interface ModuleCompletionChartProps {
  data: ModuleAnalytics[];
}

export function ModuleCompletionChart({ data }: ModuleCompletionChartProps) {
  const isMobile = useIsMobile();
  
  // Format data for chart display
  const chartData = data.map(module => ({
    name: module.title,
    displayName: module.title.split(' ')[0],
    completionRate: module.completionRate,
    averageScore: module.averageScore,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const moduleData = data.find(m => m.title.split(' ')[0] === label);
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium text-xs md:text-sm">{moduleData?.title}</p>
          <p className="text-xs text-gray-600">{`Completion Rate: ${payload[0].value}%`}</p>
          {payload[1] && (
            <p className="text-xs text-gray-600">{`Average Score: ${payload[1].value}%`}</p>
          )}
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
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: isMobile ? 5 : 5,
        }}
        barGap={isMobile ? 2 : 4}
        barCategoryGap={isMobile ? 4 : 10}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="displayName" 
          tick={{ fontSize: isMobile ? 10 : 12 }}
          tickLine={isMobile ? false : true}
          angle={isMobile ? -45 : 0}
          textAnchor={isMobile ? "end" : "middle"}
          height={isMobile ? 60 : 30}
        />
        <YAxis 
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          ticks={[0, 25, 50, 75, 100]}
          tick={{ fontSize: isMobile ? 10 : 12 }}
          label={{ 
            value: isMobile ? '' : 'Percentage (%)', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle', fontSize: isMobile ? 10 : 12 }
          }} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
        <Bar 
          dataKey="completionRate" 
          name="Completion Rate" 
          fill="#8884d8" 
          radius={[4, 4, 0, 0]} 
          barSize={isMobile ? 12 : 20}
        />
        <Bar 
          dataKey="averageScore" 
          name="Average Score" 
          fill="#82ca9d" 
          radius={[4, 4, 0, 0]}
          barSize={isMobile ? 12 : 20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
