import { useCart } from '../context/CartContext';
import { Typography, List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import apiClient from '../api/apiClient';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value, 10) || 1;
    updateQuantity(id, quantity);
  };

  const handleCreateOrder = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Debes iniciar sesión para crear una orden');
      return;
    }
  
    try {
      const items = cartItems.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
      }));
      console.log('🚬 ===> handleCreateOrder ===> cartItems:', cartItems);
  
      await apiClient.post('/orders', { items }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      alert('Orden creada con éxito');
      clearCart();
    } catch (error) {
      console.error(error);
      alert('Error al crear la orden');
    }
  };

  if (cartItems.length === 0) {
    return <Typography variant="h6">Tu carrito está vacío 🛒</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Carrito de Compras</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ListItemText primary={item.name} secondary={`Precio: $${item.price}`} />
            <TextField
              type="number"
              size="small"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              sx={{ width: 60 }}
            />
            <IconButton onClick={() => removeFromCart(item.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Button variant="contained" color="secondary" onClick={clearCart} sx={{ mt: 2 }}>
        Vaciar Carrito
      </Button>
      <Button variant="contained" color="primary" onClick={handleCreateOrder} sx={{ mt: 2, ml: 2 }}>
        Crear Orden
      </Button>
    </div>
  );
}

export default CartPage;
