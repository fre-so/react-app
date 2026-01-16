'use client';

import * as React from 'react';
import {
  ReferenceLine,
  ScatterChart,
  XAxis,
  YAxis,
  useOffset,
  usePlotArea,
  useXAxisDomain,
  useYAxisDomain,
} from 'recharts';

type AxisDomain = React.ComponentProps<typeof XAxis>['domain'];
type AxisDataKey = React.ComponentProps<typeof XAxis>['dataKey'];

type AxisArrowStyleProps = {
  labelColor?: string;
  lineColor?: string;
  edgeLabelFontSize?: number;
  edgeLabelFontWeight?: React.CSSProperties['fontWeight'];
  labelFontSize?: number;
  labelFontWeight?: React.CSSProperties['fontWeight'];
  arrowHeadLength?: number;
  arrowHeadWidth?: number;
  labelHorizontalGap?: number;
  labelVerticalGap?: number;
};

type QuadrantAxisConfig = {
  dataKey?: AxisDataKey;
  domain?: AxisDomain;
  startLabel?: React.ReactNode;
  endLabel?: React.ReactNode;
  label?: React.ReactNode;
  axisArrow?: AxisArrowStyleProps;
};

export type QuadrantChartProps = Omit<React.ComponentProps<typeof ScatterChart>, 'children'> & {
  children?: React.ReactNode;
  xAxis?: QuadrantAxisConfig;
  yAxis?: QuadrantAxisConfig;
  xAxisLabelHeight?: number;
  yAxisLabelWidth?: number;
};

const DEFAULT_CHART_MARGIN = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5,
};
const DEFAULT_AXIS_LABEL_HEIGHT = 100;
const DEFAULT_AXIS_LABEL_WIDTH = 100;

export function QuadrantChart({
  children,
  className,
  xAxis,
  yAxis,
  xAxisLabelHeight,
  yAxisLabelWidth,
  ...chartProps
}: QuadrantChartProps) {
  const leftPadding = yAxisLabelWidth ?? DEFAULT_AXIS_LABEL_WIDTH;
  const bottomPadding = xAxisLabelHeight ?? DEFAULT_AXIS_LABEL_HEIGHT;
  const { margin, ...restChartProps } = chartProps;
  const resolvedMargin = {
    ...DEFAULT_CHART_MARGIN,
    ...margin,
    left: (margin?.left ?? DEFAULT_CHART_MARGIN.left) + leftPadding,
    right: (margin?.right ?? DEFAULT_CHART_MARGIN.right) + leftPadding,
    bottom: (margin?.bottom ?? DEFAULT_CHART_MARGIN.bottom) + bottomPadding,
  };

  return (
    <ScatterChart className={className} margin={resolvedMargin} {...restChartProps}>
      <XAxis hide type="number" dataKey={xAxis?.dataKey} domain={xAxis?.domain} />
      <YAxis hide type="number" dataKey={yAxis?.dataKey} domain={yAxis?.domain} />
      <QuadrantReferenceLines xDomain={xAxis?.domain} yDomain={yAxis?.domain} />
      {children}
      <AxisArrowHorizontal
        startLabel={xAxis?.startLabel}
        endLabel={xAxis?.endLabel}
        label={xAxis?.label}
        {...(xAxis?.axisArrow ?? {})}
      />
      <AxisArrowVertical
        startLabel={yAxis?.startLabel}
        endLabel={yAxis?.endLabel}
        label={yAxis?.label}
        {...(yAxis?.axisArrow ?? {})}
      />
    </ScatterChart>
  );
}

type AxisArrowProps = {
  startLabel?: React.ReactNode;
  endLabel?: React.ReactNode;
  label?: React.ReactNode;
};

