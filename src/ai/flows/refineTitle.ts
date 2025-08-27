'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const refineTitleFlow = ai.defineFlow(
  {
    name: 'refineTitleFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
    description: 'Refines a TikTok video title to be more engaging.',
  },
  async (title) => {
    if (!title) {
      return 'An interesting video';
    }

    try {
      const prompt = `Please refine the following TikTok video title to be more engaging, human-friendly, and concise.
Original Title: "${title}"
Refined Title:`;

      const llmResponse = await ai.generate({
        prompt: prompt,
        config: {
          temperature: 0.7,
        },
      });

      const refinedTitle = llmResponse.text.trim().replace(/"/g, '');
      return refinedTitle || title;
    } catch (error) {
      console.error('Error refining title with AI:', error);
      return title; // Fallback to original title on error
    }
  }
);

export async function refineTitle(title: string): Promise<string> {
  return refineTitleFlow(title);
}
