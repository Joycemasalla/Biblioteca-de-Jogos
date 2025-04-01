// import React from 'react';
// import styled from 'styled-components';
// import { Sun, Moon } from 'lucide-react';
// import { useTema } from '../../context/TemaContexto';

// // Estilos do componente Cabecalho
// const CabecalhoContainer = styled.header`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 60px;
//   background-color: ${props => props.theme.card};
//   box-shadow: 0 2px 4px ${props => props.theme.shadow};
//   z-index: 1000;
//   transition: all 0.3s ease;
// `;

// const ConteudoCabecalho = styled.div`
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 20px;
//   margin-left: 200px;

//   @media (max-width: 768px) {
//     margin-left: 0;
//   }
// `;

// const Logo = styled.h1`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: ${props => props.theme.text};
// `;

// const BotaoTema = styled.button`
//   padding: 8px;
//   border-radius: 50%;
//   color: ${props => props.theme.text};
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: ${props => props.theme.secondary};
//   }
// `;

// // Componente de cabeçalho com alternância de tema
// const Cabecalho = () => {
//   const { tema, alternarTema } = useTema();

//   return (
//     <CabecalhoContainer>
//       <ConteudoCabecalho>
//         <Logo>Minha Aplicação</Logo>
//         <BotaoTema onClick={alternarTema}>
//           {tema === 'claro' ? <Moon size={24} /> : <Sun size={24} />}
//         </BotaoTema>
//       </ConteudoCabecalho>
//     </CabecalhoContainer>
//   );
// };

// export default Cabecalho;
