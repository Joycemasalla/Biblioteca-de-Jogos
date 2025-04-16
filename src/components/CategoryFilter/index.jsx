import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';


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
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin: 30px 0;
`;

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

const CategoryFilter = ({ selected, onSelect }) => {
    return (
        <FilterContainer>
            {categories.map((cat) => (
                <FilterButton
                    key={cat.nome}
                    active={selected === cat.nome}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => onSelect(cat.nome)}
                >
                    <span>{cat.icone}</span> {cat.nome}
                </FilterButton>
            ))}
        </FilterContainer>
    );
};

export default CategoryFilter;
