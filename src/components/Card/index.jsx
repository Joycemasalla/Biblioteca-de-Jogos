import React from 'react';
import styled from 'styled-components';
import { Heart, Star } from 'lucide-react';
import { useFavoritos } from '../../context/FavoritesContext.jsx';
import { useRating } from '../../context/RatingContext.jsx'; // <-- importando o contexto de avaliação

// Estilos mantidos conforme seu original
const CardContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: 12px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ isFavorito }) => (isFavorito ? '#ff4757' : 'inherit')};
  transition: all 0.2s ease;

  svg {
    fill: ${({ isFavorito }) => (isFavorito ? '#ff4757' : 'none')};
    stroke: ${({ isFavorito }) => (isFavorito ? '#ff4757' : 'currentColor')};
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    fill: ${({ $active }) => ($active ? '#ffd700' : 'none')};
    stroke: ${({ $active }) => ($active ? '#ffd700' : '#ccc')};
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const TotalAvaliacoes = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-left: 8px;
`;

export const Card = ({
  id,
  titulo,
  imagem,
  descricao,
  totalAvaliacoes,
  onClick
}) => {
  const { favoritos, adicionarFavorito, removerFavorito } = useFavoritos();
  const { ratings, rateGame } = useRating(); // <-- usando o contexto global
  const isFavorito = favoritos.some(f => f.id === id);

  const toggleFavorito = (e) => {
    e.stopPropagation();
    if (isFavorito) {
      removerFavorito(id);
    } else {
      adicionarFavorito({
        id,
        titulo,
        imagem,
        avaliacao: ratings[id] || 0,
        descricao,
        comentarios: [],
        totalAvaliacoes
      });
    }
  };

  const handleAvaliacao = (e, valor) => {
    e.stopPropagation();
    rateGame(id, valor); // <-- salva a avaliação globalmente
  };

  return (
    <CardContainer onClick={onClick}>
      <ImageContainer>
        <Image src={imagem} alt={titulo} loading="lazy" />
      </ImageContainer>
      <Content>
        <Title>{titulo}</Title>
        <Description>{descricao}</Description>
        <Actions>
          <Rating>
            {[1, 2, 3, 4, 5].map((estrela) => (
              <StarButton
                key={estrela}
                $active={estrela <= (ratings[id] || 0)}
                onClick={(e) => handleAvaliacao(e, estrela)}
                aria-label={`Avaliar com ${estrela} estrelas`}
              >
                <Star size={20} />
              </StarButton>
            ))}
            <TotalAvaliacoes>({totalAvaliacoes})</TotalAvaliacoes>
          </Rating>
          <FavoriteButton
            isFavorito={isFavorito}
            onClick={toggleFavorito}
            aria-label={isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart size={24} />
          </FavoriteButton>
        </Actions>
      </Content>
    </CardContainer>
  );
};
