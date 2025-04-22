import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User, Heart, Library, Star, Edit, Save, X } from 'lucide-react';
import { useFavoritos } from '../../context/FavoritesContext';
import { items } from '../Home/index.jsx';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  margin-top: 50px;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-out;
  margin-bottom: 80px;

  @media (min-width: 768px) {
    padding: 40px 60px;
  }

  @media (min-width: 1024px) {
    padding: 40px 100px;
  }

  @media (min-width: 1280px) {
    padding: 40px 200px;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 90px;
  }
`;

const ProfileInfo = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 30px;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};
  margin-bottom: 30px;
  position: relative;
  text-align: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const EditButtons = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.accent};
  font-size: 1.6rem;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.1);
  }
`;

const InputField = styled.input`
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  margin: 12px 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 10px ${({ theme }) => theme.primary};
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
  width: 100%;
  animation: fadeInGrid 1s ease-out;

  @keyframes fadeInGrid {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
  border: 2px solid ${({ theme }) => theme.accent};
  transition: transform 0.3s, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  &::after {
    content: '\u2666';
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.accent};
  }
`;

const StatValue = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-top: 10px;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-top: 8px;
`;

export const Profile = () => {
  const { favoritos, getMediaAvaliacoes } = useFavoritos();
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState('Joyce Masalla');
  const [dataNascimento, setDataNascimento] = useState('2009-03-29');
  const [genero, setGenero] = useState('Feminino');
  const [gmail, setGmail] = useState('joyce.masalla@gmail.com');

  const navigate = useNavigate();

  const handleSave = () => setEditando(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Garante que vá para o topo ao entrar
  }, []);

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
        <StatCard onClick={() => navigate('/favoritos')}>
          <Heart size={32} />
          <StatValue>{favoritos.length}</StatValue>
          <StatLabel>Jogos Favoritos</StatLabel>
        </StatCard>

        <StatCard onClick={() => navigate('/')}>
          <Library size={32} />
          <StatValue>{items.length}</StatValue>
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
