import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto de avaliação
const RatingContext = createContext();

// Provider que encapsula toda a lógica e disponibiliza os dados
export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState({});

  // Ao carregar o app, tenta recuperar as avaliações salvas no localStorage
  useEffect(() => {
    const storedRatings = localStorage.getItem('gameRatings');
    if (storedRatings) {
      setRatings(JSON.parse(storedRatings));
    }
  }, []);

  // Sempre que ratings mudar, salva no localStorage para persistência
  useEffect(() => {
    localStorage.setItem('gameRatings', JSON.stringify(ratings));
  }, [ratings]);

  // Função para avaliar um jogo
  const rateGame = (gameId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [gameId]: rating,
    }));
  };

  return (
    <RatingContext.Provider value={{ ratings, rateGame }}>
      {children}
    </RatingContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useRating = () => useContext(RatingContext);


/*Mantém um estado global chamado ratings, onde a chave é o ID do jogo e o valor é a nota (1 a 5).

Carrega as avaliações do localStorage ao iniciar a aplicação (então você não perde a nota ao recarregar a página).

Atualiza o localStorage toda vez que uma nova avaliação é feita.

Fornece um hook useRating() para que qualquer componente possa acessar ratings e rateGame() facilmente.*/