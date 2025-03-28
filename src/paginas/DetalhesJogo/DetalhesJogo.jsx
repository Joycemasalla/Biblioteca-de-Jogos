import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from '../../utils/withRouter';
import Avaliacao from '../../componentes/Avaliacao/Avaliacao';
import CarregamentoSpinner from '../../componentes/CarregamentoSpinner/CarregamentoSpinner';
import { Heart, Share2, ArrowLeft } from 'lucide-react';
import Botao from '../../componentes/Botao/Botao';

const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 5rem;

  @media (min-width: 768px) {
    padding-top: 5rem;
    padding-bottom: 2rem;
  }
`;

const BotaoVoltar = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  margin-bottom: 1rem;
  
  &:hover {
    color: #3b82f6;
  }
`;

const ImagemCapa = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    height: 400px;
  }
`;

const Titulo = styled.h1`
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Descricao = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Acoes = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Generos = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  background: #e5e7eb;
  color: #4b5563;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

const Secao = styled.div`
  margin-bottom: 2rem;
`;

const SubTitulo = styled.h2`
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const CarregamentoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

class DetalhesJogo extends Component {
  state = {
    jogo: null,
    carregando: true
  };

  componentDidMount() {
    this.carregarDetalhesJogo();
  }

  carregarDetalhesJogo = () => {
    // Simulando uma chamada API
    setTimeout(() => {
      const jogo = {
        id: this.props.params.id,
        titulo: 'The Legend of Zelda: Breath of the Wild',
        imagem: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1000',
        descricao: 'Entre em um mundo de aventura e descubra os mistérios de Hyrule neste épico jogo de ação e aventura. Explore vastas terras, derrote inimigos formidáveis e resolva quebra-cabeças intrigantes nesta jornada inesquecível.',
        avaliacao: 4.9,
        favorito: false,
        generos: ['Ação', 'Aventura', 'RPG'],
        anoLancamento: 2017
      };

      this.setState({ jogo, carregando: false });
    }, 1000);
  };

  handleAlternarFavorito = () => {
    this.setState(state => ({
      jogo: { ...state.jogo, favorito: !state.jogo.favorito }
    }));
  };

  handleCompartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: this.state.jogo.titulo,
        text: this.state.jogo.descricao,
        url: window.location.href
      });
    }
  };

  render() {
    const { jogo, carregando } = this.state;
    const { navigate } = this.props;

    if (carregando) {
      return (
        <Container>
          <CarregamentoContainer>
            <CarregamentoSpinner tamanho={40} />
          </CarregamentoContainer>
        </Container>
      );
    }

    return (
      <Container>
        <BotaoVoltar onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          Voltar
        </BotaoVoltar>

        <ImagemCapa src={jogo.imagem} alt={jogo.titulo} />
        
        <Titulo>{jogo.titulo}</Titulo>
        
        <Avaliacao valor={jogo.avaliacao} apenasLeitura />
        
        <Acoes>
          <Botao
            variante={jogo.favorito ? 'primario' : 'fantasma'}
            onClick={this.handleAlternarFavorito}
          >
            <Heart fill={jogo.favorito ? 'currentColor' : 'none'} size={20} />
            {jogo.favorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </Botao>
          
          <Botao variante="secundario" onClick={this.handleCompartilhar}>
            <Share2 size={20} />
            Compartilhar
          </Botao>
        </Acoes>

        <Generos>
          {jogo.generos.map(genero => (
            <Tag key={genero}>{genero}</Tag>
          ))}
        </Generos>

        <Secao>
          <SubTitulo>Sobre o Jogo</SubTitulo>
          <Descricao>{jogo.descricao}</Descricao>
        </Secao>
      </Container>
    );
  }
}

export default withRouter(DetalhesJogo);