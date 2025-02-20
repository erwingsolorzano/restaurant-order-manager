import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useCart } from '../context/CartContext';
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
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get('/menu');
      setMenuItems(response.data);
      setFilteredItems(response.data);
    } catch (err) {
      setError('Error al cargar el menú');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    filterItems();
  }, [searchTerm, selectedCategory, menuItems]);

  const filterItems = () => {
    let filtered = menuItems;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.categoryId === parseInt(selectedCategory));
    }

    setFilteredItems(filtered);
  };

  const handleCreateOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Debes iniciar sesión para crear una orden');
      setOpenSnackbar(true);
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setSuccessMessage('Orden creada con éxito!');
      clearCart();
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al crear la orden');
    } finally {
      setOpenSnackbar(true);
      setCreatingOrder(false);
    }
  };

  const groupedItems = filteredItems.reduce((acc, item) => {
    const categoryName = item.Category?.name || 'Sin Categoría';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
      <Grid item xs={12} md={8}>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <TextField
            label="Buscar Plato"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        <FormControl fullWidth variant="outlined" size="medium">
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Categoría"
          >
            <MenuItem value="">Todas</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        </Box>

        {Object.entries(groupedItems).map(([category, items]) => (
          <Box key={category} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {category}
            </Typography>
            <Grid container spacing={3}>
              {items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Card elevation={3} sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.description || 'Sin descripción'}
                      </Typography>
                      <Typography variant="h5" color="primary">
                        ${Number(item.price).toFixed(2)}
                      </Typography>
                      <Typography color={item.available ? 'success.main' : 'error.main'}>
                        {item.available ? 'Disponible' : 'No Disponible'}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
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
          </Box>
        ))}
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom align="center">
            Carrito 🛒
          </Typography>

          {cartItems.length === 0 && (
            <Typography variant="body1" color="textSecondary" align="center">
              El carrito está vacío
            </Typography>
          )}

          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemText primary={item.name} secondary={`$${Number(item.price).toFixed(2)}`} />
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
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="h6">
                Total: ${cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0).toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateOrder}
                sx={{ mt: 1 }}
                disabled={creatingOrder}
              >
                Crear Orden
              </Button>
              <Button variant="outlined" color="secondary" onClick={clearCart} sx={{ mt: 1, ml: 1 }}>
                Vaciar Carrito
              </Button>
            </Box>
          )}
        </Paper>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnackbar(false);
          setSuccessMessage('');
          setErrorMessage('');
        }}
        message={successMessage || errorMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />

    </Grid>
  );
}

export default MenuPage;
