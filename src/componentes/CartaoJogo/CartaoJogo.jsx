import React, { Component } from 'react';
import styled from 'styled-components';
import { Heart } from 'lucide-react';
import Avaliacao from '../Avaliacao/Avaliacao';

const Cartao = styled.div`
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ContainerImagem = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
`;

const Imagem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Conteudo = styled.div`
  padding: 1rem;
`;

const Titulo = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: #1f2937;
`;

const BotaoFavorito = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: ${props => props.favorito ? '#ef4444' : '#6b7280'};

  &:hover {
    transform: scale(1.1);
  }
`;

class CartaoJogo extends Component {
  handleClickFavorito = (e) => {
    e.stopPropagation();
    this.props.aoAlternarFavorito();
  };

  render() {
    const { imagem, titulo, avaliacao, favorito, onClick } = this.props;

    return (
      <Cartao onClick={onClick}>
        <ContainerImagem>
          <Imagem src={imagem} alt={titulo} />
          <BotaoFavorito
            favorito={favorito}
            onClick={this.handleClickFavorito}
          >
            <Heart fill={favorito ? 'currentColor' : 'none'} size={20} />
          </BotaoFavorito>
        </ContainerImagem>
        <Conteudo>
          <Titulo>{titulo}</Titulo>
          <Avaliacao valor={avaliacao} apenasLeitura />
        </Conteudo>
      </Cartao>
    );
  }
}

export default CartaoJogo;