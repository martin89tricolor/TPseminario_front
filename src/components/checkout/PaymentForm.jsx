import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ScrollToTop from 'src/ScrollToTop';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';

export default function PaymentForm({values, onStepBack, onFinishedStep, ...props}) {

  const formik = useFormik({
    initialValues: {
      address1: values.address.address1,
      state: values.address.province,
      city: values.address.city,
      zip: values.address.zip,
      cardName: values.payment.cardName,
      cardNumber: values.payment.cardNumber,
      expDate: values.payment.expDate,
      cvv: values.payment.cvv,
      saveCard: values.payment.saveCard,
    },
    validationSchema: Yup.object().shape({
      address1: Yup.string().max(255).required('Campo requerido'),
      state: Yup.string().max(255).required('Campo requerido'),
      city: Yup.string().max(255).required('Campo requerido'),
      zip: Yup.number().required('Campo requerido'),
      cardName: Yup.string().max(255).matches(/^[A-Za-z ]*$/, 'Nombre no válido').required('Campo requerido'),
      // https://stackoverflow.com/questions/50758729/using-yup-to-validate-credit-card-details
      expDate: Yup.string().typeError('Fecha no válida').max(19)
        .matches(/[0-9]{2}\/[0-9]{2}/, 'Formato de fecha no válida')
        .required('Campo requerido')
        .test(
          'test-credit-card-expiration-date',
          'La fecha está en el pasado',
          expirationDate => {
            if (!expirationDate) {
              return false
            }

            const today = new Date();
            const monthToday = today.getMonth() + 1;
            const yearToday = today
              .getFullYear()
              .toString()
              .substr(-2)

            const [expMonth, expYear] = expirationDate.split('/')

            if (Number(expYear) < Number(yearToday)) {
              return false
            } else if (
              Number(expMonth) < monthToday &&
              Number(expYear) <= Number(yearToday)
            ) {
              return false
            }

            return true
          }
        )
        .test(
          'test-credit-card-expiration-date',
          'Mes no válido',
          expirationDate => {
            if (!expirationDate) {
              return false
            }

            const [expMonth] = expirationDate.split('/')

            if (Number(expMonth) > 12) {
              return false
            }

            return true
          }
        ),
      cvv: Yup.string().min(3).max(4).required('Campo requerido'),
      saveCard: Yup.boolean().notRequired(),
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
      <ScrollToTop />
      <form onSubmit={formik.handleSubmit}>
        {values.address.useAddress ? null :
        // Si no usa la dirección como dirección de facturación, mostramos esto
        <>
          <Typography variant="h6" gutterBottom>
            Dirección de facturación
          </Typography>
          <Grid container spacing={3} mb={2}>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Dirección de envío"
                fullWidth
                autoComplete="shipping address-line1"
                value={formik.values.address1}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.adddress1 && formik.errors.address1)}
                helperText={formik.touched.address1 && formik.errors.address1}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="state"
                name="state"
                label="Provincia"
                fullWidth
                value={formik.values.state}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.state && formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="city"
                name="city"
                label="Ciudad"
                fullWidth
                autoComplete="shipping address-level2"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.city && formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Código postal"
                fullWidth
                autoComplete="shipping postal-code"
                value={formik.values.zip}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.zip && formik.errors.zip)}
                helperText={formik.touched.zip && formik.errors.zip}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
        </>}
        <Typography variant="h6" gutterBottom>
          Método de pago
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              name="cardName"
              label="Nombre en la tarjeta"
              fullWidth
              autoComplete="cc-name"
              value={formik.values.cardName}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.cardName && formik.errors.cardName)}
              helperText={formik.touched.cardName && formik.errors.cardName}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              label="Número de tarjeta"
              fullWidth
              autoComplete="cc-number"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.cardNumber && formik.errors.cardNumber)}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              name="expDate"
              label="Fecha de vencimiento"
              fullWidth
              autoComplete="cc-exp"
              value={formik.values.expDate}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.expDate && formik.errors.expDate)}
              helperText={formik.touched.expDate && formik.errors.expDate}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              name="cvv"
              label="CVV"
              fullWidth
              autoComplete="cc-csc"
              value={formik.values.cvv}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.cvv && formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" checked={formik.saveCard} />}
              label="Usar estos datos como medio de pago predeterminado"
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button onClick={onStepBack}>
              Volver
            </Button>
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
