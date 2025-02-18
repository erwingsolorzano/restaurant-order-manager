import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import MenuItemCard from '../components/MenuItemCard';
import { Container, Grid, CircularProgress, Alert, Button, Modal, Box, TextField, Typography, Switch, FormControlLabel } from '@mui/material';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';


function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const { addToCart } = useCart();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    available: true,
  });

  const handleOpenModal = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      available: true,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleAvailable = () => {
    setFormData({ ...formData, available: !formData.available });
  };

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await apiClient.put(`/menu/${formData.id}`, formData);
        alert('Plato actualizado con éxito');
        setMenuItems(
          menuItems.map((item) =>
            item.id === formData.id ? { ...item, ...formData } : item
          )
        );
      } else {
        const response = await apiClient.post('/menu', formData);
        alert('Plato creado con éxito');
        setMenuItems([...menuItems, response.data]);
      }
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      alert('Error al guardar el plato');
    }
  };  

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      available: item.available,
    });
    setOpenModal(true);
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este plato?')) return;
  
    try {
      await apiClient.delete(`/menu/${id}`);
      alert('Plato eliminado con éxito');
      setMenuItems(menuItems.filter((item) => item.id !== id)); // Actualiza el estado
    } catch (error) {
      console.error(error);
      alert('Error al eliminar el plato');
    }
  };

  const handleAddToCart = (menuItem) => {
    addToCart(menuItem);
    alert(`${menuItem.name} añadido al carrito`);
  }; 

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

      {user && user.role === 'admin' && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
          >
            Agregar Plato
          </Button>
        </Box>
      )}
      <Grid container spacing={3} justifyContent="center">


      {menuItems.map((item) => (
        <Grid item key={item.id}>
          <MenuItemCard
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddToCart={handleAddToCart} // Esto lo usaremos más adelante para el carrito
          />
        </Grid>
      ))}

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            {/* Icono de Cerrar */}
            {/* Encabezado del Modal con Título y Botón X en la misma línea */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {formData.id ? 'Editar Plato' : 'Agregar Plato'}
              </Typography>

              <Button
                onClick={handleCloseModal}
                sx={{
                  minWidth: 'auto',
                  color: 'rgba(0, 0, 0, 0.5)', // Negro con transparencia
                  fontSize: '1.5rem', // 5% más grande aprox
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
                }}
              >
                ✖
              </Button>
            </Box>


            {/* Tu formulario sigue igual */}
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Precio"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={<Switch checked={formData.available} onChange={handleToggleAvailable} />}
              label="Disponible"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
              Guardar Plato
            </Button>
          </Box>
        </Modal>

      </Grid>
    </Container>
  );
}

export default MenuPage;
