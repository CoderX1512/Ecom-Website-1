// import React, { Component } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// class ItemDisplay extends Component {
//   constructor() {
//     super();
//     this.state = {
//       items: [], // Store the items from the API response
//     };
//   }

//   componentDidMount() {
//     // Make a GET request to your API endpoint
//     axios.get('https://fakestoreapi.com/products')
//       .then((response) => {
//         this.setState({ items: response.data });
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }

//   render() {
//     const { items } = this.state;

//     return (
//       <div>
//         <h1>Our Products</h1>
//         <div className="row">
//           {items.map((item) => (
//             <div className="col-md-4" >
//               <div className="card mb-4">
//                 <img src={item.image} className="card-img-top" alt={item.name} 
//                 style={{ width: '100px', height: '100px' }} />
//                 <div className="card-body">
//                   <h5 className="card-title">{item.title}</h5>
//                   <p className="card-text">{item.description}</p>
//                 </div>
//                 <div className="card-footer">
//                   <button className="btn btn-primary">Add to Cart</button>
//                   <p className="card-text">${item.price}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// export default ItemDisplay;
import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class ItemDisplay extends Component {
  constructor() {
    super();
    this.state = {
      items: [], // Store the items from the API response
    };
  }

  componentDidMount() {
    // Make a GET request to your API endpoint
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  // Function to add an item to the cart
  addToCart = (productId) => {
    // Retrieve the existing cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    if (!cartItems.includes(productId)) {
      // If not, add the product ID to the cart
      cartItems.push(productId);

      // Update the cart in local storage
      localStorage.setItem('cart', JSON.stringify(cartItems));

      // Notify the user that the product was added to the cart
      alert('Product added to cart!');
    } else {
      // If the product is already in the cart, you can display a message or take appropriate action
      alert('Product is already in the cart.');
    }
  };

  render() {
    const { items } = this.state;

    return (
      <div>
        <h1>Our Products</h1>
        <div className="row">
          {items.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card mb-4">
                <img src={item.image} className="card-img-top" alt={item.name} 
                  style={{ width: '100px', height: '100px' }} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
                <div className="card-footer">
                  {/* Attach the addToCart function to the button's click event */}
                  <button className="btn btn-primary" onClick={() => this.addToCart(item.id)}>
                    Add to Cart
                  </button>
                  <p className="card-text">${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ItemDisplay;
