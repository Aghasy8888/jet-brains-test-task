import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { CategoryStats } from "../types";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { CHART_COLORS, CATEGORIES } from "../constants";
import ChartTooltip from "./ChartTooltip";
import { NoDataMessage } from "../common";

interface CategoryChartProps {
  data: CategoryStats[];
}

function CategoryChart({ data }: CategoryChartProps) {
  const isMobile = useMediaQuery(640);

  if (data.length === 0) {
    return <NoDataMessage dataName={CATEGORIES} />;
  }

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 500 : 400}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy={isMobile ? "52%" : "50%"}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip centerValue={true} />} />
        <Legend
          wrapperStyle={{
            bottom: "2px",
            maxHeight: "158px",
            overflow: "auto",
            fontSize: "14px",
            maxWidth: "34.375rem",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryChart;
