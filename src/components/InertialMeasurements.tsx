import React from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import _ from 'lodash';
import StatusCard from './StatusCard';
import TripleLineChart from './TripleLineChart';
import Context from '../state/Context';
import { formatNumber } from '../lib/helpers';

export default function InertialMeasurements() {
  const { state } = React.useContext(Context);

  return (
    <>
      {['acceleration', 'angular_velocity'].map((metric) => {
        const unit = {
          acceleration: 'm/s^2',
          velocity: 'm/s',
          angular_velocity: 'dps',
        }[metric];
        const label = _.capitalize(metric);

        return (
          <Grid item xs={12} lg={6} key={metric}>
            <Card>
              <CardContent>
                <Grid container spacing={1} sx={{ marginBottom: '15px' }}>
                  {(['x', 'y', 'z'].map((axis) => {
                    const currentValue = _.last(state[metric])
                      ? `${formatNumber((_.last(state[metric]) as any)[axis])} ${unit}`
                      : 'Unknown';

                    return (
                      <Grid item xs={4} key={axis}>
                        <StatusCard
                          label={`${axis.toUpperCase()}-Axis ${label}`}
                          value={currentValue}
                        />
                      </Grid>
                    );
                  }))}
                </Grid>
                <TripleLineChart label={`${label} ${unit}`} data={state[metric]} dataKeys={['x', 'y', 'z']} />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </>
  );
}
