import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';



import axios from "axios"; 

import Home from "./Components/home";
import ItemDisplay from './Components/product';
import Contact from "./Components/contact";
import Login from "./Components/login";
import Signup from "./Components/signup";
import SearchBarSection from './Components/searchBarSection';
import CartPage from './Components/cart';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearchVisible, setSearchVisible] = useState(false);

    const handleSearchClick = () => {
        setSearchVisible(true);
    };
    const handleSearchBlur = () => {
        setSearchVisible(false);
    };

  useEffect(() => {
    const apiUrl = "https://fakestoreapi.com/products";    // http://127.0.0.1:5000/products

    axios.get(apiUrl)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  return (
    
    <div className="App">
        <Router>
        
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                    Online Shopping
                </Link>


                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav">
                        <li >
                            <Link className="nav-link" to="/">
                                Home 
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/product">
                                Product
                            </Link>
                        </li>

                        <li className="nav-item active">
                            <Link className="nav-link" to="/contact">
                                Contact
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/signup">
                                SignUp
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/cart">
                                Cart
                            </Link>
                        </li>

                    </ul>
                    <form className="form-inline">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={handleSearchClick} // Show the search bar on click
                            onBlur={handleSearchBlur} // Hide the search bar when input loses focus
                        />
                        
                    </form>
                </div>
            </nav>
            <div>
            {isSearchVisible && (
                        <SearchBarSection products={products} search={search} />
                    )}
            </div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/product" element={<ItemDisplay />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/searchBarSection" element={<SearchBarSection />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
            
            
        </Router>
    </div>
    
    
);
}

export default App;
