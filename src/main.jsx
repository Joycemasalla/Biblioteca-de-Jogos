import { StrictMode } from 'react'; // Importando o StrictMode correto
import { createRoot } from 'react-dom/client'; // Importando o createRoot correto
import App from './App.jsx'; // Certifique-se de que o caminho esteja correto
import './index.css'; // Certifique-se de que o caminho do CSS esteja correto
import { RatingProvider } from './context/RatingContext';


createRoot(document.getElementById('root')).render( // Use o createRoot corretamente
  <StrictMode> {/* Use StrictMode corretamente */}
    <RatingProvider>
      <App /> {/* Renderize o componente App */}
    </RatingProvider>
  </StrictMode>
);
