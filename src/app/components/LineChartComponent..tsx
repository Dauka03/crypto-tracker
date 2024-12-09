import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

interface LineChartComponentProps {
  data: Array<{ date: string; rate: number }>;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => (
  <LineChart width={600} height={300} data={data}>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="rate" stroke="#8884d8" />
  </LineChart>
);

export default LineChartComponent;
