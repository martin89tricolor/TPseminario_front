import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function OrdersRow (props){
  const { order } = props;
  const [open, setOpen] = useState(false);

  return (
     <>
     <Helmet>
       <title>DONAPP | Mis Donaciones</title>
    </Helmet>
    <TableRow hover>
      <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      <TableCell>
        {order._id}
      </TableCell>
      <TableCell>
        {order.cantidad}
      </TableCell>
      <TableCell>
        {order.fechadonacion}
      </TableCell>
      <TableCell>
        {order.fechaentrega}
      </TableCell>
      <TableCell>
        <Chip label={order.estado} color={order.estado === 'Entregada' ? 'primary' : 'default'} />
      </TableCell>
      <TableCell>
        ${order.total}
      </TableCell>
    </TableRow>
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalle de la donación
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Producto</TableCell>
                    <TableCell align="left">Marca</TableCell>
                    <TableCell align="left">Modelo</TableCell>
                    <TableCell align="left">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.buyOrder.products.map((producto) => (
                    <TableRow key={producto._id}>
                      <TableCell component="th" scope="row">
                        {producto.product.nombre}
                      </TableCell>
                      <TableCell>{producto.product.marca}</TableCell>
                      <TableCell align="left">{producto.product.modelo}</TableCell>
                      <TableCell align="left">{producto.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
    )
}

const AdminOrders= ({ ...rest }) => {
  const [limit] = useState(10);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [waitingServer, setWaitingServer] = useState(true);

  useEffect(() => {
    refreshPage(page);
  }, [page]);

  function handlePageChange(value) {
    setPage(value);
  }

  function refreshPage(newPage) {
    axios.get('/users/orders/', {params: {page: newPage+1}})
    .then((res) => {
      setOrders(res.data.data.docs);
      setCount(res.data.data.total);
    })
    .finally(() => {
      setWaitingServer(false);
    });
  }

  if(waitingServer) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center'}}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
      <Container maxWidth="lg">
        <Card>
          <CardHeader
            title="Mis donaciones recibidas"
            subheader="Acá podés ver todas las donaciones que recibistes"
          />
        </Card>
      </Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 3,
        }}
      >
      </Box>
      {orders.length === 0 ?
      // Si no hay elementos, mostramos un mensaje amigable
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <Alert severity="info">Todavía no recibistes ninguna donación. <RouterLink to="/app/products">¿Qué estás esperando? 😁</RouterLink></Alert>
          </CardContent>
        </Card>
      </Container>
      :
      // Si hay elementos...
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                    ID de la Compra
                  </TableCell>
                  <TableCell>
                    Cantidad de Productos
                  </TableCell>
                  <TableCell>
                    Fecha de Compra
                  </TableCell>
                  <TableCell>
                    Fecha de Entrega
                  </TableCell>
                  <TableCell>
                    Estado del Envío
                  </TableCell>
                  <TableCell>
                    Pagado
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.slice(0, limit).map((order) => (
                  <OrdersRow key={order._id} order={order}/>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          onPageChange={handlePageChange}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
          page={page}
          count={count}
        />
      </Card>
      }
      </Box>
    </>
  );
};

export default AdminOrders;
