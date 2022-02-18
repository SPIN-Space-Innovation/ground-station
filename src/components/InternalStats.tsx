import {
  Grid, Card, CardContent,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { formatNumber } from '../lib/helpers';
import BiaxialLineChart from './BiaxialLineChart';
import StatusCard from './StatusCard';
import Context from '../state/Context';

const zipStats = (batteryVoltage: DataPoint, freeMemory: DataPoint) => ({
  time: batteryVoltage.time,
  battery_voltage: batteryVoltage.value,
  free_memory: freeMemory.value,
});

export default function InternalStats() {
  const { state } = React.useContext(Context);

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container spacing={1} sx={{ marginBottom: '15px' }}>
            {['battery_voltage', 'free_memory'].map((metric) => {
              const label = {
                battery_voltage: 'Battery Voltage',
                free_memory: 'Free Memory',
              }[metric];
              const unit = {
                battery_voltage: 'V',
                free_memory: 'kb',
              }[metric];

              return (
                <Grid item xs={6}>
                  <StatusCard label={label as string} value={_.last(state[metric]) ? `${formatNumber((_.last(state[metric]) as any).value)} ${unit}` : 'Unknown'} />
                </Grid>
              );
            })}
          </Grid>
          <BiaxialLineChart options={{
            labels: ['Battery (V)', 'Free Memory (kb)'],
            data: _.zipWith(state.battery_voltage, state.free_memory, zipStats),
            dataKeys: ['battery_voltage', 'free_memory'],
            formatters: [],
          }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
