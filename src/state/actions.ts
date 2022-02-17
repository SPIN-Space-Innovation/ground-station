export const receivedData = (data: TelemetryMessage) => ({
  type: 'RECEIVED_DATA',
  payload: data,
});

export const setSocketOpen = (status: boolean) => ({
  type: 'SET_SOCKET_OPEN',
  payload: status,
});
