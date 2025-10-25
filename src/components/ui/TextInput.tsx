import { useState } from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../lib/design-tokens';

interface TextInputProps {
  onGenerate: (text: string) => void;
  isLoading?: boolean;
}

export function TextInput({ onGenerate, isLoading = false }: TextInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onGenerate(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe your data in natural language... (e.g., 'Our revenue grew from $2M to $8M over 3 years')"
          disabled={isLoading}
          className="w-full px-6 py-4 text-base resize-none rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            minHeight: '120px',
            backgroundColor: colors.background,
            color: colors.textPrimary,
            border: `1px solid ${colors.border}`,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = colors.accent;
            e.target.style.boxShadow = `0 0 0 3px rgba(59, 130, 246, 0.1)`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = colors.border;
            e.target.style.boxShadow = 'none';
          }}
        />

        <motion.button
          type="submit"
          disabled={!text.trim() || isLoading}
          whileHover={{ scale: text.trim() && !isLoading ? 1.02 : 1 }}
          whileTap={{ scale: text.trim() && !isLoading ? 0.98 : 1 }}
          className="px-8 py-3 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: colors.accent,
            color: '#ffffff',
            fontSize: '16px',
          }}
        >
          {isLoading ? 'Generating...' : 'Generate Visualization'}
        </motion.button>
      </div>
    </form>
  );
}
