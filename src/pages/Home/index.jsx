import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { GameDetails } from '../../components/GameDetails';
import { useFavoritos } from '../../context/FavoritesContext';


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const DestaqueBanner = styled.div`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  padding: 40px 20px;
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
  }

  .star-icon {
    font-size: 3rem;
    color: #ffcc00;
    margin-left: 15px;
  }
`;

const FiltroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoriaButton = styled.button`
  padding: 10px 15px;
  background: ${({ ativo }) => (ativo ? 'linear-gradient(135deg, #2575fc, #6a11cb)' : '#222')};
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  transition: background 0.3s;

  &:hover {
    background: ${({ ativo }) => (ativo ? 'linear-gradient(135deg, #2575fc, #6a11cb)' : '#333')};
  }
`;

const CampoBusca = styled.input`
  padding: 12px 20px;
  border-radius: 20px;
  border: 1px solid #444;
  background-color: #111;
  color: white;
  font-size: 1rem;
  outline: none;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  margin-bottom: 20px;

  &::placeholder {
    color: #888;
  }
`;


export const items = [
  {
    id: 1,
    titulo: 'The Legend of Adventure',
    imagem: 'https://images.unsplash.com/photo-1698450998458-0bc1045788a1?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galeria: [
      'https://placehold.co/200x120/222/fff?text=Imagem+1',
      'https://placehold.co/200x120/333/fff?text=Imagem+2',
      'https://placehold.co/200x120/444/fff?text=Imagem+3'
    ],
    descricao: 'Embarque em uma jornada lendária repleta de perigos, magia e heróis esquecidos. O destino do reino está em suas mãos.',
    categoria: 'Aventura',
    comentarios: [],
    totalAvaliacoes: 150
  },
  {
    id: 2,
    titulo: 'Space Explorer',
    imagem: 'https://images.unsplash.com/photo-1699862160391-1aa177a3baff?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galeria: [
      'https://placehold.co/200x120/222/fff?text=Imagem+1',
      'https://placehold.co/200x120/333/fff?text=Imagem+2',
      'https://placehold.co/200x120/444/fff?text=Imagem+3'
    ],
    descricao: 'Viaje por galáxias desconhecidas, enfrente ameaças alienígenas e descubra segredos cósmicos que mudarão o universo.',
    categoria: 'Ficção Científica',
    comentarios: [],
    totalAvaliacoes: 89
  },
  {
    id: 3,
    titulo: 'Mystic Forest',
    imagem: 'https://images.unsplash.com/photo-1731937817165-1fed94fc03b2?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galeria: [
      'https://placehold.co/200x120/222/fff?text=Imagem+1',
      'https://placehold.co/200x120/333/fff?text=Imagem+2',
      'https://placehold.co/200x120/444/fff?text=Imagem+3'
    ],
    descricao: 'Explore uma floresta encantada repleta de enigmas, criaturas mágicas e segredos antigos esquecidos pelo tempo.',
    categoria: 'Aventura',
    comentarios: [],
    totalAvaliacoes: 120
  },
  {
    id: 4,
    titulo: 'Racing Champions',
    imagem: 'https://images.unsplash.com/photo-1640878588131-4a5f39371d0b?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galeria: [
      'https://placehold.co/200x120/222/fff?text=Imagem+1',
      'https://placehold.co/200x120/333/fff?text=Imagem+2',
      'https://placehold.co/200x120/444/fff?text=Imagem+3'
    ],
    descricao: 'Domine pistas insanas, desafie os melhores pilotos e conquiste o pódio com manobras de tirar o fôlego.',
    categoria: 'Corrida',
    comentarios: [],
    totalAvaliacoes: 200
  },
  {
    id: 5,
    titulo: 'Cyber City',
    imagem: 'https://images.unsplash.com/photo-1741900034631-35808fbaf4c7?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galeria: [
      'https://placehold.co/200x120/222/fff?text=Imagem+1',
      'https://placehold.co/200x120/333/fff?text=Imagem+2',
      'https://placehold.co/200x120/444/fff?text=Imagem+3'
    ],
    descricao: 'Hackers, corporações e segredos obscuros te esperam numa cidade futurista onde cada escolha tem um preço.',
    categoria: 'Cyberpunk',
    comentarios: [],
    totalAvaliacoes: 167
  },
  {
    id: 6,
    titulo: 'Medieval Quest',
    imagem: 'https://images.unsplash.com/photo-1562576650-27130b06c0ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galeria: [
      'https://placehold.co/200x120/222/fff?text=Imagem+1',
      'https://placehold.co/200x120/333/fff?text=Imagem+2',
      'https://placehold.co/200x120/444/fff?text=Imagem+3'
    ],
    descricao: 'Forje sua lenda em um mundo medieval repleto de guerras, dragões e alianças traiçoeiras.',
    categoria: 'RPG',
    comentarios: [],
    totalAvaliacoes: 145
  },
  {
    id: 7,
    titulo: 'Battle Royale X',
    imagem: 'https://images.unsplash.com/photo-1655558844955-6332d031be97?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galeria: [
      'https://placehold.co/200x120/222/fff?text=Imagem+1',
      'https://placehold.co/200x120/333/fff?text=Imagem+2',
      'https://placehold.co/200x120/444/fff?text=Imagem+3'
    ],
    descricao: 'Salte no campo de batalha, lute com estratégia e seja o último a sobreviver em combates eletrizantes.',
    categoria: 'Battle Royale',
    comentarios: [],
    totalAvaliacoes: 310
  },
  {
    id: 8,
    titulo: 'Shadow Ninja',
    imagem: 'https://images.unsplash.com/photo-1640903581708-8d491706515b?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galeria: [
      'https://placehold.co/200x120/222/fff?text=Imagem+1',
      'https://placehold.co/200x120/333/fff?text=Imagem+2',
      'https://placehold.co/200x120/444/fff?text=Imagem+3'
    ],
    descricao: 'Ataque nas sombras, derrote inimigos silenciosamente e descubra a honra perdida de um clã milenar.',
    categoria: 'Ação',
    comentarios: [],
    totalAvaliacoes: 198
  },
  {
    id: 9,
    titulo: 'Fantasy World',
    imagem: 'https://images.unsplash.com/photo-1609397756568-aa0368ecfd39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galeria: [
      'https://placehold.co/200x120/222/fff?text=Imagem+1',
      'https://placehold.co/200x120/333/fff?text=Imagem+2',
      'https://placehold.co/200x120/444/fff?text=Imagem+3'
    ],
    descricao: 'Mundos mágicos, criaturas lendárias e aventuras épicas te aguardam neste universo de pura fantasia.',
    categoria: 'Fantasia',
    comentarios: [],
    totalAvaliacoes: 175
  },
  {
    id: 10,
    titulo: 'Galactic Wars',
    imagem: 'https://images.unsplash.com/photo-1677519007448-802732cff122?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    galeria: [
      'https://placehold.co/200x120/222/fff?text=Imagem+1',
      'https://placehold.co/200x120/333/fff?text=Imagem+2',
      'https://placehold.co/200x120/444/fff?text=Imagem+3'
    ],
    descricao: 'Participe da guerra intergaláctica definitiva. Comande naves, lidere exércitos e mude o rumo da galáxia.',
    categoria: 'Ficção Científica',
    comentarios: [],
    totalAvaliacoes: 220
  }
];