function AxisArrowHorizontal({
  startLabel,
  endLabel,
  label,
  labelColor = 'var(--color-muted-foreground)',
  lineColor = 'var(--color-muted-foreground)',
  edgeLabelFontSize = 16,
  edgeLabelFontWeight = 300,
  labelFontSize = 20,
  labelFontWeight = 500,
  arrowHeadLength = 10,
  arrowHeadWidth = 15,
  labelHorizontalGap = 20,
  labelVerticalGap = 30,
}: AxisArrowProps & AxisArrowStyleProps) {
  const offset = useOffset();
  const plotArea = usePlotArea();
  if (!offset || !plotArea || offset.bottom <= 0 || plotArea.width <= 0) {
    return null;
  }

  const bottomAreaTop = plotArea.y + plotArea.height;
  const arrowY = bottomAreaTop + offset.bottom * 0.4;
  const labelY = arrowY + labelVerticalGap;
  const lineStartX = plotArea.x + plotArea.width * 0.33;
  const lineEndBaseX = plotArea.x + plotArea.width * 0.66;
  const arrowEndX = Math.max(lineStartX, lineEndBaseX);
  const lineEndX = arrowEndX;

  return (
    <g className="text-muted-foreground">
      {startLabel != null ? (
        <text
          x={lineStartX - labelHorizontalGap}
          y={arrowY}
          textAnchor="end"
          dominantBaseline="middle"
          fill={labelColor}
          fontSize={edgeLabelFontSize}
          fontWeight={edgeLabelFontWeight}
        >
          {startLabel}
        </text>
      ) : null}
      {endLabel != null ? (
        <text
          x={lineEndX + labelHorizontalGap}
          y={arrowY}
          textAnchor="start"
          dominantBaseline="middle"
          fill={labelColor}
          fontSize={edgeLabelFontSize}
          fontWeight={edgeLabelFontWeight}
        >
          {endLabel}
        </text>
      ) : null}
      <line
        x1={lineStartX}
        y1={arrowY}
        x2={lineEndX}
        y2={arrowY}
        stroke={lineColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <polyline
        points={`${arrowEndX - arrowHeadLength},${arrowY - arrowHeadWidth / 2} ${arrowEndX},${arrowY} ${
          arrowEndX - arrowHeadLength
        },${arrowY + arrowHeadWidth / 2}`}
        fill="none"
        stroke={lineColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {label != null ? (
        <text
          x={plotArea.x + plotArea.width / 2}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={labelColor}
          fontSize={labelFontSize}
          fontWeight={labelFontWeight}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function AxisArrowVertical({
  startLabel,
  endLabel,
  label,
  labelColor = 'var(--color-muted-foreground)',
  lineColor = 'var(--color-muted-foreground)',
  edgeLabelFontSize = 16,
  edgeLabelFontWeight = 300,
  labelFontSize = 20,
  labelFontWeight = 500,
  arrowHeadLength = 10,
  arrowHeadWidth = 15,
  labelHorizontalGap = 20,
  labelVerticalGap = 30,
}: AxisArrowProps & AxisArrowStyleProps) {
  const offset = useOffset();
  const plotArea = usePlotArea();
  if (!offset || !plotArea || offset.left <= 0 || plotArea.height <= 0) {
    return null;
  }

  const arrowX = plotArea.x - offset.left * 0.4;
  const labelX = arrowX - labelHorizontalGap;
  const lineStartBaseY = plotArea.y + plotArea.height * 0.66;
  const lineEndBaseY = plotArea.y + plotArea.height * 0.33;
  const arrowTipY = Math.min(lineStartBaseY, lineEndBaseY);
  const lineStartY = Math.max(lineStartBaseY, arrowTipY);
  const lineEndY = arrowTipY;
  const endLabelY = lineEndY - labelVerticalGap;
  const startLabelY = lineStartY + labelVerticalGap;

  return (
    <g className="text-muted-foreground">
      {label != null ? (
        <text
          x={labelX}
          y={plotArea.y + plotArea.height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={labelFontSize}
          fontWeight={labelFontWeight}
          fill={labelColor}
          transform={`rotate(-90 ${labelX} ${plotArea.y + plotArea.height / 2})`}
        >
          {label}
        </text>
      ) : null}
      {endLabel != null ? (
        <text
          x={arrowX}
          y={endLabelY}
          textAnchor="middle"
          dominantBaseline="text-after-edge"
          fill={labelColor}
          fontSize={edgeLabelFontSize}
          fontWeight={edgeLabelFontWeight}
        >
          {endLabel}
        </text>
      ) : null}
      <line
        x1={arrowX}
        y1={lineStartY}
        x2={arrowX}
        y2={lineEndY}
        stroke={lineColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <polyline
        points={`${arrowX - arrowHeadWidth / 2},${arrowTipY + arrowHeadLength} ${arrowX},${arrowTipY} ${
          arrowX + arrowHeadWidth / 2
        },${arrowTipY + arrowHeadLength}`}
        fill="none"
        stroke={lineColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {startLabel != null ? (
        <text
          x={arrowX}
          y={startLabelY}
          textAnchor="middle"
          dominantBaseline="text-before-edge"
          fill={labelColor}
          fontSize={edgeLabelFontSize}
          fontWeight={edgeLabelFontWeight}
        >
          {startLabel}
        </text>
      ) : null}
    </g>
  );
}

type QuadrantReferenceLinesProps = {
  xDomain?: AxisDomain;
  yDomain?: AxisDomain;
};

function QuadrantReferenceLines({ xDomain, yDomain }: QuadrantReferenceLinesProps) {
  const computedXDomain = useXAxisDomain();
  const computedYDomain = useYAxisDomain();
  const resolvedXDomain = getNumberDomain(computedXDomain) ?? getNumberDomain(xDomain);
  const resolvedYDomain = getNumberDomain(computedYDomain) ?? getNumberDomain(yDomain);
  const xMid = resolvedXDomain ? (resolvedXDomain[0] + resolvedXDomain[1]) / 2 : null;
  const yMid = resolvedYDomain ? (resolvedYDomain[0] + resolvedYDomain[1]) / 2 : null;
  const referenceLineStyle = {
    stroke: 'var(--color-border)',
    strokeWidth: 2,
    strokeDasharray: '6 6',
  };

  return (
    <>
      {resolvedXDomain ? <ReferenceLine x={resolvedXDomain[0]} {...referenceLineStyle} /> : null}
      {resolvedXDomain ? <ReferenceLine x={resolvedXDomain[1]} {...referenceLineStyle} /> : null}
      {resolvedYDomain ? <ReferenceLine y={resolvedYDomain[0]} {...referenceLineStyle} /> : null}
      {resolvedYDomain ? <ReferenceLine y={resolvedYDomain[1]} {...referenceLineStyle} /> : null}
      {xMid != null ? <ReferenceLine x={xMid} {...referenceLineStyle} /> : null}
      {yMid != null ? <ReferenceLine y={yMid} {...referenceLineStyle} /> : null}
    </>
  );
}

function getNumberDomain(domain: unknown): readonly [number, number] | null {
  if (!Array.isArray(domain) || domain.length < 2) return null;
  const [min, max] = domain;
  if (typeof min !== 'number' || typeof max !== 'number') return null;
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  return [min, max];
}
