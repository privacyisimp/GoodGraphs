import { useState } from 'react';
import { motion } from 'framer-motion';

interface TextInputProps {
  onGenerate: (text: string) => void;
  isLoading?: boolean;
}

export function TextInput({ onGenerate, isLoading = false }: TextInputProps) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onGenerate(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {/* Glow effect on focus */}
        {isFocused && (
          <motion.div
            layoutId="input-glow"
            className="absolute -inset-1 rounded-2xl opacity-20 blur-xl"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe your data in plain English..."
            disabled={isLoading}
            rows={4}
            className="w-full px-6 py-5 text-base resize-none rounded-xl transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400"
            style={{
              backgroundColor: '#ffffff',
              color: '#0f172a',
              border: isFocused ? '2px solid #3b82f6' : '2px solid #e2e8f0',
              fontFamily: 'Inter, system-ui, sans-serif',
              boxShadow: isFocused
                ? '0px 8px 24px rgba(59, 130, 246, 0.12), 0px 2px 8px rgba(0, 0, 0, 0.04)'
                : '0px 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          />

          {/* Character indicator */}
          {text.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-3 right-4 text-xs font-medium text-slate-400"
            >
              {text.length} characters
            </motion.div>
          )}
        </div>

        {/* Example suggestions */}
        {text.length === 0 && !isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 flex flex-wrap gap-2"
          >
            <span className="text-xs font-medium text-slate-500">Try:</span>
            {[
              'Revenue grew from $2M to $8M',
              'Traffic: Jan 10K, Feb 15K, Mar 22K',
              'Sales increased 300%'
            ].map((example, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setText(example)}
                className="px-3 py-1 text-xs font-medium rounded-full transition-all hover:scale-105"
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  color: '#3b82f6',
                  border: '1px solid rgba(59, 130, 246, 0.15)'
                }}
              >
                {example}
              </button>
            ))}
          </motion.div>
        )}

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={!text.trim() || isLoading}
          whileHover={{ scale: text.trim() && !isLoading ? 1.02 : 1 }}
          whileTap={{ scale: text.trim() && !isLoading ? 0.98 : 1 }}
          className="w-full mt-4 px-8 py-4 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          style={{
            background: text.trim() && !isLoading
              ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
              : '#e2e8f0',
            color: text.trim() && !isLoading ? '#ffffff' : '#94a3b8',
            boxShadow: text.trim() && !isLoading
              ? '0px 8px 16px rgba(59, 130, 246, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.08)'
              : 'none',
            fontSize: '16px',
          }}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating visualization...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Visualization</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </form>
  );
}
