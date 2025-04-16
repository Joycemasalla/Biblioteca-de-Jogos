import React from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card'; // Importa o componente Card para exibir os itens favoritos
import { useFavoritos } from '../../context/FavoritesContext'; // Hook para acessar os favoritos do contexto

// Estilo para o cabeçalho
const Header = styled.header`
  background-color: ${({ theme }) => theme.primary}; // Cor de fundo principal
  color: ${({ theme }) => theme.textOnPrimary}; // Cor do texto no cabeçalho
  padding: 40px 20px; // Espaçamento interno
  text-align: center;
  border-radius: 10px 10px 0 0; // Bordas arredondadas no topo
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Sombra suave para destaque
`;

// Estilo para o título
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

// Estilo para o subtítulo
const Subtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  color: ${({ theme }) => theme.textSecondary};
`;

// Estilo para o grid de itens favoritos
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
  transition: all 0.3s ease;
`;

// Estilo para quando não houver itens favoritos
const EmptyState = styled.div`
  text-align: center;
  padding: 50px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Estilo para o item favorito com efeito de hover
const FavoriteCard = styled(Card)`
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

// Componente de exibição dos favoritos
export const Favorites = () => {
  const { favoritos } = useFavoritos(); // Acessa os favoritos através do contexto

  return (
    <div>
      {/* Cabeçalho com título e subtítulo */}
      <Header>
        <Title>Meus Itens Favoritos</Title>
        <Subtitle>Veja todos os itens que você marcou como favoritos em sua biblioteca de jogos.</Subtitle>
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
