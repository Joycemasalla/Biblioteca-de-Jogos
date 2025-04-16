import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme.jsx';
import { GlobalStyles } from '../styles/globalStyles.jsx';

// Criando o contexto para o tema
const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  // Inicializando o estado sem o uso de localStorage
  const [temaDark, setTemaDark] = useState(false); // O estado inicial é false (modo claro)

  // Função para alternar entre os temas
  const toggleTema = () => {
    setTemaDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ temaDark, toggleTema }}>
      <StyledThemeProvider theme={temaDark ? darkTheme : lightTheme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de tema
export const useTema = () => useContext(ThemeContext);
