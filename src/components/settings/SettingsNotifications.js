import {
  Card,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core';

const SettingsNotifications = (props) => (
  <form {...props}>
    <Card>

      <Divider />
      <CardContent>
        <Grid
          container
          spacing={6}
          wrap="wrap"
        >
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <h2>DONAPP</h2>
            <p> nos dedicamos puramente a la venta de artículos de PC, buscamos continuamente nuevas formas de satisfacer las necesidades de nuestros clientes para garantizar bienes y servicios de calidad al precio más competitivo del mercado.</p>
            <p>Nos apoyamos en tres pilares fundamentales para lograrlo: el esfuerzo, la seriedad y el compromiso con nuestros clientes. </p>
            <p>Somos una empresa que cree en el país y en su gente, y constantemente trabajamos con el objetivo de incluir productos fabricados en el país y ampliar las categorías, ya que somos conscientes de que el modelo de comercialización y los hábitos de consumo continúan transformándose en función de las necesidades de los clientes. </p>
            <p> Nuestra relación con el entorno no se limita a un determinado tipo de público, sino que trabajamos con clientes corporativos, resellers/gremio y consumidores finales en pos de lograr una sinergia y forjar vínculos estrechos para conocerlos a la perfección y entender las necesidades que cada uno tiene.</p>
            <p>Nuestra meta en un futuro cercano está basada en ampliar mucho más las categorías de productos, abarcando todo tipo de electrodomésticos.</p>
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <h2>Misión</h2>
            <p>Nuestro objetivo es brindar la mejor experiencia de compra. Por eso nos enfocamos de lleno en lograr la satisfacción total de nuestro cliente en cada instancia, acompañándolo, aportando dedicación, profesionalismo y soluciones concretas. Ofrecemos productos de calidad al mejor precio con el objetivo de mejorar la vida diaria de las personas estableciendo un estrecho vínculo de confianza ante una necesidad puntual. </p>
            <h3>Valores</h3>
            <p>- Liderazgo: Nos vemos como líderes en nuestra industria y aspiramos a ser los mejores. Por eso invertimos en talento de nivel para hacer crecer a nuestros líderes del futuro y mantener vigente nuestro éxito.     </p>
            <p>- Visión realista: Nuestra concepción es más contextual que dogmática respecto del negocio, lo cual implica que las decisiones son pragmáticas y basadas en hechos. </p>
            <p>- Innovación: Nos esforzamos para mantener nuestra posición avanzada en tecnologías nuevas y dinámicas. En pos de destacarnos, somos ágiles en la adaptación y flexibles en la manera de conseguir nuevos retos. </p>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  </form>
);

export default SettingsNotifications;
