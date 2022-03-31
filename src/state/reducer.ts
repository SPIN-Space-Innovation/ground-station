import _ from 'lodash';
import { parseTelemetryMessage } from '../lib/helpers';

export const initialTelemetry: TelemetryState = {
  raw: [] as any[],
  rssi: [],
  battery_voltage: [],
  free_memory: [],
  position: [
    {
      time: Date.now(), long: 16.03152757395328, lat: 69.29509714200718, alt: 0,
    },
  ],
  vertical_velocity: [],
  acceleration: [],
  angular_velocity: [],
  agl: [],
  temperature: [],
  fsmState: null,
};

export const initialState: AppState = {
  socketOpen: null,
  socket: null,
  telemetry: _.clone(initialTelemetry),
};

/*
let startMET: number | null = null;
let startTime: number | null = null;
*/

const TIME_WINDOW = 2; // minutes
const PACKET_RATE = 10; // Hz
const PACKETS_WINDOW = TIME_WINDOW * 60 * PACKET_RATE;

export default function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_SOCKET_OPEN':
      return {
        ...state,
        socketOpen: action.payload.status,
        socket: action.payload.socket,
      };
    case 'RECEIVED_DATA':
      const { payload } = action;
      const newState = {
        ...state,
        telemetry: {
          ...state.telemetry,
          raw: [...state.telemetry.raw, payload].slice(-PACKETS_WINDOW),
        },
      };

      try {
        const packet: TelemetryPacket = JSON.parse(payload);
        const parsedMessage: ParsedMessage = parseTelemetryMessage(packet.message);
        if (parsedMessage.message_type === 'state') {
          /*
          if (parsedMessage.message_type === 'state' && startMET === null) {
            startMET = parsedMessage.mission_elapsed_time;
            startTime = Date.now();
          }
          const packetTimestamp = startMET && startTime
            ? startTime + (parsedMessage.mission_elapsed_time - startMET)
            : Date.now();
          */
          const packetTimestamp = Date.now();

          newState.telemetry = {
            ...newState.telemetry,
            rssi: [
              ...newState.telemetry.rssi,
              { value: packet.rssi, time: packetTimestamp },
            ].slice(-PACKETS_WINDOW),
            battery_voltage: [
              ...newState.telemetry.battery_voltage,
              { value: parsedMessage.battery_voltage, time: packetTimestamp },
            ].slice(-PACKETS_WINDOW),
            free_memory: [
              ...newState.telemetry.free_memory,
              { value: parsedMessage.free_memory, time: packetTimestamp },
            ].slice(-PACKETS_WINDOW),
          };

          newState.telemetry.fsmState = parsedMessage.fsm_state;
          if (parsedMessage.acceleration.x !== null) {
            newState.telemetry.acceleration = [
              ...state.telemetry.acceleration,
              { ...parsedMessage.acceleration, time: packetTimestamp },
            ].slice(-PACKETS_WINDOW);
          }

          if (parsedMessage.angular_velocity.x !== null) {
            newState.telemetry.angular_velocity = [
              ...state.telemetry.angular_velocity,
              { ...parsedMessage.angular_velocity, time: packetTimestamp },
            ].slice(-PACKETS_WINDOW);
          }

          if (parsedMessage.agl !== null) {
            newState.telemetry.agl = [
              ...state.telemetry.agl,
              { value: parsedMessage.agl / 100, time: packetTimestamp },
            ].slice(-PACKETS_WINDOW);
          }

          newState.telemetry.position = [
            ...state.telemetry.position,
            {
              lat: parsedMessage.gps.latitude,
              long: parsedMessage.gps.longitude,
              time: packetTimestamp,
            },
          ].slice(-PACKETS_WINDOW);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }

      return newState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
