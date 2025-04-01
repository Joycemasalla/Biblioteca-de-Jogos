// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Home, Heart, User, Menu, X } from 'lucide-react';
// import styled from 'styled-components';

// const SidebarContainer = styled.aside`
//   position: fixed;
//   left: 0;
//   top: 60px;
//   width: 200px;
//   height: calc(100vh - 60px);
//   background-color: ${(props) => props.theme.card};
//   border-right: 1px solid ${(props) => props.theme.border};
//   transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
//   transition: transform 0.3s ease;
//   z-index: 900;

//   @media (min-width: 768px) {
//     transform: translateX(0);
//   }
// `;

// const StyledNavLink = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   padding: 12px 20px;
//   color: ${(props) => props.theme.text};
//   transition: all 0.3s ease;
//   text-decoration: none;

//   &:hover {
//     background-color: ${(props) => props.theme.secondary};
//   }

//   &.active {
//     background-color: ${(props) => props.theme.primary};
//     color: white;
//   }
// `;

// const MenuButton = styled.button`
//   position: fixed;
//   top: 15px;
//   left: 15px;
//   z-index: 1000;
//   color: ${(props) => props.theme.text};
//   background: none;
//   border: none;
//   cursor: pointer;
//   display: block;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const links = [
//     { to: '/', icon: Home, label: 'Início' },
//     { to: '/favorites', icon: Heart, label: 'Favoritos' },
//     { to: '/profile', icon: User, label: 'Perfil' }
//   ];

//   return (
//     <>
//       <MenuButton onClick={() => setIsOpen(!isOpen)}>
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </MenuButton>

//       <SidebarContainer isOpen={isOpen}>
//         <nav>
//           {links.map(({ to, icon: Icon, label }) => (
//             <StyledNavLink key={to} to={to} onClick={() => setIsOpen(false)}>
//               <Icon size={20} />
//               <span>{label}</span>
//             </StyledNavLink>
//           ))}
//         </nav>
//       </SidebarContainer>
//     </>
//   );
// }