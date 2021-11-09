import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import {useState} from 'react';

const Login = (props) => {
  const [failedLogin, setFailedLogin] = useState(false);

  const handleLoginButtonClick = (values) => {
    setFailedLogin(false);
    axios.post('/users/login', {
      email: values.email,
      password: values.password,
    })
    .then((res) => {
      props.onSuccessfulLogin(res.data.loginUser.user, res.data.loginUser.token);
    })
    .catch((err) => {
      setFailedLogin(true);
      console.error(err);
    })
  }

  return (
    <>
      <Helmet>
        <title>DONAPP | Login</title>
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
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Ingrese un e-mail válido').max(255).required('Debe ingresar e-mail'),
              password: Yup.string().max(255).required('Debe ingresar contraseña')
            })}
            onSubmit={(values) => {
              handleLoginButtonClick(values);
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
                    align ="center"
                    variant="h2"
                  >
                    INGRESAR
                  </Typography>
                  </Box>
                <TextField
                  error={Boolean(touched.email && errors.email) || failedLogin}
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
                  error={Boolean(touched.password && errors.password) || failedLogin}
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
                <Box sx={{ py: 2 }}>
                  <Button
                    color={"primary"}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Ingresar
                  </Button>
                </Box>
                {failedLogin
                ? (<Typography
                    color="red"
                    variant="body1"
                  >
                    Parece que algo salió mal 😔. ¿El usuario y contraseña son correctos?
                  </Typography>)
                : null}

                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  ¿No tenés cuenta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Registrate
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

export default Login;
