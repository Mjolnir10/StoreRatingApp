import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ChartWidget({ title, dataKey, data }) {
  return (
    <Card sx={{ flex: 1, minWidth: 300, mx: 1 }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={String(dataKey)} stroke="#1976d2" dot />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
