import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritosProvider } from './context/FavoritesContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Content } from './components/Content';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <FavoritosProvider>
        <BrowserRouter>
          <Header />
          <Sidebar />
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/perfil" element={<Profile />} />
            </Routes>
          </Content>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                borderRadius: '8px',
                padding: '16px',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#68D391',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#F56565',
                  secondary: '#fff',
                },
              },
            }}
          />
        </BrowserRouter>
      </FavoritosProvider>
    </ThemeProvider>
  );
}

export default App;