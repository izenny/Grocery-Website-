import React, { useEffect, useState } from 'react';
import Products from '../../Common/Products';
import { ProductsFetchApi } from '../../ApiCall/AddProductApi';

const ViewAllProducts = () => {
  const [type, setType] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(type);
        
        const productData = await  ProductsFetchApi({ type });
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [type]);

  return (
    <div>
      <Products products={products} />
    </div>
  );
};

export default ViewAllProducts;
