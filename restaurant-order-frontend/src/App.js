import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Navbar from './components/Nav';
import MenuPage from './pages/MenuPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Container sx={{ marginTop: 4 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Navigate to="/menu" />
                  </PrivateRoute>
                }
              />
              <Route
                path="/menu"
                element={
                  <PrivateRoute>
                    <MenuPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <OrdersPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <CartPage />
                  </PrivateRoute>
                }
              />

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
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPage />
                  </PrivateRoute>
                }
              />
              {/* Rutas inválidas */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Container>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
