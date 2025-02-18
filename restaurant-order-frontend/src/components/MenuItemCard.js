import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import apiClient from '../api/apiClient';
import { useState } from 'react';

function MenuItemCard({ item }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <Card
      sx={{
        maxWidth: 300,
        marginBottom: 3,
        boxShadow: 3,
        borderRadius: 3,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
        backgroundColor: item.available ? 'white' : '#f5f5f5',
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="https://placehold.co/300x140?text=Plato"
        alt={item.name}
      />

      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography color="text.secondary">{item.description || 'Sin descripción'}</Typography>
        <Typography variant="h5" color="primary">${item.price}</Typography>
        <Typography
          variant="body2"
          sx={{ color: item.available ? 'green' : 'red', fontWeight: 'bold', marginBottom: 2 }}
        >
          {item.available ? 'Disponible' : 'No Disponible'}
        </Typography>

        {error && (
          <Typography variant="body2" color="error" sx={{ marginBottom: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!item.available || loading}
          onClick={handleOrder}
        >
          {loading ? 'Añadiendo...' : 'Añadir Pedido'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default MenuItemCard;
