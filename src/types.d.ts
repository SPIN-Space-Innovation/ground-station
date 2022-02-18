type TelemetryPacket = {
  message: string,
  rssi: number,
};

type ParsedMessage = {
  message_type: string,
  packet_number: number,
  mission_elapsed_time: number,
  free_memory: number,
  battery_voltage: number,
  fsm_state: string,
  agl: number | null,
  acceleration: { // m/s^2
    x: number | null,
    y: number | null,
    z: number | null,
  },
  angular_velocity: {
    x: number | null,
    y: number | null,
    z: number | null,
  },
  gps: {
    fixed: boolean,
    satellites: number | null,
    longitude: number | null,
    latitude: number | null
  },
};

type DataPoint = {
  value: any,
  time: number,
};

type PositionPoint = {
  time: number,
  long: number,
  lat: number,
  alt: number
};

type Axis = 'x' | 'y' | 'z';

type InertialDataPoint = {
  time: number,
  x: number,
  y: number,
  z: number
};

type TelemetryState = {
  raw: string[],
  rssi: DataPoint[],
  battery_voltage: DataPoint[],
  free_memory: DataPoint[],
  position: any[],
  velocity: any[],
  acceleration: InertialDataPoint[],
  angular_velocity: InertialDataPoint[],
  altitude: any[],
  temperature: any[],
  fsmState: string | null,
};

type AppState = {
  socketOpen: boolean | null,
  telemetry: TelemetryState,
};

type TripleLineChartProps = {
  label: string,
  data: number[],
  dataKeys: [string, string, string]
};

type BiaxialLineChartProps = {
  options: {
    labels: [string, string],
    data: any,
    dataKeys: [string, string],
    formatters: Array<(value: any, index: number) => string>
  }
};
