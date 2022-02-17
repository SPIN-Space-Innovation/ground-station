type TelemetryMessage = {
  message: string,
  rssi: number,
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
}

type InertialDataPoint = {
  time: number,
  x: number,
  y: number,
  z: number
};

type PositionPoint = {
  time: number,
  long: number,
  lat: number,
  alt: number
}

type Axis = 'x' | 'y' | 'z';
