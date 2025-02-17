import { Card, CardContent, Typography, Button, Box } from '@mui/material';

function MenuItemCard({ item }) {
  return (
    <Card
      sx={{
        maxWidth: 300,
        marginBottom: 3,
        boxShadow: 3,
        borderRadius: 3,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
        backgroundColor: item.available ? 'white' : '#f5f5f5',
      }}
    >
      {/* Imagen temporal - Puedes cambiar por imágenes reales */}

      <CardContent>
        <Typography variant="h6" component="div">
          {item.name}
        </Typography>
        <Typography color="text.secondary" sx={{ marginBottom: 1 }}>
          {item.description || 'Sin descripción'}
        </Typography>
        <Typography variant="h5" color="primary" sx={{ marginBottom: 1 }}>
          ${item.price}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: item.available ? 'green' : 'red',
            fontWeight: 'bold',
            marginBottom: 2,
          }}
        >
          {item.available ? 'Disponible' : 'No Disponible'}
        </Typography>

        <Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!item.available}
            fullWidth
          >
            Añadir Pedido
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MenuItemCard;
