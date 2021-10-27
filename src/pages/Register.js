import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';

const Register = (props) => {
  const navigate = useNavigate();

  function handleSignUpButtonClick (values) {
    axios.post('/users/registration', values)
    .then(() => {
      alert("Usuario nuevo creado");
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <Helmet>
        <title>DONAPP | Registro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              name: '',
              direccion: '',
              localidad: '',
              provincia: '',
              telefono: '',
              password: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                name: Yup.string().max(255).required('Ingrese nombre'),
                direccion: Yup.string().max(255).required('Ingrese dirección'),
                localidad: Yup.string().max(255).required('Ingrese localidad'),
                provincia: Yup.string().max(255).required('Ingrese provincia'),
                telefono: Yup.string().max(255).required('Ingrese telefono'),
                email: Yup.string().email('Ingresar un e-mail válido').max(255).required('Ingrese e-mail'),
                password: Yup.string().max(255).required('Ingrese contraseña'),
                policy: Yup.boolean().oneOf([true], 'Aceptar Terminos')
              })
            }
            onSubmit={(values) => {
              handleSignUpButtonClick(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Crear nueva cuenta
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Ingrese los datos para crear la cuenta
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Nombre del comercio"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.direccion && errors.direccion)}
                  fullWidth
                  helperText={touched.direccion && errors.direccion}
                  label="Dirección"
                  margin="normal"
                  name="direccion"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.direccion}
                  variant="outlined"
                />
                 <TextField
                  error={Boolean(touched.localidad && errors.localidad)}
                  fullWidth
                  helperText={touched.localidad && errors.localidad}
                  label="Localidad"
                  margin="normal"
                  name="localidad"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.localidad}
                  variant="outlined"
                />
                  <TextField
                  error={Boolean(touched.provincia && errors.provincia)}
                  fullWidth
                  helperText={touched.provincia && errors.provincia}
                  label=" Provincia"
                  margin="normal"
                  name="provincia"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.provincia}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.telefono && errors.telefono)}
                  fullWidth
                  helperText={touched.telefono && errors.telefono}
                  label="Teléfono"
                  margin="normal"
                  name="telefono"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="telefono"
                  value={values.telefono}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="E-mail"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Contraseña"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    He leido los
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terminos y Condiciones
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Registrarse
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Tiene una cuenta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Loguearse
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
