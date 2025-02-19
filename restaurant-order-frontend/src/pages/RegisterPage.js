import { useState } from 'react';
import apiClient from '../api/apiClient';
import { TextField, Button, Container, Typography, Alert, Box, CircularProgress, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.post('/users/register', {
        name,
        email,
        password,
      });

      // Mostrar el modal con el spinner
      setOpenModal(true);

      // Redirigir después de 2 segundos al login
      setTimeout(() => {
        setOpenModal(false);
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Registro 📝
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
        </Button>
      </Box>

      {/* Modal Spinner */}
      <Modal
        open={openModal}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return; // Evita cerrar por hacer clic fuera
        }}
        disableEscapeKeyDown
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Registrando...
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
}

export default RegisterPage;
