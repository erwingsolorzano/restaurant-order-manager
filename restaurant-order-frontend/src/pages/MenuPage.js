import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';

import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Snackbar,
  Dialog,
  DialogContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const [creatingOrder, setCreatingOrder] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get('/menu');
      setMenuItems(response.data);
    } catch (err) {
      setError('Error al cargar el menú');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para crear una orden');
      return;
    }

    setCreatingOrder(true);
    try {
      const items = cartItems.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
      }));

      await apiClient.post(
        '/orders',
        { items },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage('Orden creada con éxito!');
      setOpenSnackbar(true);
      clearCart();

      // setTimeout(() => {
      //   navigate('/orders');
      // }, 1500); // Redirigir después de la animación
    } catch (error) {
      console.error(error);
      alert('Error al crear la orden');
    } finally {
      setCreatingOrder(false);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Menú */}
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom>
          Menú del Restaurante 🍽️
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={2}>
          {menuItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description || 'Sin descripción'}
                  </Typography>
                  <Typography variant="h5" color="primary">
                    ${Number(item.price).toFixed(2)}
                  </Typography>
                  <Typography
                    color={item.available ? 'success.main' : 'error.main'}
                  >
                    {item.available ? 'Disponible' : 'No Disponible'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!item.available}
                    onClick={() => addToCart(item)}
                  >
                    Añadir al Carrito
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Carrito */}
      <Grid item xs={4}>
        <Typography variant="h5" gutterBottom>
          Carrito 🛒
        </Typography>

        {cartItems.length === 0 && (
          <Typography variant="body1">El carrito está vacío</Typography>
        )}

        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemText
                primary={item.name}
                secondary={`$${Number(item.price).toFixed(2)}`}
              />
              <TextField
                type="number"
                size="small"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                sx={{ width: 60 }}
              />
              <IconButton onClick={() => removeFromCart(item.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>

        {cartItems.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              Total: $
              {cartItems
                .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
                .toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateOrder}
              sx={{ mt: 1 }}
            >
              Crear Orden
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={clearCart}
              sx={{ mt: 1, ml: 1 }}
            >
              Vaciar Carrito
            </Button>
          </Box>
        )}
      </Grid>

      {/* Modal tipo Spinner mientras se crea la orden */}
      <Dialog open={creatingOrder} maxWidth="xs" fullWidth>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Creando tu orden...</Typography>
        </DialogContent>
      </Dialog>

      {/* Snackbar de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={successMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Grid>
  );
}

export default MenuPage;
