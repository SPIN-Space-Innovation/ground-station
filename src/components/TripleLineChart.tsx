import React from 'react';
import _ from 'lodash';
import {
  ResponsiveContainer, LineChart, CartesianGrid,
  XAxis, YAxis, Tooltip, Line, Legend,
} from 'recharts';
import { timeTickFormatter } from '../lib/helpers';

export default function TripleLineChart(props: TripleLineChartProps) {
  const { label, data, dataKeys } = props;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={_.sortBy(data, 'time')}
        margin={{
          top: 5, bottom: 5, right: 10, left: 10,
        }}
        syncId={1}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="time"
          tickFormatter={timeTickFormatter}
          tick={{ fontSize: 12 }}
        />

        <YAxis
          label={{ value: label, angle: -90, position: 'insideLeft' }}
          tick={{ fontSize: 12 }}
        />

        <Tooltip
          labelFormatter={timeTickFormatter}
          isAnimationActive={false}
        />

        <Legend />

        {['#8884d8', '#82ca9d', '#ffc658'].map((color, index) => (
          <Line key={color} type="monotone" isAnimationActive={false} dataKey={dataKeys[index]} stroke={color} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
