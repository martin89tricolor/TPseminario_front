import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LatestProducts from 'src/components/home/LatestProducts';
import LatestEnlatados from 'src/components/home/LatestEnlatados';
import LatestEmbotellados from 'src/components/home/LatestEmbotellados';
import Banner from 'src/components/home/Banner'  


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
      <Container maxWidth="xl" >
        <Grid
          container
          spacing={1}
        >
         <Grid
            item
            lg={8}
            md={12}
            xl={2}
            xs={12}
          >
       <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 20
          }}
          >
            <Banner/>
        </Box>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={2.5}
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
            xl={2.5}
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
            xl={2.5}
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
          <Grid
            item
            lg={12}
            md={12}
            xl={2.5}
            xs={12}
          >
       <Box
          sx={{
            backgroundColor: 'background.default',
            py: 20
          }}
          >
            <Banner/>
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
