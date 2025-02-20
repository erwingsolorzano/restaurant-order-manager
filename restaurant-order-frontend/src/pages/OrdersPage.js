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
  TablePagination,
} from '@mui/material';

function OrdersPage() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loadingActive, setLoadingActive] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);
  const [error, setError] = useState('');

  const [highlightedOrderId, setHighlightedOrderId] = useState(null);

  // Paginación pedidos finalizados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    fetchActiveOrders();
    fetchCompletedOrders(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchActiveOrders = async () => {
    setLoadingActive(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debes iniciar sesión para ver tus pedidos');
      setLoadingActive(false);
      return;
    }

    try {
      const response = await apiClient.get('/orders/active', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActiveOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los pedidos activos');
    } finally {
      setLoadingActive(false);
    }
  };

  const fetchCompletedOrders = async (page, limit) => {
    setLoadingCompleted(true);
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debes iniciar sesión para ver tus pedidos');
      setLoadingCompleted(false);
      return;
    }

    try {
      const response = await apiClient.get('/orders/completed', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit },
      });
      console.log('🚬 ===> fetchCompletedOrders ===> response:', response);
      setCompletedOrders(response.data.orders);
      setTotalCompleted(response.data.total);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los pedidos finalizados');
    } finally {
      setLoadingCompleted(false);
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

      setHighlightedOrderId(id);

      setTimeout(() => {
        setHighlightedOrderId(null);
      }, 500);

      fetchActiveOrders();
      fetchCompletedOrders(page, rowsPerPage);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar pedido');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tus Pedidos 🛒
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Pedidos Activos */}
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Pedidos Activos
      </Typography>

      {loadingActive && <CircularProgress />}
      {!loadingActive && activeOrders.length === 0 && (
        <Alert severity="info">No tienes pedidos activos.</Alert>
      )}

      {!loadingActive && activeOrders.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Platos</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeOrders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    backgroundColor:
                      highlightedOrderId === order.id ? 'rgba(76, 175, 80, 0.3)' : 'inherit',
                    transition: 'background-color 0.5s ease',
                  }}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.OrderItems.map((item) => (
                      <div key={item.id}>
                        {item.MenuItem ? item.MenuItem.name : 'Desconocido'} - {item.quantity} ud.
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pedidos Finalizados */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Pedidos Finalizados
      </Typography>

      {loadingCompleted && <CircularProgress />}
      {!loadingCompleted && completedOrders?.length === 0 && (
        <Alert severity="info">No tienes pedidos finalizados.</Alert>
      )}

      {!loadingCompleted && completedOrders?.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Platos</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {order.OrderItems.map((item) => (
                        <div key={item.id}>
                          {item.MenuItem ? item.MenuItem.name : 'Desconocido'} - {item.quantity} ud.
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalCompleted}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Container>
  );
}

export default OrdersPage;
