import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Restaurant Order Manager
        </Typography>
        {user?.role === 'admin' && (
          <Button color="inherit" component={Link} to="/admin">
            ADMINISTRACIÓN
          </Button>
        )}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/menu">
              Menú
            </Button>
            <Button color="inherit" component={Link} to="/orders">
              Pedidos
            </Button>
            {/* <Button color="inherit" component={Link} to="/cart">
            🛒 Carrito
            </Button> */}
          </Box>
        )}
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              👤 {user.email}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Box>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Iniciar Sesión
            </Button>
            {/* <Button color="inherit" component={Link} to="/register">
              Registro
            </Button> */}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
