import React, { Component } from 'react';
import styled from 'styled-components';
import { Loader2 } from 'lucide-react';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${props => {
    switch (props.size) {
      case 'sm': return '0.5rem 1rem';
      case 'lg': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'sm': return '0.875rem';
      case 'lg': return '1.125rem';
      default: return '1rem';
    }
  }};
  border-radius: 0.375rem;
  transition: all 0.2s;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.isLoading ? 0.7 : 1};

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #3b82f6;
          color: white;
          border: none;
          &:hover:not(:disabled) { background: #2563eb; }
        `;
      case 'secondary':
        return `
          background: #e5e7eb;
          color: #1f2937;
          border: none;
          &:hover:not(:disabled) { background: #d1d5db; }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #4b5563;
          border: 1px solid #e5e7eb;
          &:hover:not(:disabled) { background: #f3f4f6; }
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

class Button extends Component<ButtonProps> {
  render() {
    const { variant = 'primary', size = 'md', isLoading = false, children, ...props } = this.props;

    return (
      <StyledButton
        variant={variant}
        size={size}
        isLoading={isLoading}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin" size={16} />}
        {children}
      </StyledButton>
    );
  }
}

export default Button;