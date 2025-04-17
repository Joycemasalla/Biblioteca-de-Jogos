import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import { Home, Heart, User, Menu, X } from 'lucide-react';
import { useFavoritos } from '../../context/FavoritesContext';

// Navbar fixa no topo
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
  z-index: 200;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

// Logo
const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  cursor: pointer; /* Torna a logo clicável */
`;

// Navegação com os links
const NavItems = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${({ aberto }) => (aberto ? 'flex' : 'none')};
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.sidebar};
    flex-direction: column;
    padding: 20px;
  }
`;

// Estilo dos itens de navegação
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

// Badge de favoritos
const Badge = styled.span`
  background: ${({ theme }) => theme.accent};
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.75rem;
`;

// Botão do menu para mobile
const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Sidebar = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const { favoritos } = useFavoritos();
  const navigate = useNavigate(); // Usando o hook useNavigate

  const toggleMenu = () => setMenuAberto((prev) => !prev);

  const handleLogoClick = () => {
    navigate('/'); // Redireciona para a rota inicial
    window.scrollTo(0, 0); // Rola para o topo da página
  };

  return (
    <NavbarContainer>
      <Logo onClick={handleLogoClick}>PlayHub</Logo> {/* Logo com clique para voltar ao início */}

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

      <MenuButton onClick={toggleMenu}>
        {menuAberto ? <X size={24} /> : <Menu size={24} />}
      </MenuButton>
    </NavbarContainer>
  );
};
