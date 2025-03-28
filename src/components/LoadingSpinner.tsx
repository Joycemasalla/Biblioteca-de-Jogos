import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div<{ size: number, color: string }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: ${props => Math.max(2, props.size / 8)}px solid ${props => props.color}20;
  border-top-color: ${props => props.color};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

class LoadingSpinner extends React.Component<LoadingSpinnerProps> {
  render() {
    const { size = 24, color = '#3b82f6' } = this.props;
    return <SpinnerWrapper size={size} color={color} />;
  }
}

export default LoadingSpinner;