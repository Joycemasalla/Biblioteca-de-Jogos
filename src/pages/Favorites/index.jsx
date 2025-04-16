import React from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card'; // Importa o componente Card para exibir os itens favoritos
import { useFavoritos } from '../../context/FavoritesContext'; // Hook para acessar os favoritos do contexto

// Estilo para o grid de itens favoritos
const Grid = styled.div`
  display: grid; // Define o layout como grid
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // Cria colunas automáticas para os itens
  gap: 20px; // Espaçamento entre os itens
`;

// Estilo para quando não houver itens favoritos
const EmptyState = styled.div`
  text-align: center; // Centraliza o texto
  padding: 40px; // Espaçamento interno
  color: ${({ theme }) => theme.text}; // Cor do texto com base no tema
`;

// Componente de exibição dos favoritos
export const Favorites = () => {
  const { favoritos } = useFavoritos(); // Acessa os favoritos através do contexto

  // Verifica se há favoritos, se não houver, exibe uma mensagem informando
  if (favoritos.length === 0) {
    return (
      <EmptyState>
        <h2>Nenhum item favorito ainda</h2>
        <p>Adicione itens aos favoritos para vê-los aqui</p>
      </EmptyState>
    );
  }

  // Se houver favoritos, exibe-os em um grid
  return (
    <Grid>
      {favoritos.map(item => (
        <Card key={item.id} {...item} /> // Para cada item favorito, renderiza um Card
      ))}
    </Grid>
  );
};
