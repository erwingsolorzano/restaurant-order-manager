import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';

function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    available: true,
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/menu');
      setMenuItems(response.data);
    } catch (err) {
      setError('Error al cargar los platos');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (item = null) => {
    setSelectedItem(item);
    setFormData(
      item || { name: '', price: '', description: '', available: true }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      available: e.target.checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (selectedItem) {
        await apiClient.put(`/menu/${selectedItem.id}`, formData);
      } else {
        await apiClient.post('/menu', formData);
      }
      handleClose();
      fetchMenuItems();
    } catch (err) {
      setError('Error al guardar el plato');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/menu/${id}`);
      fetchMenuItems();
    } catch (err) {
      setError('Error al eliminar el plato');
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}

      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Agregar Plato
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Disponible</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>${Number(item.price).toFixed(2)}</TableCell>
                <TableCell>{item.description || 'Sin descripción'}</TableCell>
                <TableCell>{item.available ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(item)} size="small">
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    color="error"
                    size="small"
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de Crear/Editar */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedItem ? 'Editar Plato' : 'Agregar Plato'}</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Nombre"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="price"
            label="Precio"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Descripción"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.available}
                onChange={handleSwitchChange}
              />
            }
            label="Disponible"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">
            {selectedItem ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MenuManagement;
