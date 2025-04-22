import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Lista de categorias com nome e ícone
const categories = [
    { nome: 'Todos', icone: '🎮' },
    { nome: 'Aventura', icone: '🗺️' },
    { nome: 'Ficção Científica', icone: '🚀' },
    { nome: 'Corrida', icone: '🏎️' },
    { nome: 'Cyberpunk', icone: '🤖' },
    { nome: 'RPG', icone: '🛡️' },
    { nome: 'Battle Royale', icone: '🔥' },
    { nome: 'Ação', icone: '⚔️' },
    { nome: 'Fantasia', icone: '🧙‍♂️' }
];

// Container para os botões de filtro
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin: 30px 0;
`;

// Estilos para os botões de filtro
const FilterButton = styled(motion.button)`
  background: ${({ active }) => (active ? 'linear-gradient(45deg, #4f46e5, #3b82f6)' : '#1e293b')};
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(45deg, #4f46e5, #3b82f6);
    transform: scale(1.05);
  }
`;

// Exibe botões do filtro
const CategoryFilter = ({ selected, onSelect }) => {
    return (
        <FilterContainer>
            {categories.map((cat) => (
                <FilterButton
                    key={cat.nome} // Chave única para cada botão
                    active={selected === cat.nome} // Define se o botão está ativo
                    whileTap={{ scale: 0.95 }} // Animação ao clicar
                    whileHover={{ scale: 1.05 }} // Animação ao passar o mouse
                    onClick={() => onSelect(cat.nome)} // Função chamada ao clicar no botão
                >
                    <span>{cat.icone}</span> {cat.nome} {/* Exibe o ícone e o nome da categoria */}
                </FilterButton>
            ))}
        </FilterContainer>
    );
};

export default CategoryFilter; // Exporta o componente
