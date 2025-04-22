import React from 'react';
import styled from 'styled-components';

// Estilizando o container principal
const ContentContainer = styled.main`
  flex: 1; // Faz o container ocupar o espaço disponível
  padding: 20px; // Espaçamento interno
  margin-left: auto; // Margem esquerda automática
  min-height: calc(100vh - 60px); // Altura mínima (altura da tela menos o header)
  display: flex; // Define o layout como flexbox
  flex-direction: column; // Alinha os itens em coluna
  justify-content: space-between; // Espaça os itens igualmente

  // Responsividade para telas menores que 768px
  @media (max-width: 768px) {
    margin-left: 0; // Remove a margem esquerda
  }
`;

// Componente Content que exibe o conteúdo recebido
export const Content = ({ children }) => {
  return <ContentContainer>{children}</ContentContainer>;
};
