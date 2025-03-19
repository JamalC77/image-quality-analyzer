# Image Quality Analyzer

A mini React library that simulates real-time image quality analysis and provides feedback on screen.

## Features

- Continuous generation of mock images at a fixed rate (default: 200ms)
- Image quality analysis with customizable thresholds
- Real-time feedback display with configurable duration
- Visual representation of image quality metrics
- Customizable configuration options

## Installation

```bash
npm install image-quality-analyzer
```

## Usage

Basic usage:

```jsx
import React from 'react';
import { ImageQualityAnalyzer } from 'image-quality-analyzer';

function App() {
  return (
    <div className="App">
      <ImageQualityAnalyzer />
    </div>
  );
}

export default App;
```

With custom configuration:

```jsx
import React from 'react';
import { ImageQualityAnalyzer } from 'image-quality-analyzer';

// Custom configuration
const customConfig = {
  sharpnessThreshold: 50,            // Default: 60
  brightnessLowerThreshold: 25,      // Default: 30
  brightnessUpperThreshold: 75,      // Default: 70
  noiseThreshold: 40,                // Default: 50
  contrastThreshold: 45,             // Default: 40
  saturationLowerThreshold: 25,      // Default: 30
  saturationUpperThreshold: 75,      // Default: 70
  feedbackDuration: 2000,            // Default: 2000 (2 seconds)
  analysisDelay: 500                 // Default: 500 (500 milliseconds)
};

function App() {
  return (
    <div className="App">
      <ImageQualityAnalyzer 
        config={customConfig}
        generationInterval={250}    // Default: 200
        enabled={true}              // Default: true
      />
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `Partial<AnalyzerConfig>` | `{}` | Configuration for the analyzer |
| `generationInterval` | `number` | `200` | Interval in milliseconds for generating new images |
| `enabled` | `boolean` | `true` | Whether the analyzer is enabled |

## Configuration Options

The `config` prop accepts the following configuration options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sharpnessThreshold` | `number` | `60` | Threshold for image sharpness (0-100) |
| `brightnessLowerThreshold` | `number` | `30` | Lower threshold for brightness (0-100) |
| `brightnessUpperThreshold` | `number` | `70` | Upper threshold for brightness (0-100) |
| `noiseThreshold` | `number` | `50` | Threshold for image noise (0-100) |
| `contrastThreshold` | `number` | `40` | Threshold for image contrast (0-100) |
| `saturationLowerThreshold` | `number` | `30` | Lower threshold for saturation (0-100) |
| `saturationUpperThreshold` | `number` | `70` | Upper threshold for saturation (0-100) |
| `feedbackDuration` | `number` | `2000` | Duration in milliseconds to show feedback messages |
| `analysisDelay` | `number` | `500` | Minimum time in milliseconds for analyzing each image |

## Advanced Usage

You can also use the utilities and types exported by the library:

```jsx
import {
  ImageQualityAnalyzer,
  generateMockImage,
  analyzeImageQuality,
  defaultAnalyzerConfig
} from 'image-quality-analyzer';

import type {
  ImageQuality,
  MockImage,
  FeedbackMessage,
  AnalyzerConfig
} from 'image-quality-analyzer';

// Generate a mock image manually
const mockImage = generateMockImage();

// Analyze an image manually
const feedback = analyzeImageQuality(mockImage, defaultAnalyzerConfig);
```

## Running the Demo

To run the included demo:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the demo: `npm start`

The demo shows real-time image quality analysis with a simulated camera feed, generating mock images every 200ms, analyzing them for 500ms, and displaying feedback for 2000ms.

## License

MIT 