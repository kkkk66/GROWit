export type Platform = 'youtube' | 'youtube_shorts' | 'instagram' | 'facebook' | 'snapchat' | 'tiktok';

export interface UserInput {
  topic: string;
  targetAudience: string;
  language: string;
  platforms: Platform[];
}

export interface YouTubeResult {
  titleOptions: string[];
  description: string;
  keywords: string[];
  hashtags: string[];
}

export interface InstagramResult {
  caption: string;
  hashtags: string[];
}

export interface FacebookResult {
  postText: string;
  hashtags: string[];
}

export interface SnapchatResult {
  caption: string;
  trendingSounds: string[];
}

export interface TikTokResult {
  caption: string;
  hashtags: string[];
  trendingSounds: string[];
}

export interface SharedResult {
    bestTimeToPost: string;
    trendingScore: number;
}

export interface OptimizationResult {
  youtube?: YouTubeResult;
  youtube_shorts?: YouTubeResult;
  instagram?: InstagramResult;
  facebook?: FacebookResult;
  snapchat?: SnapchatResult;
  tiktok?: TikTokResult;
  shared: SharedResult;
}

export interface HistoryEntry {
  id: string;
  timestamp: string;
  input: UserInput;
  result: OptimizationResult;
}