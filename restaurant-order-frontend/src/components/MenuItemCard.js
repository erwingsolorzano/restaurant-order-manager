import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import { useUser } from '../context/UserContext';

function MenuItemCard({ item, onEdit = () => {}, onDelete = () => {}, onAddToCart = () => {} }) {
  const { user } = useUser();

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
