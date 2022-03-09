import React from 'react';
import _ from 'lodash';
import uPlot, { AlignedData } from 'uplot';
import { timeTickFormatter } from '../lib/helpers';

const lineColors = ['#8884d8', '#82ca9d', '#ffc658'];
const createPlotOptions = (dataKeys: [string, string, string], label: string) => ({
  width: 400,
  height: 400,
  scales: {
    x: {
      time: false,
    },
  },
  series: [
    {
      value: (u: any, time: number) => timeTickFormatter(time),
      label: 'Time',
    },
    ...dataKeys.map((key: string, index: number) => ({
      label: key,
      scale: label,
      value: (u: any, v: any) => (v == null ? '-' : v),
      stroke: lineColors[index],
      width: 1.5,
    })),
  ],
  axes: [
    {
      values: (self: any, splits: any) => (
        splits.map((v: any) => (v == null ? null : timeTickFormatter(v)))
      ),
      gap: 1,
    },
    {
      scale: label,
    },
  ],
});

export default function TripleLineChart(props: TripleLineChartProps) {
  const { label, data, dataKeys } = props;

  const [plotInitialized, setPlotInitialized] = React.useState(false);
  const [sizeObserver, setSizeObserver] = React.useState<ResizeObserver | null>(null);

  const elem = React.useRef<HTMLDivElement | null>(null);
  const wrapperElem = React.useRef<HTMLDivElement | null>(null);
  const plotRef = React.useRef<uPlot | null>(null);
  const mounted = React.useRef<true | null>(null);

  const opts = createPlotOptions(dataKeys, label);

  // update plot data
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else if (plotRef.current) {
      const plotData: AlignedData = [
        data.map((point: any) => point.time),
        data.map((point: any) => point[dataKeys[0]]),
        data.map((point: any) => point[dataKeys[1]]),
        data.map((point: any) => point[dataKeys[2]]),
      ];
      plotRef.current.setData(plotData, true);
    }
  });

  // initialize plot
  React.useEffect(() => {
    if (elem.current && !plotInitialized) {
      setPlotInitialized(true);
      /* eslint-disable new-cap */
      plotRef.current = new uPlot(opts, [[]], elem.current);
    }
  }, [elem.current]);

  // watch for resize
  React.useEffect(() => {
    if (wrapperElem.current && !sizeObserver) {
      const observer = new ResizeObserver(() => {
        if (!plotRef.current || !wrapperElem.current) {
          return;
        }
        plotRef.current.setSize({ width: wrapperElem.current.offsetWidth, height: 400 });
      });
      observer.observe(wrapperElem.current);
      setSizeObserver(observer);
    }

    return () => {
      sizeObserver?.disconnect();
      setSizeObserver(null);
    };
  }, [wrapperElem.current]);

  return (
    <div ref={wrapperElem}>
      <div ref={elem} className="uplot-chart" />
    </div>
  );
}
