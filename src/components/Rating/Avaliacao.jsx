// import React, { Component } from 'react';
// import styled from 'styled-components';
// import { Star, StarHalf } from 'lucide-react';

// const ContainerAvaliacao = styled.div`
//   display: flex;
//   gap: 4px;
// `;

// const StarButton = styled.button`
//   color: ${props => (props.isActive ? '#ffd700' : props.theme.text)};
//   cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
//   transition: all 0.3s ease;
//   background: none;
//   border: none;
//   padding: 0;
//   display: flex;
//   align-items: center;

//   svg {
//     fill: ${props => (props.isActive ? '#ffd700' : 'none')};
//   }

//   &:hover {
//     transform: ${props => (props.isClickable ? 'scale(1.1)' : 'none')};
//   }
// `;

// class Avaliacao extends Component {
//   renderizarEstrela(indice) {
//     const { valor, aoMudar, apenasLeitura } = this.props;
//     const preenchido = valor >= indice + 1;
//     const metade = !preenchido && valor > indice && valor < indice + 1;

//     return (
//       <StarButton
//         key={indice}
//         onClick={() => !apenasLeitura && aoMudar?.(indice + 1)}
//         isActive={preenchido || metade}
//         isClickable={!apenasLeitura}
//       >
//         {metade ? (
//           <StarHalf size={20} fill="currentColor" />
//         ) : (
//           <Star size={20} fill={preenchido ? 'currentColor' : 'none'} />
//         )}
//       </StarButton>
//     );
//   }

//   render() {
//     return (
//       <ContainerAvaliacao>
//         {[0, 1, 2, 3, 4].map(indice => this.renderizarEstrela(indice))}
//       </ContainerAvaliacao>
//     );
//   }
// }

// export default Avaliacao;
