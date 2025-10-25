import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Initialize Anthropic client
    const client = new Anthropic({
      apiKey: apiKey,
    });

    // Call Anthropic API
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

    const result = JSON.parse(jsonText);

    // Validate the response structure
    if (!result.type || !result.data || !result.config) {
      throw new Error('Invalid response structure from API');
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error generating visualization:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate visualization'
    });
  }
}
