'use server';

import { refineTitle } from '@/ai/flows/refineTitle';
import type { TikTokAPIResponse, TikTokData } from '@/lib/types';

export async function getTikTokData(url: string): Promise<TikTokData> {
  const apiUrl = 'https://tiktok-video-no-watermark2.p.rapidapi.com/';

  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY || '1f51af29bamshcdc3f45ab7e8355p1b5770jsn3121798065a4',
      'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `url=${encodeURIComponent(url)}&hd=1`,
  };

  try {
    const response = await fetch(apiUrl, options);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const jsonResponse: TikTokAPIResponse = await response.json();

    if (jsonResponse.code !== 0) {
      throw new Error(jsonResponse.msg || 'Invalid API response');
    }
    
    if (!jsonResponse.data || !jsonResponse.data.id) {
        throw new Error('No valid data found in API response. The URL might be incorrect or the video is private.');
    }
    
    const originalTitle = jsonResponse.data.title;
    const refinedTitle = await refineTitle(originalTitle);

    return {
      apiResponse: jsonResponse.data,
      refinedTitle,
    };
  } catch (error: any) {
    console.error('Failed to fetch TikTok data:', error);
    throw new Error(error.message || 'An unknown error occurred.');
  }
}
