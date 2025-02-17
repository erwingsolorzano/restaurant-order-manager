import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import MenuItemCard from '../components/MenuItemCard';
import { Container, Grid, CircularProgress, Alert } from '@mui/material';

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
    <Container sx={{ marginTop: 4 }}>
      <h2>Menú del Restaurante 🍽️</h2>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3} justifyContent="center">
        {menuItems.map((item) => (
          <Grid item key={item.id}>
            <MenuItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MenuPage;
