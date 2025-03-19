import React, { useEffect, useRef } from 'react';
import { ImageGeneratorProps } from '../types';
import { generateVisualMockImage } from '../utils/mockImageGenerator';

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  onImageGenerated,
  interval,
  enabled
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clean up previous interval if it exists
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Set up new interval if enabled
    if (enabled) {
      // Generate an initial image immediately
      const initialImage = generateVisualMockImage();
      onImageGenerated(initialImage);

      // Set up interval for subsequent images
      intervalRef.current = setInterval(() => {
        const image = generateVisualMockImage();
        onImageGenerated(image);
      }, interval);
    }

    // Clean up on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [onImageGenerated, interval, enabled]);

  // No visual render - this is just a functional component
  return null;
};

export default ImageGenerator; 