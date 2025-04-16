import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { GameDetails } from '../../components/GameDetails';
import { useFavoritos } from '../../context/FavoritesContext';


const DestaqueBanner = styled.div`
  background: linear-gradient(135deg, #001f3f, #003f7f, #0059b3);
  padding: 60px 30px;
  border-radius: 30px;
  margin: 40px 0;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 123, 255, 0.2);
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 123, 255, 0.4);
  }

  .conteudo-destaque {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .texto-destaque {
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
      max-width: 50%;
    }

    h2 {
      color: #ffffff;
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 10px;
      text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.6);
    }

    span {
      display: inline-block;
      color: #cce6ff;
      font-size: 1.3rem;
      font-weight: 500;
      text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
    }
  }

  .card-destaque {
    flex-shrink: 0;
    transform: scale(1.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.08);
    }
  }
`;



// Campo de busca com estilo moderno e destaque em azul
const CampoBusca = styled.input`
  padding: 12px 20px;
  width: 100%;
  max-width: 450px;
  border-radius: 30px;
  border: 1px solid #007BFF;
  background: #121212;
  color: #fff;
  font-size: 1rem;
  margin: 24px auto;
  display: block;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #66b2ff;
    box-shadow: 0 0 12px rgba(0, 123, 255, 0.6);
  }
`;

// Container dos botões de categoria
const FiltroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
`;

// Botão de filtro com azul no hover e como ativo
const CategoriaButton = styled.button`
  padding: 10px 20px;
  background: ${({ ativo }) => ativo
    ? 'linear-gradient(135deg, #007BFF, #0056b3)'
    : '#222'};
  color: #fff;
  border: 2px solid ${({ ativo }) => ativo ? '#007BFF' : '#333'};
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: ${({ ativo }) => ativo ? '0 4px 12px rgba(0, 123, 255, 0.4)' : '0 2px 6px rgba(0,0,0,0.2)'};

  &:hover {
    background: ${({ ativo }) => ativo
    ? 'linear-gradient(135deg, #007BFF, #0056b3)'
    : '#2a2a2a'};
    border-color: #007BFF;
  }
`;


// Grid responsivo para os cards
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  padding: 20px;
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
        <div className="conteudo-destaque">
          <div className="texto-destaque">
            <h2>🎮 Jogo Mais Bem Avaliado</h2>
            <span>Explore o jogo mais amado pela comunidade!</span>
          </div>

          <div className="card-destaque">
            <Card
              {...jogoMaisBemAvaliado}
              avaliacao={avaliacoes[jogoMaisBemAvaliado.id] || 0}
              onAvaliar={handleAvaliar}
              onClick={() => handleClickJogo(jogoMaisBemAvaliado.id)}
            />
          </div>
        </div>
      </DestaqueBanner>


      <CampoBusca
        type="text"
        placeholder="Buscar por título do jogo..."
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
