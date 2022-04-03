import React from 'react';
import { Grid } from '@mui/material';

export default function StatusIndicator(
  props: { label: string, status: true | false | null, cols: number },
) {
  const { label, status, cols } = props;

  let colorClass = '';
  if (status) {
    colorClass = 'enabled';
  } else if (status === false) {
    colorClass = 'disabled';
  }

  return (
    <Grid item xs={cols} className="status-indicator">
      <span className={`circle ${colorClass}`} />
      {label}
    </Grid>
  );
}
