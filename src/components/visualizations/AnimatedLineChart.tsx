import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { colors, typography, spacing, shadows, chartTokens } from '../../lib/design-tokens';
import { choreography, timing, easing, type AnimationStyle } from '../../lib/animation-configs';
import type { DataPoint, VisualizationConfig } from '../../types';

interface AnimatedLineChartProps {
  data: DataPoint[];
  config: VisualizationConfig;
}

// Custom animated dot component
const AnimatedDot = (props: any) => {
  const { cx, cy, index, animationStyle } = props;
  const controls = useAnimation();
  const style = animationStyle as AnimationStyle;
  const delay = choreography[style].pointsStagger * index;

  useEffect(() => {
    controls.start({
      scale: [0, 1.2, 1],
      opacity: [0, 1],
      transition: {
        duration: choreography[style].pointsDuration * 2,
        delay: timing.primary + delay,
        ease: easing.emphasis,
      },
    });
  }, [controls, delay, style]);

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={5}
      fill={props.stroke}
      stroke="#ffffff"
      strokeWidth={2}
      initial={{ scale: 0, opacity: 0 }}
      animate={controls}
      style={{
        filter: `drop-shadow(${shadows.subtle})`,
      }}
    />
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: colors.background,
        padding: `${spacing.sm}px`,
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
        boxShadow: shadows.card,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: typography.dataLabel,
          fontWeight: typography.semibold,
          color: colors.textPrimary,
          marginBottom: spacing.xs / 2,
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: typography.dataLabel,
          fontWeight: typography.bold,
          color: payload[0].stroke,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {typeof payload[0].value === 'number'
          ? payload[0].value.toLocaleString()
          : payload[0].value}
      </p>
    </motion.div>
  );
};

export function AnimatedLineChart({ data, config }: AnimatedLineChartProps) {
  const [strokeDasharray, setStrokeDasharray] = useState<string>('0 1000');
  const [showLabels, setShowLabels] = useState(false);
  const [showAxes, setShowAxes] = useState(false);

  const animStyle = config.animationStyle || 'neutral';

  useEffect(() => {
    // Axes fade in first
    const axesTimer = setTimeout(() => {
      setShowAxes(true);
    }, 100);

    // Line draw-on animation
    const lineTimer = setTimeout(() => {
      setStrokeDasharray('1000 0');
    }, 400);

    // Labels appear after line
    const labelsTimer = setTimeout(() => {
      setShowLabels(true);
    }, timing.primary * 1000 + choreography[animStyle].labelsDelay * 1000);

    return () => {
      clearTimeout(axesTimer);
      clearTimeout(lineTimer);
      clearTimeout(labelsTimer);
    };
  }, [animStyle]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: timing.secondary }}
      style={{
        width: '100%',
        padding: `${chartTokens.padding}px`,
        backgroundColor: colors.background,
        borderRadius: '8px',
        boxShadow: shadows.card,
      }}
    >
      {config.title && (
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: showLabels ? 1 : 0, y: showLabels ? 0 : -10 }}
          transition={{ duration: timing.microSlow }}
          style={{
            fontSize: typography.sectionTitle,
            fontWeight: typography.semibold,
            color: colors.textPrimary,
            marginBottom: spacing.md,
            marginTop: 0,
            letterSpacing: typography.tight,
          }}
        >
          {config.title}
        </motion.h2>
      )}

      <ResponsiveContainer width="100%" height={chartTokens.minHeight}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={config.accentColor} stopOpacity={1} />
              <stop offset="100%" stopColor={config.accentColor} stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: showAxes ? 0.3 : 0 }}
            transition={{ duration: timing.microSlow }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.border}
              vertical={false}
            />
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: showAxes ? 1 : 0 }}
            transition={{ duration: timing.microSlow }}
          >
            <XAxis
              dataKey="x"
              stroke={colors.textSecondary}
              style={{
                fontSize: typography.axisLabel,
                fontWeight: typography.light,
                fontFamily: typography.fontFamily,
              }}
              tick={{ fill: colors.textSecondary }}
              axisLine={{ stroke: colors.border }}
              tickLine={false}
            />
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: showAxes ? 1 : 0 }}
            transition={{ duration: timing.microSlow }}
          >
            <YAxis
              stroke={colors.textSecondary}
              style={{
                fontSize: typography.axisLabel,
                fontWeight: typography.light,
                fontFamily: typography.fontFamily,
                fontVariantNumeric: 'tabular-nums',
              }}
              tick={{ fill: colors.textSecondary }}
              axisLine={{ stroke: colors.border }}
              tickLine={false}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return value.toLocaleString();
              }}
            />
          </motion.g>

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="y"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={(props) => (
              <AnimatedDot
                {...props}
                animationStyle={animStyle}
              />
            )}
            activeDot={{
              r: 6,
              fill: config.accentColor,
              stroke: '#ffffff',
              strokeWidth: 2,
            }}
            style={{
              strokeDasharray,
              transition: `stroke-dasharray ${timing.primary}s cubic-bezier(${choreography[animStyle].lineEasing.join(',')})`,
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showLabels ? 1 : 0 }}
        transition={{ duration: timing.microSlow }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: spacing.sm,
          paddingTop: spacing.sm,
        }}
      >
        {config.xLabel && (
          <span
            style={{
              fontSize: typography.dataLabel,
              fontWeight: typography.medium,
              color: colors.textSecondary,
            }}
          >
            {config.xLabel}
          </span>
        )}
        {config.yLabel && (
          <span
            style={{
              fontSize: typography.dataLabel,
              fontWeight: typography.medium,
              color: colors.textSecondary,
            }}
          >
            {config.yLabel}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
