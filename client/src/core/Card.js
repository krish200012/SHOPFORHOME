import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
//import ToggleButton from '@material-ui/core/ToggleButton'
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CardM from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
//import FavoriteBorderIcon from '@material-ui/core/FavoriteBorder';
//import Wishlist from './Wishlist';
import { getWishList } from './wishlistHelper'
import { addItem, updateItem, removeItem } from './cartHelpers';
import { addItemW, updateItemW, removeItemW } from './wishlistHelper';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  productDescription: {
    height: '100px',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showAddToWishlistButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showRemoveProductButtonWislist = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  
  const [redirect, setRedirect] = useState(false);
  const [redirectW, setRedirectW] = useState(false);
  const [count, setCount] = useState(product.count);
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link href={`/product/${product._id}`} className='mr-2'>
          <Button variant='contained' color='primary'>
            View Product
          </Button>
        </Link>
      )
    );
  };
  const [items, setItems] = useState([]);
  
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };
  const addToWishlist = () => {
     console.log(product.category);
     
      addItemW(product,setRedirectW(true));
     console.log("W added",product._id)
     
   // Wishlist(product);
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };
  
  const shouldRedirectWishlist = (redirect) => {
    if (redirect) {
      return <Redirect to='/wishlist' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button onClick={addToCart} variant='outlined' color='secondary'>
          Add to cart
        </Button>
      )
    );
  };
  const showAddToWishlistBtn = (showAddToWishlistButton) => {
    //setItems();
    const ifThere=!getWishList().some(item => item._id === product._id)
    if(ifThere){
      return (showAddToWishlistButton && (
          <IconButton onClick={()=>{addToWishlist();setRedirectW(true)}}  color='secondary'>
          <FavoriteBorderIcon />
        </IconButton>
        ))

    }
    else{
      return (showAddToWishlistButton && (
        <IconButton
          onClick={() => {
            removeItemW(product._id);
            setRun(!run); // run useEffect in parent Cart
            setRedirectW(true);
          }}
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          <FavoriteIcon/>
          
        </IconButton>
      ))

    }
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill'>In Stock </span>
    ) : (
      <span className='badge badge-primary badge-pill'>Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='mt-2'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Remove Product
        </Button>
      )
    );
  };

  const showRemoveButtonWishlist = (showRemoveProductButtonWislist) => {
    return (
      showRemoveProductButtonWislist && (
        <IconButton
          onClick={() => {
            removeItemW(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          variant='contained'
          color='secondary'
          className={classes.button}
        >
          {/* <FavoriteBorderIcon /> */}
          <DeleteIcon />
        </IconButton>
      )
    );
  };

  const classes = useStyles();

  return (
    // <div className='card'>
    //   <div className='card-header name'>{product.name}</div>
    //   <div className='card-body'>
    //     {shouldRedirect(redirect)}
    //     <ShowImage item={product} url='product' />
    //     <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
    //     <p className='black-10'>${product.price}</p>
    //     <p className='black-9'>
    //       Category: {product.category && product.category.name}
    //     </p>
    //     <p className='black-8'>
    //       Added on {moment(product.createdAt).fromNow()}
    //     </p>

    //     {showStock(product.quantity)}
    //     <br></br>

    //     {showViewButton(showViewProductButton)}

    //     {showAddToCartBtn(showAddToCartButton)}

    //     {showRemoveButton(showRemoveProductButton)}

    //     {showCartUpdateOptions(cartUpdate)}
    //   </div>
    // </div>

    <Container className={classes.cardGrid} maxWidth='md'>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <CardM className={classes.card}>
            {shouldRedirect(redirect)}
            {shouldRedirectWishlist(redirectW)}
            <ShowImage item={product} url='product' />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant='h5' component='h2'>
                {product.name}
              </Typography>
              <Typography className={classes.productDescription}>{product.description.substring(0, 100)}</Typography>
              <p className='black-10'>Price: ${product.price}</p>
              <p className='black-9'>
                Category: {product.category && product.category.name}{' '}
              </p>{' '}
              <p className='black-8'>
                Added on {moment(product.createdAt).fromNow()}{' '}
              </p>
              {showStock(product.quantity)}
              <br></br>
              <span>
                {showViewButton(showViewProductButton)}
                {showAddToCartBtn(showAddToCartButton)}
                {showAddToWishlistBtn(showAddToWishlistButton)}
                {showRemoveButton(showRemoveProductButton)}
                {showRemoveButtonWishlist(showRemoveProductButtonWislist)}
              </span>
              {showCartUpdateOptions(cartUpdate)}
            </CardContent>
          </CardM>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Card;
