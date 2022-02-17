import React from 'react';
import {
  AppBar, Toolbar, Typography,
} from '@mui/material';
import Context from '../state/Context';

export default function Header() {
  const { state } = React.useContext(Context);

  return (
    <AppBar className="app-bar" position="static" sx={{ backgroundColor: '#282c34', color: '#fff' }}>
      <Toolbar>
        <img src={`${process.env.PUBLIC_URL}SpinLogo_White.png`} alt="SPIN" className="logo" />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Rocket Control Station
        </Typography>

        <Typography
          variant="subtitle1"
          noWrap
          component="div"
        >
          Connection Status:
          <Typography
            variant="subtitle1"
            component="span"
            sx={{
              fontWeight: 'bold',
              color: !state.socketOpen ? '#f88' : '#8f8',
            }}
          >
            {` ${state.socketOpen ? 'Connected' : 'Disconnected'}`}
          </Typography>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
