import {
  FormGroup, FormControlLabel, Checkbox, Grid,
} from '@mui/material';
import React from 'react';
import Context from '../state/Context';

export default function RawLogs() {
  const [logs, setLogs] = React.useState<string[]>([]);
  const [paused, setPaused] = React.useState(false);
  const elem = React.createRef<HTMLTextAreaElement>();
  const { state } = React.useContext(Context);

  const handleLiveToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaused(!event.target.checked);
  };

  React.useEffect(() => {
    if (!paused) {
      setLogs(state.raw);
    }
  }, [state.raw]);

  React.useEffect(() => {
    if (elem.current && !paused) {
      elem.current.scrollTop = elem.current.scrollHeight - 20;
    }
  }, [logs]);

  return (
    <Grid item xs={12} md={6}>
      <div className="raw-logs-container">
        <textarea ref={elem} className="raw-logs" value={logs.join('\n')} disabled />
        <FormGroup className="live-toggle">
          <FormControlLabel control={<Checkbox defaultChecked onChange={handleLiveToggle} />} label="Live" />
        </FormGroup>
      </div>
    </Grid>
  );
}
