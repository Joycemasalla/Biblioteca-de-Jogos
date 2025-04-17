import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { useFavoritos } from '../../context/FavoritesContext';

// Estilo para o cabeçalho com animação
const Header = styled.header`
  background: linear-gradient(135deg, #003366, #0059b3);
  color: #cce6ff;  
  padding: 60px 20px;
  text-align: center;
  margin-top: 60px;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;

  animation: slideIn 1s ease-out;

  &:hover {
    box-shadow: 0 12px 50px rgba(0, 0, 0, 0.3);
  }

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
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 15px;
    text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.8s ease-in-out;
  }

  p {
    font-size: 1.3rem;
    font-weight: 300;
    color: ${({ theme }) => theme.textSecondary};
    text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 1s ease-in-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Estilo para o grid de itens favoritos com animação
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  animation: fadeInGrid 1.2s ease-out;

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
`;

// Estilo para quando não houver itens favoritos, com animação
const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
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
`;

// Estilo para o item favorito com animação suave no hover
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
  const { favoritos } = useFavoritos(); // Acessa os favoritos através do contexto

  return (
    <div>
      {/* Cabeçalho com título e subtítulo */}
      <Header>
        <h1>Meus Itens Favoritos</h1>
        <p>Veja todos os itens que você marcou como favoritos em sua biblioteca de jogos.</p>
      </Header>

      {/* Exibe os itens favoritos ou uma mensagem caso não haja favoritos */}
      {favoritos.length === 0 ? (
        <EmptyState>
          <h2>Nenhum item favorito ainda</h2>
          <p>Adicione itens aos favoritos para vê-los aqui.</p>
        </EmptyState>
      ) : (
        <Grid>
          {favoritos.map(item => (
            <FavoriteCard key={item.id} {...item} />
          ))}
        </Grid>
      )}
    </div>
  );
};
