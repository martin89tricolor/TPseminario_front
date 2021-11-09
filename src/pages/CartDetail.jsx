import { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Hidden,
  List,
  Slide,
  Snackbar,
  Typography,
} from '@material-ui/core';
import CartDetailItem from './CartDetailItem';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link as RouterLink } from 'react-router-dom';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const CartDetail = (props) => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if(!props.user.isGuest) {
      return () => {};
    }
    const timer = setTimeout(() => {
      setSnackbarOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [props.user.isGuest]);

  function handleClose() {
    setSnackbarOpen(false);
  }

  function handleAddUnit(item) {
    props.onAddProduct(item.product);
  }

  function handleMinusUnit(item) {
    props.onMinusProduct(item.product);
  }

  function handleRemoveProduct(item) {
    props.onRemoveProduct(item.product);
  }

  return (
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
            title="Detalle de reserva"
            subheader="Acá podés ver todos los productos que elegiste 😁"
          />
          {props.products.length === 0 ?
            // Si no hay productos...
            <CardContent>
              <Alert severity="info">Todavía no seleccionaste ningún producto. <RouterLink to="/app/products">¿Qué estás esperando? 😁</RouterLink></Alert>
            </CardContent> :
            // Si hay productos...
            <>
            <CardContent>
              <Hidden lgUp>
                <Typography variant="subtitle2">
                  Para modificar las cantidades, presioná la imagen del producto que quieras editar.
                </Typography>
              </Hidden>
              <List>
                {props.products.map(p => (
                  <CartDetailItem
                    key={p.product._id}
                    item={p}
                    onAddUnit={handleAddUnit}
                    onMinusUnit={handleMinusUnit}
                    onRemoveProduct={handleRemoveProduct}
                  />
                ))}
              </List>
              <Typography variant="h3" align="right">
                Total de productos: {props.products.map(p => p.quantity).reduce((a,b) => (a+b), 0)}
              </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'right'}}>
              <Button
                variant="contained"
                endIcon={<ChevronRightIcon />}
                component={RouterLink}
                to='/app/checkout'
              >
                Confirmar reserva
              </Button>
            </CardActions>
            </>
          }
        </Card>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert variant="filled" onClose={handleClose} severity="info">
          No estás logeado. <RouterLink to="/login">¿Tenés una cuenta? Ingresá</RouterLink>. Hacer las compras es más fácil si estás registrado 👌.
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default CartDetail;
