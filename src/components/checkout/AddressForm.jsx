import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ScrollToTop from 'src/ScrollToTop';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getIfExists } from 'src/utils/utils';

export default function AddressForm({values, onStepBack, onFinishedStep, ...props}) {

  const formik = useFormik({
    initialValues: {
      user: {
        firstName: values.user.firstName,
        lastName: values.user.lastName,
        email: values.user.email,
      },
      address: {
        address1: values.address.address1,
        province: values.address.province,
        city: values.address.city,
        zip: values.address.zip,
        useAddress: true,
      }
    },
    validationSchema: Yup.object().shape({
      user: Yup.object().shape({
        firstName: Yup.string().max(255).matches(/^[A-Za-z ]*$/, 'Nombre no válido').required('Campo requerido'),
        lastName: Yup.string().max(255).matches(/^[A-Za-z ]*$/, 'Nombre no válido').required('Campo requerido'),
        email: Yup.string().email('Ingrese un e-mail válido').max(255).required('Campo requerido'),
      }),
      address: Yup.object().shape({
        address1: Yup.string().max(255).required('Campo requerido'),
        province: Yup.string().max(255).required('Campo requerido'),
        city: Yup.string().max(255).required('Campo requerido'),
        zip: Yup.number().required('Campo requerido'),
        useAddress: Yup.boolean(),
      })
    }),
    onSubmit: (values) => {
      handleFormikSubmit(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  function handleFormikSubmit(values) {
    if (formik.isValid) {
      onFinishedStep(values);
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom>
        Su reserva a sido confirmada.
      </Typography>
      <Typography variant="h4" gutterBottom>
       Fecha límite para retirar el/los productos por el comercio:
      </Typography>
      <Typography variant="h4" gutterBottom>
        
      </Typography>
      <Typography variant="h4" gutterBottom>
      Datos de contacto:
      </Typography>
      <ScrollToTop />
      <Typography variant="h6" gutterBottom>
        Dirección de envío
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="user.firstName"
              name="user.firstName"
              label="Nombre"
              fullWidth
              autoComplete="given-name"
              value={formik.values.user.firstName}
              onChange={formik.handleChange}
              error={Boolean(getIfExists(formik.touched, 'user', 'firstName', false) && getIfExists(formik.errors, 'user', 'firstName', false))}
              helperText={getIfExists(formik.touched, 'user', 'firstName', '') && getIfExists(formik.errors, 'user', 'firstName', '')}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="user.lastName"
              name="user.lastName"
              label="Apellido"
              fullWidth
              autoComplete="family-name"
              value={formik.values.user.lastName}
              onChange={formik.handleChange}
              error={Boolean(getIfExists(formik.touched, 'user', 'lastName', false) && getIfExists(formik.errors, 'user', 'lastName', false))}
              helperText={getIfExists(formik.touched, 'user', 'lastName', '') && getIfExists(formik.errors, 'user', 'lastName', '')}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address.address1"
              name="address.address1"
              label="Dirección de envío"
              fullWidth
              autoComplete="shipping address-line1"
              value={formik.values.address.address1}
              onChange={formik.handleChange}
              error={Boolean(getIfExists(formik.touched, 'address', 'address1', false) && getIfExists(formik.errors, 'address', 'address1', false))}
              helperText={getIfExists(formik.touched, 'address', 'address1', '') && getIfExists(formik.errors, 'address', 'address1', '')}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="user.email"
              name="user.email"
              label="E-mail"
              fullWidth
              autoComplete="email"
              value={formik.values.user.email}
              onChange={formik.handleChange}
              error={Boolean(getIfExists(formik.touched, 'user', 'email', false) && getIfExists(formik.errors, 'user', 'email', false))}
              helperText={getIfExists(formik.touched, 'user', 'email', '') && getIfExists(formik.errors, 'user', 'email', '')}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="address.province"
              name="address.province"
              label="Provincia"
              fullWidth
              value={formik.values.address.province}
              onChange={formik.handleChange}
              error={Boolean(getIfExists(formik.touched, 'address', 'province', false) && getIfExists(formik.errors, 'address', 'province', false))}
              helperText={getIfExists(formik.touched, 'address', 'province', '') && getIfExists(formik.errors, 'address', 'province', '')}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="address.city"
              name="address.city"
              label="Ciudad"
              fullWidth
              autoComplete="shipping address-level2"
              value={formik.values.address.city}
              onChange={formik.handleChange}
              error={Boolean(getIfExists(formik.touched, 'address', 'city', false) && getIfExists(formik.errors, 'address', 'city', false))}
              helperText={getIfExists(formik.touched, 'address', 'city', '') && getIfExists(formik.errors, 'address', 'city', '')}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              id="address.zip"
              name="address.zip"
              label="Código postal"
              fullWidth
              autoComplete="shipping postal-code"
              value={formik.values.address.zip}
              onChange={formik.handleChange}
              error={Boolean(getIfExists(formik.touched, 'address', 'zip', false) && getIfExists(formik.errors, 'address', 'zip', false))}
              helperText={getIfExists(formik.touched, 'address', 'zip', '') && getIfExists(formik.errors, 'address', 'zip', '')}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="address.useAddress" value="yes" />}
              label="Usar dirección en método de pago"
              checked={formik.values.address.useAddress}
              onChange={formik.handleChange}
              error={Boolean(getIfExists(formik.touched, 'address', 'useAddress', false) && getIfExists(formik.errors, 'address', 'useAddress', false))}
              helperText={getIfExists(formik.touched, 'address', 'useAddress', '') && getIfExists(formik.errors, 'address', 'useAddress', '')}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Siguiente
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
