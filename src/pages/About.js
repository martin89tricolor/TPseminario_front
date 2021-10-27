import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Card,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';  

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
          <Container maxWidth="lg">
            <Typography variant="h1" align="center" color="textPrimary" gutterBottom>
             DONAPP
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
            Mail para alta de comedor/ONG/fundacion 
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary" paragraph>
            contacto@donapp.com.ar
            </Typography>
         </Container>
        </div>
      </main>
  </Card>
    </Box>
  </>
 
);

export default About;
