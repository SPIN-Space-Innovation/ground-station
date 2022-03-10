import React from 'react';
import {
  Grid, Card, CardContent, Typography, Button,
} from '@mui/material';
import Context from '../state/Context';

export default function FSMControls() {
  const { state } = React.useContext(Context);

  const sendCommand = (command: string) => {
    if (state.socket) {
      state.socket.send(`COMMAND:${command}`);
    }
  };

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
            {state.telemetry.fsmState}
          </Typography>
          <div>
            <Button
              sx={{
                display: 'block', margin: '10px auto', height: '50px', width: '100%',
              }}
              variant="contained"
              size="large"
              color="error"
              onClick={() => sendCommand('trigger_fts')}
            >
              Flight Termination
            </Button>
          </div>
          <div className="fsm-actions">
            <Button variant="contained" size="large" onClick={() => sendCommand('init_calibration')}>
              Calibrate
            </Button>
            <Button variant="contained" size="large" onClick={() => sendCommand('launched')}>
              LAUNCHED
            </Button>
            <Button variant="contained" size="large" onClick={() => sendCommand('set_ejection_test_mode')}>
              EJECTION_TEST
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