const normalizarTexto = (texto) => {
  return texto
    .toLowerCase()
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, '') // remove marcas dos acentos
    .replace(/\s+/g, ' ') // remove espaços duplicados
    .trim();
};


export const Home = () => {
  const [jogoSelecionado, setJogoSelecionado] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState(() => {

    const avaliacoesSalvas = localStorage.getItem('avaliacoes');
    return avaliacoesSalvas ? JSON.parse(avaliacoesSalvas) : {};
  });
  useEffect(() => {
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
  }, [avaliacoes]);


  const [categoriaSelecionada, setCategoriaSelecionada] = useState(() => {
    return localStorage.getItem('categoriaSelecionada') || 'Todos';
  });

  useEffect(() => {
    localStorage.setItem('categoriaSelecionada', categoriaSelecionada);
  }, [categoriaSelecionada]);


  const handleAvaliar = (id, nota) => {
    setAvaliacoes(prev => ({
      ...prev,
      [id]: nota
    }));
  };

  const jogoMaisBemAvaliado = useMemo(() => {
    return items.reduce((prev, current) => {
      const avaliacaoAtual = avaliacoes[current.id] || 0;
      const avaliacaoPrev = avaliacoes[prev.id] || 0;
      return avaliacaoAtual > avaliacaoPrev ? current : prev;
    }, items[0]);
  }, [avaliacoes]);

  const categorias = useMemo(() => {
    const contagem = items.reduce((acc, item) => {
      acc[item.categoria] = (acc[item.categoria] || 0) + 1;
      return acc;
    }, {});

    return [
      { nome: 'Todos', quantidade: items.length },
      ...Object.entries(contagem).map(([nome, quantidade]) => ({
        nome,
        quantidade
      }))
    ];
  }, []);

  const handleClickJogo = (id) => {
    setJogoSelecionado(id);
  };

  const [busca, setBusca] = useState('');


  return (
    <>
      <DestaqueBanner>
        <div>
          <h2>Jogo Mais Bem Avaliado</h2>
          <Card
            {...jogoMaisBemAvaliado}
            avaliacao={avaliacoes[jogoMaisBemAvaliado.id] || 0}
            onAvaliar={handleAvaliar}
            onClick={() => handleClickJogo(jogoMaisBemAvaliado.id)}
          />
        </div>
      </DestaqueBanner>

      <CampoBusca
        type="text"
        placeholder="Buscar por título..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <FiltroContainer>
        {categorias.map(c => (
          <CategoriaButton
            key={c.nome}
            ativo={categoriaSelecionada === c.nome}
            onClick={() => setCategoriaSelecionada(c.nome)}
          >
            {c.nome} ({c.quantidade})
          </CategoriaButton>
        ))}
      </FiltroContainer>

      <Grid>
        {items
          .filter(item => {
            const titulo = normalizarTexto(item.titulo);
            const termoBusca = normalizarTexto(busca);
            return (
              (categoriaSelecionada === 'Todos' || item.categoria === categoriaSelecionada) &&
              titulo.includes(termoBusca)
            );
          })
          .map(item => (
            <Card
              key={item.id}
              {...item}
              avaliacao={avaliacoes[item.id] || 0}
              onAvaliar={handleAvaliar}
              onClick={() => handleClickJogo(item.id)}
            />
          ))}
      </Grid>


      {jogoSelecionado && (
        <GameDetails
          jogo={items.find(item => item.id === jogoSelecionado)}
          onClose={() => setJogoSelecionado(null)}
        />
      )}
    </>
  );
};
