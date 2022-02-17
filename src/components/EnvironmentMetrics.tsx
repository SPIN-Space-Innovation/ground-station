import {
  Grid, Card, CardContent,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { formatNumber } from '../lib/helpers';
import BiaxialLineChart from './BiaxialLineChart';
import StatusCard from './StatusCard';
import Context from '../state/Context';

const zipStats = (altitude: any, temperature: any) => ({
  time: altitude.time,
  altitude: altitude.value,
  temperature: temperature.value,
});

export default function EnvironmentMetrics() {
  const { state } = React.useContext(Context);

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container spacing={1} sx={{ marginBottom: '15px' }}>
            <Grid item xs={6}>
              <StatusCard label="Altitude" value={_.last(state.altitude) ? `${formatNumber((_.last(state.altitude) as any).value)}m` : 'Unknown'} />
            </Grid>
            <Grid item xs={6}>
              <StatusCard label="Status Message" value={state.fsmState || 'Unknown'} />
            </Grid>
          </Grid>
          <BiaxialLineChart options={{
            labels: ['Altitude(m)', 'Temperature (℃)'],
            data: _.zipWith(state.altitude, state.temperature, zipStats),
            dataKeys: ['altitude', 'temperature'],
            formatters: [
              (alt: any) => (alt > 1000 ? `${alt / 1000}k` : alt),
            ],
          }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
