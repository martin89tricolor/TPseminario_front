import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from '@material-ui/core';
import RemitoDesde from 'src/components/admin/RemitoDesde'
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Remitos = ({...props}) => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <form
          autoComplete="off"
        >
          <Card>
            <CardContent>
            <RemitoDesde> </RemitoDesde>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1
              }}
            >
            </Box>
            <Typography variant="h4" gutterBottom className={classes.title}>
           Serán enviados a su casilla de correo electrónico los remitos del periodo seleccionado dentro de las próximas 24 horas.
          </Typography>
          <Typography variant="h4" gutterBottom className={classes.title}>
            Gracias por realizar su donación.
          </Typography>
          <Button variant="contained" color="primary"  sx={{ mx: 1 }}
        component={RouterLink} to={'/admin/orders'}
        >
          Enviar Pedido
        </Button>
          
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
            </Box>
          </Card>
        </form>
      </Container>
    </Box>
  );
};

export default Remitos;
