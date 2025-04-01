// import React, { Component } from 'react';
// import styled from 'styled-components';
// import { Search } from 'lucide-react';

// const WrapperPesquisa = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 600px;
// `;

// const InputPesquisa = styled.input`
//   width: 100%;
//   padding: 0.75rem 1rem 0.75rem 2.5rem;
//   border: 1px solid #e5e7eb;
//   border-radius: 0.5rem;
//   font-size: 1rem;
//   outline: none;
//   transition: border-color 0.2s;

//   &:focus {
//     border-color: #3b82f6;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//   }
// `;

// const IconePesquisa = styled.div`
//   position: absolute;
//   left: 0.75rem;
//   top: 50%;
//   transform: translateY(-50%);
//   color: #9ca3af;
// `;

// class BarraPesquisa extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       valor: ''
//     };
//     this.temporizadorDebounce = null;
//   }

//   handleMudanca = (evento) => {
//     const { aoPesquisar, tempoDebounce = 300 } = this.props;
//     const valor = evento.target.value;
    
//     this.setState({ valor });

//     if (this.temporizadorDebounce) {
//       clearTimeout(this.temporizadorDebounce);
//     }

//     this.temporizadorDebounce = setTimeout(() => {
//       aoPesquisar(valor);
//     }, tempoDebounce);
//   };

//   componentWillUnmount() {
//     if (this.temporizadorDebounce) {
//       clearTimeout(this.temporizadorDebounce);
//     }
//   }

//   render() {
//     const { placeholder = 'Pesquisar...' } = this.props;
//     const { valor } = this.state;

//     return (
//       <WrapperPesquisa>
//         <IconePesquisa>
//           <Search size={20} />
//         </IconePesquisa>
//         <InputPesquisa
//           type="text"
//           value={valor}
//           onChange={this.handleMudanca}
//           placeholder={placeholder}
//         />
//       </WrapperPesquisa>
//     );
//   }
// }

// export default BarraPesquisa;