import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Snackbar,
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
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

function OrdersRow (props){
  const { order, selected, checked, OnSelectOne } = props;
  const [open, setOpen] = useState(false);
  function handleSelect(e, id){
    OnSelectOne (e, id)
  }
  return (
     <>
    <TableRow
      hover
      key={order._id}
      selected={selected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={checked}
          onChange={(event) => handleSelect(event, order._id)}
          value="true"
        />
      </TableCell>
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
        {`${order.buyOrder.user.firstName} ${order.buyOrder.user.lastName}`}
      </TableCell>
      <TableCell>
        {order.buyOrder.user.email}
      </TableCell>
      <TableCell>
        {order.cantidad}
      </TableCell>
      <TableCell>
        {order.fechacompra}
      </TableCell>
      <TableCell>
        {order.fechaentrega}
      </TableCell>
      <TableCell>
        <Chip label={order.estado} color={order.estado === 'Enviado' ? 'primary' : 'default'} />
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
                Detalle del Pedido
              </Typography>
              <Chip
                icon={<LocalShippingIcon />}
                label={`${order.buyOrder.address.address1}, CP ${order.buyOrder.address.zip}, ${order.buyOrder.address.city}, ${order.buyOrder.address.province}.`}
              />
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Producto</TableCell>
                    <TableCell align="left">Marca</TableCell>
                    <TableCell align="left">Modelo</TableCell>
                    <TableCell align="left">Cantidad</TableCell>
                    <TableCell align="left">Total</TableCell>
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
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [limit] = useState(10);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  useEffect(() => {
    refreshPage(page);
  }, [page]);

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedOrders.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedOrders, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedOrders.slice(1));
    } else if (selectedIndex === selectedOrders.length - 1) {
      newSelected = newSelected.concat(selectedOrders.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedOrders.slice(0, selectedIndex),
        selectedOrders.slice(selectedIndex + 1)
      );
    }

    setSelectedOrders(newSelected);
  };

  function handlePageChange(value) {
    setPage(value);
  }

  const handleSelectAll = (event) => {
    let newSelected;

    if (event.target.checked) {
      newSelected = orders.map((producto) => producto._id);
    } else {
      newSelected = [];
    }

    setSelectedOrders(newSelected);
  };

  function handleClose() {
    setOpen(false);
  }

  function refreshPage(newPage) {
    axios.get('/orders/', {params: {page: newPage+1}})
    .then((res) => {
      setOrders(res.data.data.docs);
      setCount(res.data.data.total);
    });
  }

  function handleEnviados() {
    axios.post('/orders/update-status', {ids: selectedOrders, estado: 'Enviado'})
    .then((res) => {
      refreshPage(page);
      setSelectedOrders([]);
      setServerMessage(res.data.message);
      setOpen(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handlePendientes() {
    axios.post('/orders/update-status', {ids: selectedOrders, estado: 'Pendiente'})
    .then((res) => {
      refreshPage(page);
      setSelectedOrders([]);
      setServerMessage(res.data.message);
      setOpen(true);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 3,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleEnviados} sx={{ mx: 1 }}>
          Marcar como retiradas
        </Button>
      </Box>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedOrders.length === orders.length}
                      color="primary"
                      indeterminate={
                        selectedOrders.length > 0
                        && selectedOrders.length < orders.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                    ID del Pedido
                  </TableCell>
                  <TableCell>
                    Nombre y Apellido
                  </TableCell>
                  <TableCell>
                    E-mail
                  </TableCell>
                  <TableCell>
                    Productos
                  </TableCell>
                  <TableCell>
                    Fecha de Compra
                  </TableCell>
                  <TableCell>
                    Fecha de Entrega
                  </TableCell>
                  <TableCell>
                    Estado
                  </TableCell>
                  <TableCell>
                    Total a Pagar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.slice(0, limit).map((order) => (
                  <OrdersRow
                    key={order._id}
                    order={order}
                    selected={selectedOrders.indexOf(order._id) !== -1}
                    checked={selectedOrders.indexOf(order._id) !== -1}
                    OnSelectOne={(event, id) => handleSelectOne(event, id)}
                  />
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
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant="filled" onClose={handleClose} severity="success">
            {serverMessage}
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
};

export default AdminOrders;
