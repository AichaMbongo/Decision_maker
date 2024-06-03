import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DecisionStateContext } from "../../contexts/DecisionStateContext";

const BarChartComponent: React.FC<{ criterion: string }> = ({ criterion }) => {
  const { decisionState, setDecisionState } = useContext(DecisionStateContext);

  const chartData = Object.keys(
    decisionState.aggregatedPreferences[criterion]
  ).map((option) => ({
    name: option,
    preference: decisionState.aggregatedPreferences[criterion][option],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="preference" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
