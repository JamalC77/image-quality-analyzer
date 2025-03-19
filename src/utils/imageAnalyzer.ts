import { MockImage, ImageQuality, FeedbackMessage, AnalyzerConfig } from '../types';

/**
 * Generates a random ID for feedback messages
 */
const generateMessageId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

/**
 * Analyzes image quality and returns appropriate feedback messages
 */
export const analyzeImageQuality = (
  image: MockImage,
  config: AnalyzerConfig
): FeedbackMessage => {
  const { quality } = image;
  const issues: string[] = [];
  let messageType: 'error' | 'warning' | 'success' | 'info' = 'success';
  
  // Check sharpness
  if (quality.sharpness < config.sharpnessThreshold) {
    issues.push('too blurry');
    messageType = 'error';
  }
  
  // Check brightness
  if (quality.brightness < config.brightnessLowerThreshold) {
    issues.push('too dark');
    messageType = messageType === 'success' ? 'warning' : messageType;
  } else if (quality.brightness > config.brightnessUpperThreshold) {
    issues.push('too bright');
    messageType = messageType === 'success' ? 'warning' : messageType;
  }
  
  // Check noise
  if (quality.noise > config.noiseThreshold) {
    issues.push('too noisy');
    messageType = messageType === 'success' ? 'warning' : messageType;
  }
  
  // Check contrast
  if (quality.contrast < config.contrastThreshold) {
    issues.push('low contrast');
    messageType = messageType === 'success' ? 'warning' : messageType;
  }
  
  // Check saturation
  if (quality.saturation < config.saturationLowerThreshold) {
    issues.push('under-saturated');
    messageType = messageType === 'success' ? 'info' : messageType;
  } else if (quality.saturation > config.saturationUpperThreshold) {
    issues.push('over-saturated');
    messageType = messageType === 'success' ? 'info' : messageType;
  }
  
  // Create feedback message
  let message: string;
  if (issues.length === 0) {
    message = 'Good image quality';
    messageType = 'success';
  } else if (issues.length === 1) {
    message = `Image is ${issues[0]}`;
  } else {
    const lastIssue = issues.pop();
    message = `Image is ${issues.join(', ')} and ${lastIssue}`;
  }
  
  return {
    id: generateMessageId(),
    message,
    type: messageType,
    timestamp: Date.now(),
    duration: config.feedbackDuration
  };
};

/**
 * Default configuration for the image analyzer
 */
export const defaultAnalyzerConfig: AnalyzerConfig = {
  sharpnessThreshold: 60,
  brightnessLowerThreshold: 30,
  brightnessUpperThreshold: 70,
  noiseThreshold: 50,
  contrastThreshold: 40,
  saturationLowerThreshold: 30,
  saturationUpperThreshold: 70,
  feedbackDuration: 2000,    // 2 seconds
  analysisDelay: 500         // 500 milliseconds
}; 