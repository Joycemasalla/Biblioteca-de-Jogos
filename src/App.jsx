import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Navegacao from './componentes/Navegacao/Navegacao';
import Inicio from './paginas/Inicio/Inicio';
import Favoritos from './paginas/Favoritos/Favoritos';
import Perfil from './paginas/Perfil/Perfil';
import DetalhesJogo from './paginas/DetalhesJogo/DetalhesJogo';

const EstiloGlobal = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f3f4f6;
  }

  * {
    box-sizing: border-box;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }
`;

const ContainerApp = styled.div`
  min-height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <>
        <EstiloGlobal />
        <ContainerApp>
          <Router>
            <Navegacao />
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/jogo/:id" element={<DetalhesJogo />} />
            </Routes>
          </Router>
        </ContainerApp>
      </>
    );
  }
}

export default App;