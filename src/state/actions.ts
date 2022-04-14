export const receivedData = (data: string) => ({
  type: 'RECEIVED_DATA',
  payload: data,
});

export const setSocketOpen = (status: boolean, socket?: WebSocket) => ({
  type: 'SET_SOCKET_OPEN',
  payload: { status, socket },
});

export const setActionsLock = (lockStatus: boolean) => ({
  type: 'SET_ACTIONS_LOCKED',
  payload: { lockStatus },
});

export const toggleControlsPasswordModal = () => ({
  type: 'TOGGLE_CONTROLS_PASSWORD_MODAL',
});
