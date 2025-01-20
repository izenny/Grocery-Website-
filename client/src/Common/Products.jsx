import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";

const Product = ({ products }) => {
  const userId = useSelector((state) => state.auth.user._id);
  const navigate = useNavigate();
  console.log("userid", userId);

  const dispatch = useDispatch();
  const buyProductHandler = async (productId) => {
    const cartData = {
      productId: productId,
      quantity: 1,
    };
    console.log(cartData);

    try {
      // Dispatch addToCart action with userId and cartData wrapped in an object
      dispatch(addToCart({ id: userId, cartData }));
      // Optionally, handle success response if needed
      navigate("/user/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error gracefully
    }
  };
  const AddToCartHandler = async (productId, price) => {
    const cartData = {
      product: productId,
      quantity: 1,
      price: price,
    };
    console.log(cartData);

    try {
      // Dispatch addToCart action with userId and cartData wrapped in an object
      dispatch(addToCart({ id: userId, cartData }));
      // Optionally, handle success response if needed
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error gracefully
    }
  };

  return (
    <div className="m-1 flex h-full overflow-y-scroll no-scrollbar justify-around flex-wrap">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="m-6 relative">
            <div className="w-[200px] h-[130px] p-2 bg-white shadow rounded-lg">
              <div className="flex justify-center flex-col items-center">
                <h2 className="text-2xl font-Merriweather">
                  {product.productname}
                </h2>
                <p className="text-xs">{product.description}</p>
                <h1 className="text-lg">{product.price} rs</h1>
              </div>
              <div>
                <button
                  onClick={() => buyProductHandler(product._id)}
                  className="p-1 m-1 w-16 font-Merriweather text-white hover:scale-105 bg-orange-500 rounded-lg"
                >
                  Buy
                </button>
                <button
                  onClick={() => AddToCartHandler(product._id, product.price)}
                  className="p-1 m-1 w-16 font-Merriweather text-white hover:scale-105 bg-orange-500 rounded-lg"
                >
                  Cart
                </button>
              </div>
            </div>
            <div className="absolute w-[100px] h-[100px] rounded-xl top-[60px] left-[130px]">
              <img
                src={`/image-${product.image}`}
                // src={`/public/${product.image}`} // Ensure image path is correct
                alt={product.productname}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Product;
