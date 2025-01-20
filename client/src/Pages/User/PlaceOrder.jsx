import React, { useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "../../Components/User/AddressCard";
import { placeOrder } from "../../Redux/OrderSlice";
import { clearCart } from "../../Redux/CartSlice";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const id = useSelector((state) => state.auth.user._id);
  const orderItems = useSelector((state) => state.order.currentOrder);
  console.log("orderitmes", orderItems);

  const [orderDetails, setOrderDetails] = useState({
    paymentMethod: "Cash on Delivery", // Default payment method
  });

  const deliveryCharge = 20; // Replace with your delivery charge logic
  const handleSelectAddress = (address) => {
    console.log("Selected Address:", address);
    setOrderDetails({
      ...orderDetails,
      shippingAddress: address,
    });
    // You can set the selected address in the state or handle it as needed
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle order submission
  const handleSubmit = async () => {
    if (!orderDetails.shippingAddress) {
      alert("Please select a delivery address.");
      return;
    }
    const orderId =orderItems._id
     const placeorderData= orderDetails 
     try {
      console.log('sdfjkh',placeorderData);
      
      await dispatch(placeOrder({ orderId, placeorderData }));
      await dispatch(clearCart())
     navigate('/user/home')

    alert('order placed successfully')
      console.log("Order placed with details:", orderDetails);
    } catch (error) {
      console.error("Error placing order:", error);
    }
    
  };

  return (
    <div className="w-full h-full ">
      <div className="text-3xl flex justify-center items-center m-2 p-1 text-green-700">
        <RiShoppingCart2Line />
        <h2 className="text-2xl font-Merriweather pl-4 font-semibold text-orange-500">
          Place Order
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="h-full w-full md:w-1/3 p-4 sm:border-r">
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-Merriweather">Order Summary</h2>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-4 pb-4 ">
            <div className="font-medium">No</div>
            <div className="font-medium">Name</div>
            <div className="font-medium">Price</div>
            <div className="font-medium">Quantity</div>
            <div className="font-medium">Total</div>

            {orderItems &&
              orderItems.items.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="p-2">{index + 1}</div>
                  <div className="p-2">{item.product.productname}</div>
                  <div className="p-2">₹{item.product.price}</div>
                  <div className="p-2">
                    {item.quantity} ({item.product.description})
                  </div>
                  <div className="p-2">
                    ₹{item.product.price * item.quantity}
                  </div>
                </React.Fragment>
              ))}
          </div>

          {/* Total Row */}
          <div className="border-t  mt-4 pt-4 font-Merriweather ">
            <div className="flex justify-between">
              <div className="font-medium">Total</div>
              <div className="font-medium">₹ {orderItems.totalPrice}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Delivery Charge</div>
              <div className="font-medium">₹ {deliveryCharge}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Subtotal</div>
              <div className="font-medium">
                ₹ {orderItems.totalPrice + deliveryCharge}
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-full md:w-2/3 p-4">
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-Merriweather">Delivery Information</h2>
          </div>

          <div className="">
            <button>add Address</button>
            <AddressCard id={id} onSelectAddress={handleSelectAddress} />
          </div>
          <div className="flex justify-center items-center mt-4">
            <h2 className="text-xl font-Merriweather">Payment Method</h2>
          </div>
          <div className="m-2 flex justify-around p-2 shadow">
            {["Cash on Delivery", "Credit Card", "Debit Card"].map((method) => (
              <div key={method}>
                <input
                  type="checkbox"
                  name="paymentMethod"
                  id={method}
                  value={method}
                  checked={orderDetails.paymentMethod === method}
                  onChange={handleInputChange}
                  className="m-1"
                />
                <label htmlFor={method} className="m-1">
                  {method === "Cash on Delivery"
                    ? "Cash on Delivery"
                    : method === "Credit Card"
                    ? "Credit Card"
                    : "Debit Card"}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-around items-center mt-4">
            <button
              className="p-1 m-1 w-1/4 font-Merriweather text-white text-xl flex justify-center items-center hover:scale-105 bg-orange-400 rounded-lg"
              onClick={handleSubmit}
            >
              Place Order
            </button>
            <button className="p-1 m-1 w-1/4 font-Merriweather text-white text-xl flex justify-center items-center hover:scale-105 bg-orange-400 rounded-lg">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
