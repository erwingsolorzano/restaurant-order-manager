import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debes iniciar sesión para ver tus pedidos');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.get('/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debes iniciar sesión');
      return;
    }

    try {
      await apiClient.put(
        `/orders/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Pedido ${id} actualizado a ${newStatus}`);
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar pedido');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tus Pedidos 🛒
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && orders.length === 0 && (
        <Alert severity="info">No tienes pedidos aún.</Alert>
      )}

      {!loading && orders.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Plato(s)</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
                <TableCell>Total ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.OrderItems.map((item) => (
                      <div key={item.id}>
                        {item.MenuItem ? item.MenuItem.name : 'Desconocido'} - ${item.MenuItem.price}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {order.OrderItems.map((item) => (
                      <div key={item.id}>{item.quantity}</div>
                    ))}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <>
                        {order.status === 'created' && (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                          >
                            Preparando
                          </Button>
                        )}
                        {order.status === 'preparing' && (
                          <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                          >
                            Entregado
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        >
                          Cancelar
                        </Button>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.OrderItems.reduce((acc, item) => {
                      const price = item.MenuItem?.price ?? 0;
                      return acc + item.quantity * parseFloat(price);
                    }, 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default OrdersPage;
