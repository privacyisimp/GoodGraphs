import OpenAI from 'openai';
import type { VisualizationData } from '../types';

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
- Titles should be clear and business-appropriate

IMPORTANT: Return ONLY the JSON object, no other text.`;

export async function generateVisualization(
  text: string,
  apiKey: string
): Promise<VisualizationData> {
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // User provides their own key
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Clean the response - remove any markdown code blocks if present
    let jsonText = content.trim();
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

    if (error instanceof Error) {
      // Provide more helpful error messages
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key. Please check your OpenAI API key.');
      }
      if (error.message.includes('rate limit')) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      if (error.message.includes('quota')) {
        throw new Error('API quota exceeded. Please check your OpenAI account.');
      }
    }

    throw error;
  }
}
