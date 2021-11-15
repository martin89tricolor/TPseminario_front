import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from '@material-ui/core';

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
   
            <Typography variant="h4" gutterBottom className={classes.title}>
            El remito solicitado será enviado a su casilla de correo electrónico dentro de las próximas 24 horas.
          </Typography>
          
          <Typography variant="h4" gutterBottom className={classes.title}>
            Gracias por realizar su donación.
          </Typography>
          
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
