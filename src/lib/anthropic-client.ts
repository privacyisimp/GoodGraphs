import Anthropic from '@anthropic-ai/sdk';
import type { VisualizationData } from '../types';

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true, // For prototype - use backend proxy in production
});

const SYSTEM_PROMPT = `You are a world-class data visualization expert. Analyze the user's text and determine the best way to visualize it.

Return ONLY valid JSON (no markdown, no explanation, no code blocks) with this exact structure:
{
  "type": "line|bar|area",
  "data": [{"x": "label", "y": number}, ...],
  "config": {
    "title": "string",
    "xLabel": "string",
    "yLabel": "string",
    "accentColor": "#3b82f6|#10b981|#f59e0b|#ef4444",
    "animationStyle": "confident|neutral|cautious"
  }
}

Rules:
- Choose accentColor based on sentiment:
  * #3b82f6 (blue) = neutral/general business data
  * #10b981 (green) = positive/growth story
  * #f59e0b (amber) = warning/mixed results
  * #ef4444 (red) = negative/decline
- Choose animationStyle based on narrative:
  * confident = clear growth/success story
  * neutral = factual data presentation
  * cautious = concerning trends/decline
- Extract actual numbers from text, infer reasonable values if implicit
- Keep data arrays to 3-8 points for clarity
- Choose visualization type based on data:
  * line = trends over time, continuous data
  * bar = comparisons between categories, discrete values
  * area = cumulative totals, volume over time
- Labels should be concise (1-3 words max)
- Titles should be clear and business-appropriate`;

export async function generateVisualization(text: string): Promise<VisualizationData> {
  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: text,
        },
      ],
      system: SYSTEM_PROMPT,
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from API');
    }

    // Clean the response - remove any markdown code blocks if present
    let jsonText = content.text.trim();
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    const result = JSON.parse(jsonText) as VisualizationData;

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
