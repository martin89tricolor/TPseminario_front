import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  Home as HomeIcon,
  ShoppingBag as ShoppingBagIcon,
  AlertCircle as AboutIcon,
  Edit3 as EditIcon,
  List as ListIcon,
} from 'react-feather';
import {
  Menu,
  MenuItem
} from '@material-ui/core';

const items = [
  {
    href: '/app/home',
    icon: HomeIcon,
    title: 'Home',
    requiresAdmin: false,
    requiresLogin: false,
  },

  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Publicaciones',
    requiresAdmin: false,
    requiresLogin: false,
  },
  {
    href: '/app/about',
    icon: AboutIcon,
    title: 'Nosotros',
    requiresAdmin: false,
    requiresLogin: false,
  },
  {
    href: '/admin/ABM',
    icon: EditIcon,
    title: 'Listado de Productos',
    requiresAdmin: true,
    requiresLogin: true,
  },
  {
    href: '/admin/orders',
    icon: ListIcon,
    title: 'Donaciones',
    requiresAdmin: true,
    requiresLogin: true,
  },
];

function visibleFor(link, user) {
  if(user.isGuest) {
    return !link.requiresLogin;
  }
  else {
    if(!user.isAdmin) {
      return !link.requiresAdmin;
    }
    else {
      return link.requiresAdmin;
    }
  }
}

const menuItems = [
  {to: '/app/account', nombre: 'Mi cuenta'},
  {to: '/app/misDonaciones', nombre: 'Mis Donaciones'},
];

const DashboardNavbar = ({ products, user, onMobileNavOpen, onLogOut, ...rest }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleLogOutClick() {
    handleClose();
    onLogOut();
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };


  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
       
       
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          {items.filter((item) => visibleFor(item, user)).map((item, i) => (
            <Button
              key={item.title}
              color="inherit"
              component={RouterLink}
              to={item.href}
            >
              {item.title}
            </Button>
          ))}
          {user.isGuest ?
            // Si es visitante, muestra el botón de Ingresar
            <Button
              color='inherit'
              to={'/login'}
              component={RouterLink}
              key={'Log in'}
              title={'Log in'}
            >
              Ingresar
            </Button> :
            // Si no, el popup con datos de la cuenta y logout
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {!user.isAdmin ?
                  menuItems.map((item, i) => (
                    <MenuItem key={`mt-${i}`} component={RouterLink} to={item.to} onClick={handleClose}>
                      {item.nombre}
                    </MenuItem>
                  ))
                  : null
                }
                <MenuItem onClick={handleLogOutClick}>Salir</MenuItem>
              </Menu>
            </div>
          }
          {!user.isAdmin ?
          <IconButton color="inherit" component={RouterLink} to="/app/cart-detail">
            <Badge
              badgeContent={products.map(p => p.quantity).reduce((a,b) => (a+b), 0)}
              color="secondary"
            >
              <ShoppingCart />
            </Badge>
          </IconButton> : null
          }
        </Hidden>
        <Hidden lgUp>
          {!user.isAdmin ?
            <IconButton color="inherit" component={RouterLink} to="/app/cart-detail">
              <Badge
                badgeContent={products.map(p => p.quantity).reduce((a,b) => (a+b), 0)}
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton> : null
          }
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;