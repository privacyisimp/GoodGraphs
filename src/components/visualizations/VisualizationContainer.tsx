import { motion } from 'framer-motion';
import { AnimatedLineChart } from './AnimatedLineChart';
import type { VisualizationData } from '../../types';
import { timing, easing } from '../../lib/animation-configs';

interface VisualizationContainerProps {
  visualization: VisualizationData;
}

export function VisualizationContainer({ visualization }: VisualizationContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: timing.secondary,
        ease: easing.emphasis,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      {visualization.type === 'line' && (
        <AnimatedLineChart
          data={visualization.data}
          config={visualization.config}
        />
      )}
      {/* Bar and Area charts will be added in Phase 2 */}
      {visualization.type === 'bar' && (
        <div className="p-8 text-center text-gray-500">
          Bar charts coming in Phase 2
        </div>
      )}
      {visualization.type === 'area' && (
        <div className="p-8 text-center text-gray-500">
          Area charts coming in Phase 2
        </div>
      )}
    </motion.div>
  );
}
