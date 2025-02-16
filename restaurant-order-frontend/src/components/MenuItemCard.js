import { Card, CardContent, Typography, Button, Box } from '@mui/material';

function MenuItemCard({ item }) {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2, backgroundColor: item.available ? 'white' : '#f5f5f5' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {item.name}
        </Typography>
        <Typography color="text.secondary">
          {item.description || 'Sin descripción'}
        </Typography>
        <Typography variant="h5" color="primary">
          ${item.price}
        </Typography>
        <Typography variant="body2" color={item.available ? 'green' : 'error'}>
          {item.available ? 'Disponible' : 'No Disponible'}
        </Typography>

        <Box sx={{ marginTop: 1 }}>
          <Button variant="contained" color="primary" disabled={!item.available}>
            Añadir Pedido
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MenuItemCard;