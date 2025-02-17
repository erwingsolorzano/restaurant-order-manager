import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Restaurant Order Manager
          </Typography>
          <Button color="inherit" component={Link} to="/menu">
            Menú
          </Button>
          <Button color="inherit" component={Link} to="/orders">
            Pedidos
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Iniciar Sesión
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Registro
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
