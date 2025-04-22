import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { useFavoritos } from '../../context/FavoritesContext';

const Header = styled.header`
  background: linear-gradient(135deg, #003366, #0059b3);
  color: #cce6ff;
  padding: 60px 20px;
  text-align: center;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  margin: 60px auto 40px;
  max-width: 1280px;
  animation: slideIn 1s ease-out;

  @keyframes slideIn {
    0% {
      transform: translateY(-30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.2rem;
    font-weight: 300;
    color: ${({ theme }) => theme.textSecondary};
    text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

// Grid de favoritos responsivo
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1280px;
  margin: 0 auto 100px;
  animation: fadeInGrid 1s ease-out;

  @keyframes fadeInGrid {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 10px;
  }
`;

// Mensagem quando não há favoritos
const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin: 0 auto 100px;
  max-width: 600px;
  animation: fadeInEmptyState 1s ease-out;

  @keyframes fadeInEmptyState {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.textSecondary};
  }

  @media (max-width: 480px) {
    padding: 40px 15px;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.95rem;
    }
  }
`;

const FavoriteCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    filter: brightness(1.1);
  }
`;

export const Favorites = () => {
  const { favoritos } = useFavoritos();

  useEffect(() => {
    window.scrollTo(0, 0); // Garante que a página inicie no topo
  }, []);

  return (
    <div>
      <Header>
        <h1>Meus Itens Favoritos</h1>
        <p>Veja todos os itens que você marcou como favoritos em sua biblioteca de jogos.</p>
      </Header>

      {favoritos.length === 0 ? (
        <EmptyState>
          <h2>Nenhum item favorito ainda</h2>
          <p>Adicione itens aos favoritos para vê-los aqui.</p>
        </EmptyState>
      ) : (
        <Grid>
          {favoritos.map((item) => (
            <FavoriteCard key={item.id} {...item} />
          ))}
        </Grid>
      )}
    </div>
  );
};
