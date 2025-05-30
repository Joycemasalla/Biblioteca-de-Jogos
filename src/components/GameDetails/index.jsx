import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { X, Star, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFavoritos } from '../../context/FavoritesContext.jsx';
import { useRating } from '../../context/RatingContext';
import toast from 'react-hot-toast';

// ======= STYLED COMPONENTS =======

// Overlay que escurece o fundo e aplica blur
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Modal principal
const Modal = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

// Botão de fechar
const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    background: ${({ theme }) => theme.accent};
    color: white;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
  font-size: 1.1rem;
  line-height: 1.6;
`;

// Bloco de avaliação com estrelas
const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding: 16px;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 4px;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  svg {
    fill: ${({ active }) => (active ? '#ffd700' : 'none')};
    stroke: ${({ active, theme }) => (active ? '#ffd700' : theme.text)};
    transition: fill 0.2s ease, stroke 0.2s ease;
  }

  &:hover {
    transform: scale(1.2);
    svg {
      fill: #ffd700;
      stroke: #ffd700;
    }
  }
`;

const RatingCount = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-left: 12px;
`;

// ======= COMENTÁRIOS =======

const CommentSection = styled.div`
  margin-top: 32px;
`;

const CommentForm = styled.form`
  margin-bottom: 24px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.accent}40;
  margin-bottom: 16px;
  min-height: 120px;
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.accent};
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.accent}40;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentCard = styled.div`
  background: ${({ theme, isOwn }) => isOwn ? theme.accent + '20' : theme.background};
  padding: 16px;
  border-radius: 12px;
  position: relative;
  border: 1px solid ${({ theme, isOwn }) => isOwn ? theme.accent : 'transparent'};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CommentDate = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const DeleteButton = styled.button`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    opacity: 1;
    color: #ff4757;
    background: rgba(255, 71, 87, 0.1);
  }
`;

const CommentText = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
  font-size: 1rem;
`;

const NoComments = styled.div`
  text-align: center;
  padding: 32px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;
const Imagem = styled.img`
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const Galeria = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  margin-top: 20px;
`;



// ======= COMPONENTE PRINCIPAL =======

export const GameDetails = ({ jogo, onClose }) => {
  const { ratings, rateGame } = useRating();

  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);

  // Salva comentários no localStorage
  const salvarComentariosNoStorage = (comentarios) => {
    localStorage.setItem(`comentarios_${jogo.id}`, JSON.stringify(comentarios));
  };

  useEffect(() => {
    // Carrega comentários do localStorage ao montar o componente
    const savedComments = JSON.parse(localStorage.getItem('comentarios')) || [];
    setComentarios(savedComments.filter(c => c.jogoId === jogo.id));
  }, [jogo.id]);

  useEffect(() => {
    // Salva os comentários no localStorage sempre que a lista mudar
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
  }, [comentarios]);

  const currentRating = ratings[jogo.id] || jogo.avaliacao || 0;

  // Função para avaliar o jogo
  const handleRate = (value) => {
    rateGame(jogo.id, value);
    atualizarAvaliacao(jogo.id, value);
    toast.success('Avaliação atualizada!');
  };

  // Função para enviar um comentário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comentario.trim()) {
      toast.error('O comentário não pode ser vazio.');
      return;
    }

    const novoComentario = {
      id: Date.now(),
      texto: comentario,
      autor: 'usuario-atual',
      data: new Date(),
    };

    const novosComentarios = [...comentarios, novoComentario];
    setComentarios(novosComentarios);
    salvarComentariosNoStorage(novosComentarios);
    setComentario(''); // Limpa o campo de comentário
    toast.success('Comentário adicionado com sucesso!');
  };

  // Função para deletar um comentário
  const handleDeleteComment = (commentId) => {
    if (window.confirm('Tem certeza que deseja excluir este comentário?')) {
      const novosComentarios = comentarios.filter((comment) => comment.id !== commentId);
      setComentarios(novosComentarios);
      salvarComentariosNoStorage(novosComentarios);
      toast.success('Comentário removido com sucesso!');
    }
  };

  useEffect(() => {
    const comentariosNoStorage = localStorage.getItem(`comentarios_${jogo.id}`);
    if (comentariosNoStorage) {
      setComentarios(JSON.parse(comentariosNoStorage));
    }
  }, [jogo.id]);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Fechar">
          <X size={24} />
        </CloseButton>

        <Image src={jogo.imagem} alt={jogo.titulo} />
        <Title>{jogo.titulo}</Title>
        <Description>{jogo.descricao}</Description>

        <Rating>
          <RatingStars>
            {[1, 2, 3, 4, 5].map((estrela) => (
              <StarButton
                key={estrela}
                onClick={() => handleRate(estrela)}
                active={estrela <= currentRating}
                aria-label={`Avaliar com ${estrela} estrela(s)`}
              >
                <Star size={28} />
              </StarButton>
            ))}
          </RatingStars>
          <RatingCount>({jogo.totalAvaliacoes ?? 0} avaliações)</RatingCount>
        </Rating>

        <Galeria>
          {jogo.galeria.map((img, i) => (
            <Imagem key={i} src={img} alt={`Imagem ${i + 1}`} />
          ))}
        </Galeria>

        {/* Seção de Comentários */}
        <CommentSection>
          <CommentForm onSubmit={handleSubmit}>
            <CommentInput
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Deixe seu comentário..."
            />
            <SubmitButton type="submit">Enviar Comentário</SubmitButton>
          </CommentForm>

          {/* Exibindo os Comentários */}
          <CommentList>
            {comentarios.length === 0 ? (
              <NoComments>Sem comentários ainda.</NoComments>
            ) : (
              comentarios.map((comentario) => (
                <CommentCard key={comentario.id} isOwn={comentario.autor === 'user'}>
                  <CommentHeader>
                    <span>{comentario.autor}</span>
                    <CommentDate>
                      {format(new Date(comentario.data), 'dd/MM/yyyy', { locale: ptBR })}
                    </CommentDate>
                    {comentario.autor === 'usuario-atual' && (
                      <DeleteButton onClick={() => handleDeleteComment(comentario.id)}>
                        <Trash2 size={16} />
                      </DeleteButton>
                    )}
                  </CommentHeader>
                  <CommentText>{comentario.texto}</CommentText>
                </CommentCard>
              ))
            )}
          </CommentList>
        </CommentSection>
      </Modal>
    </Overlay>
  );
};
