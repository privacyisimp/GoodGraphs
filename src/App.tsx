import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TextInput } from './components/ui/TextInput';
import { ApiKeyModal } from './components/ui/ApiKeyModal';
import { VisualizationContainer } from './components/visualizations/VisualizationContainer';
import { generateVisualization } from './lib/anthropic-client';
import type { VisualizationData } from './types';

const API_KEY_STORAGE_KEY = 'goodgraphs_openai_key';

function App() {
  const [visualization, setVisualization] = useState<VisualizationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      // Show modal on first load if no key
      setIsApiKeyModalOpen(true);
    }
  }, []);

  const handleSaveApiKey = (newApiKey: string) => {
    setApiKey(newApiKey);
    localStorage.setItem(API_KEY_STORAGE_KEY, newApiKey);
  };

  const handleGenerate = async (text: string) => {
    if (!apiKey) {
      setError('Please set your OpenAI API key first');
      setIsApiKeyModalOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await generateVisualization(text, apiKey);
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
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-6xl font-bold" style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.04em',
                lineHeight: '1.1'
              }}>
                GoodGraphs
              </h1>

              {/* Settings Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsApiKeyModalOpen(true)}
                className="p-2 rounded-lg transition-all"
                style={{
                  backgroundColor: apiKey ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: apiKey ? '#10b981' : '#ef4444',
                }}
                title={apiKey ? 'API key configured' : 'Configure API key'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </motion.button>
            </div>

            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Transform natural language into world-class animated business visualizations
            </p>

            {/* Feature badges */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="px-4 py-2 rounded-full text-sm font-medium" style={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6'
              }}>
                AI-Powered
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium" style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981'
              }}>
                Animated
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium" style={{
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: '#f59e0b'
              }}>
                Premium Design
              </div>
            </div>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <TextInput onGenerate={handleGenerate} isLoading={isLoading} />
          </motion.div>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-3xl mx-auto mb-8 p-5 rounded-xl"
                style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  boxShadow: '0px 4px 12px rgba(239, 68, 68, 0.08)'
                }}
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5" style={{ color: '#ef4444' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: '#991b1b' }}>{error}</p>
                    {error.includes('API key') && (
                      <button
                        onClick={() => setIsApiKeyModalOpen(true)}
                        className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700"
                      >
                        Configure API key →
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  boxShadow: '0px 8px 24px rgba(59, 130, 246, 0.3)'
                }}>
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-lg font-medium text-slate-700">Creating your visualization...</p>
                <p className="text-sm text-slate-500 mt-2">Analyzing data and designing the perfect chart</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state - show when no visualization and not loading */}
          {!visualization && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl mx-auto text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6" style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
              }}>
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">Get Started</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {apiKey ? (
                  <>Describe your business data in plain English, and watch as AI creates<br />a beautiful, animated visualization in seconds.</>
                ) : (
                  <>Click the settings icon above to add your OpenAI API key, then start creating visualizations.</>
                )}
              </p>
              {apiKey ? (
                <div className="grid gap-3 text-left max-w-md mx-auto">
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <p className="text-sm text-slate-700">"Our revenue grew from $2M to $8M over 3 years"</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                    <p className="text-sm text-slate-700">"Customer acquisition increased 300% from January to June"</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#f8fafc' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                    <p className="text-sm text-slate-700">"Website traffic: Jan 10K, Feb 12K, Mar 15K, Apr 18K"</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsApiKeyModalOpen(true)}
                  className="px-8 py-4 rounded-xl font-semibold text-white transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    boxShadow: '0px 8px 16px rgba(59, 130, 246, 0.25)',
                  }}
                >
                  Configure API Key
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        currentApiKey={apiKey}
      />
    </div>
  );
}

export default App;
