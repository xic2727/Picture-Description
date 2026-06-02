export interface ExplorePoint {
  id: string;
  label: string;          // Element name in Chinese, e.g. "风筝"
  pinyin: string;         // Pinyin, e.g. "fēng zhēng"
  description: string;    // Interactive explanation/example phrase, e.g. "五颜六色的风筝在天空中快活地飞，真好看呀！"
  x: number;              // Coordinate X positioning (%)
  y: number;              // Coordinate Y positioning (%)
  type: 'person' | 'object' | 'action' | 'nature';
}

export interface Scene {
  id: string;
  title: string;          // Scene Title
  pinyin: string;         // Scene Title Pinyin
  description: string;    // Brief description for model
  emoji: string;          // Visual identification
  bgColor: string;        // Tailwind style for applet card background
  accentColor: string;    // Highlight color class
  explorePoints: ExplorePoint[];
}

export interface AIFeedback {
  stars: number;
  badge: string;
  summary: string;
  goldSentences: string[];
  missingElements: string[];
  rework: string;
}

export interface MagicHint {
  question: string;
  template: string;
  suggestedWords: string[];
}

export interface GradeHistoryItem {
  id: string;
  sceneId: string;
  sceneTitle: string;
  childText: string;
  stars: number;
  badge: string;
  summary: string;
  timestamp: string;
}
