import React from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { TbShoppingCartMinus, TbShoppingCartPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteCart, removeFromCart } from "../../Redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../Redux/OrderSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.user._id);
  // console.log(id);

  const deliveryCharge = 20;
  const cart = useSelector((state) => state.cart);
  console.log("carttt", cart);

  const subtotal = cart.totalPrice + deliveryCharge;
  // quantity change
  const handleQuantityChange = (productId, quantity) => {
    // console.log("shadfasdg", id, productId, quantity);
    const cartData = {
      productId: productId,
      quantity: quantity,
    };
    dispatch(addToCart({ id, cartData }));
  };
  //remove item
  const handleRemoveItem = (productId) => {
    // console.log('hheyhdyd',productId);

    dispatch(removeFromCart({ id, productId }));
  };
  const deleteAllCart = () => {
    // console.log('hheyhdyd',productId);

    dispatch(deleteCart({ id }));
  };
  const placeOrderhandle = async () => {
    try {
      const orderData = {
        items: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalPrice: cart.totalPrice,
        deliverycharge: deliveryCharge,
      };
      console.log("order", orderData);
      await dispatch(addOrder({ id, orderData }));
      navigate('/user/placeorder')
    } catch (error) {
      console.log("error in place order", error);
    }
  };

  return (
    <div className="w-full h-full p-4">
      <div className="text-3xl flex justify-center items-center p-1 text-green-700">
        <RiShoppingCart2Line />
        <h2 className="text-2xl font-Merriweather pl-4 font-semibold text-orange-500">
          My Cart
        </h2>
      </div>
      <div className="flex h-[340px] flex-wrap justify-center overflow-y-scroll no-scrollbar">
        {cart.items && cart.items.length > 0 ? (
          cart.items.map((item) => (
            <div
              key={item._id}
              className="relative flex m-2 rounded-xl shadow bg-orange-100 justify-around items-center w-full md:w-1/3 h-[8rem]"
            >
              <div
                onClick={() => handleRemoveItem(item.product._id)}
                className="absolute -top-2 -right-2 bg-orange-400 text-white rounded-full hover:bg-red-500 cursor-pointer hover:scale-105 p-2 text-xl"
              >
                <MdOutlineRemoveShoppingCart />
              </div>
              <div className="h-full flex flex-wrap">
                <img
                  src={`/public/${item.product.image}`} // Use product image URL from Redux state
                  alt={item.product.productname} // Use product name as alt text
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-lg font-madimione font-medium">
                  {item.product.productname}
                </h1>
                <h2 className="text-sm">{item.product.description}</h2>
                <div className="flex">
                  <h2 className="mr-2">Price: ₹{item.product.price}</h2>
                  <h2 className="text-green-500">In stock</h2>
                </div>
                <div className="flex-row flex h-fit">
                  <button
                    onClick={() => handleQuantityChange(item.product._id, 1)}
                    className="p-1 m-1 w-16 font-Merriweather text-white text-xl flex justify-center items-center hover:scale-105 bg-orange-400 rounded-lg"
                  >
                    <TbShoppingCartPlus />
                  </button>
                  <div className="w-16 border m-1 shadow text-center p-1 rounded-lg">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(item.product._id, -1)}
                    className="p-1 m-1 w-16 font-Merriweather text-white flex justify-center text-xl items-center hover:scale-105 bg-orange-400 rounded-lg"
                  >
                    <TbShoppingCartMinus />
                  </button>
                </div>
              </div>
              <div className="m-2">
                <h1 className="text-xl font-semibold">
                  ₹{item.product.price * item.quantity}
                </h1>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>

      {/* Cart Summary */}
      <div className="m-2 p-2 border flex justify-center font-Merriweather shadow">
        <div className="w-full md:w-1/2">
          <div className="flex justify-between">
            <span className="text-lg">Cart Total:</span>
            <span className="text-lg">₹{cart.totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg">Delivery Charge:</span>
            <span className="text-lg">₹{deliveryCharge}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className="text-lg">Subtotal:</span>
            <span className="text-lg">₹{subtotal}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around items-center mt-4">
        <button
          onClick={placeOrderhandle}
          className="p-1 m-1 w-1/3 font-Merriweather text-white text-xl flex justify-center items-center hover:scale-105 bg-orange-400 rounded-lg"
        >
          Place Order
        </button>
        <button
          onClick={deleteAllCart}
          className="p-1 m-1 w-1/3 font-Merriweather text-white text-xl flex justify-center items-center hover:scale-105 bg-orange-400 rounded-lg"
        >
          Remove All
        </button>
      </div>
    </div>
  );
};

export default Cart;
