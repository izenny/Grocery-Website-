// import React from 'react'
// import { RiShoppingCart2Line } from "react-icons/ri";
// const Order = () => {
//   return (
//     <div>
//       <div className="w-full h-full p-4">
//         <div className="text-3xl flex justify-center items-center m-2 p-1 text-green-700">
//           <RiShoppingCart2Line />
//           <h2 className="text-2xl font-Merriweather pl-4 font-semibold text-orange-500">
//             Place Order
//           </h2>
//         </div>
//         <div className="flex flex-col sm:flex-row">
//           <div className="h-full w-full md:w-1/3 p-4 sm:border-r">
//             <div className="flex justify-center items-center">
//               <h2 className="text-xl font-Merriweather">Order Summary</h2>
//             </div>
//             <div className="">
//               {/* <CartProduct /> */}
//             </div>
//           </div>
//           <div className="h-full w-full md:w-2/3 p-4">
//             <div className="flex justify-center items-center">
//               <h2 className="text-xl font-Merriweather">Delivery Information</h2>
//             </div>
           
//             <div className="flex justify-center items-center mt-4">
//               <h2 className="text-xl font-Merriweather">Payment Method</h2>
//             </div>
//             <div className="m-2 flex justify-around p-2 shadow">
//               {["onlinePayment", "cod"].map((method) => (
//                 <div key={method}>
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     id={method}
//                     value={method}
//                     checked={orderDetails.paymentMethod === method}
//                     onChange={handleInputChange}
//                     className="m-1"
//                   />
//                   <label htmlFor={method} className="m-1">
//                     {method === "onlinePayment" ? "Online Payment" : "Cash on Delivery"}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center items-center mt-4">
//               <h2 className="text-xl font-Merriweather">Bill</h2>
//             </div>
//             <div className="m-2 p-2 border font-Merriweather shadow">
//               <div className="flex justify-between">
//                 <span className="text-lg">Cart Total:</span>
//                 <span className="text-lg">₹{cartTotal}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-lg">Delivery Charge:</span>
//                 <span className="text-lg">₹{deliveryCharge}</span>
//               </div>
//               <div className="flex justify-between font-semibold">
//                 <span className="text-lg">Subtotal:</span>
//                 <span className="text-lg">₹{subtotal}</span>
//               </div>
//             </div>
//             <div className="flex justify-around items-center mt-4">
//               <button
//                 className="p-1 m-1 w-1/4 font-Merriweather text-white text-xl flex justify-center items-center hover:scale-105 bg-orange-400 rounded-lg"
//                 onClick={handleSubmit}
//               >
//                 Place order
//               </button>
//               <button className="p-1 m-1 w-1/4 font-Merriweather text-white text-xl flex justify-center items-center hover:scale-105 bg-orange-400 rounded-lg">
//                 Cancel order
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default Order
import React, { useState } from 'react';
import { RiShoppingCart2Line } from "react-icons/ri";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState({
    paymentMethod: "onlinePayment", // Default payment method
  });

  const cartTotal = 100; // Replace with your cart total logic
  const deliveryCharge = 20; // Replace with your delivery charge logic
  const subtotal = cartTotal + deliveryCharge; // Calculate subtotal

  // Handle input changes
  const handleInputChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle order submission
  const handleSubmit = () => {
    // Implement your order submission logic here
    console.log("Order placed with details:", orderDetails);
  };

  return (
    <div className="w-full h-full p-4">
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
          <div className="">
            {/* <CartProduct /> */}
          </div>
        </div>
        <div className="h-full w-full md:w-2/3 p-4">
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-Merriweather">Delivery Information</h2>
          </div>

          <div className="flex justify-center items-center mt-4">
            <h2 className="text-xl font-Merriweather">Payment Method</h2>
          </div>
          <div className="m-2 flex justify-around p-2 shadow">
            {["onlinePayment", "cod"].map((method) => (
              <div key={method}>
                <input
                  type="radio"
                  name="paymentMethod"
                  id={method}
                  value={method}
                  checked={orderDetails.paymentMethod === method}
                  onChange={handleInputChange}
                  className="m-1"
                />
                <label htmlFor={method} className="m-1">
                  {method === "onlinePayment" ? "Online Payment" : "Cash on Delivery"}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-4">
            <h2 className="text-xl font-Merriweather">Bill</h2>
          </div>
          <div className="m-2 p-2 border font-Merriweather shadow">
            <div className="flex justify-between">
              <span className="text-lg">Cart Total:</span>
              <span className="text-lg">₹{cartTotal}</span>
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

export default Order;
