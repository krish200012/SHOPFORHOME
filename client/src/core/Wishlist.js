// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from './Layout';

// function Wishlist(props)  {
//   const [prod,setProd]=useState([])
//   //console.log(this.props)
//   return (
//     <div className="col-md-12">
//     <form >
//     <label>
//         Name:
//         <input type="text" name="name" />
//     </label>
//     <input type="submit" value="Submit" />
//     </form>
//         <div className="row row-border pt-2 pb-2">
//             <div className="col-md-2 col-lg-2 d-flex align-items-center">
//                 <h5>My Wishlist</h5>
//             </div>
//             {/* {this.props.map(wish => { return (
//             <div key={wish.pk} className="col-md-2 col-lg-2 mt-2 mb-2">
//                 <div className="card text-center">
//                     <div className="card-body ">
//                         <button onClick={this.props.deleteFromWishList.bind(this, wish.pk)} className="btn btn-sm btn-outline-secondary d-flex">&#10006;</button>
//                         <img className="img-thumbnail img-tumbnail-clean" src={wish.image} alt={wish.product_name} />
//                     </div>
//                 </div>
//             </div>
//             ) })} */}
//         </div>
//     </div>
// )
//   }

// export default Wishlist;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getWishList } from './wishlistHelper';
import Card from './Card';
import Checkout from './Checkout';

import Copyright from './Copyright';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getWishList());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your Wishlist has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            showAddToWishlistButton={false}
            cartUpdate={false}
            showRemoveProductButton={false}
            showRemoveProductButtonWislist={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your Wishlist is empty. <br /> <Link to='/shop'>Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title='Wishlist'
      description='Manage your Wishlist. Add remove checkout or continue shopping.'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
      </div>
      {/* <Copyright /> */}
    </Layout>
  );
};

export default Wishlist;


