import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Make sure to import axios
import Products from '../../Common/Products';  // Adjust the import path as needed
import { LowProductsFetchApi } from '../../ApiCall/AddProductApi';

const ViewLowStocks = () => {
    const [products, setProducts] = useState([]);  // State to hold low-stock products
    const [loading, setLoading] = useState(true);   // State to handle loading

    
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);  // Set loading to true before fetching
            try {
                const lowStockProducts = await LowProductsFetchApi();
                setProducts(lowStockProducts.data);  // Set the fetched products to state
            } catch (error) {
                console.error("Failed to fetch low stock products:", error);
            } finally {
                setLoading(false);  // Set loading to false after fetching
            }
        };

        fetchProducts();
    }, []);  // Empty dependency array means this effect runs once on mount

    // Show a loading message or the fetched products
    if (loading) {
        return <div>Loading low stock products...</div>;
    }

    return (
        <div>
            <h2>Low Stock Products</h2>
            {products?.length > 0 ? (
                <Products products={products} />  // Pass the products to your Products component
            ) : (
                <p>No low stock products available.</p>
            )}
        </div>
    );
};

export default ViewLowStocks;
