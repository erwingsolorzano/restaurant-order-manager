import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import MenuItemCard from '../components/MenuItemCard';
import { Container, Typography, Grid, CircularProgress, Alert } from '@mui/material';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await apiClient.get('/menu');
        setMenuItems(response.data);
      } catch (err) {
        setError('Error al cargar el menú');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Menú del Restaurante
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <MenuItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MenuPage;