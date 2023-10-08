// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./searchBarSection.css";

// const SearchBarSection = () => {
//     const [products, setProducts] = useState([]);
//     const [search, setSearch] = useState("");

//     useEffect(() => {
//         const apiUrl = "https://fakestoreapi.com/products";

//         axios.get(apiUrl)
//             .then((response) => {
//                 setProducts(response.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data from API:", error);
//             });
//     }, []);

//     const filteredProducts = products.filter((product) => {
//         const lowerCaseSearch = search.toLowerCase();
//         return (
//             product.id.toString().includes(lowerCaseSearch) || // Search by ID
//             product.title.toLowerCase().includes(lowerCaseSearch) || // Search by title
//             product.category.toLowerCase().includes(lowerCaseSearch) // Search by category
//         );
//     });

//     return (
//         <div className="searchBarSection">
//             <div className="searchBar">
//                 <input
//                     className="input"
//                     onChange={(e) => {
//                         setSearch(e.target.value.toLowerCase());
//                     }}
//                 />
//                 <button className="button">
//                     <svg
//                         className="w-6 h-6"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                         ></path>
//                     </svg>
//                 </button>
//             </div>
//             <br/><br/>

//             <div className="display">
                
//                     <div className="row">
//                     {filteredProducts.map((item) => (
//                       <div className="col-md-4" >
//                         <div className="card mb-4">
//                             <h5>{item.id}</h5>
//                           <img src={item.image} className="card-img-top" alt={item.name} 
//                           style={{ width: '100px', height: '100px' }} />
//                           <div className="card-body">
//                             <h5 className="card-title">{item.title}</h5>
//                             <p className="card-text">{item.description}</p>
//                           </div>
//                           <div className="card-footer">
//                             <button className="btn btn-primary">Add to Cart</button>
//                             <p className="card-text">${item.price}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                
//             </div>
//         </div>
//     );
// };

// export default SearchBarSection;






import React from "react";

const SearchBarSection = ({ products, search }) => {
    // Filter products based on the search query
    const filteredProducts = products.filter((product) => {
        const lowerCaseSearch = search.toLowerCase();
        return (
            product.id.toString().includes(lowerCaseSearch) || // Search by ID
            product.title.toLowerCase().includes(lowerCaseSearch) || // Search by title
            product.category.toLowerCase().includes(lowerCaseSearch) // Search by category
        );
    });

    return (
        <div className="searchBarSection">
            <br/><br/>
            <div className="display">
                <div className="row">
                    {filteredProducts.map((item) => (
                        <div className="col-md-4" key={item.id}>
                            <div className="card mb-4">
                            <h5>{item.id}</h5>
                          <img src={item.image} className="card-img-top" alt={item.name} 
                          style={{ width: '100px', height: '100px' }} />
                          <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.description}</p>
                          </div>
                          <div className="card-footer">
                            <button className="btn btn-primary">Add to Cart</button>
                            <p className="card-text">${item.price}</p>
                          </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchBarSection;
