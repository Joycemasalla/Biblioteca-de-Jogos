import React, { Component } from 'react';
import styled from 'styled-components';
import { Star, StarHalf } from 'lucide-react';

const ContainerAvaliacao = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

const WrapperEstrela = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: ${props => props.apenasLeitura ? 'default' : 'pointer'};
  color: #fbbf24;
  display: flex;
  align-items: center;
  
  &:hover:not([readonly]) {
    transform: scale(1.1);
  }
`;

class Avaliacao extends Component {
  renderizarEstrela(indice) {
    const { valor, aoMudar, apenasLeitura } = this.props;
    const preenchido = valor >= indice + 1;
    const metade = !preenchido && valor > indice && valor < indice + 1;

    return (
      <WrapperEstrela
        key={indice}
        onClick={() => !apenasLeitura && aoMudar?.(indice + 1)}
        apenasLeitura={apenasLeitura}
      >
        {metade ? (
          <StarHalf size={20} fill="currentColor" />
        ) : (
          <Star size={20} fill={preenchido ? 'currentColor' : 'none'} />
        )}
      </WrapperEstrela>
    );
  }

  render() {
    return (
      <ContainerAvaliacao>
        {[0, 1, 2, 3, 4].map(indice => this.renderizarEstrela(indice))}
      </ContainerAvaliacao>
    );
  }
}

export default Avaliacao;