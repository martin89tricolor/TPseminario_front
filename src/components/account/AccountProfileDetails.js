import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Container,
  Typography,
  TextField
} from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const AccountProfileDetails = ({onAccountDetailsSave, onUserChange, ...props}) => {

  const formik = useFormik({
    initialValues: {
      name: props.user.name,
      lastName: props.user.lastName,
      address1: props.user.address.address1,
      province: props.user.address.province,
      city: props.user.address.city,
      zip: props.user.address.zip,
      cardName: props.user.payment.cardName,
      cardNumber: props.user.payment.cardNumber,
      expDate: props.user.payment.expDate,
      cvv: props.user.payment.cvv,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(255).matches(/^[A-Za-z ]*$/, 'El nombre solo puede contener letras y espacios').required('Campo requerido'),
      lastName: Yup.string().max(255).matches(/^[A-Za-z ]*$/, 'El apellido solo puede contener letras y espacios').required('Campo requerido'),
      address1: Yup.string().max(255).required('Campo requerido'),
      province: Yup.string().max(255).required('Campo requerido'),
      city: Yup.string().max(255).required('Campo requerido'),
      zip: Yup.number().required('Campo requerido'),
      cardName: Yup.string().max(255).matches(/^[A-Za-z ]*$/, 'El nombre solo puede contener letras y espacios').required('Campo requerido'),
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
    }),
    onSubmit: (values) => {
      handleFormikSubmit(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  function handleFormikSubmit(values) {
    if (formik.isValid) {
      const newUser = {
        ...props.user,
        name: values.name,
        lastName: values.lastName,
        address: {
          address1: values.address1,
          province: values.province,
          city: values.city,
          zip: values.zip,
        },
      };
      onAccountDetailsSave(newUser);
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      autoComplete="off"
      noValidate
    >
       <Container maxWidth="lg">
            <Typography variant="h2" align="left" color="textPrimary" gutterBottom>
             Datos del Comercio
            </Typography>
          </Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 2
            }}
          ></Box>
        <Container maxWidth="lg">
            <Typography variant="h4" align="left" color="textPrimary" gutterBottom>
            Datos Personales
            </Typography>
      <Card>
        <CardHeader
          subheader="Puede modificar sus datos"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nombre del Comercio"
                name="name"
                onChange={formik.handleChange}
                required
                value={formik.values.name}
                variant="outlined"
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                onChange={formik.handleChange}
                required
                value={formik.values.telefono}
                variant="outlined"
                error={Boolean(formik.touched.telefono && formik.errors.telefono)}
                helperText={formik.touched.telefono && formik.errors.telefono}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                disabled
                label="E-mail"
                name="email"
                onChange={formik.handleChange}
                required
                value={props.user.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
     </Card>
     </Container>
     <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          ></Box>
     <Container maxWidth="lg">
            <Typography variant="h4" align="left" color="textPrimary" gutterBottom>
             Datos de Ubicación
            </Typography>
        <Card>
        <CardHeader
          subheader="Puede modificar sus datos de ubicación"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
	        <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Dirección"
                name="address1"
                onChange={formik.handleChange}
                required
                value={formik.values.address1}
                variant="outlined"
                error={Boolean(formik.touched.adddress1 && formik.errors.address1)}
                helperText={formik.touched.address1 && formik.errors.address1}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            <TextField
                fullWidth
                label="Localidad"
                name="city"
                onChange={formik.handleChange}
                required
                value={formik.values.city}
                variant="outlined"
                error={Boolean(formik.touched.city && formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            <TextField
                fullWidth
                label="Provincia"
                name="province"
                onChange={formik.handleChange}
                required
                value={formik.values.province}
                variant="outlined"
                error={Boolean(formik.touched.province && formik.errors.province)}
                helperText={formik.touched.province && formik.errors.province}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        </Card>
        </Container>
       
        <Container maxWidth="lg">
            
        <Card>
        <Divider />
        <Divider />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Guardar Cambios
          </Button>
        </Box>
        </Card>
      </Container>
    </form>
  );
};

export default AccountProfileDetails;
