import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// Import pages later
const GlobalStyle = createGlobalStyle`
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
`;

const AppContainer = styled.div`
  min-height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <Router>
            <Routes>
              <Route path="/" element={<div>Home Page (Coming Soon)</div>} />
              <Route path="/favoritos" element={<div>Favorites Page (Coming Soon)</div>} />
              <Route path="/perfil" element={<div>Profile Page (Coming Soon)</div>} />
              <Route path="/jogo/:id" element={<div>Game Details Page (Coming Soon)</div>} />
            </Routes>
          </Router>
        </AppContainer>
      </>
    );
  }
}

export default App;