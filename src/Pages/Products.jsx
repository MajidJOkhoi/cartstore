import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.in/api/products");
      const data = await response.json();
      setProducts(data.products.slice(0, 8));
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAdd = (product) => {
    dispatch(add(product));
  };

  const getShortTModel = (model) => {
    return model.length > 20 ? model.substring(0, 12) + "..." : model;
  };

  return (
    <div className="container mx-auto pb-24 py-4 ">
      <h1 className="text-3xl font-bold my-8 font-sans">Products</h1>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[300px] max-w-[200px] m-2 p-4 bg-white shadow-md border-2 rounded-lg transition-transform transform hover:scale-100"
            style={{ height: "560px" }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full object-cover rounded-lg py-2 hover:translate-y-2 duration-200"
            />
            <div className="text-center mt-2 text-gray-500 font-bold text-lg">
              Brand: {product.brand}
            </div>
            <div className="text-center mt-2 font-bold text-lg">
              Model: {getShortTModel(product.model)}
            </div>
            <div className="text-center mt-1 text-gray-500">
              Price: ₹{product.price}
            </div>
            <div className="text-center mt-1 text-gray-500">
              Color: {product.color}
            </div>
            <div className="text-center mt-1 text-gray-500">
              Category: {product.category}
            </div>
            <div className="text-center mt-2 font-semibold text-green-600">
              Discount: {product.discount}%
            </div>
            <div className="text-center mt-2">
              <button
                className="px-4 py-2 bg-[#e57312] text-white rounded-full hover:bg-[#146c7d] selection:transition duration-300 font-sans"
                onClick={() => handleAdd(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
