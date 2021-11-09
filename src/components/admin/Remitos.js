import { makeStyles } from '@material-ui/core/styles';
import { Download as DownloadIcon } from 'react-feather';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Button,
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
            <CardHeader
              subheader="Aquí puede descargar los remitos de sus donaciones entregadas"
              title="Remitos"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={1}
              >
            <Typography variant="h6" gutterBottom className={classes.title}>
            Remito 1: 
          </Typography>
          <Grid
                  item
                  md={1}
                  xs={12}
                >
           <a href="/pdf" target="_blank"> <button>Ir a PDF</button></a>
        </Grid>
        <Typography variant="h6" gutterBottom className={classes.title}>
            Remito 2: 
          </Typography>
          <Grid
                  item
                  md={1}
                  xs={12}
                >
          <Button
          color="primary"
          fullWidth
          variant="text"
          component="label"
          link ="https://docs.google.com/document/d/1F2uYX-BT-3SYDoKlEtDtaAWC9M7v-dx6/edit?usp=sharing&ouid=117602395964269392321&rtpof=true&sd=true"
        >
        
          <DownloadIcon/>
          <input
            type="file"
            hidden
          />
        </Button>
        </Grid>
        </Grid>
          
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
