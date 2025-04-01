// import React, { Component } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import styled from 'styled-components';
// import { Home, Heart, User, GamepadIcon } from 'lucide-react';

// const Nav = styled.nav`
//   background: white;
//   padding: 1rem;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   z-index: 50;

//   @media (min-width: 768px) {
//     top: 0;
//     bottom: auto;
//   }
// `;

// const NavLista = styled.ul`
//   list-style: none;
//   margin: 0;
//   padding: 0;
//   display: flex;
//   justify-content: space-around;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const NavItem = styled.li`
//   text-align: center;
// `;

// const NavLink = styled(Link)`
//   text-decoration: none;
//   color: ${props => props.ativo ? '#3b82f6' : '#6b7280'};
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 0.25rem;
//   font-size: 0.875rem;
//   transition: color 0.2s;

//   &:hover {
//     color: #3b82f6;
//   }
// `;

// const NavTexto = styled.span`
//   @media (max-width: 768px) {
//     font-size: 0.75rem;
//   }
// `;

// const Logo = styled.div`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #3b82f6;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// function NavegacaoComponente() {
//   const location = useLocation();

//   return (
//     <Nav>
//       <NavLista>
//         <NavItem>
//           <NavLink to="/" ativo={location.pathname === '/'}>
//             <Home size={24} />
//             <NavTexto>Início</NavTexto>
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink to="/favoritos" ativo={location.pathname === '/favoritos'}>
//             <Heart size={24} />
//             <NavTexto>Favoritos</NavTexto>
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <Logo>
//             <GamepadIcon size={32} />
//             <NavTexto>GameLib</NavTexto>
//           </Logo>
//         </NavItem>
//         <NavItem>
//           <NavLink to="/perfil" ativo={location.pathname === '/perfil'}>
//             <User size={24} />
//             <NavTexto>Perfil</NavTexto>
//           </NavLink>
//         </NavItem>
//       </NavLista>
//     </Nav>
//   );
// }

// class Navegacao extends Component {
//   render() {
//     return <NavegacaoComponente />;
//   }
// }

// export default Navegacao;