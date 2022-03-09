import {
  Grid, Card, CardContent,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { formatNumber } from '../lib/helpers';
import BiaxialLineChart from './BiaxialLineChart';
import StatusCard from './StatusCard';
import Context from '../state/Context';

const zipStats = (agl: DataPoint, verticalVelocity: DataPoint) => ({
  time: agl.time,
  agl: agl.value,
  vertical_velocity: verticalVelocity?.value,
});

export default function EnvironmentMetrics() {
  const { state } = React.useContext(Context);

  return (
    <Grid item xs={12} lg={6}>
      <Card>
        <CardContent>
          <Grid container spacing={1} sx={{ marginBottom: '15px' }}>
            {['agl', 'vertical_velocity'].map((metric) => {
              const label = {
                agl: 'Above Ground Level',
                vertical_velocity: 'Vertical Velocity',
              }[metric];
              const unit = {
                agl: 'm',
                vertical_velocity: 'm/s',
              }[metric];

              return (
                <Grid key={unit} item xs={6}>
                  <StatusCard label={label as string} value={_.last(state[metric]) ? `${formatNumber((_.last(state[metric]) as any).value)} ${unit}` : 'Unknown'} />
                </Grid>
              );
            })}
          </Grid>
          <BiaxialLineChart options={{
            labels: ['AGL (m)', 'Vertical Velocity (m/s))'],
            data: _.zipWith(state.agl, state.vertical_velocity, zipStats),
            dataKeys: ['agl', 'vertical_velocity'],
            formatters: [],
          }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
