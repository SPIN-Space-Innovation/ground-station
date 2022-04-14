import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Context from '../state/Context';
import * as actions from '../state/actions';

const style = {
  position: 'absolute',
  width: '250px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FSMControls() {
  const { state, dispatch } = React.useContext(Context);
  const [password, setPassword] = React.useState('');
  const [errorVisible, setErrorVisible] = React.useState(false);

  const closeModal = () => {
    dispatch(actions.toggleControlsPasswordModal());
  };

  const submitPassword = () => {
    if (password === 'muchavionicswow') {
      dispatch(actions.setActionsLock(false));
      dispatch(actions.toggleControlsPasswordModal());
      setErrorVisible(false);
    } else {
      setErrorVisible(true);
    }
  };

  return (
    <Modal
      open={state.controlsPasswordModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {errorVisible && (<Alert severity="error" sx={{ marginBottom: '15px' }}>Mind your own business.</Alert>)}
        <TextField
          required
          fullWidth
          id="outlined-required"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="contained" endIcon={<LockOpenIcon />} onClick={submitPassword}>
            Unlock
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
