import React from 'react';
import {
  CartesianGrid, Legend, Line, LineChart, ReferenceLine,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { timeTickFormatter } from '../lib/helpers';

export default function BiaxialLineChart(props: BiaxialLineChartProps) {
  const { options } = props;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={options.data}
        margin={{
          top: 5, right: 10, left: 10, bottom: 5,
        }}
        syncId={1}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="time"
          tickFormatter={timeTickFormatter}
          tick={{ fontSize: 12 }}
        />

        {[0, 1].map((_, index) => (
          <YAxis
            key={options.labels[index]}
            yAxisId={index === 0 ? 'left' : 'right'}
            label={{
              value: options.labels[index],
              angle: index === 0 ? -90 : 90,
              position: index === 0 ? 'insideLeft' : 'insideRight',
              offset: 0,
            }}
            tickFormatter={options.formatters[index]}
            tick={{ fontSize: 12 }}
            orientation={index === 0 ? 'left' : 'right'}
          />
        ))}

        <Tooltip
          labelFormatter={timeTickFormatter}
          isAnimationActive={false}
        />

        <Legend />

        {[0, 1].map((_, index) => (
          <Line
            key={options.dataKeys[index]}
            yAxisId={index === 0 ? 'left' : 'right'}
            isAnimationActive={false}
            type="monotone"
            dataKey={options.dataKeys[index]}
            stroke={index === 0 ? '#8884d8' : '#82ca9d'}
            dot={false}
          />
        ))}

        <ReferenceLine yAxisId="left" y={100000} label="Karman Line" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
}
