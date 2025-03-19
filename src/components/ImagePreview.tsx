import React from 'react';
import styled from 'styled-components';
import { MockImage } from '../types';

interface ImagePreviewProps {
  image: MockImage | null;
  analyzing: boolean;
}

const PreviewContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 0 auto 20px auto;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 18px;
`;

const AnalyzingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;

const QualityMetricsContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MetricLabel = styled.span`
  font-weight: 500;
  color: #495057;
`;

const MetricValue = styled.span`
  color: #212529;
  font-family: monospace;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #e9ecef;
  border-radius: 3px;
  margin-top: 4px;
`;

const ProgressBar = styled.div<{ value: number; color: string }>`
  height: 100%;
  width: ${props => props.value}%;
  background-color: ${props => props.color};
  border-radius: 3px;
`;

const getColorForMetric = (value: number, isInverse = false): string => {
  // For metrics where higher is better (like sharpness, contrast)
  if (!isInverse) {
    if (value >= 70) return '#28a745'; // Good - green
    if (value >= 40) return '#ffc107'; // Medium - yellow
    return '#dc3545'; // Bad - red
  }
  // For metrics where lower is better (like noise)
  else {
    if (value <= 30) return '#28a745'; // Good - green
    if (value <= 60) return '#ffc107'; // Medium - yellow
    return '#dc3545'; // Bad - red
  }
};

const getColorForOptimalRange = (value: number, minOptimal = 40, maxOptimal = 60): string => {
  // For metrics where middle range is optimal (like brightness, saturation)
  if (value >= minOptimal && value <= maxOptimal) return '#28a745'; // Good - green
  if (value >= minOptimal - 15 && value <= maxOptimal + 15) return '#ffc107'; // Medium - yellow
  return '#dc3545'; // Bad - red
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, analyzing }) => {
  return (
    <>
      <PreviewContainer>
        {image && image.dataUrl ? (
          <PreviewImage src={image.dataUrl} alt="Preview" />
        ) : (
          <NoImagePlaceholder>No image available</NoImagePlaceholder>
        )}
        
        {analyzing && (
          <AnalyzingOverlay>
            Analyzing...
          </AnalyzingOverlay>
        )}
      </PreviewContainer>
      
      {image && (
        <QualityMetricsContainer>
          <MetricRow>
            <MetricLabel>Sharpness</MetricLabel>
            <MetricValue>{image.quality.sharpness}/100</MetricValue>
          </MetricRow>
          <ProgressContainer>
            <ProgressBar 
              value={image.quality.sharpness} 
              color={getColorForMetric(image.quality.sharpness)} 
            />
          </ProgressContainer>
          
          <MetricRow>
            <MetricLabel>Brightness</MetricLabel>
            <MetricValue>{image.quality.brightness}/100</MetricValue>
          </MetricRow>
          <ProgressContainer>
            <ProgressBar 
              value={image.quality.brightness} 
              color={getColorForOptimalRange(image.quality.brightness)} 
            />
          </ProgressContainer>
          
          <MetricRow>
            <MetricLabel>Noise</MetricLabel>
            <MetricValue>{image.quality.noise}/100</MetricValue>
          </MetricRow>
          <ProgressContainer>
            <ProgressBar 
              value={image.quality.noise} 
              color={getColorForMetric(image.quality.noise, true)} 
            />
          </ProgressContainer>
          
          <MetricRow>
            <MetricLabel>Contrast</MetricLabel>
            <MetricValue>{image.quality.contrast}/100</MetricValue>
          </MetricRow>
          <ProgressContainer>
            <ProgressBar 
              value={image.quality.contrast} 
              color={getColorForMetric(image.quality.contrast)} 
            />
          </ProgressContainer>
          
          <MetricRow>
            <MetricLabel>Saturation</MetricLabel>
            <MetricValue>{image.quality.saturation}/100</MetricValue>
          </MetricRow>
          <ProgressContainer>
            <ProgressBar 
              value={image.quality.saturation} 
              color={getColorForOptimalRange(image.quality.saturation)} 
            />
          </ProgressContainer>
        </QualityMetricsContainer>
      )}
    </>
  );
};

export default ImagePreview; 