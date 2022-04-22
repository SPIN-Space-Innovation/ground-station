import _ from 'lodash';
import moment from 'moment';

export function trimDecimalPoints(number: number) {
  return parseFloat(number.toFixed(3));
}

export function formatNumber(number: number) {
  return trimDecimalPoints(number).toLocaleString();
}

export function formatStringNumber(numberStr: string) {
  return trimDecimalPoints(parseFloat(numberStr)).toLocaleString();
}

export function averageAcceleration(velocities: Array<InertialDataPoint>, axis: Axis) {
  if (velocities.length < 2) {
    return 0;
  }

  const currentVelocity: InertialDataPoint = _.last(velocities) as InertialDataPoint;
  const previousVelocity: InertialDataPoint = _.nth(velocities, -2) as InertialDataPoint;
  const timeDiff = currentVelocity.time - previousVelocity.time;
  return (currentVelocity[axis] - previousVelocity[axis]) / timeDiff;
}

export function position(prevPositions: any, velocities: any) {
  if (!_.last(prevPositions) || !_.last(velocities)) {
    return _.last(prevPositions);
  }

  const { long: prevLong, lat: prevLat, alt: prevAlt } = _.last(prevPositions) as PositionPoint;
  const previousVelocities = _.last(velocities) as InertialDataPoint;
  const dt = (Date.now() - previousVelocities.time) / 1000; // keep dt in seconds
  const dx = previousVelocities.x * dt;
  const dy = previousVelocities.y * dt;
  const dz = previousVelocities.z * dt;

  const earthRadius = 6371000;
  const newLat = prevLat
    + (dy / earthRadius) * (180 / Math.PI);
  const newLong = prevLong
    + (dx / (earthRadius * Math.cos((Math.PI * prevLat) / 180))) * (180 / Math.PI);
  const newAlt = prevAlt + dz;

  return {
    time: Date.now(), lat: newLat, long: newLong, alt: newAlt,
  };
}

export function decapitalizeKeys(result: any, val: any, key: string) {
  const newKey = `${key[0].toLowerCase()}${key.substr(1)}`;
  if (_.isPlainObject(val)) {
    result[newKey] = _.transform(val, decapitalizeKeys);
  } else {
    result[newKey] = val;
  }
}

export function timeTickFormatter(timestamp: number | string) {
  if (timestamp === 'auto') return timestamp;

  return moment(timestamp).format('HH:mm:ss:SSS');
}

export function parseTelemetryMessage(message: string): ParsedMessage {
  const parts = message.split(',');

  const parsedMessage: ParsedMessage = {
    message_type: parseInt(parts[0], 10) === 0 ? 'state' : 'debug',
    packet_number: parseInt(parts[1], 10),
    mission_elapsed_time: parseInt(parts[2], 10),
    free_memory: parseInt(parts[3], 10),
    battery_voltage: parseInt(parts[4], 10),
    fsm_state: parts[5],
    sd_logs: parts[6] === '1',
    selected_igniter: parseInt(parts[7], 10),
    agl: parts.length >= 9 ? parseInt(parts[8], 10) : null,
    pressure: parts.length >= 9 ? parseInt(parts[9], 10) : null,
    temperature: parts.length >= 9 ? parseInt(parts[10], 10) / 100 : null,
    acceleration: {
      x: parts.length >= 9 ? parseInt(parts[11], 10) / 100 : null,
      y: parts.length >= 9 ? parseInt(parts[12], 10) / 100 : null,
      z: parts.length >= 9 ? parseInt(parts[13], 10) / 100 : null,
    },
    angular_velocity: {
      x: parts.length >= 9 ? parseInt(parts[14], 10) : null,
      y: parts.length >= 9 ? parseInt(parts[15], 10) : null,
      z: parts.length >= 9 ? parseInt(parts[16], 10) : null,
    },
    gps: {
      fixed: !!parseInt(parts[17], 10),
      satellites: parts.length >= 9 ? parseInt(parts[18], 10) : null,
      latitude: parts.length >= 9 ? parseInt(parts[19], 10) / 10000000 : 0,
      longitude: parts.length >= 9 ? parseInt(parts[20], 10) / 10000000 : 0,
    },
  };

  return parsedMessage;
}
