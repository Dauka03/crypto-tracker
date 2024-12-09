"use client";
import { useState, useEffect } from "react";
import { Select, DatePicker, Button, Statistic, Row, Col } from "antd";
import LineChartComponent from "../components/LineChartComponent.";

const { Option } = Select;
const { RangePicker } = DatePicker;

const currencyPairs = [
  { label: "BTC/USD", value: "BTC/USD" },
  { label: "ETH/USD", value: "ETH/USD" },
  { label: "XRP/USD", value: "XRP/USD" },
  // Add more pairs as needed
];

const sampleData = {
  "BTC/USD": [
    { date: "2024-12-01", rate: 48000 },
    { date: "2024-12-02", rate: 49000 },
    { date: "2024-12-03", rate: 47000 },
  ],
  "ETH/USD": [
    { date: "2024-12-01", rate: 3800 },
    { date: "2024-12-02", rate: 3900 },
    { date: "2024-12-03", rate: 3700 },
  ],
  // More data for other pairs
};

export default function AnalyticsPage() {
  const [selectedPair, setSelectedPair] = useState("BTC/USD");
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [data, setData] = useState(sampleData["BTC/USD"]);
  const [stats, setStats] = useState({ avgRate: 0, maxRate: 0, minRate: 0 });

  const handlePairChange = (value: string) => {
    setSelectedPair(value);
    setData(sampleData[value]);
  };

  const handleDateChange = (dates: [any, any]) => {
    setSelectedDates(dates);
    // Add filtering logic for data based on selected dates
  };

  const calculateStats = (data: Array<{ date: string; rate: number }>) => {
    const rates = data.map((item) => item.rate);
    const avgRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
    const maxRate = Math.max(...rates);
    const minRate = Math.min(...rates);
    setStats({ avgRate, maxRate, minRate });
  };

  useEffect(() => {
    calculateStats(data);
  }, [data]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Аналитика курсов</h1>

      <div className="mb-6">
        <Select
          value={selectedPair}
          onChange={handlePairChange}
          style={{ width: 200 }}
          placeholder="Выберите пару"
        >
          {currencyPairs.map((pair) => (
            <Option key={pair.value} value={pair.value}>
              {pair.label}
            </Option>
          ))}
        </Select>
      </div>

      <div className="mb-6">
        <RangePicker onChange={handleDateChange} />
      </div>

      <div className="mb-6">
        <Row gutter={16}>
          <Col span={8}>
            <Statistic title="Средний курс" value={stats.avgRate} precision={2} />
          </Col>
          <Col span={8}>
            <Statistic title="Максимальный курс" value={stats.maxRate} />
          </Col>
          <Col span={8}>
            <Statistic title="Минимальный курс" value={stats.minRate} />
          </Col>
        </Row>
      </div>

      <LineChartComponent data={data} /> {/* Use the LineChartComponent here */}

      <Button href={"/"} type="default" className="mb-4">
        Назад
      </Button>
    </main>
  );
}
