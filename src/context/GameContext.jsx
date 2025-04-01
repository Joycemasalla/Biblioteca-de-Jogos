// // GamesContext.js
// import React, { createContext, useContext, useState } from 'react';

// const GamesContext = createContext();

// const defaultGames = [
//   { id: 1, title: "The Legend of Zelda: Breath of the Wild", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf", rating: 5, isFavorite: false },
//   { id: 2, title: "Red Dead Redemption 2", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f", rating: 4, isFavorite: false },
//   { id: 3, title: "Cyberpunk 2077", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e", rating: 3, isFavorite: false }
// ];

// export const GamesProvider = ({ children }) => {
//   const [games, setGames] = useState(defaultGames);

//   const toggleFavorite = (id) => {
//     setGames(prevGames => prevGames.map(game => game.id === id ? { ...game, isFavorite: !game.isFavorite } : game));
//   };

//   const updateRating = (id, rating) => {
//     setGames(prevGames => prevGames.map(game => game.id === id ? { ...game, rating } : game));
//   };

//   const getStats = () => {
//     const favorites = games.filter(game => game.isFavorite).length;
//     const totalRating = games.reduce((sum, game) => sum + game.rating, 0);
//     return { totalFavorites: favorites, totalGames: games.length, averageRating: totalRating / games.length };
//   };

//   return (
//     <GamesContext.Provider value={{ games, toggleFavorite, updateRating, getStats }}>
//       {children}
//     </GamesContext.Provider>
//   );
// };

// export const useGames = () => {
//   const context = useContext(GamesContext);
//   if (!context) {
//     throw new Error('useGames must be used within a GamesProvider');
//   }
//   return context;
// };

// // ThemeContext.js
// import React, { createContext, useContext, useState } from 'react';
// import { ThemeProvider as StyledThemeProvider } from 'styled-components';
// import { lightTheme, darkTheme, GlobalStyles } from '../styles/GlobalStyles';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   const toggleTheme = () => {
//     setTheme(prev => prev === 'light' ? 'dark' : 'light');
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
//         <GlobalStyles />
//         {children}
//       </StyledThemeProvider>
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };
