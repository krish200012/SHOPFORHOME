export const addItemW = (item = [], count = 0, next = (f) => f) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wishlist')) {
        cart = JSON.parse(localStorage.getItem('wishlist'));
      }
      cart.push({
        ...item,
        count: 1,
      });
  
      // remove duplicates
      // build an Array from new Set and turn it back into array using Array.from
      // so that later we can re-map it
      // new set will only allow unique values in it
      // so pass the ids of each object/product
      // If the loop tries to add the same value again, it'll get ignored
      // ...with the array of ids we got on when first map() was used
      // run map() on it again and return the actual product from the cart
  
      cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
        return cart.find((p) => p._id === id);
      });
  
      localStorage.setItem('wishlist', JSON.stringify(cart));
      next();
    }
  };
  
  export const itemTotal = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wishlist')) {
        return JSON.parse(localStorage.getItem('wishlist')).length;
      }
    }
    return 0;
  };
  
  export const getWishList = () => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wishlist')) {
        return JSON.parse(localStorage.getItem('wishlist'));
      }
    }
    return [];
  };
  
  export const updateItemW = (productId, count) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wishlist')) {
        cart = JSON.parse(localStorage.getItem('wishlist'));
      }
  
      cart.map((product, i) => {
        if (product._id === productId) {
          cart[i].count = count;
        }
      });
  
      localStorage.setItem('wishlist', JSON.stringify(cart));
    }
  };
  
  export const removeItemW = (productId) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('wishlist')) {
        cart = JSON.parse(localStorage.getItem('wishlist'));
      }
  
      cart.map((product, i) => {
        if (product._id === productId) {
          cart.splice(i, 1);
        }
      });
  
      localStorage.setItem('wishlist', JSON.stringify(cart));
    }
    return cart;
  };
  
  export const emptyCart = (next) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wishlist');
      next();
    }
  };
  