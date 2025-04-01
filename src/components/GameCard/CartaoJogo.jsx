// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Heart, Star } from 'lucide-react';

// // Estilos do cartão
// const Card = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease;
//   cursor: pointer;

//   &:hover {
//     transform: translateY(-4px);
//   }
// `;

// const GameImage = styled.img`
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
// `;

// const CardContent = styled.div`
//   padding: 16px;
// `;

// const GameTitle = styled.h3`
//   font-size: 1.1rem;
//   margin-bottom: 8px;
//   color: #1f2937;
// `;

// const CardActions = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 12px;
// `;

// const FavoriteButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: ${props => (props.isFavorite ? '#ff4757' : '#6b7280')};
//   transition: all 0.3s ease;

//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// // Estilos para Avaliação
// const RatingContainer = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.25rem;
// `;

// const StarWrapper = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #fbbf24;
//   display: flex;
//   align-items: center;
//   padding: 0;
  
//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// // Componente de Avaliação
// const Rating = ({ value, onChange }) => {
//   return (
//     <RatingContainer>
//       {[1, 2, 3, 4, 5].map(index => (
//         <StarWrapper key={index} onClick={() => onChange(index)}>
//           <Star size={20} fill={value >= index ? 'currentColor' : 'none'} />
//         </StarWrapper>
//       ))}
//     </RatingContainer>
//   );
// };

// // Componente do Cartão do Jogo
// const GameCard = ({ game }) => {
//   const [isFavorite, setIsFavorite] = useState(game.isFavorite);
//   const [rating, setRating] = useState(game.rating);

//   const toggleFavorite = () => setIsFavorite(!isFavorite);
//   const updateRating = (value) => setRating(value);

//   return (
//     <Card>
//       <GameImage src={game.image} alt={game.title} />
//       <CardContent>
//         <GameTitle>{game.title}</GameTitle>
//         <CardActions>
//           <Rating value={rating} onChange={updateRating} />
//           <FavoriteButton onClick={toggleFavorite} isFavorite={isFavorite}>
//             <Heart size={24} fill={isFavorite ? '#ff4757' : 'none'} />
//           </FavoriteButton>
//         </CardActions>
//       </CardContent>
//     </Card>
//   );
// };

// export default GameCard;
