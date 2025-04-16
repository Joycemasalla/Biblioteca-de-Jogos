import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Home, Heart, User, Menu, X } from 'lucide-react';
import { useFavoritos } from '../../context/FavoritesContext';

// Container do Sidebar, que será posicionado à esquerda da tela
const SidebarContainer = styled.aside`
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 200px;
  background: ${({ theme }) => theme.sidebar};
  padding: 20px;
  transition: transform 0.3s ease;
  z-index: 100;

  @media (max-width: 768px) {
    transform: translateX(${({ aberto }) => (aberto ? '0' : '-100%')}); // Controla a visibilidade do sidebar em telas pequenas
    width: 250px;
  }
`;

// Botão para abrir/fechar o menu em telas pequenas
const MenuButton = styled.button`
  display: none;
  position: fixed;
  left: 20px;
  bottom: 20px;
  background: ${({ theme }) => theme.accent};
  color: white;
  padding: 12px;
  border-radius: 50%;
  z-index: 101;

  @media (max-width: 768px) {
    display: flex; // Mostra o botão apenas em telas menores
  }
`;

// Item de navegação, que será estilizado como um link
const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};

  &:hover,
  &.active {
    background: ${({ theme }) => theme.accent};
    color: white; // Altera o estilo quando o item é clicado ou está ativo
  }
`;

// Badge que exibe a quantidade de favoritos
const Badge = styled.span`
  background: ${({ theme }) => theme.accent};
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-left: auto;
`;

export const Sidebar = () => {
  const [menuAberto, setMenuAberto] = useState(false); // Estado para controlar se o menu está aberto ou fechado
  const { favoritos } = useFavoritos(); // Pegando os favoritos do contexto

  const toggleMenu = () => setMenuAberto((prev) => !prev); // Função para alternar o estado do menu

  return (
    <>
      <SidebarContainer aberto={menuAberto}>
        <NavItem to="/">
          <Home size={20} />
          <span>Início</span>
        </NavItem>
        <NavItem to="/favoritos">
          <Heart size={20} />
          <span>Favoritos</span>
          {favoritos.length > 0 && <Badge>{favoritos.length}</Badge>} {/* Exibe o número de favoritos se houver */}
        </NavItem>
        <NavItem to="/perfil">
          <User size={20} />
          <span>Perfil</span>
        </NavItem>
      </SidebarContainer>
      <MenuButton onClick={toggleMenu}>
        {menuAberto ? <X size={24} /> : <Menu size={24} />} {/* Muda o ícone dependendo do estado do menu */}
      </MenuButton>
    </>
  );
};
