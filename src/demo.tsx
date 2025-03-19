import React from 'react';
import ImageQualityAnalyzer from './components/ImageQualityAnalyzer';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;
`;

const Description = styled.div`
  max-width: 800px;
  margin: 0 auto 30px auto;
  text-align: center;
  color: #6c757d;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  color: #6c757d;
  font-size: 14px;
`;

// Custom configuration for the analyzer
const customConfig = {
  sharpnessThreshold: 50,
  feedbackDuration: 2000,  // 2 seconds
  analysisDelay: 500       // 500 milliseconds
};

const App = () => {
  return (
    <AppContainer>
      <Description>
        <p>This demo shows real-time image quality analysis with simulated camera feed.</p>
        <p>Mock images are generated every 200ms, analyzed for 500ms, and feedback is displayed for 2000ms.</p>
      </Description>
      
      <ImageQualityAnalyzer 
        config={customConfig}
        generationInterval={200}
        enabled={true}
      />
      
      <Footer>
        Image Quality Analyzer Demo | Images are simulated for demonstration purposes
      </Footer>
    </AppContainer>
  );
};

export default App; 