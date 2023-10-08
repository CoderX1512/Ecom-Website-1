import React, { Component } from 'react';
import axios from 'axios';

class CartPage extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [], // Store the cart items retrieved from local storage
      productDetails: [], // Store product details fetched from the API
      totalPrice: 0, // Store the total price of items in the cart
    };
  }

  componentDidMount() {
    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ cartItems });

    // Fetch product details for items in the cart from the API
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        const productDetails = response.data.filter((product) =>
          cartItems.includes(product.id)
        );
        this.setState({ productDetails });
        this.calculateTotalPrice(productDetails);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }

  calculateTotalPrice = (productDetails) => {
    const totalPrice = productDetails.reduce((total, product) => {
      return total + product.price;
    }, 0);
    this.setState({ totalPrice });
  };

  handleClearCart = () => {
    // Clear cart items from local storage and reset the state
    localStorage.removeItem('cart');
    this.setState({ cartItems: [], productDetails: [], totalPrice: 0 });
  };

  render() {
    const { productDetails, totalPrice } = this.state;

    return (
      <div>
        <h1>Your Cart</h1>
        {productDetails.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <button onClick={this.handleClearCart} className="btn btn-danger">
              Clear Cart
            </button>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total Price: ${totalPrice}</p>
          </>
        )}
      </div>
    );
  }
}

export default CartPage;
