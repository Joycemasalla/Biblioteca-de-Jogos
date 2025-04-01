import React, { Component } from 'react';
import styled from 'styled-components';
import Botao from '../../componentes/Botao/Botao';
import { User, Mail, GamepadIcon } from 'lucide-react';

const Container = styled.div`
  padding: 1rem;
  max-width: 600px;
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

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: #9ca3af;
`;

const Campo = styled.div`
  margin-bottom: 1.5rem;
`;

const Rotulo = styled.label`
  display: block;
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Estatisticas = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
`;

const ItemEstatistica = styled.div`
  text-align: center;
`;

const ValorEstatistica = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
`;

const RotuloEstatistica = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

class Perfil extends Component {
  state = {
    nome: 'Usuário Exemplo',
    email: 'usuario@exemplo.com',
    editando: false
  };

  handleSalvar = () => {
    this.setState({ editando: false });
  };

  render() {
    const { nome, email, editando } = this.state;

    return (
      <Container>
        <Titulo>Meu Perfil</Titulo>
        
        <Card>
          <Avatar>
            <User size={48} />
          </Avatar>

          <Campo>
            <Rotulo>Nome</Rotulo>
            <Input
              type="text"
              value={nome}
              onChange={e => this.setState({ nome: e.target.value })}
              disabled={!editando}
            />
          </Campo>

          <Campo>
            <Rotulo>Email</Rotulo>
            <Input
              type="email"
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              disabled={!editando}
            />
          </Campo>

          <Botao
            variante={editando ? 'primario' : 'secundario'}
            onClick={() => {
              if (editando) {
                this.handleSalvar();
              } else {
                this.setState({ editando: true });
              }
            }}
          >
            {editando ? 'Salvar' : 'Editar Perfil'}
          </Botao>

          <Estatisticas>
            <ItemEstatistica>
              <ValorEstatistica>42</ValorEstatistica>
              <RotuloEstatistica>Jogos</RotuloEstatistica>
            </ItemEstatistica>
            <ItemEstatistica>
              <ValorEstatistica>15</ValorEstatistica>
              <RotuloEstatistica>Favoritos</RotuloEstatistica>
            </ItemEstatistica>
            <ItemEstatistica>
              <ValorEstatistica>4.8</ValorEstatistica>
              <RotuloEstatistica>Média</RotuloEstatistica>
            </ItemEstatistica>
          </Estatisticas>
        </Card>
      </Container>
    );
  }
}

export default Perfil;