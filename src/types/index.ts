import type { AnimationStyle } from '../lib/animation-configs';

export type VisualizationType = 'line' | 'bar' | 'area';

export interface DataPoint {
  x: string | number;
  y: number;
}

export interface VisualizationConfig {
  title?: string;
  xLabel?: string;
  yLabel?: string;
  accentColor: string;
  animationStyle: AnimationStyle;
}

export interface VisualizationData {
  type: VisualizationType;
  data: DataPoint[];
  config: VisualizationConfig;
}

export interface GenerateRequest {
  text: string;
}

export interface GenerateResponse {
  visualization: VisualizationData;
}
