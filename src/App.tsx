import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InertialMeasurements from './components/InertialMeasurements';
import Header from './components/Header';
import reducer, { initialState } from './state/reducer';
import * as actions from './state/actions';
import Context from './state/Context';
import EnvironmentMetrics from './components/EnvironmentMetrics';
import InternalStats from './components/InternalStats';
import RawLogs from './components/RawLogs';
import FSMControls from './components/FSMControls';
import RocketLocation from './components/RocketLocation';

import './App.css';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('open', () => dispatch(actions.setSocketOpen(true, socket)));
    socket.addEventListener('close', () => dispatch(actions.setSocketOpen(false)));
    socket.addEventListener('error', () => dispatch(actions.setSocketOpen(false)));

    socket.addEventListener('message', ({ data }) => {
      dispatch(actions.receivedData(data as string));
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch }}>
        <Header />
      </Context.Provider>

      <Context.Provider value={{ state: state.telemetry, dispatch }}>
        <Box sx={{ flexGrow: 1, padding: '10px' }}>
          <Grid container spacing={2}>
            <RawLogs />
            <Context.Provider value={{ state, dispatch }}>
              <FSMControls />
            </Context.Provider>
            <EnvironmentMetrics />
            <InternalStats />
            <InertialMeasurements />
          </Grid>
          <RocketLocation />
        </Box>
      </Context.Provider>
    </div>
  );
}

export default App;
