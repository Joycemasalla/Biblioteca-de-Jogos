import React, { Component } from 'react';
import styled from 'styled-components';
import { Star, StarHalf } from 'lucide-react';

const RatingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

const StarWrapper = styled.button<{ readOnly?: boolean }>`
  background: none;
  border: none;
  padding: 0;
  cursor: ${props => props.readOnly ? 'default' : 'pointer'};
  color: #fbbf24;
  display: flex;
  align-items: center;
  
  &:hover:not([readonly]) {
    transform: scale(1.1);
  }
`;

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

class Rating extends Component<RatingProps> {
  renderStar(index: number) {
    const { value, onChange, readOnly } = this.props;
    const filled = value >= index + 1;
    const half = !filled && value > index && value < index + 1;

    return (
      <StarWrapper
        key={index}
        onClick={() => !readOnly && onChange?.(index + 1)}
        readOnly={readOnly}
      >
        {half ? (
          <StarHalf size={20} fill="currentColor" />
        ) : (
          <Star size={20} fill={filled ? 'currentColor' : 'none'} />
        )}
      </StarWrapper>
    );
  }

  render() {
    return (
      <RatingContainer>
        {[0, 1, 2, 3, 4].map(index => this.renderStar(index))}
      </RatingContainer>
    );
  }
}

export default Rating;