import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  ImageListItem,
  ImageList,
  Card,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AboutPhoto from 'src/components/about/AboutPhoto'  
import AboutPhoto2 from 'src/components/about/AboutPhoto2' 

const About = () => (
  <>
    <Helmet>
      <title> DONAPP | Nosotros</title>
    </Helmet>
    <Box
      sx={{
      
        minHeight: '100%',
        py: 3
      }}
    >
    <Card>
      <main>
        <div>
          <Container maxWidth="lg" >
          <Grid
            item
            xl={6}
          >     
    <ImageList xs={{ width: 620, height: 100 }} >
      {itemData.map((item) => (
        <ImageListItem key={item.img} >
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
          />
        </ImageListItem>
      ))}
    </ImageList>
    </Grid>
    <Grid
          container
          spacing={5}
        >
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
             <Typography variant="h2" align="left" color="textPrimary" gutterBottom>
             ¿Quienes somos?
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary" paragraph>
            Somos una plataforma que realizamos, facilitamos y mejoramos la comunicación entre donadores de alimentos y comedores/ONG/fundaciones que necesiten ayuda.
            </Typography>
            <Typography variant="h2" align="left" color="textPrimary" gutterBottom>
             Misión
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary" paragraph>
            Nuestro objetivo es facilitar y mejorar la comunicación entre donadores de alimentos y comedores/ONG/fundaciones, para permitir así, disminuir el desperdicio de alimentos en el país y ayudar a las personas que lamentablemente padecen hambre.
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary" paragraph>
            Le ofrecemos a comerciantes de grandes, medianos y pequeños comercios y/o supermercados la posibilidad de publicar aquellos productos próximos a vencerse que no hayan sido vendidos hasta el momento, para que, a través de la entrega o retiro de los mismos, puedan ayudar a personas que realmente lo necesiten, y puedan obtener también alguna reducción de sus impuestos. 
            </Typography>
            </Grid>
            <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <Typography variant="h2" align="left" color="textPrimary" gutterBottom>
            Visión
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary" paragraph>
            Vemos a toda la Argentina como un país que necesita de la solidaridad y el apoyo de todos sus habitantes, para ayudar a la gente que se encuentra en situación de calle, pobreza o desnutrición y para combatir la desigualdad social.
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary" paragraph>
            Además, vemos como aquellos alimentos que se desperdician generan una gran cantidad de residuos.
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary" paragraph>
            Esto se traduce en un compromiso por abordar el problema de las ingentes pérdidas de alimentos en el mundo, como clave para reducir el hambre, la pobreza, el impacto ambiental y los efectos del cambio climático.
            </Typography>
            <Typography variant="h2" align="left" color="textPrimary" gutterBottom>
            Comedor/ONG/fundacion 
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary" paragraph>
            Si formas parte de una organización social que brinda asistencia alimentaria, podes contactarte con nosotros a través del mail:  
            </Typography>
            <Typography variant="h4" align="left" color="#2619cf" paragraph>
            contacto@donapp.com.
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary" paragraph>
            Podemos habilitarte una cuenta para que tengas acceso a este sitio web y puedas obtener donaciones de parte de distintos comercios. ¿Qué esperas para sumarte a DONNAP?
            </Typography>
            </Grid>
            <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <AboutPhoto></AboutPhoto>
            </Grid>
            <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <AboutPhoto2></AboutPhoto2>
            </Grid>
            </Grid>
         </Container>
        </div>
      </main>
  </Card>
    </Box>
  </>
 
);

const itemData = [
{
  img: 'https://res.cloudinary.com/dntepcqvn/image/upload/v1636932657/Logo_kok0fv.png',
  title: 'Logo',
},
];
export default About;
