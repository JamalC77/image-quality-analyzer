import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FeedbackDisplayProps, FeedbackMessage } from '../types';

// Styled components for the feedback display
const FeedbackContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

interface MessageContainerProps {
  type: 'error' | 'warning' | 'success' | 'info';
}

const MessageContainer = styled.div<MessageContainerProps>`
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${props => {
    switch (props.type) {
      case 'error': return 'rgba(220, 53, 69, 0.9)';
      case 'warning': return 'rgba(255, 193, 7, 0.9)';
      case 'success': return 'rgba(40, 167, 69, 0.9)';
      case 'info': return 'rgba(23, 162, 184, 0.9)';
      default: return 'rgba(52, 58, 64, 0.9)';
    }
  }};
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ messages }) => {
  const [visibleMessages, setVisibleMessages] = useState<FeedbackMessage[]>([]);
  
  // Manage the lifecycle of feedback messages
  useEffect(() => {
    // Add new messages to visible messages
    if (messages.length > 0) {
      const newVisibleMessages = [...visibleMessages];
      
      // Add messages that aren't already in the visible list
      messages.forEach(message => {
        if (!visibleMessages.find(m => m.id === message.id)) {
          newVisibleMessages.push(message);
        }
      });
      
      setVisibleMessages(newVisibleMessages);
    }
  }, [messages]);
  
  // Set up timers to remove messages after their duration
  useEffect(() => {
    // Create a map of timeouts for each message
    const timeouts = new Map<string, NodeJS.Timeout>();
    
    // Set up timeout for each message
    visibleMessages.forEach(message => {
      if (!timeouts.has(message.id)) {
        const timeout = setTimeout(() => {
          setVisibleMessages(prev => prev.filter(m => m.id !== message.id));
        }, message.duration);
        
        timeouts.set(message.id, timeout);
      }
    });
    
    // Clean up timeouts on unmount
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [visibleMessages]);
  
  if (visibleMessages.length === 0) {
    return null;
  }
  
  return (
    <FeedbackContainer>
      {visibleMessages.map(message => (
        <MessageContainer key={message.id} type={message.type}>
          {message.message}
        </MessageContainer>
      ))}
    </FeedbackContainer>
  );
};

export default FeedbackDisplay; 