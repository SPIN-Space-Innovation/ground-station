import _ from 'lodash';

export const initialTelemetry = {
  position: [
    {
      time: Date.now(), long: 16.03152757395328, lat: 69.29509714200718, alt: 0,
    },
  ],
  raw: [] as any[],
  velocity: [],
  acceleration: [],
  altitude: [],
  temperature: [],
  state: null,
  fsmState: null,
};

export const initialState = {
  socketOpen: null,
  telemetry: _.clone(initialTelemetry),
};

const TIME_WINDOW = 2; // minutes
const PACKET_RATE = 10; // Hz
const PACKETS_WINDOW = TIME_WINDOW * 60 * PACKET_RATE;

export default function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_SOCKET_OPEN':
      return {
        ...state,
        socketOpen: action.payload,
      };
    case 'RECEIVED_DATA':
      const { payload } = action;

      return {
        ...state,
        telemetry: {
          ...state.telemetry,
          raw: [...state.telemetry.raw, payload].slice(-PACKETS_WINDOW),
        },
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
