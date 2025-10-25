import type { VisualizationData } from '../types';

export async function generateVisualization(text: string): Promise<VisualizationData> {
  try {
    // Call our backend API instead of calling Anthropic directly
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate visualization');
    }

    const result = await response.json() as VisualizationData;

    // Validate the response structure
    if (!result.type || !result.data || !result.config) {
      throw new Error('Invalid response structure from API');
    }

    return result;
  } catch (error) {
    console.error('Error generating visualization:', error);
    throw error;
  }
}
