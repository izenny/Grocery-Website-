import React, { useEffect, useState } from 'react'
import Product from '../../Common/Products'
import { ProductsFetchApi } from '../../ApiCall/AddProductApi';

const Categories = () => {
    const [type, setType] = useState("all");
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productData = await ProductsFetchApi({ type });
          setProducts(productData);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts();
    }, [type]);
  
    const handleCategoryClick = (category) => {
      setType(category);
    };
  return (
    <div className="h-full">
    <div className="flex overflow-y-scroll no-scrollbar">
      <div className="w-[20%]">
        <div className="h-full w-full">
          <div className="m-1 h-full flex flex-col justify-center">
            <div
              onClick={() => handleCategoryClick("all")}
              className="w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center"
            >
              <h2>All</h2>
            </div>
            <div
              onClick={() => handleCategoryClick("Vegetables")}
              className="w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center"
            >
              <h2>Vegetables</h2>
            </div>
            <div
              onClick={() => handleCategoryClick("Fruits")}
              className="w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center"
            >
              <h2>Fruits</h2>
            </div>
            <div
              onClick={() => handleCategoryClick("Dairy & Eggs")}
              className="w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center"
            >
              <h2>Dairy & Eggs</h2>
            </div>
            <div
              onClick={() => handleCategoryClick("meat-seafood")}
              className="w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center"
            >
              <h2>Meat & Seafood</h2>
            </div>
            <div
              onClick={() => handleCategoryClick("bakery-bread")}
              className="w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center"
            >
              <h2>Bakery & Bread</h2>
            </div>
            <div
              onClick={() => handleCategoryClick("pantry-staples")}
              className="w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center"
            >
              <h2>Pantry Staples</h2>
            </div>
            <div
              onClick={() => handleCategoryClick("snacks-beverages")}
              className="w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center"
            >
              <h2>Snacks & Beverages</h2>
            </div>
            <div
              onClick={() => handleCategoryClick("household-supplies")}
              className="w-full flex justify-center p-3 text-lg font-Merriweather m-1 shadow rounded-xl hover:scale-105 transform cursor-pointer ease-in-out hover:bg-orange-400 duration-200 hover:text-white items-center"
            >
              <h2>Household Supplies</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Product products={products} />
      </div>
    </div>
  </div>
  )
}

export default Categories