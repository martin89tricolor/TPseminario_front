import { useState } from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import axios from 'axios';

const guestUser = {
  firstName: 'Visitante',
  lastName: 'Visitante',
  email: '',
  avatar: '',
  isAdmin: false,
  isGuest: true,
  address: {
    address1: '',
    province: '',
    city: '',
    zip: '',
    useAddress: false,
  },
  payment: {
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    address1: '',
    province: '',
    city: '',
    zip: '',
  },
}

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(guestUser);
  const [products, setProducts] = useState([]);
  const routing = useRoutes(routes({
    user: user,
    products: products,
    onSuccessfulLogin: onSuccessfulLogin,
    handleLogOut: handleLogOut,
    handleAccountDetailsSave: handleAccountDetailsSave,
    handleAddProduct: handleAddProduct,
    handleMinusProduct: handleMinusProduct,
    handleRemoveProduct: handleRemoveProduct,
    handleFinishedBuy: handleFinishedBuy,
  }));

  function onSuccessfulLogin(user, newToken) {
    setUser(user);
    axios.defaults.headers.common['x-access-token'] = newToken;
  }

  function handleLogOut() {
    setUser(guestUser);
    setProducts([]);
    navigate('/app/home');
    alert('Sesión cerrada');
  }

  function handleAccountDetailsSave(data) {
    axios.put('/users/', data)
    .then((res) => {
      setUser(...res.data.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddProduct(product, quantity = 1) {
    const addedProduct = products.find(p => product._id === p.product._id);
    if(addedProduct) {
      addedProduct.quantity += quantity;
    }
    else {
      products.push({
        product,
        quantity: quantity,
      });
    }
    // Hack medio feo de React para que se "entere" que un array mutó.
    setProducts(products.slice(0));
  }

  function handleMinusProduct(product) {
    const diminishedProduct = products.find(p => product._id === p.product._id);
    if(diminishedProduct) {
      diminishedProduct.quantity--;

      if(diminishedProduct.quantity === 0) {
        handleRemoveProduct(product);
        return;
      }
    }
    // Hack medio feo de React para que se "entere" que un array mutó.
    setProducts(products.slice(0));
  }

  function handleRemoveProduct(product) {
    const toBeDeletedProduct = products.find(p => product._id === p.product._id);
    if(toBeDeletedProduct) {
      // Hack medio feo de React para que se "entere" que un array mutó.
      setProducts(products.filter(p => p.product._id !== product._id));
    }
  }

  function handleFinishedBuy(buyOrder) {
    setProducts([]);
    navigate("/app/home");
    if(!user.isGuest) {
      // Actualizamos los datos de pago del usuario
      // si clickeó en "Guardar tarjeta" y al menos un campo es distinto del actual...
      if(buyOrder.payment.saveCard) {
        if(buyOrder.payment.cardName !== user.payment.cardName
            || buyOrder.payment.cardNumber !== user.payment.cardNumber
            || buyOrder.payment.expDate !== user.payment.expDate
            || buyOrder.payment.cvv !== user.payment.cvv
        ) {
          const updatedUser = {...user};
          updatedUser.payment = buyOrder.payment;
          axios.put('/users/detail/', updatedUser)
          .then((res) => {
            setUser(res.data.data);
            alert("Se actualizaron los datos de pago del usuario");
          })
          .catch((err) => {
            console.log(err);
          })
        }
      }
    }
    alert("Compra realizada 😊");
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
