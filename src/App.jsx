import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--toast-bg, #363636)',
            color: 'var(--toast-text, #fff)',
          },
        }}
      />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
