import { Card, CardContent, Typography, Button, CardMedia, CardActions, Box } from '@mui/material';
import apiClient from '../api/apiClient';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

function MenuItemCard({ item, onEdit = () => {}, onDelete = () => {}, onAddToCart = () => {} }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useUser();

  const handleAddToCart = (item) => {
    console.log('Añadir al carrito:', item);
  };
  
  const handleOrder = async () => {
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debes iniciar sesión para hacer un pedido');
      setLoading(false);
      return;
    }

    try {
      await apiClient.post(
        '/orders',
        { menuItemId: item.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Pedido realizado con éxito');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 300, mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography color="textSecondary">{item.description || 'Sin descripción'}</Typography>
        <Typography variant="h5" color="primary">
          ${item.price}
        </Typography>
        <Typography color={item.available ? 'green' : 'red'}>
          {item.available ? 'Disponible' : 'No Disponible'}
        </Typography>
      </CardContent>
      <CardActions>
        {item.available && onAddToCart && (
          <Button variant="contained" color="primary" onClick={() => onAddToCart(item)}>
            Añadir Pedido
          </Button>
        )}

        {/* SOLO PARA ADMIN */}
        {user && user.role === 'admin' && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" color="secondary" onClick={() => onEdit(item)}>
              Editar
            </Button>
            <Button size="small" color="error" onClick={() => onDelete(item.id)}>
              Eliminar
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}

export default MenuItemCard;
