import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Heart, Library, Star, Edit, Save, X } from 'lucide-react';
import { useFavoritos } from '../../context/FavoritesContext';
import { items } from '../Home/index.jsx';

const ProfileContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
`;

const ProfileInfo = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  margin-bottom: 24px;
  position: relative;
  text-align: center;
`;

const EditButtons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.accent};
  font-size: 1.5rem;
  transition: color 0.3s;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const InputField = styled.input`
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  margin: 10px 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 24px;
  width: 100%;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
  border: 2px solid ${({ theme }) => theme.accent};
  &::after {
    content: '\u2666';
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.accent};
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

export const Profile = () => {
  const { favoritos, getMediaAvaliacoes } = useFavoritos();
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState('Joyce Masalla');
  const [dataNascimento, setDataNascimento] = useState('29-03-2009');
  const [genero, setGenero] = useState('Feminino');
  const [gmail, setGmail] = useState('joyce.masalla@gmail.com');

  const handleSave = () => setEditando(false);

  return (
    <ProfileContainer>
      <Avatar>
        <User size={60} color="white" />
      </Avatar>

      <ProfileInfo>
        <h2>Informações do Perfil</h2>
        <EditButtons>
          {editando ? (
            <>
              <IconButton onClick={handleSave}><Save size={18} /></IconButton>
              <IconButton onClick={() => setEditando(false)}><X size={18} /></IconButton>
            </>
          ) : (
            <IconButton onClick={() => setEditando(true)}><Edit size={18} /></IconButton>
          )}
        </EditButtons>

        {editando ? (
          <>
            <InputField type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
            <InputField type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
            <InputField type="text" value={genero} onChange={(e) => setGenero(e.target.value)} placeholder="Gênero" />
            <InputField type="email" value={gmail} onChange={(e) => setGmail(e.target.value)} placeholder="Gmail" />
          </>
        ) : (
          <>
            <p><strong>Nome:</strong> {nome}</p>
            <p><strong>Data de Nascimento:</strong> {dataNascimento}</p>
            <p><strong>Gênero:</strong> {genero}</p>
            <p><strong>Gmail:</strong> {gmail}</p>
          </>
        )}
      </ProfileInfo>

      <StatsGrid>
        <StatCard>
          <Heart size={32} />
          <StatValue>{favoritos.length}</StatValue>
          <StatLabel>Jogos Favoritos</StatLabel>
        </StatCard>

        <StatCard>
          <Library size={32} />
          <StatValue>{items.length}</StatValue> {/* Exibe o total de jogos cadastrados */}
          <StatLabel>Jogos na Biblioteca</StatLabel>
        </StatCard>

        <StatCard>
          <Star size={32} />
          <StatValue>{getMediaAvaliacoes().toFixed(1)}</StatValue>
          <StatLabel>Média de Avaliações</StatLabel>
        </StatCard>
      </StatsGrid>
    </ProfileContainer>
  );
};
