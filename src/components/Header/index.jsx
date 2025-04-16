import React from 'react';
import styled from 'styled-components';
import { Sun, Moon, Gamepad2 } from 'lucide-react';
import { useTema } from '../../context/ThemeContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${({ theme }) => theme.cardBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  
  span {
    background: linear-gradient(45deg, ${({ theme }) => theme.accent}, #6c5ce7);
    -webkit-background-clip: text; /* Garantindo compatibilidade com WebKit */
    background-clip: text; /* Adicionando para compatibilidade com outros navegadores */
    -webkit-text-fill-color: transparent;
    font-size: 1.8rem;
  }
`;

const ThemeToggle = styled.button`
  color: ${({ theme }) => theme.text};
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.sidebar};
    transform: rotate(15deg);
  }
`;

export const Header = () => {
  const { temaDark, toggleTema } = useTema();

  return (
    <HeaderContainer>
      <Logo>
        <Gamepad2 size={32} />
        <span>GameVault</span>
      </Logo>
      <ThemeToggle onClick={toggleTema}>
        {temaDark ? <Sun size={24} /> : <Moon size={24} />}
      </ThemeToggle>
    </HeaderContainer>
  );
};
