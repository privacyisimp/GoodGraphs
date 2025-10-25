import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TextInput } from './components/ui/TextInput';
import { VisualizationContainer } from './components/visualizations/VisualizationContainer';
import { generateVisualization } from './lib/anthropic-client';
import type { VisualizationData } from './types';
import { spacing } from './lib/design-tokens';

function App() {
  const [visualization, setVisualization] = useState<VisualizationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (text: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateVisualization(text);
      setVisualization(result);
    } catch (err) {
      console.error('Generation error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to generate visualization. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-12 px-6"
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold mb-3"
            style={{
              color: '#0f172a',
              letterSpacing: '-0.02em',
            }}
          >
            Business Visualizations
          </h1>
          <p
            className="text-lg"
            style={{
              color: '#64748b',
            }}
          >
            Transform natural language into world-class animated charts
          </p>
        </div>

        {/* Input Section */}
        <div style={{ marginBottom: spacing.xxl }}>
          <TextInput onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        {/* Error Display */}
        {error && (
          <div
            className="max-w-4xl mx-auto mb-8 p-4 rounded-lg"
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
            }}
          >
            {error}
          </div>
        )}

        {/* Visualization Preview */}
        <AnimatePresence mode="wait">
          {visualization && (
            <VisualizationContainer
              key={JSON.stringify(visualization)}
              visualization={visualization}
            />
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
              style={{
                color: '#3b82f6',
              }}
            />
            <p className="mt-4 text-gray-600">Creating your visualization...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
