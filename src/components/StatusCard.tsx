import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function StatusCard(props: { label: string, value: string }) {
  const { label, value } = props;

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
