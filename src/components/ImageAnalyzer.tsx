import React, { useEffect, useState, useRef } from 'react';
import { ImageAnalyzerProps, MockImage } from '../types';
import { analyzeImageQuality } from '../utils/imageAnalyzer';

const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({
  image,
  config,
  onAnalysisComplete
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const lastImageRef = useRef<MockImage | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Start analysis when a new image arrives
  useEffect(() => {
    // Only process if there's an image and it's different from the last one
    if (image && (!lastImageRef.current || lastImageRef.current.id !== image.id) && !analyzing) {
      // Update the last image reference
      lastImageRef.current = image;
      setAnalyzing(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set up a new timeout that represents the analysis time (min 500ms)
      timeoutRef.current = setTimeout(() => {
        const feedback = analyzeImageQuality(image, config);
        onAnalysisComplete(feedback);
        setAnalyzing(false);
      }, Math.max(config.analysisDelay, 500)); // Ensure minimum analysis time of 500ms
    }

    // Clean up on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [image, config, onAnalysisComplete, analyzing]);

  // No visual render - this is just a functional component
  return null;
};

export default ImageAnalyzer; 