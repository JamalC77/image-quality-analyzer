import { MockImage, ImageQuality } from '../types';

/**
 * Generates a random number between min and max (inclusive)
 */
const getRandomValue = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a random ID
 */
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

/**
 * Generates random image quality properties
 */
export const generateRandomImageQuality = (): ImageQuality => {
  return {
    sharpness: getRandomValue(10, 100),
    brightness: getRandomValue(20, 80),
    noise: getRandomValue(0, 100),
    contrast: getRandomValue(20, 100),
    saturation: getRandomValue(20, 80),
    timestamp: Date.now()
  };
};

/**
 * Generates a mock image with random quality properties
 */
export const generateMockImage = (): MockImage => {
  return {
    id: generateId(),
    quality: generateRandomImageQuality()
  };
};

/**
 * Creates a simple visual representation of image quality metrics
 * (This is optional and can be used to generate a visual representation)
 */
export const createVisualRepresentation = (quality: ImageQuality): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Background - darker for more noise
  const noiseLevel = 255 - (quality.noise * 2.55);
  ctx.fillStyle = `rgb(${noiseLevel}, ${noiseLevel}, ${noiseLevel})`;
  ctx.fillRect(0, 0, 200, 200);
  
  // Sharpness - represented by clear lines
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  
  // Apply blur based on sharpness
  const blurLevel = (100 - quality.sharpness) / 20;
  if (blurLevel > 0) {
    ctx.filter = `blur(${blurLevel}px)`;
  }
  
  // Draw lines to show contrast/sharpness
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(150, 50);
  ctx.lineTo(150, 150);
  ctx.lineTo(50, 150);
  ctx.closePath();
  ctx.stroke();
  
  // Apply brightness
  ctx.fillStyle = `rgba(255, 255, 255, ${quality.brightness / 100})`;
  ctx.fillRect(0, 0, 200, 200);
  
  // Apply saturation with a color overlay
  const saturationColor = quality.saturation > 50 
    ? `rgba(255, 0, 0, ${(quality.saturation - 50) / 50 * 0.5})`
    : `rgba(128, 128, 255, ${(50 - quality.saturation) / 50 * 0.5})`;
  
  ctx.fillStyle = saturationColor;
  ctx.fillRect(0, 0, 200, 200);
  
  return canvas.toDataURL('image/png');
};

/**
 * Generates a mock image with visual representation
 */
export const generateVisualMockImage = (): MockImage => {
  const quality = generateRandomImageQuality();
  return {
    id: generateId(),
    quality,
    dataUrl: createVisualRepresentation(quality)
  };
}; 