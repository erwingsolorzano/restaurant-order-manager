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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleId: '',
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/users');
      setUsers(response.data);
    } catch (err) {
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await apiClient.get('/roles');
      setRoles(response.data);
    } catch (err) {
      setError('Error al cargar los roles');
    }
  };

  const handleOpen = (user = null) => {
    setSelectedUser(user);
    setFormData(
      user
        ? {
            name: user.name,
            email: user.email,
            roleId: user.roleId || '',
          }
        : { name: '', email: '', roleId: '' }
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

  const handleSubmit = async () => {
    try {
      if (selectedUser) {
        await apiClient.put(`/users/${selectedUser.id}`, formData);
      } else {
        await apiClient.post('/users', formData);
      }
      handleClose();
      fetchUsers();
    } catch (err) {
      setError('Error al guardar el usuario');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      setError('Error al eliminar usuario');
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}

      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Crear Usuario
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.Role ? user.Role.name : 'Sin rol'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(user)} size="small">
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
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

      {/* Modal de Crear / Editar */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedUser ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
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
            name="email"
            label="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <FormControl fullWidth variant="outlined" size="medium">
            <InputLabel>Rol</InputLabel>
            <Select
              name="roleId"
              value={formData.roleId}
              onChange={handleChange}
              label="Rol"
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">
            {selectedUser ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserManagement;
