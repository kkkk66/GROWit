import { GoogleGenAI, Type } from "@google/genai";
import type { UserInput, OptimizationResult, Platform } from '../types';

const platformSchemas = {
  youtube: {
    type: Type.OBJECT,
    properties: {
      titleOptions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 viral, SEO-optimized title options for the YouTube Short. They should be catchy and include emojis." },
      description: { type: Type.STRING, description: "A detailed YouTube description with relevant keywords, a strong call-to-action (CTA), and placeholder for links." },
      keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 5-10 high-ranking, niche-based keywords for YouTube." },
      hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of relevant hashtags for YouTube, without the '#' symbol." },
    },
    required: ["titleOptions", "description", "keywords", "hashtags"]
  },
  youtube_shorts: {
    type: Type.OBJECT,
    properties: {
      titleOptions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 viral, SEO-optimized title options for the YouTube Short. They should be catchy and include emojis." },
      description: { type: Type.STRING, description: "A detailed YouTube description with relevant keywords, a strong call-to-action (CTA), and placeholder for links." },
      keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 5-10 high-ranking, niche-based keywords for YouTube." },
      hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of relevant hashtags for YouTube, without the '#' symbol." },
    },
    required: ["titleOptions", "description", "keywords", "hashtags"]
  },
  instagram: {
    type: Type.OBJECT,
    properties: {
      caption: { type: Type.STRING, description: "An engaging Instagram caption with emojis, a hook, and a clear call-to-action." },
      hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 10-15 trending and niche hashtags for Instagram Reels, without the '#' symbol." },
    },
    required: ["caption", "hashtags"]
  },
  facebook: {
    type: Type.OBJECT,
    properties: {
      postText: { type: Type.STRING, description: "A compelling post text for a Facebook Reel or video, designed to encourage shares and comments." },
      hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 broad and niche hashtags for Facebook, without the '#' symbol." },
    },
    required: ["postText", "hashtags"]
  },
  snapchat: {
    type: Type.OBJECT,
    properties: {
      caption: { type: Type.STRING, description: "A short, punchy caption for a Snapchat Spotlight video." },
      trendingSounds: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 1-3 suggested trending sounds or music styles for Snapchat." },
    },
     required: ["caption", "trendingSounds"]
  },
  tiktok: {
    type: Type.OBJECT,
    properties: {
      caption: { type: Type.STRING, description: "A short, engaging caption for a TikTok video, including a strong hook." },
      hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 5-7 trending and niche hashtags for TikTok, without the '#' symbol. Include at least one broad hashtag like #fyp." },
      trendingSounds: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 1-3 suggested trending sounds or music styles for TikTok." },
    },
    required: ["caption", "hashtags", "trendingSounds"]
  }
};

const buildSchema = (platforms: Platform[]) => {
  const properties: any = {
    shared: {
        type: Type.OBJECT,
        properties: {
            bestTimeToPost: { type: Type.STRING, description: "The single best time to post across all selected platforms, including timezone." },
            trendingScore: { type: Type.NUMBER, description: "An estimated score from 0 to 100 indicating the topic's overall viral potential." }
        },
        required: ["bestTimeToPost", "trendingScore"]
    }
  };

  platforms.forEach(platform => {
    if (platformSchemas[platform]) {
      properties[platform] = platformSchemas[platform];
    }
  });

  return {
    type: Type.OBJECT,
    properties,
    required: ["shared", ...platforms]
  };
};

export const generateContentOptimization = async (input: UserInput, apiKey: string): Promise<OptimizationResult> => {
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  const ai = new GoogleGenAI({ apiKey });
  const schema = buildSchema(input.platforms);
  
  const prompt = `
    Act as a world-class Social Media content strategist and viral growth hacker named GROWit.
    Your tone is enthusiastic, creative, and data-driven.
    Your goal is to generate a complete, viral optimization plan for a short-form video based on the user's request, tailored for each social media platform they have selected.

    User's Request:
    - Video Topic: "${input.topic}"
    - Target Audience: "${input.targetAudience}"
    - Language: "${input.language}"
    - Target Platforms: ${input.platforms.join(', ')}

    Analyze this request and provide a comprehensive optimization plan.
    For each platform, provide content that is natively optimized for that platform's algorithm and user expectations.
    Specifically for YouTube, provide a list of 3-5 diverse and highly engaging title options.
    Generate the response in a structured JSON format according to the provided schema. Be creative, engaging, and use emojis where appropriate.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.8,
      }
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
        throw new Error("EMPTY_RESPONSE");
    }

    try {
      const result = JSON.parse(jsonString);
      return result as OptimizationResult;
    } catch (parseError) {
      console.error("Failed to parse JSON response:", jsonString);
      throw new Error("INVALID_JSON");
    }

  } catch (error: any) {
    console.error("Gemini API call failed:", error);

    if (error.message && ["EMPTY_RESPONSE", "INVALID_JSON", "MISSING_API_KEY"].includes(error.message)) {
        throw error;
    }
    
    const fullErrorString = (String(error.message || '') + String(error.stack || '')).toLowerCase();

    if (fullErrorString.includes('api key')) {
        throw new Error("INVALID_API_KEY");
    }
    
    if (fullErrorString.includes('500') || fullErrorString.includes('503') || fullErrorString.includes('internal server error')) {
        throw new Error("API_ERROR");
    }

    if (fullErrorString.includes('safety')) {
        throw new Error("CONTENT_BLOCKED_SAFETY");
    }
    
    if (fullErrorString.includes('recitation') || fullErrorString.includes('blocked')) {
        throw new Error("CONTENT_BLOCKED");
    }

    if (fullErrorString.includes('429') || fullErrorString.includes('rate limit')) {
        throw new Error("RATE_LIMIT_EXCEEDED");
    }

    if (fullErrorString.includes('400') || fullErrorString.includes('invalid argument') || fullErrorString.includes('bad request')) {
        throw new Error("INVALID_REQUEST");
    }

    throw new Error("API_ERROR");
  }
};