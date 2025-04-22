import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Heart, User, Menu, X, Moon, Sun } from 'lucide-react';
import { useFavoritos } from '../../context/FavoritesContext';
import { useTema } from '../../context/ThemeContext';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${({ theme }) => theme.sidebar};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  cursor: pointer;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${({ aberto }) => (aberto ? 'flex' : 'none')};
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: ${({ theme }) => theme.sidebar};
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  font-size: 1rem;
  transition: 0.2s;

  &.active,
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const Badge = styled.span`
  background: ${({ theme }) => theme.accent};
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.75rem;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;

  @media (min-width: 769px) {
    &:nth-child(2) {
      display: none;
    }
  }
`;

export const Sidebar = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const { favoritos } = useFavoritos();
  const navigate = useNavigate();
  const { temaDark, toggleTema } = useTema();

  const toggleMenu = () => setMenuAberto((prev) => !prev);
  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
    setMenuAberto(false);
  };

  return (
    <NavbarContainer>
      <Logo onClick={handleLogoClick}>PlayHub</Logo>

      <NavItems aberto={menuAberto}>
        <NavItem to="/" onClick={() => setMenuAberto(false)}>
          <Home size={20} />
          Início
        </NavItem>
        <NavItem to="/favoritos" onClick={() => setMenuAberto(false)}>
          <Heart size={20} />
          Favoritos
          {favoritos.length > 0 && <Badge>{favoritos.length}</Badge>}
        </NavItem>
        <NavItem to="/perfil" onClick={() => setMenuAberto(false)}>
          <User size={20} />
          Perfil
        </NavItem>
      </NavItems>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MenuButton onClick={toggleTema}>
          {temaDark ? <Sun size={24} /> : <Moon size={24} />}
        </MenuButton>
        <MenuButton onClick={toggleMenu}>
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </MenuButton>
      </div>
    </NavbarContainer>
  );
};
