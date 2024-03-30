import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const QuestionChart = ({ questionText, abridgedRating }) => {
  // Prepare the data for the chart
  const chartData = [{ name: questionText, averageRating: abridgedRating }];

  return (
    <div>
      <h3 className="rounded p-2 bg-info">{questionText}</h3>
      <BarChart
        width={250}
        height={400}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          label={{
            value: "Average Rating",
            angle: -90,
            position: "insideLeft",
          }}
          domain={[0, 5]} // This line ensures the Y-axis goes from 0 to 5
          ticks={[1, 2, 3, 4, 5]} // Specify the exact values to display on the Y-axis
          tickFormatter={(tickValue) => Math.round(tickValue)}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="averageRating" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default QuestionChart;
{
  /* <div>
{Object.keys(averageRatings).map((question, index) => (
  <QuestionChart
    key={index}
    questionText={index + 1}
    averageRating={averageRatings[question]}
  />
))}
</div> */
}
