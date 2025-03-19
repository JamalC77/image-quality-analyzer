export interface ImageQuality {
  sharpness: number;   // 0-100, higher is sharper
  brightness: number;  // 0-100, 50 is optimal
  noise: number;       // 0-100, lower is better
  contrast: number;    // 0-100, higher is more contrast
  saturation: number;  // 0-100, 50 is optimal
  timestamp: number;   // when the image was generated
}

export interface MockImage {
  id: string;
  quality: ImageQuality;
  dataUrl?: string;    // Optional base64 representation of the image
}

export interface FeedbackMessage {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'success' | 'info';
  timestamp: number;
  duration: number;    // how long to show this message in ms
}

export interface AnalyzerConfig {
  sharpnessThreshold: number;
  brightnessLowerThreshold: number;
  brightnessUpperThreshold: number;
  noiseThreshold: number;
  contrastThreshold: number;
  saturationLowerThreshold: number;
  saturationUpperThreshold: number;
  feedbackDuration: number;     // in milliseconds
  analysisDelay: number;        // minimum time for analysis in milliseconds
}

export interface ImageGeneratorProps {
  onImageGenerated: (image: MockImage) => void;
  interval: number;             // in milliseconds
  enabled: boolean;
}

export interface ImageAnalyzerProps {
  image: MockImage | null;
  config: AnalyzerConfig;
  onAnalysisComplete: (feedback: FeedbackMessage) => void;
}

export interface FeedbackDisplayProps {
  messages: FeedbackMessage[];
}

export interface ImageQualityAnalyzerProps {
  config?: Partial<AnalyzerConfig>;
  generationInterval?: number;  // in milliseconds, default 200
  enabled?: boolean;
} 