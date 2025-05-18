import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  CartesianGrid,
} from 'recharts';

interface ForecastChartProps {
  formattedForecast: { name: string; temperature: number }[];
}

export default function ForecastChart({ formattedForecast }: ForecastChartProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded p-4">
      <h2 className="font-semibold mb-4">7-Day Temperature Forecast (°C)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={formattedForecast}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={[20, 40]}
            label={{
              value: 'Temperature (°C)',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="temperature"
            fill="#ff7300"
            name="Temperature (°C)"
            opacity={0.3}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ff7300"
            name="Temperature (°C)"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}