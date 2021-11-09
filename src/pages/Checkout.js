import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Alert from '@material-ui/core/Alert';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Review from 'src/components/checkout/Review';
import {useEffect} from 'react';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  addressStepButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  finalStepsButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout({onFinishedBuy, user, products, ...props}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    user: {
      name: user.name,
      email: user.email,
    },
    address: {
      ...user.address,
      useAddress: true,
    },
    payment: {
      ...user.payment,
      saveCard: true,
    },
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [huboError, setHuboError] = React.useState(false);
  const [mensajeError, setMensajeError] = React.useState([]);

  useEffect(() => {
    if(!user._id) {
      return;
    }
    axios.get('/users/detail/')
    .then((res) => {
      setValues({
        user: {
          comertialName: res.data.data.comertialName,
          email: res.data.data.email,
        },
        address: {
          useAddress: true,
          ...res.data.data.address,
        },
      });
    });
  }, [user._id]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function handleFinalizarCompraClick() {
    setHuboError(false);
    setMensajeError([]);
    // Si seleccionó "Usar dirección para facturación"
    const finishedBuyOrder = {
      ...values,
      products,
    }
    if(values.address.saveAddress) {
      finishedBuyOrder.payment.address1 = finishedBuyOrder.address.address1;
      finishedBuyOrder.payment.state = finishedBuyOrder.address.state;
      finishedBuyOrder.payment.city = finishedBuyOrder.address.city;
      finishedBuyOrder.payment.phone = finishedBuyOrder.address.phone;
    }
    axios.post('/orders', finishedBuyOrder)
    .then(() => {
      onFinishedBuy(finishedBuyOrder);
    })
    .catch((err) => {
      setHuboError(true);
      setMensajeError(err.response.data.message);
    });
  }


  function getStepContent() {
    switch (activeStep) {
      case 0:
        return <Review onBuy={handleFinalizarCompraClick} onStepBack={handleBack} values={values} products={products} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Container maxWidth="md" style={{paddingLeft: '0px', paddingRight: '0px'}}>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h3" variant="h2" align="center">
            Resumen de reserva
          </Typography>
                 {getStepContent(activeStep, values, products)}
            {huboError ?
              <Alert severity="error">
                {mensajeError.map((error, i) => <p key={i}>{error}</p>)}
              </Alert> : null
            }
        </Paper>
      </main>
    </Container>
  );
}
