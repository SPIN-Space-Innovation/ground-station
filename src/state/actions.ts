export const receivedData = (data: string) => ({
  type: 'RECEIVED_DATA',
  payload: data,
});

export const setSocketOpen = (status: boolean, socket?: WebSocket) => ({
  type: 'SET_SOCKET_OPEN',
  payload: { status, socket },
});
