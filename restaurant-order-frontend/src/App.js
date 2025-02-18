import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Container } from '@mui/material';
import { UserProvider } from './context/UserContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Navbar from './components/Nav';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Container sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/menu" element={<MenuPage />} />

            {/* Protegida */}
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <OrdersPage />
                </PrivateRoute>
              }
            />

            {/* Públicas */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;