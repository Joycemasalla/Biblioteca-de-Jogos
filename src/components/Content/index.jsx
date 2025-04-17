import React from 'react';
import styled from 'styled-components';

// Estilizando o container principal com margem esquerda, margem superior, padding e altura mínima
const ContentContainer = styled.main`
  flex: 1;
  padding: 20px;
  margin-left: auto; /* ou conforme o tamanho da sua Sidebar */
  min-height: calc(100vh - 60px); /* altura total menos header */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
