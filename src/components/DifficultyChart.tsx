import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DifficultyStats } from '../types';
import { DIFFICULTY_DATA } from '../constants';
import ChartTooltip from './ChartTooltip';
import NoDataMessage from './NoDataMessage';

interface DifficultyChartProps {
  data: DifficultyStats[];
}

function DifficultyChart({ data }: DifficultyChartProps) {
  if (data.length === 0) {
    return <NoDataMessage dataName={DIFFICULTY_DATA} />;
  }

  const chartData = data.map((item) => ({
    ...item,
    difficulty: item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="difficulty" />
        <YAxis />
        <Tooltip content={<ChartTooltip />} />
        <Legend />
        <Bar dataKey="count" fill="#3b82f6" name="Questions" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DifficultyChart;

