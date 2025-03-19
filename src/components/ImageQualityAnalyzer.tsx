import React, { useState } from 'react';
import styled from 'styled-components';
import { ImageQualityAnalyzerProps, MockImage, FeedbackMessage, AnalyzerConfig } from '../types';
import { defaultAnalyzerConfig } from '../utils/imageAnalyzer';
import ImageGenerator from './ImageGenerator';
import ImageAnalyzer from './ImageAnalyzer';
import FeedbackDisplay from './FeedbackDisplay';
import ImagePreview from './ImagePreview';

// Container for the analyzer UI
const AnalyzerContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  color: #343a40;
  margin-bottom: 30px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#0069d9' : '#5a6268'};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

// Main component
const ImageQualityAnalyzer: React.FC<ImageQualityAnalyzerProps> = ({
  config = {},
  generationInterval = 200,
  enabled = true
}) => {
  // Merge default config with provided config
  const mergedConfig: AnalyzerConfig = {
    ...defaultAnalyzerConfig,
    ...config
  };

  // State for the analyzer
  const [currentImage, setCurrentImage] = useState<MockImage | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(enabled);

  // Handler for new generated images
  const handleImageGenerated = (image: MockImage) => {
    setCurrentImage(image);
  };

  // Handler for analysis results
  const handleAnalysisComplete = (feedback: FeedbackMessage) => {
    setFeedbackMessages(prev => [...prev, feedback]);
    setAnalyzing(false);
  };

  // Toggle analyzer on/off
  const toggleAnalyzer = () => {
    setIsRunning(prev => !prev);
  };

  return (
    <AnalyzerContainer>
      <Header>Image Quality Analyzer</Header>
      
      <ControlsContainer>
        <ControlButton
          active={isRunning}
          onClick={toggleAnalyzer}
        >
          {isRunning ? 'Pause Analyzer' : 'Start Analyzer'}
        </ControlButton>
      </ControlsContainer>
      
      <ImagePreview 
        image={currentImage} 
        analyzing={analyzing}
      />
      
      {/* Non-visible components */}
      <ImageGenerator 
        onImageGenerated={handleImageGenerated}
        interval={generationInterval}
        enabled={isRunning}
      />
      
      <ImageAnalyzer 
        image={currentImage}
        config={mergedConfig}
        onAnalysisComplete={handleAnalysisComplete}
      />
      
      <FeedbackDisplay 
        messages={feedbackMessages}
      />
    </AnalyzerContainer>
  );
};

export default ImageQualityAnalyzer; 