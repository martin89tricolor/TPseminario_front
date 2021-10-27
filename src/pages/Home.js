import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LatestProducts from 'src/components/home/LatestProducts';
import LatestEnlatados from 'src/components/home/LatestEnlatados';
import LatestEmbotellados from 'src/components/home/LatestEmbotellados';


const Home = ({productsdb, ...props}) => (
  <>
    <Helmet>
      <title> DONAPP | Home</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <main>
        <div>
      <Container maxWidth="lg" >
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={8}
            md={12}
            xl={4}
            xs={12}
          >
       <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
          >
            <LatestProducts products={productsdb} />
        </Box>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={4}
            xs={12}
          >
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
          >
            <LatestEnlatados products={productsdb} />
         </Box>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={4}
            xs={12}
          >
         <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
          >
            <LatestEmbotellados products={productsdb} />
        </Box>
          </Grid>
        </Grid>
      </Container>
        </div>
      </main>
    </Box>
  </>
);

export default Home;
