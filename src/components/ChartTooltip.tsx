interface TooltipPayloadItem {
  name?: string;
  value?: number;
  payload?: {
    difficulty?: string;
  };
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<TooltipPayloadItem>;
  centerValue?: boolean;
}

function ChartTooltip({
  active,
  payload,
  centerValue = false,
}: ChartTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0];
    const label = data.name || data.payload?.difficulty || '';
    const value = data.value;

    return (
      <div className="bg-slate-50 dark:bg-gray-800 p-3 border border-slate-300 dark:border-gray-600 rounded shadow-lg">
        <p className="font-semibold text-slate-800 dark:text-gray-200">
          {label}
        </p>
        <p
          className={`text-blue-600 dark:text-blue-400 ${centerValue ? 'text-center' : ''}`}
        >
          {value}
        </p>
      </div>
    );
  }
  return null;
}

export default ChartTooltip;
