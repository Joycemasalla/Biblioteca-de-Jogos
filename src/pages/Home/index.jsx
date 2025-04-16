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
    titulo: 'The Legend of Zelda: Breath of The Wild',
    imagem: 'https://hype.games/_next/image?url=https%3A%2F%2Fimg.hype.games%2Fcdn%2Fc64bd743-e83f-4677-a53b-e03fdc4f6566%5BBHN-Nintendo%5D-The-Legend-of-Zelda-Breath-of-the-Wild%20(1).png&w=3840&q=75',
    galeria: [
      'https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/8710173/the_legend_of_zelda_breath_of_the_wild_hard_mode_battle_1920.jpg?quality=90&strip=all&crop=7.8125,0,84.375,100',
      'https://images.cgames.de/images/gsgp/290/the-legend-of-zelda-breath-of-the-wild-hund_6080028.jpg',
      'https://i.guim.co.uk/img/media/22d6b308c89e62e229feb220208a639836e31fd9/60_0_1800_1080/master/1800.png?width=700&quality=85&auto=format&fit=max&s=25c588a5203feea6061c32112a66ebdc'
    ],
    descricao: 'Entre em um mundo de descobertas, exploração e aventura em The Legend of Zelda: Breath of the Wild, o novo jogo da famosa série que veio para romper barreiras.',
    categoria: 'Aventura',
    comentarios: [],
    totalAvaliacoes: 150
  },
  {
    id: 2,
    titulo: 'Baldurs Gate 3',
    imagem: 'https://thinglabs.io/wp-content/uploads/baldurs-gate-3-logo.webp',
    galeria: [
      'https://gamespace.com/wp-content/uploads/2023/06/BG3-Are-You-Ready-to-Return-to-Baldurs-Gate-After-20-Years.jpg',
      'https://assetsio.gnwcdn.com/bg3-hotfix-18-vendor-bug-fices-patch-6-01.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp',
      'https://i.ytimg.com/vi/vJ4SVSm1ARQ/maxresdefault.jpg'
    ],
    descricao: 'Reúna seu grupo e volte aos Reinos Esquecidos em uma história de amizade e traição, sacrifício e sobrevivência, e tentação pelo poder.',
    categoria: 'Fantasia',
    comentarios: [],
    totalAvaliacoes: 150
  },
  {
    id: 3,
    titulo: 'Asassins Creed III',
    imagem: 'https://i.ytimg.com/vi/ikd62DdJRhA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCy1TInPS6t3qpbg-3nr-ntQPW-hg',
    galeria: [
      'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7KmIBNDuKhV3KRIFfl4Rff/703b7de65e55d257f716799bdadfbf28/AC3R_media_screenshot10_visuals.jpg',
      'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fanise%2Fhome%2FACL_01_Aveline_1080-1920x1080-dac447a1d2084e7acf5256bb8b3fb0ba1c8c71c9.jpg?resize=1&w=480&h=270&quality=medium',
      'https://i.ytimg.com/vi/EevWu6A1LPM/maxresdefault.jpg'
    ],
    descricao: 'Reviva a Revolução Americana ou explore esta era conturbada pela primeira vez em Assassins Creed III',
    categoria: 'Ação',
    comentarios: [],
    totalAvaliacoes: 150
  },
  {
    id: 4,
    titulo: 'Cyberpunk 2077',
    imagem: 'https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7',
    galeria: [
      'https://blackcompany.com.br/wp-content/uploads/2024/11/1080p-cyberpunk-2077-background-mk3a5gykijtb55w8.jpg',
      'https://sm.ign.com/ign_br/screenshot/default/keanu-reeves_tx19.png',
      'https://blog.br.playstation.com/tachyon/sites/4/2022/02/681dce8f5e80c94c54694dd97af30bdec9e1feef-scaled.jpg?resize=1088%2C612&crop_strategy=smart'
    ],
    descricao: 'Cyberpunk 2077 é um RPG de ação e aventura em mundo aberto ambientado na megalópole de Night City, onde você é um mercenário cyberpunk envolvido em uma intensa luta pela sobrevivência.',
    categoria: 'Cyberpunk',
    comentarios: [],
    totalAvaliacoes: 150
  },
  {
    id: 5,
    titulo: 'Celeste',
    imagem: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000006442/691ba3e0801180a9864cc8a7694b6f98097f9d9799bc7e3dc6db92f086759252',
    galeria: [
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1092840/ss_e0159d08620e917e632788c960d9593e5e7f431c.1920x1080.jpg?t=1607394540',
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1092840/ss_03bfe6bd5ddac7f747c8d2aa1a4f82cfd53c6dcb.1920x1080.jpg?t=1607394540',
      'https://m.media-amazon.com/images/I/61SrIyqZQLL.jpg'
    ],
    descricao: 'Ajude Madeline a enfrentar seus demônios internos em sua jornada até o topo da Montanha Celeste, nesse jogo de plataforma super afiado dos criadores de TowerFall.',
    categoria: 'Aventura',
    comentarios: [],
    totalAvaliacoes: 150
  },
  {
    id: 6,
    titulo: 'Minecraft',
    imagem: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a',
    galeria: [
      'https://media.wired.com/photos/5dc9b5efdea30b00096c6cd0/16:9/w_2400,h_1350,c_limit/Cul-minecraft-MCE_MAG_Cover_01.jpg',
      'https://i.imgur.com/RRSmXb3.png',
      'https://preview.redd.it/n55zpu7nhzw41.png?auto=webp&s=db0c07be7b68d3633e6ca4359c44d6b5ae660bf9'
    ],
    descricao: 'Mergulhe em um mundo aberto de construção, criação e sobrevivência. Colete recursos, sobreviva à noite e construa qualquer coisa que puder imaginar.',
    categoria: 'Aventura',
    comentarios: [],
    totalAvaliacoes:150
  },
  {
    id: 7,
    titulo: 'Final Fantasy VII Remake',
    imagem: 'https://cdn1.epicgames.com/offer/6f43ab8025ad42d18510aa91e9eb688b/EGS_FINALFANTASYVIIREMAKEINTERGRADE_SquareEnix_S1_2560x1440-85f829541a833442eaace75d02e0f07d',
    galeria: [
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj2YfGRSZPq5Lc-jZMrRLODeoy21Gb5NxGYQat05d34Ilv9jqzklnegSY-or0FdNeqWAh2FGr2jHhvIZt_gRHixcXtAZRJ2d5i0ngbBFUKJ_0Z-0pdelFuhs2WKUdIzgHJtSAYKhV-CB5Mq/s1600/928770.jpg',
      'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i3WhTXHdZMjc/v1/-1x-1.webp',
      'https://img.odcdn.com.br/wp-content/uploads/2021/03/10-1024x576.jpg'
    ],
    descricao: 'Cloud Strife, ex-agente da SOLDIER, chega a Midgar, a cidade movida a energia de mako. O clássico atemporal FINAL FANTASY VII renasceu, com gráficos de última geração, um novo sistema de combate e uma aventura adicional com Yuffie Kisaragi.',
    categoria: 'Ação',
    comentarios: [],
    totalAvaliacoes:150
  },
  {
    id: 8,
    titulo: 'Red Dead Redemption II',
    imagem: 'https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg',
    galeria: [
      'https://gamenoticias.com.br/wp-content/uploads/2024/07/Imagem-principal-red-dead-redemption-2.jpg',
      'https://s2.glbimg.com/ffvbgpQbg2kI04Ew_duXr13M5CI=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/P/Y/mSpQzzSrmk1JzB2d0auQ/2018-02-01-3.jpg',
      'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_500/ncom/software/switch/70010000058660/0bddf448019d42d65fbc8a3e0fce67ad491f4e736791634fbfe00455a8fab985'
    ],
    descricao: 'Red Dead Redemption 2, a épica aventura de mundo aberto da Rockstar Games aclamada pela crítica e o jogo mais bem avaliado desta geração de consoles, agora chega aprimorado para PC com conteúdos inéditos no Modo História, melhorias visuais e muito mais.',
    categoria: 'Aventura',
    comentarios: [],
    totalAvaliacoes:150
  },
  {
    id: 9,
    titulo: 'Diablo III',
    imagem: 'https://upload.wikimedia.org/wikipedia/pt/1/12/DiabloIIIcover.jpg',
    galeria: [
      'https://blz-contentstack-images.akamaized.net/v3/assets/blt0e00eb71333df64e/blte794552d6ec14b6f/66c3bff6ed65c331f86b3f9b/optiona_feature_section.jpg',
      'https://s2.glbimg.com/YGwLYeUGNOkPpdImzCULjjFcva0=/1200x630/s.glbimg.com/jo/g1/f/original/2013/08/15/diablo3-1.jpg',
      'https://gocdkeys.it/images/captures/diablo-3-pc-cd-key-4.jpg'
    ],
    descricao: 'Lute pelos cidadãos de Santuário e vá até o Inferno e o Paraíso neste RPG de ação.',
    categoria: 'Ação',
    comentarios: [],
    totalAvaliacoes:150
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
