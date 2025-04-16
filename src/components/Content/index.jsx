import React from 'react';
import styled from 'styled-components';

// Estilizando o container principal com margem esquerda, margem superior, padding e altura mínima
const ContentContainer = styled.main`
  margin-left: 200px; // Espaçamento da esquerda (cria o efeito de "sidebar")
  margin-top: 60px;  // Espaçamento superior (compensa a altura do cabeçalho)
  padding: 20px;     // Espaçamento interno (padding) de 20px
  min-height: calc(100vh - 60px); // Altura mínima para ocupar toda a tela, considerando o cabeçalho fixo de 60px

  // Responsividade: quando a tela for menor que 768px (ex: dispositivos móveis)
  @media (max-width: 768px) {
    margin-left: 0; // Remover a margem esquerda para que o conteúdo ocupe a tela toda
  }
`;

// O componente Content agora está em JavaScript e não tem mais tipos explícitos
// Apenas passa o que for recebido no prop `children` para o container principal
export const Content = ({ children }) => {
  return <ContentContainer>{children}</ContentContainer>;
};
