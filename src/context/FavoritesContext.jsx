import React, { createContext, useContext, useState } from 'react';

// Definindo o contexto de favoritos com as funções de manipulação de favoritos
const FavoritosContext = createContext();

export const useFavoritos = () => {
  return useContext(FavoritosContext);
};

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]); // Estado para armazenar os favoritos

  // Função para adicionar um item aos favoritos
  const adicionarFavorito = (item) => {
    // Verifica se o item já está nos favoritos
    if (!favoritos.some(fav => fav.id === item.id)) {
      setFavoritos((prev) => [...prev, { ...item, comentarios: [], avaliacao: 0 }]); // Inicializa a avaliação como 0
    }
  };

  // Função para remover um item dos favoritos com base no seu ID
  const removerFavorito = (id) => {
    setFavoritos((prev) => prev.filter((item) => item.id !== id));
  };

  // Função para atualizar a avaliação de um item favorito
  const atualizarAvaliacao = (id, valor) => {
    setFavoritos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, avaliacao: valor } : item // Atualiza a avaliação diretamente no item
      )
    );
  };

  // Função para adicionar um comentário a um item favorito
  const adicionarComentario = (jogoId, texto, usuarioId) => {
    setFavoritos((prev) =>
      prev.map((item) =>
        item.id === jogoId
          ? {
              ...item,
              comentarios: [
                ...item.comentarios,
                {
                  id: Date.now(), // Usando a data atual como ID para o comentário
                  usuarioId, // Associando o comentário ao usuário real
                  texto,
                  data: new Date(),
                },
              ],
            }
          : item
      )
    );
  };

  // Função para remover um comentário de um item favorito
  const removerComentario = (jogoId, comentarioId) => {
    setFavoritos((prev) =>
      prev.map((item) =>
        item.id === jogoId
          ? {
              ...item,
              comentarios: item.comentarios.filter((c) => c.id !== comentarioId),
            }
          : item
      )
    );
  };

  // Função para calcular a média das avaliações (se necessário)
  const getMediaAvaliacoes = () => {
    if (favoritos.length === 0) return 0;
    const soma = favoritos.reduce((acc, item) => acc + item.avaliacao, 0);
    return soma / favoritos.length;
  };

  return (
    <FavoritosContext.Provider value={{
      favoritos,
      adicionarFavorito,
      removerFavorito,
      atualizarAvaliacao,
      adicionarComentario,
      removerComentario,
      getMediaAvaliacoes, // Agora passando a função de média
    }}>
      {children}
    </FavoritosContext.Provider>
  );
};
