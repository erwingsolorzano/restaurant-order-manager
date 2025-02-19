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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [highlightedOrderId, setHighlightedOrderId] = useState(null);

  // Paginación para pedidos finalizados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  
      setHighlightedOrderId(id); // Resaltamos temporalmente la orden
  
      setTimeout(() => {
        setHighlightedOrderId(null);
      }, 500);
  
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar pedido');
    }
  };
  

  // Dividimos pedidos activos y finalizados
  const activeOrders = orders.filter(
    (order) => order.status !== 'delivered' && order.status !== 'cancelled'
  );
  const completedOrders = orders.filter(
    (order) => order.status === 'delivered' || order.status === 'cancelled'
  );

  // Manejadores de paginación
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

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          {/* Tabla de Pedidos Activos */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Pedidos Activos
          </Typography>
          {activeOrders.length === 0 && (
            <Alert severity="info">No tienes pedidos activos.</Alert>
          )}

          {activeOrders.length > 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Platos</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      sx={{
                        backgroundColor: highlightedOrderId === order.id ? 'rgba(76, 175, 80, 0.3)' : 'inherit',
                        transition: 'background-color 0.5s ease',
                      }}
                    >                      <TableCell>{order.id}</TableCell>
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

          {/* Tabla de Pedidos Finalizados */}
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            Pedidos Finalizados
          </Typography>

          {completedOrders.length === 0 && (
            <Alert severity="info">No tienes pedidos finalizados.</Alert>
          )}

          {completedOrders.length > 0 && (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Platos</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {completedOrders
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((order) => (
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
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Paginación */}
              <TablePagination
                component="div"
                count={completedOrders.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default OrdersPage;
