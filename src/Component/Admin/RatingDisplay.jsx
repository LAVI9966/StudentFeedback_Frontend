import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const RatingsDisplay = () => {
  // Dummy ratings data
  const ratingsData = [
    { name: "Item 1", rating: 400 },
    { name: "Item 2", rating: 300 },
    { name: "Item 3", rating: 200 },
    { name: "Item 4", rating: 100 },
  ];

  return (
    <div>
      <h1>Rating Data Visualization</h1>
      <BarChart
        width={600}
        height={300}
        data={ratingsData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="rating" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default RatingsDisplay;
