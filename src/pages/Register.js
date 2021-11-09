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
              comertialName: '',
              address1: '',
              city: '',
              province: '',
              phone: '',
              password: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                comertialName: Yup.string().max(255).required('Ingrese nombre'),
                address1: Yup.string().max(255).required('Ingrese dirección'),
                city: Yup.string().max(255).required('Ingrese localidad'),
                province: Yup.string().max(255).required('Ingrese provincia'),
                phone: Yup.string().max(255).required('Ingrese telefono'),
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
                  error={Boolean(touched.comertialName && errors.comertialName)}
                  fullWidth
                  helperText={touched.comertialName && errors.comertialName}
                  label="Nombre del comercio"
                  margin="normal"
                  name="comertialName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.comertialName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.address1 && errors.address1)}
                  fullWidth
                  helperText={touched.address1 && errors.address1}
                  label="Dirección"
                  margin="normal"
                  name="address1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address1}
                  variant="outlined"
                />
                 <TextField
                  error={Boolean(touched.city && errors.city)}
                  fullWidth
                  helperText={touched.city && errors.city}
                  label="Localidad"
                  margin="normal"
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  variant="outlined"
                />
                  <TextField
                  error={Boolean(touched.province && errors.province)}
                  fullWidth
                  helperText={touched.province && errors.province}
                  label=" Provincia"
                  margin="normal"
                  name="province"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.province}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Teléfono"
                  margin="normal"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
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
