import React, { Component } from 'react';
import styled from 'styled-components';
import { Heart } from 'lucide-react';
import Rating from './Rating';

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: #1f2937;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: ${props => props.isFavorite ? '#ef4444' : '#6b7280'};

  &:hover {
    transform: scale(1.1);
  }
`;

interface GameCardProps {
  image: string;
  title: string;
  rating: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClick: () => void;
}

class GameCard extends Component<GameCardProps> {
  handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.props.onFavoriteToggle();
  };

  render() {
    const { image, title, rating, isFavorite, onClick } = this.props;

    return (
      <Card onClick={onClick}>
        <ImageContainer>
          <Image src={image} alt={title} />
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={this.handleFavoriteClick}
          >
            <Heart fill={isFavorite ? 'currentColor' : 'none'} size={20} />
          </FavoriteButton>
        </ImageContainer>
        <Content>
          <Title>{title}</Title>
          <Rating value={rating} readOnly />
        </Content>
      </Card>
    );
  }
}

export default GameCard;