import React from 'react';
import styled from 'styled-components';
import { Heart, Star } from 'lucide-react';
import { useFavoritos } from '../../context/FavoritesContext.jsx';
import { useRating } from '../../context/RatingContext.jsx';

// Estilos para o container do cartão
const CardContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  cursor: pointer;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 300px;
  margin: 10px;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 50px rgba(0, 0, 0, 0.2);
    filter: brightness(1.05);
  }
`;

// Container para a imagem do jogo
const ImageContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* Proporção 16:9 */
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// Estilos para a imagem do jogo
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  filter: brightness(0.7);
  transition: filter 0.3s ease;
  
  ${ImageContainer}:hover & {
    filter: brightness(1);
  }
`;

// Container para o conteúdo do cartão
const Content = styled.div`
  padding: 16px;
  width: 100%;
`;

// Estilos para o título do jogo
const Title = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.primaryText};
  font-weight: 600;
  margin: 12px 0;
  transition: color 0.3s ease;

  ${CardContainer}:hover & {
    color: #007BFF;
  }
`;

// Estilos para a descrição do jogo
const Description = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  font-size: 0.95rem;
  margin-bottom: 16px;
`;

// Container para as ações do cartão (favoritar e avaliar)
const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// Botão para favoritar o jogo
const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ isFavorito }) => (isFavorito ? '#ff4757' : '#999')};
  transition: transform 0.3s ease, color 0.3s ease;

  svg {
    fill: ${({ isFavorito }) => (isFavorito ? '#ff4757' : 'none')};
    stroke: ${({ isFavorito }) => (isFavorito ? '#ff4757' : '#999')};
    transition: fill 0.3s ease, stroke 0.3s ease;
  }

  &:hover {
    transform: scale(1.2);
    color: #ff4757;
  }
`;

// Container para a avaliação do jogo
const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Botão para avaliar o jogo com estrelas
const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;

  svg {
    fill: ${({ $active }) => ($active ? '#ffd700' : '#ccc')};
    stroke: ${({ $active }) => ($active ? '#ffd700' : '#ccc')};
    transition: fill 0.3s ease, stroke 0.3s ease;
  }

  &:hover {
    transform: scale(1.2);
  }
`;

// Total de avaliações do jogo
const TotalAvaliacoes = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-left: 8px;
`;

// Componente Card que exibe informações sobre o jogo
export const Card = ({
  id,
  titulo,
  imagem,
  descricao,
  totalAvaliacoes,
  onClick
}) => {
  const { favoritos, adicionarFavorito, removerFavorito } = useFavoritos();
  const { ratings, rateGame } = useRating();
  const isFavorito = favoritos.some(f => f.id === id);

  // Função para alternar o estado de favorito
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

  // Função para avaliar o jogo
  const handleAvaliacao = (e, valor) => {
    e.stopPropagation();
    rateGame(id, valor);
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
