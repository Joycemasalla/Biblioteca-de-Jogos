import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from '../../utils/withRouter';
import CartaoJogo from '../../componentes/CartaoJogo/CartaoJogo';
import { Heart } from 'lucide-react';

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

const Titulo = styled.h1`
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const EstadoVazio = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
`;

const IconeVazio = styled.div`
  margin-bottom: 1rem;
  color: #9ca3af;
`;

class Favoritos extends Component {
  state = {
    favoritos: []
  };

  componentDidMount() {
    // Simulando carregamento de favoritos do localStorage
    const favoritos = [
      {
        id: 2,
        titulo: 'Red Dead Redemption 2',
        imagem: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000',
        avaliacao: 4.8,
        favorito: true
      },
      {
        id: 5,
        titulo: 'Elden Ring',
        imagem: 'https://images.unsplash.com/photo-1616565441778-e8c3ba0decc1?q=80&w=1000',
        avaliacao: 4.9,
        favorito: true
      }
    ];

    this.setState({ favoritos });
  }

  handleAlternarFavorito = (id) => {
    this.setState(state => ({
      favoritos: state.favoritos.filter(jogo => jogo.id !== id)
    }));
  };

  render() {
    const { favoritos } = this.state;
    const { navigate } = this.props;

    return (
      <Container>
        <Titulo>Meus Favoritos</Titulo>
        
        {favoritos.length === 0 ? (
          <EstadoVazio>
            <IconeVazio>
              <Heart size={48} />
            </IconeVazio>
            <p>Você ainda não tem jogos favoritos</p>
          </EstadoVazio>
        ) : (
          <Grid>
            {favoritos.map(jogo => (
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
        )}
      </Container>
    );
  }
}

export default withRouter(Favoritos);