import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from '../../utils/withRouter';
import CartaoJogo from '../../componentes/CartaoJogo/CartaoJogo';
import BarraPesquisa from '../../componentes/BarraPesquisa/BarraPesquisa';
import CarregamentoSpinner from '../../componentes/CarregamentoSpinner/CarregamentoSpinner';

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

const Cabecalho = styled.div`
  margin-bottom: 2rem;
`;

const Titulo = styled.h1`
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
`;

const CarregamentoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const SelectOrdenacao = styled.select`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  margin-left: 1rem;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Controles = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

class Inicio extends Component {
  state = {
    jogos: [],
    carregando: true,
    termoPesquisa: '',
    ordenacao: 'titulo'
  };

  componentDidMount() {
    this.carregarJogos();
  }

  carregarJogos = () => {
    // Simulando uma chamada API
    setTimeout(() => {
      const jogos = [
        {
          id: 1,
          titulo: 'The Legend of Zelda: Breath of the Wild',
          imagem: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1000',
          avaliacao: 4.9,
          favorito: false
        },
        {
          id: 2,
          titulo: 'Red Dead Redemption 2',
          imagem: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000',
          avaliacao: 4.8,
          favorito: true
        },
        {
          id: 3,
          titulo: 'God of War',
          imagem: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000',
          avaliacao: 4.7,
          favorito: false
        },
        {
          id: 4,
          titulo: 'Cyberpunk 2077',
          imagem: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000',
          avaliacao: 4.5,
          favorito: false
        },
        {
          id: 5,
          titulo: 'Elden Ring',
          imagem: 'https://images.unsplash.com/photo-1616565441778-e8c3ba0decc1?q=80&w=1000',
          avaliacao: 4.9,
          favorito: true
        },
        {
          id: 6,
          titulo: 'Final Fantasy VII Remake',
          imagem: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000',
          avaliacao: 4.6,
          favorito: false
        }
      ];

      this.setState({ jogos, carregando: false });
    }, 1000);
  };

  handlePesquisa = (termo) => {
    this.setState({ termoPesquisa: termo });
  };

  handleOrdenacao = (evento) => {
    this.setState({ ordenacao: evento.target.value });
  };

  handleAlternarFavorito = (id) => {
    this.setState(state => ({
      jogos: state.jogos.map(jogo =>
        jogo.id === id ? { ...jogo, favorito: !jogo.favorito } : jogo
      )
    }));
  };

  filtrarEOrdenarJogos = () => {
    const { jogos, termoPesquisa, ordenacao } = this.state;
    
    let jogosFiltrados = jogos.filter(jogo =>
      jogo.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

    switch (ordenacao) {
      case 'titulo':
        jogosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'avaliacao':
        jogosFiltrados.sort((a, b) => b.avaliacao - a.avaliacao);
        break;
      default:
        break;
    }

    return jogosFiltrados;
  };

  render() {
    const { carregando, ordenacao } = this.state;
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

    const jogosFiltrados = this.filtrarEOrdenarJogos();

    return (
      <Container>
        <Cabecalho>
          <Titulo>Biblioteca de Jogos</Titulo>
          <Controles>
            <BarraPesquisa
              placeholder="Buscar jogos..."
              aoPesquisar={this.handlePesquisa}
            />
            <SelectOrdenacao value={ordenacao} onChange={this.handleOrdenacao}>
              <option value="titulo">Ordenar por Título</option>
              <option value="avaliacao">Ordenar por Avaliação</option>
            </SelectOrdenacao>
          </Controles>
        </Cabecalho>

        <Grid>
          {jogosFiltrados.map(jogo => (
            <CartaoJogo
              key={jogo.id}
              imagem={jogo.imagem}
              titulo={jogo.titulo}
              avaliacao={jogo.avaliacao}
              favorito={jogo.favorito}
              aoAlternarFavorito={() => this.handleAlternarFavorito(jogo.id)}
              onClick={() => navigate(`/jogo/${jogo.id}`)}
            />
          ))}
        </Grid>
      </Container>
    );
  }
}

export default withRouter(Inicio);