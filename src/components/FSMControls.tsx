import React from 'react';
import {
  Grid, Card, CardContent, Typography, Button,
} from '@mui/material';
import Context from '../state/Context';

export default function FSMControls() {
  const { state } = React.useContext(Context);

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent className="fsm-controls">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            State Machine
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1, textAlign: 'center', fontWeight: 'bold',
            }}
          >
            {state.fsmState}
          </Typography>
          <div>
            <Button
              sx={{
                display: 'block', margin: '10px auto', height: '50px', width: '100%',
              }}
              variant="contained"
              size="large"
              color="error"
            >
              Flight Termination
            </Button>
          </div>
          <div className="fsm-actions">
            <Button variant="contained" size="large">
              Calibrate
            </Button>
            <Button variant="contained" size="large">
              LAUNCHED
            </Button>
            <Button variant="contained" size="large">
              EJECTION_TEST
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
